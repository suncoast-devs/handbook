---
title: Create Your First Migrations
order: 5
---

# Create migrations

Given our ERD and the initial design of some pages, we can create the backend
database tables of the entities that support those pages. By starting with one
or two pages we can focus on just a few of the database models we need from our
ERD without having to create them all at once.

## Use the `EF Core` tools

First, create a new `C# class` in the `Models` directory.

Right click on the `Models` folder and select `Create new C# class`. Enter
`Restaurant.cs` as the name of your class.

### Generate a model

For instance, we might design our `Restaurant` class like this:

```csharp
namespace TacoTuesday.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string Telephone { get; set; }
    }
}
```

### Let EF Core know about it

Once we have defined the model itself we must update the `DatabaseContext` file
to let `EF Core` know we wish to track a `DbSet` of these `Restaurant` models.

Add this line to `DatabaseContext.cs`

```csharp
public DbSet<Restaurant> Restaurants { get; set; }
```

### Create a migration

With this model created and the `DbSet` defined in the context, we can use this
command to automatically generate a migration that will create the table in the
database for us. However, we should first make sure our code is building
correctly.

```shell
dotnet build
```

if indicates errors then you must resolve those before moving on.

If `dotnet build` runs without any issues then we can run the command to
generate a migration.

```shell
dotnet ef migrations add CreateRestaurant
```

Once done we will see a file similar to `20200704182602_CreateRestaurant.cs` in
our `Migrations` folder.

**NOTE** You should take the time to review the contents of this file. A common
developer error is to _not_ check this file and ensure that `.net` generated the
code needed to create or update our database schema.

There should be **two** methods in this file `Up`, and `Down` and they should
have `C#` statements within that refer to the model and columns we would expect
to see given the definition in `Restaurant.cs` above.

### Update the database

Now we can _execute_ the migration so that the changes are made in our local
developer database.

```shell
dotnet ef database update
```

You should see a message indicating that the changes were applied to the
database.

### Insert some data

Use `pgcli` or any other database tool to insert some sample data.

One way to accomplish this is to create a seeding sql script.

Create a file `exampledata.sql` and, using the following as an example, create
your sample data.

Save this file in the `Models` directory.

```sql
TRUNCATE TABLE "Restaurants";

INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Thoughtbeat', 'Inverse zero administration benchmark', '07 Meadow Vale Drive', '314-651-9791');
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Dabtype', 'Organized stable firmware', '7 Miller Park', '523-760-6681');
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Topdrive', 'Object-based interactive application', '65 Eliot Lane', '650-993-7074');
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Avaveo', 'Persistent zero defect process improvement', '2 Clarendon Junction', '715-663-5265');
```

You can run this with the command line:

```shell
psql --file=Models/exampledata.sql TacoTuesdayDatabase
```

## Files Updated

> NOTE: Your Migrations files will have different filenames with distinct
> timestamps

<GithubCommitViewer repo="gstark/TacoTuesday" commit="6ae48dfe2c7eeeea580e1b41907e88f866938764" />
