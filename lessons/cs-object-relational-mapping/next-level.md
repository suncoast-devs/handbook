---
title: ORM Next Level
---

We have so far seen how to declare Plain Old C-Sharp Objects (POCO)s that we can
directly relate to our database tables. We have a way to use LINQ to access the
data in our tables as POCOs including the ability to create, read, update, and
delete data.

However, we had to manually create the database tables to ensure they were
aligned with our C-Sharp objects. This is an issue in a few ways:

1. It is a manual process that the developer has to work through.
2. Other members of our development team would have to make the same manual
   changes to their local copies of the database.
3. There is no source code control history of these changes.
4. There is no way to automate the process when we eventually _deploy_ our
   application to our servers up in the cloud.

There must be a solution!

## Enter Migrations!

Many modern ORM systems allow for the idea of **migrations**. A set of code, or
configuration, that describe incremental changes to the database that _migrate_
the design of the database from a previous configuration to a new one.

Initially our database design might start off as empty, no tables. An initial
_migration_ might be described as "From a database without any tables, please
add the following tables with the following columns and relationships." After
working on the application for a while and receiving feedback from the team,
management, or customers we may discover we need a new attribute of one of our
database models (POCO + table). We could then make a _new migration_ that says
"Please add an integer column named Salary to the People table."

These migrations will live in our project as a series of c-sharp classes that
will be \*_automatically_ created for us. We will add them to our code as if we
wrote it and manage it in our source control.

These _generated migrations_ solve the above problems:

1. It is no longer a manual process.
2. Other members of our team will get the same database changes when they get
   updated code.
3. The source code control will record this just like any other code change.
4. The code will be in our project when we deploy to the cloud so we can keep
   that database up-to-date.

Migrations are a wonderful benefit of having an ORM. Lets see how to add this
capability to our system and start to use it.

## Add the needed packages

In order to use _EF Core_ migrations we need to add a package to our existing
application and then restart any `dotnet watch run`

```shell
dotnet add package Microsoft.EntityFrameworkCore.Design
```

This package will allow us to use the _EF Core_ migration commands.

## Our first migration

Having added the necessary _EF Core_ packages, we can now utilize a new command:
`dotnet ef migrations`.

This command allows us to _add_ and _remove_ migrations to our system. The first
command we will investigate is `dotnet ef migrations add`.

### Adding a migration

From the terminal we can run:

```shell
dotnet ef migrations add InitialMigration
```

The CamelCased word after `add` will be the **name** of our migration. It should
attempt to document the kind of change we are making to the design of our
database. In later examples we'll see other uses and other patterns for naming,
but for now this will represent our `Initial Migration` so we'll give it that
name.

You'll see that a new folder named `Migrations` has appeared in our project. And
inside you'll see three files. Before we dig into the contents of these files,
let's review what the migration command did, and how it knows what to do.

When we add a migration .NET is comparing several things. It is comparing the
design of the database it knows about so far to the collection of `DbSet` based
POCOs we have described in our `DbContext` class. You'll notice in our
`DbContext` we have four `DbSet` entries: `Movies`, `Ratings`, `Roles`, and
`Actors`. .NET then considers what it has in it's `design`. Since this is our
first time using migrations on this project it doesn't know about any migrations
for any of these models/tables. It will then proceed to make entries in our
migration to record the details about each of these models. It looks at the
structure of our POCOs to see what columns and types there should be. For
instance, with `Actors` it sees there is a primary key `Id`, a `string` based
`FullName`, and a `DateTime` based `Birthday`. It will then do the same thing
with the outer tables. It bundles up all those _changes_ and generates our
migration files.

### The structure of a migration

In our `Migrations` folder you'll see two files with the text `InitialMigration`
as part of the name. Lets look at the one **without** the `.Designer.cs` part.

The structure of the file looks like this. We've left out the body of those
methods for readability.

```csharp
using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace SuncoastMovies.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          // Lots of code here, omitted for readability
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
          // Lots of code here, omitted for readability
        }
    }
}
```

Every migration can be processed in two directions, `Up` and `Down`. The `Up`
migration means "how do we take the current structure of the database and move
**FORWARD**" while the `Down` migration would be used in a case where we wanted
to _rollback_ or _undo_ that database change. The `Down` migration is
essentially a safety net in case we realize the migration had a bad impact on
the system.

If we look inside the body of the `Up` method we will see code similar to the
following.

```csharp
  migrationBuilder.CreateTable(
      name: "Actors",
      columns: table => new
      {
          Id = table.Column<int>(nullable: false)
              .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
          FullName = table.Column<string>(nullable: true),
          Birthday = table.Column<DateTime>(nullable: false)
      },
      constraints: table =>
      {
          table.PrimaryKey("PK_Actors", x => x.Id);
      });
```

You should recognize a few keywords in this code, `Id`, `FullName`, `Birthday`!
These are the properties of our `Actor` POCO and the names of the related
columns in our table.

This code was automatically generated for us and describes the initial structure
of our tables. It uses existing _EF Core_ classes and code to generate the
appropriate SQL actions to create our tables. (Notice the `CreateTable` method
it is using). You will notice similar code for `Ratings`, `Movies`, and `Roles`.
There is even code to record the foreign key relationships between tables.

Soon we will see how to execute this code and have it automatically create our
tables. However, if we needed to make adjustments to **this** file we can. It
isn't typical for us to need to make adjustments for simple table designs.
However, on larger projects you may find the team has customized these generated
migrations.

The related file `InitialMigration.Designer.cs` is another autogenerated file
that we should **not** have to modify. It stores details _EF Core_ needs.

The final file `SuncoastMoviesContextModelSnapshot.cs` is .NET's overall view of
the design of your database structure. This is the structure .NET will compare
against when we make any future migrations. This file should **not** need to be
edited.

You may also notice that your migration files start with a number such as:
`20200417164221`. This is a timestamp in the format
`Year-Month-Day-Hour-Minute-Second`. This is important for a few reasons. The
first reason is that migration order is important since some actions, for
instance adding a column to a table, cannot be done before others, creating the
table the column is being added too. The other reason is that it helps ensure
there is not a name collision between multiple developers adding migrations.

### Running the migration

To run the migration we will use another `dotnet` command. However, we must
first recreate our database since we already manually added these tables. In the
future we won't have to do this step since we'll **only** be using migrations to
do database work.

For now lets make sure our database is clean by running command.

> NOTE: This will remove all of our existing rows. So if you want that data, you
> can simply re-run the `INSERT` commands from the `sql` lessons again.

```shell
dropdb SuncoastMovies
createdb SuncoastMovies
```

Now that we know our database is empty of tables, as it would be had we started
only from using _EF Core_ migrations, we can run the command to _apply_ the
migrations to the database.

```shell
dotnet ef database update
```

This should run without errors. You may see output similar to this:

> NOTE: If you have EF logging turned on you will also see the SQL commands
> being generated on your behalf.

```
Build started...
Build succeeded.
Applying migration '20200417164221_InitialMigration'.
Done.
```

You will notice that _EF Core_ determined there was one migration to run and it
was processed. If we go into our database with `psql` or `pgcli` we will see the
following tables created!

```
+----------+-----------------------+--------+---------+
| Schema   | Name                  | Type   | Owner   |
|----------+-----------------------+--------+---------|
| public   | Actors                | table  | sdg     |
| public   | Movies                | table  | sdg     |
| public   | Ratings               | table  | sdg     |
| public   | Roles                 | table  | sdg     |
| public   | __EFMigrationsHistory | table  | sdg     |
+----------+-----------------------+--------+---------+
```

Notice we have our four tables we expected, but also an additional table,
`__EFMigrationsHistory`. This table is what _EF Core_ uses to keep track of
which migrations have been processed into the system so far.

If we were to run this SQL statement:

```sql
select * from "__EFMigrationsHistory";
```

We would see an output similar to:

```
+---------------------------------+------------------+
| MigrationId                     | ProductVersion   |
|---------------------------------+------------------|
| 20200417164221_InitialMigration | 3.1.3            |
+---------------------------------+------------------+
```

The timestamp for your migration may be different as well as the
`ProductVersion`. This table keeps an accounting of what migrations have been
run so far.

Lets run our `dotnet ef database update` again to see that it is smart enough
not to run the migration a second time.

```
> dotnet ef database update
Build started...
Build succeeded.
No migrations were applied. The database is already up to date.
Done.
```

Yes, we get a message
`No migrations were applied. The database is already up to date.`

Now that we have an initial structure for our database, lets try adding a
property/column to an existing model.

### Adding a migration that changes an existing model

Lets add a boolean property to our `Actor` model to indicate if they are members
of SAG-AFTRA. We'll call this field `ScreenActorsGuildMember`. The first step is
to add this property to our model.

```csharp
class Actor
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public DateTime Birthday { get; set; }

    // Adding this field
    public bool ScreenActorsGuildMember { get; set; }

    // This is the related list of roles we an use (if properly used with Include)
    public List<Role> Roles { get; set; }
}
```

Once we have added the field to the POCO class we can run the
`dotnet ef migrations add` command again.

```shell
dotnet ef migrations add AddScreenActorsGuildMemberToActor
```

Notice we have given the migration a name that matches the work that we have
done, in this case adding a property/column to a model/table.

After generating the migration we see a new file in the `Migrations` folder:
`20200417183648_AddScreenActorsGuildMemberToActor.cs`:

```csharp
using Microsoft.EntityFrameworkCore.Migrations;

namespace SuncoastMovies.Migrations
{
    public partial class AddScreenActorsGuildMemberToActor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ScreenActorsGuildMember",
                table: "Actors",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ScreenActorsGuildMember",
                table: "Actors");
        }
    }
}
```

In the `Up` migration we see code added to `AddColumn` to the `Actors` table
that is a `<bool>`.

Now that we have:

- Added the property to the model
- Run the `dotnet ef migrations add` command and given it a good descriptive
  name
- Reviewed the migration `Up` to make sure it captures the change we expected

we can run the `dotnet ef database update` command to have that column appear in
our database.

```shell
dotnet ef database update
```

Output:

```
Build started...
Build succeeded.
Applying migration '20200417183648_AddScreenActorsGuildMemberToActor'.
Done.
```

# Conclusion

This process of making small incremental additions to our POCOs, generating
migrations, and applying them repeat continuously through the development cycle.
We often do not know, at the start of our project, all the requirements and all
of the data we will need. Migrations give us a way to _iterate_ on the design of
our database structure and keep a history of the work that was done. As we build
full stack applications we will be using _EF Core_ and _migrations_ to our
advantage.
