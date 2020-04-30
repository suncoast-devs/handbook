# Refactors

In this section we will refactor the code for these improvements:

- Synchronous versus Asynchronous handling of requests. (Yes, our old friends async and await are coming back!)
- Refactoring common code
- Optimizing the `Update` method

## Common Code

We have repeated the finding of a single `Game` in multiple places. So lets extract that to a single method:

```C#
// Find a Game with the given id, return null if not found
protected Game FindGameById(int id)
{
    return _context.Games.FirstOrDefault(game => game.Id == id);
}
```

Then in all the places where we were calling `FirstOrDefault` we can change to use our new method. This code would be `var foundGame = await FindGameById(id);`

This change can be made in all of the functions that use this patter.

## Updating the Update method

The current `Update` method has to find the existing record in the database and then copy in new properties. Since we send all the properties anyway we could also require the `id` property and thus we will always have all the fields. This means that we could just use this object to save to the database.

We also add an extra check that the `id` in the URL matches the `Id` in the object we parse from the body.

The resulting code is:

```C#
[HttpPut("{id}")]
public ActionResult<Game> Update(int id, Game gameToUpdate)
{
    // If the ID in the URL doesn't match the Id in the BODY, return a BadRequest
    if (id != gameToUpdate.Id)
    {
        var errorMessage = new { message = $"The id in the URL ({id}) doesn't match the id in the body ({gameToUpdate.Id})" };
        return BadRequest(errorMessage);
    }

    if (gameToUpdate.MinimumPlayers < 2)
    {
        // Make a generic object containing just a message property
        var errorMessage = new { message = $"You only requested {gameToUpdate.MinimumPlayers} but we need at least 2." };

        // Return a 422 error and supply a nice message
        return UnprocessableEntity(errorMessage);
    }

    if (gameToUpdate.MaximumPlayers > 20)
    {
        // Make a generic object containing just a message property
        var errorMessage = new { message = $"You requested {gameToUpdate.MaximumPlayers} but we can only support up to 20" };

        // Return a 422 error and supply a nice message
        return UnprocessableEntity(errorMessage);
    }

    if (gameToUpdate.MaximumPlayers < gameToUpdate.MinimumPlayers)
    {
        // Make a generic object containing just a message property
        var errorMessage = new { message = $"Ooops, you specified a maximum number of players that is less than the minimum number" };

        // Return a 422 error and supply a nice message
        return UnprocessableEntity(errorMessage);
    }

    _context.Entry(gameToUpdate).State = EntityState.Modified;
    _context.SaveChangesAsync();

    // Ok, we updated the game, so let's return the updated value
    return Ok(gameToUpdate);
}
```

## Async versus sync - optimizing our code

The code in our methods accesses the database at least once, and perhaps more than once. Each of these database accesses can be relatively slow. Also the `GetAll` method would require us to fetch all the `Game` entries before we started processing them.

With only one user accessing our code we would not see an impact for these synchronous calls. However, when we start adding more users we may start to see some requests _queueing_ and waiting. Luckily this is an easy thing to fix.

Let's look at `GetAll`

```C#
[HttpGet]
public ActionResult<IEnumerable<Game>> GetAll()
{
    return Ok(_context.Games);
}
```

The first thing we will do is extract out a variable to store the games and we will make a call to `ToList`

```C#
[HttpGet]
public ActionResult<IEnumerable<Game>> GetAll()
{
    var games = _context.Games.ToList();

    return Ok(games);
}
```

To make this asynchronous we do a few steps:

1. Add `async` to the method definition
2. Wrap the result in a `Task<>` to allow the code that calls our controller to wait on the data.
3. Use `await` and `ToListAsync` to the implementation.

```C#
[HttpGet]
public async Task<ActionResult<IEnumerable<Game>>> GetAll()
{
    var games = await _context.Games.ToListAsync();

    return Ok(games);
}
```

This code allows the system to process multiple requests while some of the complex actions such as fetching data from the database to happen in the background.

The same changes are made to other methods, including changing `SaveChanges` to `SaveChangesAsync` and `FirstOrDefault` to `FirstOrDefaultAsync`.

## Optimized code

Here is the code with all the changes applied.

```C#
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task<ActionResult<IEnumerable<Game>>> GetAll()
        {
            var games = await _context.Games.ToListAsync();

            return Ok(games);
        }

        // Get a specific game by ID
        // API: GET /games/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetByID(int id)
        {
            // Use LINQ to look through our game list to find a game
            // with the specified ID.
            var game = await FindGameById(id);

            // If FindGameById returned null it means nothing was
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
        public async Task<ActionResult<Game>> Create(Game gameToCreate)
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
            await _context.SaveChangesAsync();

            // Return the created game
            return CreatedAtAction(null, null, gameToCreate);
        }

        // Find a Game with the given id, return null if not found
        protected async Task<Game> FindGameById(int id)
        {
            return await _context.Games.FirstOrDefaultAsync(game => game.Id == id);
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
        public async Task<ActionResult<Game>> Update(int id, Game gameToUpdate)
        {
            // If the ID in the URL doesn't match the Id in the BODY, return a BadRequest
            if (id != gameToUpdate.Id)
            {
                var errorMessage = new { message = $"The id in the URL ({id}) doesn't match the id in the body ({gameToUpdate.Id})" };
                return BadRequest(errorMessage);
            }

            if (gameToUpdate.MinimumPlayers < 2)
            {
                // Make a generic object containing just a message property
                var errorMessage = new { message = $"You only requested {gameToUpdate.MinimumPlayers} but we need at least 2." };

                // Return a 422 error and supply a nice message
                return UnprocessableEntity(errorMessage);
            }

            if (gameToUpdate.MaximumPlayers > 20)
            {
                // Make a generic object containing just a message property
                var errorMessage = new { message = $"You requested {gameToUpdate.MaximumPlayers} but we can only support up to 20" };

                // Return a 422 error and supply a nice message
                return UnprocessableEntity(errorMessage);
            }

            if (gameToUpdate.MaximumPlayers < gameToUpdate.MinimumPlayers)
            {
                // Make a generic object containing just a message property
                var errorMessage = new { message = $"Ooops, you specified a maximum number of players that is less than the minimum number" };

                // Return a 422 error and supply a nice message
                return UnprocessableEntity(errorMessage);
            }

            _context.Entry(gameToUpdate).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            // Ok, we updated the game, so let's return the updated value
            return Ok(gameToUpdate);
        }

        // Remove a game
        // API: DELETE /games/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<Game>> Delete(int id)
        {
            // Use LINQ to look through our game list to find a game
            // with the specified ID.
            var foundGame = await FindGameById(id);

            // If FindGameById returned null it means nothing was
            // found so return a 404 to the user
            if (foundGame == null)
            {
                return NotFound();
            }

            // Remove it from the database
            _context.Games.Remove(foundGame);
            await _context.SaveChangesAsync();

            // Ok, we updated the game, so let's return the updated value
            return Ok(foundGame);
        }
    }
}
```
