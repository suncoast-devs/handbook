theme: Next,1

# [fit] Building CRUD API Servers

---

# Writing API servers that manage data

- Let's create an API server that can perform CRUD actions on some collection of data

---

# [fit] Game Night!

---

- We will create an API to manage our game nights.
- It will track:
  - The name of the game we will play
  - The name of the person hosting the event
  - The address of the event
  - The date and time the game will start
  - The minimum number of players
  - The maximum number of players

---

# API Definition

We are going to make an API that has the ability to `CRUD` (Create, Read, Update, and Delete) games.

The first thing we should do is design our API to support all of these and to follow a common convention.

---

# Resource

[.autoscale: true]

We will follow these guidelines while building our API:

- Game is the model we are going to manage
- If an endpoint uses the `GET` verb we expect the endpoint to return the same resource each time and not modify it.
- If an endpoint uses `POST/PUT/DELETE` it will modify the resource in some way.
- `POST` will modify the "list of all games" resource by adding a new Game.
- `PUT` will modify a specific game by supplying new values
- `DELETE` will modify a specific game by removing it from the "list of all games"

---

| Endpoint           | Purpose                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| GET /games         | Gets a list of all games                                                                                                          |
| GET /games/{id}    | Gets the single specific game given by its id                                                                                     |
| POST /games        | Creates a new game, assigning a new ID for the game. The properties of the game are given as JSON in the BODY of the request      |
| PUT /games/{id}    | Updates the single specific game given by its id. The updated properties of the game are given by JSON in the BODY of the request |
| DELETE /games/{id} | Deletes the specific game given by its id                                                                                         |

---

# Patterns!

[.autoscale: true]

> This is a very typical pattern of API for a CRUD style application.

-

> These URL patterns and VERB combinations are enough of a pattern that we can typically make some guesses as to what an API does by only looking at the `URL`+`VERB` definition.

---

# Creating Our Application

To generate an app with API and database support:

```shell
dotnet new sdg-api -o GameDatabaseAPI
```

---

# Generating an ERD

Our ERD for this application is simple since it is only dealing with a single entity: a `Game`

```
+-------------------------+
|          Game           |
+-------------------------+
| Id - SERIAL PRIMARY KEY |
| Name - string           |
| Host - string           |
| Address - string        |
| When - DateTime         |
| MinimumPlayers - int    |
| MaximumPlayers - int    |
+-------------------------+
```

---

# Generating our database and our tables

We can use a feature of `Entity Framework` we may not have used yet: `Migrations`

For more details on migrations you can see [this lesson](/lessons/cs-object-relational-mapping/next-level).

---

# Migrations

`Migrations` are the ability for `EF` to detect changes to our `C#` models and _automatically_ generate the required SQL to change the definition of the database.

This is the idea of **Code First** database modeling. What we had done before, creating our tables manually in `SQL` was considered **Database First**.

---

# Creating a Migration

The first thing we do is define our model.

In the **Models** directory, create the `Game.cs` file and define all the fields.

```csharp
public class Game
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Host { get; set; }
    public string Address { get; set; }
    public DateTime When { get; set; }
    public int MinimumPlayers { get; set; }
    public int MaximumPlayers { get; set; }
}
```

---

# Next step, inform our `DatabaseContext` of this model

After this code:

```csharp
public partial class DatabaseContext : DbContext
{
```

add this statement to let the `DatabaseContext` know we want to track `Game` in a `Games` table:

```csharp
public partial class DatabaseContext : DbContext
{
    public DbSet<Game> Games { get; set; }
```

---

[.autoscale: true]

# Next up: generate a migration

Any time we change the **properties** of a _model_ **OR** we create a **new** model we must generate a _Database Migration_ and _update_ our database.

Before we can generate a migration we should do a quick check to make sure our code is free of syntax errors:

```shell
dotnet build
```

Then:

```shell
dotnet ef migrations add AddGames
```

---

# Naming migrations

The name of our migration should attempt to capture the database structure change we are making.

In this case we are **Add** ing the `Games` table.

---

# [fit] Next up: ensure your migration is good

This step is **IMPORTANT**

Do **not** skip it.

Most project questions of **why is my app not working** relates to a broken migration.

---

# Checking our migration

[.column]

You should have at least two new files in `Migrations`, one ending in `_AddGames.cs`.

Open that file and ensure the `Up` method has code for creating a table and defining columns.

---

```csharp
protected override void Up(MigrationBuilder migrationBuilder)
{
    migrationBuilder.CreateTable(
        name: "Games",
        columns: table => new
        {
            Id = table.Column<int>(nullable: false)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
            Name = table.Column<string>(nullable: true),
            Host = table.Column<string>(nullable: true),
            Address = table.Column<string>(nullable: true),
            When = table.Column<DateTime>(nullable: false),
            MinimumPlayers = table.Column<int>(nullable: false),
            MaximumPlayers = table.Column<int>(nullable: false)
        },
        constraints: table =>
        {
            table.PrimaryKey("PK_Games", x => x.Id);
        });
}
```

---

# [fit] Let's walk through this code

---

# Update the database with this migration change

To _run_ the migration against our database:

```shell
dotnet ef database update
```

---

# [fit] This should create our `Games` table for us!

---

# Time to make a controller!

To run the code generator:

```shell
dotnet aspnet-codegenerator controller
                            --model Game
                            -name GamesController
                            --useAsyncActions
                            -api
                            --dataContext DatabaseContext
                            --relativeFolderPath Controllers
```

**NOTE** This would normally be all on one line

---

# [fit] GamesController.cs

Let's review this code. There is a lot there!

**NOTE** There is also a detailed walk through of this code in the handbook lesson.

---

# [fit] Let's run the application and see what it can do!
