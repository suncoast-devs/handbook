---
title: Full Database + API GameNight application
---

In this section we will expand on our previous code to build a complete
Database + API application. Quite a lot of the previous code will be used here
since managing a `List<>` is very similar to managing a `DbSet` from EF Core
thanks to LINQ.

If you have not yet followed the LESSON ON SQL, LESSON ON SQL JOINS, and the
LESSON ON EF CORE we suggest you study that lesson

For this application we are going to use a new template. This template should
have been added to your environment in LESSON ON COMPUTER SETUP.

## Generating an app with API and database support

```shell
dotnet new sdg-api -o GameDatabaseAPI
```

This will create a folder `GameDatabaseAPI` with a template of an application
that will connect to a database as well as support API controllers.

## First step, create a _model_ to represent our `Game`

From our previous work we have this POCO and we defined it right in our
controller class.

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

Now we are going to place all of these database model files in their own
directory. Open the `Models` folder and add a file `Game.cs` and place that code
inside. This is where we are going to keep our database model files.

## Second step, inform our `DatabaseContext` of this model

In our LESSON ON EF CORE we didn't have a separate file for our
`DatabaseContext` however in most apps it lives in it's own file and you will
find it in the `Models` folder here as well.

After this code:

```csharp
public partial class DatabaseContext : DbContext
{
```

add this statement to let the `DatabaseContext` know we want to track `Game` in
a `Games` table:

```csharp
public partial class DatabaseContext : DbContext
{
    public DbSet<Game> Games { get; set; }
```

## Next up: generate a migration

> NOTE: Any time we change the **properties** of a _model_ **OR** we create a
> **new** model we must generate a _Database Migration_ and _update_ our
> database.

Since we just added a new model we need to create a migration

```shell
dotnet ef migrations add AddGames
```

> NOTE: The name of our migration should attempt to capture the database
> structure change we are making. In this case we are `Add`ing the `Games`
> table.

## Next up: ensure your migration is good

You should have at least two new files in `Migrations`, one ending in
`_AddGames.cs`. Open that file and ensure the `Up` method has the expected
results:

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

> NOTE: It is important to inspect your migration files after running
> `dotnet ef migrations add` because we are about to change the structure of our
> database. It also helps to ensure we don't collect _empty_ migrations which
> will happen if we run `dotnet ef migrations add` when there is no change, or
> if there are other errors in our code.

## Update the database with this migration change

To _run_ the migration against our database:

```shell
dotnet ef database update
```

## Define our API controller

Since we already created a controller file in our previous code we are going to
copy over that code and then review the changes we need to make so that we are
properly using EF Core.

We will create these imports and the namespace before copying over our
`class GamesController`

```csharp
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace GameDatabaseAPI.Controllers
{
}
```

The first major change to our `GamesController` is that we will need a reference
to our database context. We are going to use the database context for all the
access to our `Games` model. In OUR LESSON ON EF CORE we created that context
ourselves. However, in an API application the system creates the context for us
and **provides** it to us when a controller is _instantiated_ for each request.
Thus we need a `constructor` method like this:

```csharp
private readonly DatabaseContext _context;

public GamesController(DatabaseContext context)
{
  _context = context;
}
```

This constructor takes the database context as an argument and saves a
_reference_ to it in the `_context` variable. That variable is `private` so no
other class can access it and `readonly` since we don't want to change it once
we have our reference to it.

Next up we remove the `List<Game>` and `int NextID` since our database context
will take care of all of that.

## Modifications to use the database context

### GetAll

Currently our **get all the games** API code looks like this:

```csharp
// Get all the games
// API: GET /games
[HttpGet]
public ActionResult<IEnumerable<Game>> GetAll()
{
    return Ok(GameList);
}
```

to have this get the list of games from the database:

```csharp
// Get all the games
// API: GET /games
[HttpGet]
public ActionResult<IEnumerable<Game>> GetAll()
{
    return Ok(_context.Games);
}
```

### GetById

Here we need only change

```csharp
var game = GameList.FirstOrDefault(game => game.Id == id);
```

to

```csharp
var game = _context.Games.FirstOrDefault(game => game.Id == id);
```

### Create

The first thing we do is remove the code for `NextId` and `GameList.Add` and
replace them with:

```csharp
_context.Games.Add(gameToCreate);
_context.SaveChanges();
```

### Update

We change this line
`var foundGame = GameList.FirstOrDefault(game => game.Id == id);` to
`var foundGame = _context.Games.FirstOrDefault(game => game.Id == id);` to find
the existing game from the database.

Then before we can return our `Ok(foundGame)` we must tell the database this
object has changed:

```csharp
_context.Entry(foundGame).State = EntityState.Modified;
```

And then we must save changes:

```csharp
_context.SaveChanges();
```

### Delete

We change this line
`var foundGame = GameList.FirstOrDefault(game => game.Id == id);` to
`var foundGame = _context.Games.FirstOrDefault(game => game.Id == id);`

And we change `Games.Remove(foundGame)` to `_context.Games.Remove(foundGame);`
and follow it with `_context.SaveChanges();`

## Final code

```csharp
using System.Collections.Generic;
using System.Linq;
using GameDatabaseAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameDatabaseAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public GamesController(DatabaseContext context)
        {
            _context = context;
        }

        // Get all the games
        // API: GET /games
        [HttpGet]
        public ActionResult<IEnumerable<Game>> GetAll()
        {
            return Ok(_context.Games);
        }

        // Get a specific game by ID
        // API: GET /games/{id}
        [HttpGet("{id}")]
        public ActionResult<Game> GetByID(int id)
        {
            // Use LINQ to look through our game list to find a game
            // with the specified ID.
            var game = _context.Games.FirstOrDefault(game => game.Id == id);

            // If FirstOrDefault returned null it means nothing was
            // found so return a 404 to the user
            if (game == null)
            {
                return NotFound();
            }

            // We found a game, so return it
            return Ok(game);
        }

        // Create a game
        // API: POST /games
        // BODY: JSON structure like
        //       {
        //         "name": "Ticket To Ride",
        //         "host": "Bill",
        //         "address": "123 Main Street",
        //         "when": "2020-12-25T20:05",
        //         "minimumPlayers": 2,
        //         "maximumPlayers": 6
        //       }
        [HttpPost]
        public ActionResult<Game> Create(Game gameToCreate)
        {
            if (gameToCreate.MinimumPlayers < 2)
            {
                // Make a generic object containing just a message property
                var errorMessage = new { message = $"You only requested {gameToCreate.MinimumPlayers} but we need at least 2." };

                // Return a 422 error and supply a nice message
                return UnprocessableEntity(errorMessage);
            }

            if (gameToCreate.MaximumPlayers > 20)
            {
                // Make a generic object containing just a message property
                var errorMessage = new { message = $"You requested {gameToCreate.MaximumPlayers} but we can only support up to 20" };

                // Return a 422 error and supply a nice message
                return UnprocessableEntity(errorMessage);
            }

            if (gameToCreate.MaximumPlayers < gameToCreate.MinimumPlayers)
            {
                // Make a generic object containing just a message property
                var errorMessage = new { message = $"Ooops, you specified a maximum number of players that is less than the minimum number" };

                // Return a 422 error and supply a nice message
                return UnprocessableEntity(errorMessage);
            }

            _context.Games.Add(gameToCreate);
            _context.SaveChanges();

            // Return the created game
            return CreatedAtAction(null, null, gameToCreate);
        }

        // Update a game
        // API: PUT /games/{id}
        // BODY: JSON structure like
        //       {
        //         "name": "Ticket To Ride",
        //         "host": "Bill",
        //         "address": "123 Main Street",
        //         "when": "2020-12-25T20:05",
        //         "minimumPlayers": 2,
        //         "maximumPlayers": 6
        //       }
        [HttpPut("{id}")]
        public ActionResult<Game> Update(int id, Game gameUpdate)
        {
            // Use LINQ to look through our game list to find a game
            // with the specified ID
            var foundGame = _context.Games.FirstOrDefault(game => game.Id == id);

            // If FirstOrDefault returned null it means nothing was
            // found so return a 404 to the user
            if (foundGame == null)
            {
                return NotFound();
            }

            if (gameUpdate.MinimumPlayers < 2)
            {
                // Make a generic object containing just a message property
                var errorMessage = new { message = $"You only requested {gameUpdate.MinimumPlayers} but we need at least 2." };

                // Return a 422 error and supply a nice message
                return UnprocessableEntity(errorMessage);
            }

            if (gameUpdate.MaximumPlayers > 20)
            {
                // Make a generic object containing just a message property
                var errorMessage = new { message = $"You requested {gameUpdate.MaximumPlayers} but we can only support up to 20" };

                // Return a 422 error and supply a nice message
                return UnprocessableEntity(errorMessage);
            }

            if (gameUpdate.MaximumPlayers < gameUpdate.MinimumPlayers)
            {
                // Make a generic object containing just a message property
                var errorMessage = new { message = $"Ooops, you specified a maximum number of players that is less than the minimum number" };

                // Return a 422 error and supply a nice message
                return UnprocessableEntity(errorMessage);
            }

            // Copy over the values.
            foundGame.Host = gameUpdate.Host;
            foundGame.Address = gameUpdate.Address;
            foundGame.When = gameUpdate.When;
            foundGame.MinimumPlayers = gameUpdate.MinimumPlayers;
            foundGame.MaximumPlayers = gameUpdate.MaximumPlayers;

            _context.Entry(foundGame).State = EntityState.Modified;
            _context.SaveChanges();

            // Ok, we updated the game, so let's return the updated value
            return Ok(foundGame);
        }

        // Remove a game
        // API: DELETE /games/{id}
        [HttpDelete("{id}")]
        public ActionResult<Game> Delete(int id)
        {
            // Use LINQ to look through our game list to find a game
            // with the specified ID.
            var foundGame = _context.Games.FirstOrDefault(game => game.Id == id);

            // If FirstOrDefault returned null it means nothing was
            // found so return a 404 to the user
            if (foundGame == null)
            {
                return NotFound();
            }

            // Remove it from the database
            _context.Games.Remove(foundGame);
            _context.SaveChanges();

            // Ok, we updated the game, so let's return the updated value
            return Ok(foundGame);
        }
    }
}
```

## Run the app and work with the API

That wasn't too many changes to convert from managing our list of games in a
`List<>` to now fully managing them in a database. We even retain our list of
games when we shut down our application since our data is _persisted_ in our
local database!

Just like before, try running the app with `dotnet watch run` and send it some
API requests. Create some games, fetch single games, update games, and delete
some games.

## Optimizations

There are some things in this code we could improve. In the next section we'll
talk about:

- Synchronous versus Asynchronous handling of requests. (Yes, our old friends
  async and await are coming back!)
- Refactoring common code
- Optimizing the `Update` method
