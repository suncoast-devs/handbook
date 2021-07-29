---
title: CRUD based APIs
order: 1
---

In the [lesson on API Servers](/lessons/cs-api-servers) we saw how to create an
API server. However, an API server that cannot perform the actions of a CRUD
(Create, Read, Update, and Delete) style system isn't as valuable for us. In
this lesson, we will build an application to keep track of our game nights!

# Game Night

Let us create an API to manage our game nights. When creating a game night, we'd
like to track the name of the game we will play, the name of the person hosting
the event, their address, the date and time the game will start, and the minimum
and the maximum number of people the game can support.

## API Definition

We are going to make an API that can `CRUD` (Create, Read, Update, and Delete)
games. The first thing we should do is design our API to support all of these
and to follow a standard convention.

We are going to treat our games as a resource we can manage. We will follow
these guidelines while building our API:

- GameNight is the model we are going to manage
- If an endpoint uses the GET verb, we expect the endpoint to return the same
  resource each time and not modify it. NOTE: the data inside may change (e.g.
  we may update the address or date) but the resource, the GameNight, is still
  the same. When we say "the same resource" we don't mean the contents, but
  rather the concept (the GameNight with ID 1)
- If an endpoint uses POST/PUT/DELETE it will modify the resource in some way.
- POST will modify the "list of all game nights" resource by adding a new
  GameNight.
- PUT will modify a specific game by supplying new values
- DELETE will modify a specific game night by removing it from the "list of all
  game nights"

Thus we will end up with an API with these endpoints:

| Endpoint                | Purpose                                                                                                                           |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| GET /GameNights         | Gets a list of all games                                                                                                          |
| GET /GameNights/{id}    | Gets the single specific game given by its id                                                                                     |
| POST /GameNights        | Creates a new game, assigning a new ID for the game. The properties of the game are given as JSON in the BODY of the request      |
| PUT /GameNights/{id}    | Updates the single specific game given by its id. The updated properties of the game are given by JSON in the BODY of the request |
| DELETE /GameNights/{id} | Deletes the specific game given by its id                                                                                         |

> This is a very typical pattern of API for a CRUD-style application. These URL
> patterns and VERB combinations are enough of a pattern that we can typically
> make some guesses as to what an API does by only looking at the `URL`+`VERB`
> definition.

## Creating Our Application

In this section we will expand on our previous code to build a complete
Database + API application. Quite a lot of the previous code will be used here
since managing a `List<>` is very similar to managing a `DbSet` from EF Core
thanks to LINQ.

If you have not yet followed the [lesson on SQL](/lessons/sql-intro),
[lesson on SQL joins](/lessons/sql-joins), and the
[lesson on EF Core](/lessons/cs-object-relational-mapping) we suggest you study
those lessons.

For this application, we are going to use a new template. This template should
have been added to your environment in the
[lesson on computer setup](/lessons/cs-environment-setup).

## Introducing a new template: sdg-api

To generate an app with API and database support:

```shell
dotnet new sdg-api -o GameNightWithFriends
```

This command will create a folder `GameNightWithFriends` with a template of an
application that will connect to a database as well as support API controllers.

## Generating an ERD

Our ERD for this application is simple since it is only dealing with a single
entity: a `GameNight`

```
+-------------------------+
|         GameNight       |
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

## Generating our database and our tables

We can use a feature of `Entity Framework` we may not have used yet:
`Migrations`

For more details on migrations you can see
[this lesson](/lessons/cs-object-relational-mapping/next-level).

As a quick summary, `Migrations` are the ability for `EF` to detect changes to
our `C#` models and _automatically_ generate the required SQL to change the
definition of the database.

This is the idea of `Code First` database modeling. What we had done before,
creating our tables manually in `SQL` was considered `Database First`.

To use Migrations, the first thing we do is define our model. We will create the
`GameNight.cs` file and define all the fields we want. Notice they match the
same definitions from our `ERD` above. Now we are going to place our database
model files in their proper directory. Open the `Models` folder and add a file
`GameNight.cs`, and place the code inside.

```csharp
public class GameNight
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

## Next step, inform our `DatabaseContext` of this model

In our [lesson on ef core](/lessons/cs-object-relational-mapping) we didn't have
a separate file for our `DatabaseContext` however, in most apps, it lives in
its own file, and you will find it in the `Models` folder here as well.

After this code:

```csharp
public partial class DatabaseContext : DbContext
{
```

add this statement to let the `DatabaseContext` know we want to track
`GameNight` in a `GameNights` table:

```csharp
public partial class DatabaseContext : DbContext
{
    public DbSet<GameNight> GameNights { get; set; }
```

## Next up: generate a migration

> NOTE: Any time we change the **properties** of a _model_ **OR** we create a
> **new** model we must generate a _Database Migration_ and _update_ our
> database.

Since we just added a new model, we need to create a migration.

"`shell dotnet ef migrations add AddGameNights

```shell
dotnet ef migrations add AddGameNights
```

> NOTE: The name of our migration should attempt to capture the database
> structure change we are making. In this case we are `Adding the GameNights`
> table.

## Next up: ensure your migration is good

You should have at least two new files in `Migrations`, one ending in
`_AddGameNights.cs`. Open that file and ensure the `Up` method has the expected
results:

```csharp
protected override void Up(MigrationBuilder migrationBuilder)
{
    migrationBuilder.CreateTable(
        name: "GameNights",
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
            table.PrimaryKey("PK_GameNights", x => x.Id);
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

In addition to the magic of `Migrations`, we are also going to add a new tool to
our toolkit: `aspnet-codegenerator`

`aspnet-codegenerator` is a tool that can generate a default controller for us
that will have a very standard set of code for:

- Reading a complete list of our models
- Reading a single instance of our model by ID
- Creating a model
- Updating a model
- Deleting a model

In this case, our model is our `GameNight`. This code generator produces much of
the `boilerplate` code that we normally have to write by hand. Often we will
have to update this code when our particular requirements change.

To run the code generator:

```shell
dotnet aspnet-codegenerator controller --model GameNight -name GameNightsController --useAsyncActions -api --dataContext DatabaseContext --relativeFolderPath Controllers
```

Let's look at the various options:

- The first option `controller`, says we want to make a controller.
- The second option, `--model GameNight` indicates which model will be used in
  this controller.
- The third option, `--name GameNightsController` indicates the name of the
  controller. Notice it is a plural version of the singular model name.
- The fourth option `--useAsyncActions` indicates we prefer to code with async
  style code.
- The fifth option, `-api` indicates we are generating API style controllers.
  There are different styles of controllers we will not cover in this course.
- The sixth option `--dataContext DatabaseContext` is the name of our context
  class.
- the seventh option `---relativeFolderPath controllers` is the directory where
  our controllers will be stored.

With this we generate a file `controllers/GameNightsController.cs` which we will
review next.

## GameNightsController.cs

Here is the entirety of the `GameNightsController.cs` that we will be breaking
down.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameNightWithFriends.Models;

namespace GameNightWithFriends.Controllers
{
    // All of these routes will be at the base URL:     /api/GameNights
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case GameNightsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class GameNightsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that receives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public GameNightsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/GameNights
        //
        // Returns a list of all your GameNights
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameNight>>> GetGameNights()
        {
            // Uses the database context in `_context` to request all of the GameNights and
            // return them as a JSON array.
            return await _context.GameNights.ToListAsync();
        }

        // GET: api/GameNights/5
        //
        // Fetches and returns a specific game night by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<GameNight>> GetGameNight(int id)
        {
            // Find the game night in the database using `FindAsync` to look it up by id
            var gameNight = await _context.GameNights.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (gameNight == null)
            {
                // Return a `404` response to the client indicating we could not find a game night with this id
                return NotFound();
            }

            //  Return the game night as a JSON object.
            return gameNight;
        }

        // PUT: api/GameNights/5
        //
        // Update an individual game night with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a GameNight
        // variable named game night. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our GameNight POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGameNight(int id, GameNight gameNight)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != gameNight.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in game night to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from game night
            _context.Entry(gameNight).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!GameNightExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the updated data.
            //
            // return Ok(gameNight)
            //
            return NoContent();
        }

        // POST: api/GameNights
        //
        // Creates a new game night in the database.
        //
        // The `body` of the request is parsed and then made available to us as a GameNight
        // variable named game night. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our GameNight POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<GameNight>> PostGameNight(GameNight gameNight)
        {
            // Indicate to the database context we want to add this new record
            _context.GameNights.Add(gameNight);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetGameNight", new { id = gameNight.Id }, gameNight);
        }

        // DELETE: api/GameNights/5
        //
        // Deletes an individual game night with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGameNight(int id)
        {
            // Find this game night by looking for the specific id
            var gameNight = await _context.GameNights.FindAsync(id);
            if (gameNight == null)
            {
                // There wasn't a game night with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.GameNights.Remove(gameNight);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the deleted data.
            //
            // return Ok(gameNight)
            //
            return NoContent();
        }

        // Private helper method that looks up an existing game night by the supplied id
        private bool GameNightExists(int id)
        {
            return _context.GameNights.Any(gameNight => gameNight.Id == id);
        }
    }
}
```

### Breaking down the controller code

#### Routes

Starting at the top we see:

```csharp
// All of these routes will be at the base URL:     /api/GameNights
// That is what "api/[controller]" means below. It uses the name of the controller
// in this case GameNightsController to determine the URL
[Route("api/[controller]")]
[ApiController]
public class GameNightsController : ControllerBase
```

This defines that our API will be contained within the URL `api/GameNights`.

#### Database Context

Next up we see:

```csharp
// This is the variable you use to have access to your database
private readonly DatabaseContext _context;
```

This declares a private (can't be seen outside of this class) readonly (can't be
changed) database context named `_context`. This property of the controller will
be supplied each time a request is made. The way this is supplied is through
`Dependency Injection` with the `constructor`

#### Constructor

The constructor for our controller is called for each API request. It is also
supplied a database context that is setup to access our database. Inside the
constructor we simply "save a copy" of the context for our later use.

```
// Constructor that receives a reference to your database context
// and stores it in _context for you to use in your API methods
public GameNightsController(DatabaseContext context)
{
    _context = context;
}
```

#### GET /api/GameNights -- get all the game nights

This code defines a GET method at the URL `/api/GameNights`. The method
indicates that it returns a list of `GameNight` through this return type:

`Task<ActionResult<IEnumerable<GameNight>>>`

The `Task<>` indicates that this API request can be handled asynchronously.

The `ActionResult<>` indicates that the result will have data, and a status
code, and other API related response data.

Lastly, `IEnumerable<GameNight>` is a more generic version of `List<GameNight>`
meaning we return some kind of collection of `GameNight` objects.

The code inside the method simply asks the `context` for the set of `GameNight`s
and returns them as a `List` to be generated via async. (`ToListAsync`)

The effect is that if we ask the API for `/api/GameNights` we will get a JSON
formatted list of all the `GameNight` objects in our database.

```csharp
// GET: api/GameNights
//
// Returns a list of all your GameNights
//
[HttpGet]
public async Task<ActionResult<IEnumerable<GameNight>>> GetGameNights()
{
    // Uses the database context in `_context` to request all of the GameNights and
    // return them as a JSON array.
    return await _context.GameNights.ToListAsync();
}
```

#### GET /api/GameNights/42 -- get a specific GameNight

This method uses the same base url of `/api/GameNights` but adds on one
parameter of the `{id}` of the game night we are looking for.

We then use `FindAsync` to find this `GameNight` by looking for it by ID.

If the returned value is `null` we simply return a `NotFound` response.

If we do find a value we return that value as the JSON formatted response.

The return value of the function `Task<ActionResult<GameNight>>` indicates that
this is an async function that returns a result of a `GameNight` including any
possible response codes, such as returning a `NotFound` resulting in a 404 code.

```csharp
// GET: api/GameNights/5
//
// Fetches and returns a specific game night by finding it by id. The id is specified in the
// URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
// to grab the id from the URL. It is then made available to us as the `id` argument to the method.
//
[HttpGet("{id}")]
public async Task<ActionResult<GameNight>> GetGameNight(int id)
{
    // Find the game night in the database using `FindAsync` to look it up by id
    var gameNight = await _context.GameNights.FindAsync(id);

    // If we didn't find anything, we receive a `null` in return
    if (gameNight == null)
    {
        // Return a `404` response to the client indicating we could not find a game night with this id
        return NotFound();
    }

    //  Return the game night as a JSON object.
    return gameNight;
}
```

#### PUT api/GameNights/42 -- Update an existing GameNight found by id

This API endpoint is much like the `GET` however with a `PUT` we are indicating
we are updating an existing `GameNight` by ID.

Notice that the parameters to the method include both the `int id` we get from
the `[HttpPut("{id})]` but also a `GameNight gameNight`. The
`GameNight gameNight` argument will be a variable, of type `GameNight` that is
parsed from deserializing the _body_ of the request as the JSON representation
of a `GameNight`.

The very first thing that happens is we ensure that the `id` specified on the
command line matches the `id` in the body. If they do not match, we return an
error code that this is a `BadRequest()`

Next up we take the `gameNight` we parsed from the body and tell the context
that this is a modified gameNight. We can do this since we have provided _all_
the attributes of a `GameNight` in the body.

We attempt to `SaveChangesAsync` to the database. If for some reason, when we
attempt to save the game night, it does not already exist in the database, we
return a `NotFound` message, otherwise we re-throw the error so our client can
see what happened.

Finally, if there is no error, we simply return a `NoContent()` (204) successful
response. If the client would like the entire updated object returned to it, we
could `return Ok(gameNight)` to return the JSON version of the updated
`GameNight`

```csharp
// PUT: api/GameNights/5
[HttpPut("{id}")]
public async Task<IActionResult> PutGameNight(int id, GameNight gameNight)
{
    // If the ID in the URL does not match the ID in the supplied request body, return a bad request
    if (id != gameNight.Id)
    {
        return BadRequest();
    }

    // Tell the database to consider everything in game night to be _updated_ values. When
    // the save happens the database will _replace_ the values in the database with the ones from gameNight
    _context.Entry(gameNight).State = EntityState.Modified;

    try
    {
        // Try to save these changes.
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        // Ooops, looks like there was an error, so check to see if the record we were
        // updating no longer exists.
        if (!GameNightExists(id))
        {
            // If the record we tried to update was already deleted by someone else,
            // return a `404` not found
            return NotFound();
        }
        else
        {
            // Otherwise throw the error back, which will cause the request to fail
            // and generate an error to the client.
            throw;
        }
    }

    // return NoContent to indicate the update was done. Alternatively you can use the
    // following to send back a copy of the updated data.
    //
    // return Ok(gameNight)
    //
    return NoContent();
}
```

#### POST /api/GameNights - Creating a new game

This URL, when called with a `POST` will create a new game night.

In the arguments to the function we see that we supply the JSON representation
of a `GameNight` in the `POST` body. This will be deserialized into a
`GameNight` object containing the information we wish to add.

We simply need to add this game night to our context and tell our context to
save changes.

We then use
`CreatedAtAction("GetGameNight", new {id = gameNight.Id }, gameNight)` to return
a `201` (Created) code with the response body of the newly saved `GameNight`.

```csharp
// POST: api/GameNights
[HttpPost]
public async Task<ActionResult<GameNight>> PostGameNight(GameNight gameNight)
{
    // Indicate to the database context we want to add this new record
    _context.GameNights.Add(gameNight);
    await _context.SaveChangesAsync();

    // Return a response that indicates the object was created (status code `201`) and some additional
    // headers with details of the newly created object.
    return CreatedAtAction("GetGameNight", new { id = gameNight.Id }, gameNight);
}
```

#### DELETE /api/GameNights/42 -- Delete a game night given its ID

First we attempt to find the given game night in the database. If not found we
simply return a `404` (NotFound) message.

If we have found the game night, we call `_context.Remove(gameNight)` to tell
the context we are deleting this gameNight.

We follow this with a `SaveChanges` to cause the deletion to happen and then we
return a `204` (NoContent) response. Again we could return the JSON content of
the deleted game night by changing the return code to `return Ok(gameNight)`

```csharp
// DELETE: api/GameNights/5
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteGameNight(int id)
{
    // Find this game night by looking for the specific id
    var gameNight = await _context.GameNights.FindAsync(id);
    if (gameNight == null)
    {
        // There wasn't a game night with that id so return a `404` not found
        return NotFound();
    }

    // Tell the database we want to remove this record
    _context.GameNights.Remove(gameNight);

    // Tell the database to perform the deletion
    await _context.SaveChangesAsync();

    // return NoContent to indicate the update was done. Alternatively you can use the
    // following to send back a copy of the deleted data.
    //
    // return Ok(gameNight)
    //
    return NoContent();
}
```

### Checking for valid data

Our Game Nights wouldn't be fun without fellow players. Let's add a validation to
ensure at least two players are present at each game night.

To add this validation we'll update the methods that create and update a
`GameNight`. We'd like to reject any request that has a `MinimumPlayers` less
than `2`.

We'll add the following code after the check of the `id` in `PutGameNight` _AND_
to the _beginning_ of the `PostGameNight` method.

```csharp
// Add a check to make sure we have enough players.
if (gameNight.MinimumPlayers < 2)
{
    return BadRequest(new { Message = "You need at least 2 players!" });
}
```

This will return an error code (and message) indicating that this request was
rejected.

Let's also add a requirement that we cannot _delete_ a game night that has
already happened. In this case we'll be updating the `DeleteGameNight` method to
add code that compares `gameNight.When` to `DateTime.Now`

```csharp
if (gameNight.When < DateTime.Now)
{
    return BadRequest();
}
```

### Working with associated data

Our Game Night app is a success! Now we want to update it to keep track of data
of the players that attended each game night.

## Adding a new Player Model

We'll start by adding a model to track this information.

```csharp
namespace GameNightWithFriends.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int GameNightId { get; set; }
        public GameNight GameNight { get; set; }
    }
}
```

And add the information to our `Database Context`

```csharp
public DbSet<Player> Players { get; set; }
```

## Creating a whole new controller versus a nested/additional method on a current controller

There are several approaches to allowing our code to track the related players
to a GameNight. The first pass would be to create a new controller that focused
on managing the `Player` model. The user would supply, for each created player
the `GameNightId` along with the details about the player (their `Name`).

We could also simply add a method to the existing `GameNightsController` if all
we wanted to do was allow for associating the players. In this case we simply
need a `Create` style action.

To add such an action to our existing controller we'll add a method on our own.

```csharp
// Adding Players to a game night
// POST /api/GameNights/5/Players
[HttpPost("{id}/Players")]
public async Task<ActionResult<Player>> CreatePlayerForGameNight(int id, Player player)
//                                       |       |
//                                       |       Player deserialized from JSON from the body
//                                       |
//                                       GameNight ID comes from the URL
```

This is a `POST` style action which typically indicates the creation of data.
Then we ensure the game night's `id` is present in the URL. We then place a
`/Players` behind it such that the URL becomes `POST 42/Players` to create a
player for the `GameNight` with `Id` of `42`.

We'll name this method `CreatePlayerForGameNight` and see that the arguments to
the method indicate we'll be deserializing a `Player` object from the `body`
which we will name the variable `player`. The method also returns the newly
created `Player` object.

Here is the implementation of this method:

```csharp
// Adding Players to a game night
// POST /api/GameNights/5/Players
[HttpPost("{id}/Players")]
public async Task<ActionResult<Player>> CreatePlayerForGameNight(int id, Player player)
//                                       |       |
//                                       |       Player deserialized from JSON from the body
//                                       |
//                                       Game Night ID comes from the URL
{
    // First, let's find the game night (by using the ID)
    var gameNight = await _context.GameNights.FindAsync(id);

    // If the game night doesn't exist: return a 404 Not found.
    if (gameNight == null)
    {
        // Return a `404` response to the client indicating we could not find a game night with this id
        return NotFound();
    }

    // Associate the player to the given game night.
    player.GameNightId = gameNight.Id;

    // Add the player to the database
    _context.Players.Add(player);
    await _context.SaveChangesAsync();

    // Return the new player to the response of the API
    return Ok(player);
}
```
