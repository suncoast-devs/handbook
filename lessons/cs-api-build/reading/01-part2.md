---
title: Making a full fledged CRUD API for our games
---

We are going to make an API that has the ability to `CRUD` (Create, Read,
Update, and Delete) games. The first thing we should do is design our API to
support all of these and to follow a common convention.

We are going to treat our games as a resource we can manage. The API we are
designing will follow the style of a REST API (see THIS LESSON HERE ON WHAT REST
IS). For now we only need to know:

- Games are data (a resource) we are going to manage
- If an endpoint uses the GET verb we expect the endpoint to return the same
  resource each time and not modify it. NOTE: the data inside may change (e.g.
  we may update the address, or date) but the resource, the Game Night, is still
  the same. When we say "the same resource" we don't mean the contents, but
  rather the concept (the Game Night with ID 1)
- If an endpoint uses POST/PUT/DELETE it will modify the resource in some way.
- POST will modify the "list of all games" resource by adding a new Game.
- PUT will modify a specific game by supplying new values
- DELETE will modify a specific game by removing it from the "list of all games"

Thus we will end up with an API with these endpoints:

| Endpoint           | Purpose                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| GET /games         | Gets a list of all games                                                                                                          |
| GET /games/{id}    | Gets the single specific game given by its id                                                                                     |
| POST /games        | Creates a new game, assigning a new ID for the game. The properties of the game are given as JSON in the BODY of the request      |
| PUT /games/{id}    | Updates the single specific game given by its id. The updated properties of the game are given by JSON in the BODY of the request |
| DELETE /games/{id} | Deletes the specific game given by its id                                                                                         |

> This is a very typical pattern of API for a CRUD style application. These URL
> patterns and VERB combinations are enough of a pattern that we can typically
> make some guesses as to what an API does by only looking at the `URL`+`VERB`
> definition.

## Storing the games

We'll start by adding some static data to our class. The `static` nature of
these variables mean that they will be around for each API request. Every API
request has `dotnet` create a `new` instance of our controller, thus any local
variables are cleared after the request. The `static` variables are part of the
class itself and will last until the program terminates.

We will keep a `List<>` of `Game` objects as well as an `int` to keep track of
the next ID to assign. The `NextID` will be incremented each time we add an item
to the `List<>`. In this way it works similar to how a database `ID` works.

```C#
// A list of all the games we currently know about
static public List<Game> GameList = new List<Game>();

// The next ID to assign
static public int NextID = 1;
```

## `GET /games` endpoint - returns all the games

The endpoint to return the full list of games is:

```C#
// Get all the games
// API: GET /games
[HttpGet]
public ActionResult<IEnumerable<Game>> GetAll()
{
    return Ok(GameList);
}
```

We define the endpoint as `[HttpGet]` without any other URL parts. We also
declare it as `ActionResult<IEnumerable<Game>>`. To break this down we start at
the most inner `<>` and see we are returning `Game` objects. `IEnumerable<Game>`
is just a more generic version of `List<Game>`. We use the more generic type
here in case we decide to change the type of `GameList` in the future to some
other type of container. In general, and unless there is a specific reason
otherwise, we should return the most generic data type we can. Finally we wrap
that in an `ActionResult<>` so we can return objects and status codes.

> `ActionResult<IEnumerable<Game>>` is read as "An HTTP response containing
> status code, headers, and a BODY that is a _collection_ of `Game` objects,
> represented as JSON"

## `GET /games/{id}` endpoint - returns a single game

The method accepts an integer `id` based on the URL. the `[HttpGet("{id})]`
indicates that the base URL `/game` is followed by a `/` and then whatever is
next is converted into an integer.

Then we use LINQ's method `FirstOrDefault` to look through the `GameList` for
any `game` that has the same `Id` as the `id` we were supplied. That code will
go game by game through the list, handing each one to the expression
`game => game.Id == id` and stop when it finds a `game` where that expression is
true. If there is no match it will return `null`. SEE THE LESSON ON LINQ.

If no match is found then we can immediately return a `NotFound` result and
process no further.

Otherwise the method proceeds and we return an `Ok(game)` such that we return a
`200` and the contents of `game`.

```C#
// Get a specific game by ID
// API: GET /games/{id}
[HttpGet("{id}")]
public ActionResult<Game> GetByID(int id)
{
    // Use LINQ to look through our game list to find a game
    // with the specified ID.
    var game = GameList.FirstOrDefault(game => game.Id == id);

    // If FirstOrDefault returned null it means nothing was
    // found so return a 404 to the user
    if (game == null)
    {
        return NotFound();
    }

    // We found a game, so return it
    return Ok(game);
}
```

## `POST /games` - Create a game

We define this method as `[HttpPost]` so this means `POST` to the base URL
`/games`

The method takes a `Game gameToCreate` as an argument. That object is parsed
from the body of the request and put into a `Game` object. The return of
`ActionResult<Game>` indicates we return a single JSON representation of the
created `Game`.

The rest of the method is similar to our previous implementation except for
incrementing and using `NextID`

```C#
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

    // emulate us writing to the database and getting
    // an ID for this new game. If this was a database
    // we would use EF Core to insert the item which
    // would assign it an ID
    gameToCreate.Id = NextID;
    NextID += 1;

    GameList.Add(gameToCreate);

    // Return the created game
    return CreatedAtAction(null, null, gameToCreate);
}
```

## `PUT /games/{id}` - Updating an existing game

To update a specific game we need to indicate a `PUT` verb and that we will be
specifying the `id` on the URL. We use `[HttpPut("{id}")]` to indicate this.

The method takes both an `int` and a `Game gameUpdate` as an argument. The
`int id` comes from the URL processing. The object is parsed from the body of
the request and put into a `Game` object. The return of `ActionResult<Game>`
indicates we return a single JSON representation of the updated `Game`.

The method first uses `FirstOrDefault` similarly to the code to fetch and return
one game. We need to ensure the `id` represented can be found so that we can
modify the corresponding `Game`.

If the `foundGame` is `null` we know that no game with the supplied ID is in our
list so we immediately return a `404 Not Found` and stop the method from
proceeding.

Next we validate the `gameUpdate` according to our validation rules.

We then copy the values from `gameUpdate` to `foundGame` to save away the
updated values. Finally we return `Ok(foundGame)` to return the updated values.

```C#
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
    var foundGame = GameList.FirstOrDefault(game => game.Id == id);

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

    // Copy over the values. If this was a database we would
    // use EF Core to update the record
    foundGame.Host = gameUpdate.Host;
    foundGame.Address = gameUpdate.Address;
    foundGame.When = gameUpdate.When;
    foundGame.MinimumPlayers = gameUpdate.MinimumPlayers;
    foundGame.MaximumPlayers = gameUpdate.MaximumPlayers;

    // Ok, we updated the game, so let's return the updated value
    return Ok(foundGame);
}
```

## `DELETE /games/{id}` - Delete a game

Finally we have a method to remove a game. The endpoint uses the `DELETE` verb
and provides the `id` as part of the URL. We specify `[HttpDelete("id")]` to
indicate this. The method receives the `int id` as an argument and returns an
`ActionResult<Game>` to indicate that we'll return a copy of the deleted
`Game`'s data.

Similar to retrieving or updating a single game we first use `FirstOrDefault` to
seek a game with that `id`. Similarly if nothing was found we return a
`404 Not Found` error. If something _is_ found then we call `Remove` on the list
to remove the item from the list. Finally we return `Ok(foundGame)` to send a
`200` response with the contents of the now deleted `Game`.

```C#
// Remove a game
// API: DELETE /games/{id}
[HttpDelete("{id}")]
public ActionResult<Game> Delete(int id)
{
    // Use LINQ to look through our game list to find a game
    // with the specified ID.
    var foundGame = GameList.FirstOrDefault(game => game.Id == id);

    // If FirstOrDefault returned null it means nothing was
    // found so return a 404 to the user
    if (foundGame == null)
    {
        return NotFound();
    }

    // Remove it from the list. If this was a database we would
    // use EF Core to remove the item from the table
    GameList.Remove(foundGame);

    // Ok, we updated the game, so let's return the updated value
    return Ok(foundGame);
}
```

## Full Code

```C#
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace BasicApi.Controllers
{
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

    [ApiController]
    [Route("[controller]")]
    public class GamesController : ControllerBase
    {
        // A list of all the games we currently know about
        static public List<Game> GameList = new List<Game>();

        // The next ID to assign
        static public int NextID = 1;

        // Get all the games
        // API: GET /games
        [HttpGet]
        public ActionResult<IEnumerable<Game>> GetAll()
        {
            return Ok(GameList);
        }

        // Get a specific game by ID
        // API: GET /games/{id}
        [HttpGet("{id}")]
        public ActionResult<Game> GetByID(int id)
        {
            // Use LINQ to look through our game list to find a game
            // with the specified ID.
            var game = GameList.FirstOrDefault(game => game.Id == id);

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

            // emulate us writing to the database and getting
            // an ID for this new game. If this was a database
            // we would use EF Core to insert the item which
            // would assign it an ID
            gameToCreate.Id = NextID;
            NextID += 1;

            GameList.Add(gameToCreate);

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
            var foundGame = GameList.FirstOrDefault(game => game.Id == id);

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

            // Copy over the values. If this was a database we would
            // use EF Core to update the record
            foundGame.Host = gameUpdate.Host;
            foundGame.Address = gameUpdate.Address;
            foundGame.When = gameUpdate.When;
            foundGame.MinimumPlayers = gameUpdate.MinimumPlayers;
            foundGame.MaximumPlayers = gameUpdate.MaximumPlayers;

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
            var foundGame = GameList.FirstOrDefault(game => game.Id == id);

            // If FirstOrDefault returned null it means nothing was
            // found so return a 404 to the user
            if (foundGame == null)
            {
                return NotFound();
            }

            // Remove it from the list. If this was a database we would
            // use EF Core to remove the item from the table
            GameList.Remove(foundGame);

            // Ok, we updated the game, so let's return the updated value
            return Ok(foundGame);
        }
    }
}
```

## Try it out!

Run the app and then use Insomnia to send various requests to your application.
Here are some things to try:

- Create a few games
- Fetch a list of all the games
- Fetch one or more of them individually by their `id`s
- Update an attribute of an existing `Game`
- Delete a game

You will notice that the system will keep track of all the games until one of
two things happen:

- You quit the `dotnet watch run`
- You make a code change which causes `dotnet watch run` to reload your code.

Up next we create a full fledged API with a database backend. You'll see that we
will retain a lot of our `GameController` and `Game` class code but with some
new code and organization.
