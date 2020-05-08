---
title: Introducing a new dotnet template
---

In other lessons we have used `dotnet new console` to create our application
that run in the terminal. Now we will be using a different template, one that
configures our code to interact with HTTP clients.

```shell
dotnet new webapi -o BasicAPI
```

You will notice more files in this project than we are familiar with from our
`console` template.

```
appsettings.Development.json
appsettings.json
BasicAPI.csproj
Program.cs
Startup.cs
WeatherForecast.cs
Controllers/WeatherForecastController.cs
Properties/launchSettings.json
```

Let's review the new files we see

### appsettings.json and appsettings.Development.json

These files configure certain features such as logging (we'll talk more about
logging later) and which hosts (computers) are allowed to connect.

### Startup.cs

This file controls the startup of the part of our system that handles receiving
requests from clients and sending results. Lets walk through the code and
discuss all the important pieces.

In the code below we've taken the included `Startup.cs` and added documentation
about each line and it's purpose.

> NOTE: You won't have to edit this code often, but you may update it as we add
> new libraries and capabilities to our system.

```csharp
namespace BasicApi
{
    public class Startup
    {
        // When the system starts up, we will be given a configuration variable.
        // we will save this in a property named `Configuration`
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // Where we store our program's configuration
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Our application will use controllers
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // If we are in development
            if (env.IsDevelopment())
            {
                // Use a friendly error page that helps the developer.
                // We wouldn't want this in production since it might
                // give away code secrets.
                app.UseDeveloperExceptionPage();
            }

            // Ensure any un-encrypted (http) requests are redirected to secure (https)
            app.UseHttpsRedirection();

            // Use routing to determine which endpoints are handled by which controllers and methods
            app.UseRouting();

            // Enable the use of user authorization if we want to use that.
            app.UseAuthorization();

            // Hook up our endpoints (URLs) to the controllers and methods that handle them.
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
```

### Properties/launchSettings.json

This file configures how our application is started in different environments
and by different web hosts. This file will also not be updated often by us. We
might update it if we need to support a different hosting environment.

### WeatherForecast.cs

This is a class that represents weather information. It is a POCO (Plain Old
Csharp Object) and is included for an example

### Controllers/WeatherForecastController.cs

This is a _controller_ used to respond to requests. We'll be talking more about
controllers soon.

## Writing our first API

The template generates a sample controller and a class to use with it. We'll be
building up to a similar example, so lets remove those files by deleting them.
In VS Code we can right click and remove the files, or use `rm` command to
delete them.

The simplest of all applications is the `Hello, World` app. Let's make an API
that if you send a `GET` to `/helloworld` we will get back the text
`Hello, World.`

Here is one of the first conventions we are going to see for building APIs. When
we are building an endpoint, in this case `/helloworld` we are going to make a
special class containing code to handle those requests. That class is known as a
`Controller`. The purpose of a `Controller` is to indicate to .NET which `URL`s
this code handles and which combination of URL and VERB should be handled by
what method.

Think of the `Controller` like a traffic officer. When requests come in, .NET
looks to the controllers to tell it which direction to send the request, to
which method the request should go to. We are going to refer this as `Routing`

Since this endpoint is `/helloworld` we are going to create a file
`Controllers/HelloWorldController.cs`. Inside that file we will define this
code:

```
namespace BasicApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HelloWorldController : ControllerBase
    {
        [HttpGet]
        public string SayHello()
        {
            return "Hello, World.";
        }
    }
}
```

Quite a lot of this code will look familiar, but there are some new ideas.

The first we see is that our controller is a child class, that is, it has a
parent class of `ControllerBase`. This is because much of the common code is
created for us and implemented in the `ControllerBase`. All of our controller
code will have `ControllerBase` as a parent.

Next up are two attributes on our controller. `[ApiController]` tells .NET that
this class is a controller and should be considered when looking for controllers
to handle web requests.

Next is `[Route("[controller]")]`. This attribute tells the _routing_ system
which URLs this code handles. Remember that we said we were following a
convention, that `/helloworld` should be handled by the HelloWorldController?
Inside the `"...."` is the first part of the URL. We could have written
`Route("/helloworld")]`, however we named the controller `HelloWorldController`
and the `[controller]` part of that route means: _Take the name of this
controller, remove the Controller from the name and use the rest as the part of
the URL._ So `[Route("[controller]")]` on `PeopleController` would indicate the
URLs all start with `/people` and if this was the `CarsController` the URLs
would all start with `/cars`.

We are going to use this convention as much as possible across our code.

The next attribute is `[HttpGet]` in front of our `SayHello` method. This
attribute says that if we receive a `GET` request (and no other part of the URL
beyond `/helloworld`) this is the method to call when we receive `GET` on
`/helloworld`.

Notice that the **NAME** of the method does not matter to the _routing_ but it
will have meaning to us. We'll review some conventions to follow later.

## Implementing the endpoing handling method

```csharp
public string SayHello()
{
    return "Hello, World.";
}
```

In creating our API handling method we say that we are returning a `string` and
then just `return "Hello, World.";` as the content to send back. Pretty simple!
We'll be increasing the complexity of these methods, but things don't get too
complicated.

## Running out API

So with all of that if we run our code with `dotnet watch run` we will see that
dotnet is running our application and suggests a starting URL for us.

```
watch : Started
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: https://localhost:5001
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
```

Notice that we can use `http://localhost:5000` or `https://localhost:5001`. If
we use `http://localhost:5000` we will be redirected to the `https` version.

If you open the `Insomnia` API testing tool, create a new request, and send a
`GET` request to `https://localhost:5001`. You will see something like this:

![](./assets/hello-world-get.png)

If we peek at the `Header` tab you will see the `Content-Type` is `text/plain`.
This is because our API method is just returning a simple string, which .NET
will represent as `text/plain`.

## Making our response more dynamic.

If we want to see different data coming back for each request, lets include the
current date and time in the greeting.

We change the implemention of the method to:

```csharp
[HttpGet]
public string SayHello()
{
    return $"Hello, World. It is currently {DateTime.Now}";
}
```

Now the string being returned is dynamic. Each time the _router_ receives a
request to `/helloworld` and `GET` it runs our `SayHello` method, makes a new
string this time containing the current date and time, and returns that to our
client.

Try your request in `Insomnia` again and we'll see a different string returned
each time.

## Accepting input

When we were review APIs we said that APIs need to handle a few questions, the
first was:

- What is the input that needs to be sent?

We also said that one way we can send information to an API is via the idea of
`query parameters` in our URL. These are parts of the URL after a `?` and are
key-value pairs separated by `=` signs.

Lets modify our code so that we require a name and we use that name in our
greeting. Our requests will now look like `/helloworld?who=Sandy`.

To indicate that we want to look at the query parameters and look for a key
named `who` we simply add an argument to our method and name it `who`. We make
it a `string` so we will receive the text value of the key-value pair, `Sandy`
in our example.

```csharp
[HttpGet]
public string Get(string who)
{
    return $"Hello, {who}. It is currently {DateTime.Now}";
}
```

If you use the URL `https://localhost:5001/helloworld?who=Paula` you will
receive back the message `Hello, Paula. It is currently 4/28/2020 10:15:30 PM`
(except you'll see the current time).

What if we left out the query parameter and just sent
`https://localhost:5001/helloworld`. In this case there won't be any `who` to
supply, so .NET will fill that value with the default value for the type, in
this case `null`. We can handle that case and put back our default text of
`World` so we see `Hello, World`.

```csharp
[HttpGet]
public string Get(string who)
{
    string whoOrWorld;

    if (who == null)
    {
      whoOrWorld = "World";
    } else {
      whoOrWorld = who;
    }

    return $"Hello, {whoOrWorld}. It is currently {DateTime.Now}";
}
```

Now our code is more resilient and will handle the case where the user does not
specify a `who`.

## Taking it up a notch

The other way we discussed giving information to an API was as part of the URL
itself.

Lets make an API for rolling die. We will start with making and endpoint
`/dice`. To follow our convention we will make a `DiceController.cs` file (e.g.
the `dice` from `/dice` is converted to CamelCase and we tack on `Controller`)
and inside we define a `DiceController` class.

```csharp
using System;
using Microsoft.AspNetCore.Mvc;

namespace BasicApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DiceController : ControllerBase
    {
    }
}
```

Now we will define our method to handle the `GET`. However, we want to specify
the number of sides our die has within the URL. That is a request to `/dice/6`
would roll a 6-sided die and return us a random number. However if we sent a
`GET` to `/dice/20` we'd be rolling a 20-sided die.

Somehow we must tell the _route_ part of `[HttpGet]` that we'd like to have part
of the URL be _variable_ and tell it what we want to call that specific part of
the URL. In this case a good name for that part is `sides`.

We can modify the `[HttpGet]` with parenthesis to specify additional parts of
the URL beyond the `/dice` base. However if we use `{}` we can tell .NET that
we'd match anything and whatever is supplied in the URL we want to name it. In
this case we specify our attribute as `HttpGet("{sides}")`. We read this as "In
the `/dice` endpoint here is the method to handle GET requests that look like
/dice/6 and /dice/20 and dice/99999, but we refer to the 6, 20, or 99999 as
`sides`"

Just like for query parameters, we define a method argument to receive this
data. We name it the same as what we wrote inside `{}`, in this case `sides`.
Previously we used `string` as the type. Here, however, we want this to be a
number so we can define `sides` as `int`. Since we are also returning a number,
we define the return type is `int`. We'll name our method `Roll`

```csharp
[HttpGet("{sides}")]
public int Roll(int sides)
{
```

Next we need a way to generate random numbers. Luckily `C#` gives us a class
that does exactly that, `Random`. First we make a variable that can generate
random numbers: `var randomNumberGenerator = new Random();` and to get a number
from it we call `randomNumberGenerator.Next(SOMENUMBER)`. This will give us a
number between 0 and what we give as SOMENUMBER. It will return as low as `0`
but to just one _smaller_ than `SOMENUMBER`. So if we want a number between `1`
and the number of sides we use
`var roll = randomNumberGenerator.Next(sides) + 1`

```csharp
using System;
using Microsoft.AspNetCore.Mvc;

namespace BasicApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DiceController : ControllerBase
    {
        [HttpGet("{sides}")]
        public int Roll(int sides)
        {
            var randomNumberGenerator = new Random();

            var roll = randomNumberGenerator.Next(sides) + 1;

            return roll;
        }
    }
}
```

Give it a try. Use `Insomnia` to visit `https://localhost:5001/dice/6` and see
what you roll! It should be a random die roll between `1` and `6`

There will be another change if you look over at the `Header` tab. The
`Content-Type` has changed. We are now returning `application/json`. This is
because the return type is more complicated than a simple `string` and .NET is
automatically converting our output to JSON for us.

Lets return some more complex data. Lets roll many die.

## Rolling more than one die.

Let's combine the URL pattern with a query parameter of the number of die we
wish to roll. So our URL will look like `/dice/6?count=4` to roll `4` die with
`6` sides.

First lets add the query parameter to our arguments:
`public int Roll(int sides, int count)` and since we will be returning more than
one value we will change our return type. Since we are returning a collection of
integers, we'll return a `List<int>`. In our method we will create a new `List`
and then populate many random rolls of the die. Finally we will return the list
of rolls.

```csharp
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace BasicApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DiceController : ControllerBase
    {
        [HttpGet("{sides}")]
        // int sides -- comes from {sides} in the HttpGet
        // int count -- comes from a query parameter
        public List<int> Roll(int sides, int count)
        {
            // Make a new list to store our integer rolls
            var rolls = new List<int>();

            // Make a random number generator
            var randomNumberGenerator = new Random();

            // Loop _count_ times
            for (var rollNumber = 0; rollNumber < count; rollNumber++)
            {
                // Grab a random roll between 1 and sides
                var roll = randomNumberGenerator.Next(sides) + 1;

                // Add that roll to the list
                rolls.Add(roll);
            }

            // Return the list
            return rolls;
        }
    }
}
```

Using the url `/dice/4?count=6` we will see a result like this:

![](./assets/roll-4-6.png)

The result is a JSON formatted array of four random numbers representing our die
rolls. Try generating more rolls by increasing the `count=` or alter the number
of sides of the die.

What happens if no `count` is given? If for instance you use
`https://localhost:5001/dice/20`? Oops, we get back an empty array. Luckily `C#`
allows us to specify a default value for an argument if it is not supplied.

```csharp
public List<int> Roll(int sides, int count = 1)`
```

By changing this we now default to rolling a single die if a value is not
supplied.

## Non GET based requests

All of these requests have been to retrieve information from the API. To effect
a change of data on the server we must use a verb other than GET.

## Creating a new game

We have a controller that allows us to roll a die so now lets add an API to
create a game night. When creating a game night we'd like to track the name of
the game we will play, the name of the person hosting the event, their address,
the date and time the game will start, and the minimum and maximum number of
people the game can support.

That is quite a bit of information and we shouldn't put that all in the URL like
this:

`/games/Ticket To Ride/Bill/123 Main Street/2020-12-25 8:00PM/3/12`

You'll see we will even have challenges with handling the formatting of spaces.
The same would be true for query parameters

`/games?name=Ticket To Ride&host=Bill&address=123 Main Street&when=2020-12-25 8:00PM&minimumPlayers=3&maximumPlayers=12`

Luckily we've already seen that we can use the _body_ of the request to send a
JSON formatted string of data such as:

```json
{
  "name": "Ticket To Ride",
  "host": "Bill",
  "address": "123 Main Street",
  "when": "2020-12-25T20:00",
  "minimumPlayers": 3,
  "maximumPlayers": 12
}
```

This is a much better format for sending structured data. So the question
becomes, how will we handle this data on the backend?

Let's first begin by creating our `GamesController`

```csharp
using System;
using Microsoft.AspNetCore.Mvc;

namespace BasicApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GamesController : ControllerBase
    {
        [HttpPost]
    }
}
```

Notice we have changed our attribute now to `HttpPost` - `POST` is often the
verb used when **creating** data with an API so we will use that here. In
another lesson on API design we will cover the conventions to use for both verbs
and URLs.

Next we need to write our method below the `[HttpPost]`. Returning to our API
questions we need to answer both how we are going to receive information and
what we are going to return. For receiving information we'd like to get all the
data about a game, the same items we listed above. The API will then do whatever
it needs to for keeping track of the game (likely it will eventually store it in
a database) and finally return some data. The data it returns can be the same
game it retrieved with any needed changes. For instance if we were saving in a
database we'd have a new `ID` property.

Additionally we'd like to send back a more appropriate response code than `200`,
the generic "everything is ok" response. In this case we'd like to send back a
`201` which means "I created what you asked me to do", even though in our
example we won't yet be writing to a database.

In order to do this we need to create a new class to store the information about
a game. This will be a regular POCO and we will refer to these kinds of classes
as "models" as they represent (or model) information in the real world.

Here is our `Game` class:

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

You may notice that we are using `C#` style property names in `CapitalCase`.
These attributes will be filled in automatically from our incoming JSON. The
system will also match up `camelCase` names from the JSON to this style name,
and convert the reverse way when generating the resulting JSON.

With this we can define our function to handle the `POST`

```
[HttpPost]
public Game Create(Game gameToCreate)
{
}
```

Notice we are returning a `Game` object and we are accepting a `Game` object in
the argument `gameToCreate`. Previously we've seen the arguments to our method
come from the URL parts or from the query string. Here `dotnet` is going to look
at the JSON body, see that there is a structure there and match it up to the
properties of our `Game` class.

What .NET does is _map_ the incoming fields to the properties of the class such
as:

```
{
                                                 public int Id { get; set; }
  "name": "Ticket To Ride",          --==>       public string Name { get; set; }
  "host": "Bill",                    --==>       public string Host { get; set; }
  "address": "123 Main Street",      --==>       public string Address { get; set; }
  "when": "2020-12-25T20:00",        --==>       public DateTime When { get; set; }
  "minimumPlayers": 3,               --==>       public int MinimumPlayers { get; set; }
  "maximumPlayers": 12               --==>       public int MaximumPlayers { get; set; }
}
```

and it does a similar mapping in return:

```
{
  public int Id { get; set; }               --==>    "id": 42,
  public string Name { get; set; }          --==>    "name": "Ticket To Ride",
  public string Host { get; set; }          --==>    "host": "Bill",
  public string Address { get; set; }       --==>    "address": "123 Main Street",
  public DateTime When { get; set; }        --==>    "when": "2020-12-25T20:00",
  public int MinimumPlayers { get; set; }   --==>    "minimumPlayers": 3,
  public int MaximumPlayers { get; set; }   --==>    "maximumPlayers": 12
}
```

So we can simply return the same `game` object as the return value.

```csharp
[HttpPost]
public Game Create(Game gameToCreate)
{
    // Output something in the console so we can
    // see that we received all the data
    Console.WriteLine("***********************");
    Console.WriteLine($"Name: {gameToCreate.Name}");
    Console.WriteLine($"Hosted by: {gameToCreate.Host}");
    Console.WriteLine("***********************");

    // emulate us writing to the database and getting
    // an ID for this new game.
    gameToCreate.Id = 42;

    // Return the modified game
    return gameToCreate;
}
```

Our controller code is now:

```csharp
using System;
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
        [HttpPost]
        public Game Create(Game gameToCreate)
        {
            // Output something in the console so we can
            // see that we received all the data
            Console.WriteLine("***********************");
            Console.WriteLine($"Name: {gameToCreate.Name}");
            Console.WriteLine($"Hosted by: {gameToCreate.Host}");
            Console.WriteLine("***********************");

            // emulate us writing to the database and getting
            // an ID for this new game.
            gameToCreate.Id = 42;

            // Return the modified game
            return gameToCreate;
        }
    }
}
```

Using it in Insomnia our request looks like this:

![](./assets/game-post.png)

However you will notice that the return status is still `200` and we would like
to return a more descriptive `201` status. We will have to make some adjustments
to our method's return type.

Our controller methods are allowed to return a few different types of data

- Specific type (`string`, `int`, `Game`, etc)
- Enumerable such as `List<>` or the more generic form `IEnumerable<>`
- `IActionResult`
- `ActionResult<T>`

So far we've seen the first two. While the `IActionResult` return type is an
option, the more generic `ActionResult<T>` will be our preferred method for
returning data from our controllers for now. It will allow us to return multiple
types of data and result codes.

We will modify our `Create` method to return an `ActionResult<Game>` to indicate
that we still intend to return `Game` objects but also be able to specify the
response codes needed.

We then modify our `return` to return a `CreatedAtAction`. This method takes
three arguments, the first is the name of the method that corresponds to the
endpoint that would retrieve a game, the second argument is the parameters that
endpoint needs, and finally the newly created object. Since we haven't created
an endpoint for fetching `Game`s, we'll supply `null` for the first two
parameters.

```csharp
return CreatedAtAction(null, null, gameToCreate);
```

Now our method looks like this:

```csharp
[HttpPost]
public ActionResult<Game> Create(Game gameToCreate)
{
    // Output something in the console so we can
    // see that we received all the data
    Console.WriteLine("***********************");
    Console.WriteLine($"Name: {gameToCreate.Name}");
    Console.WriteLine($"Hosted by: {gameToCreate.Host}");
    Console.WriteLine("***********************");

    // emulate us writing to the database and getting
    // an ID for this new game.
    gameToCreate.Id = 42;

    // Return the modified game
    return CreatedAtAction(null, null, gameToCreate);
}
```

If you send your request again in Insomnia you will see we receive a `201`
response back. Lets make use of our new found ability to control the result
types.

## Returning result codes to indicate errors.

We can also use the features of `ActionResult` to return different error
response codes.

Lets imagine that we want to ensure that the `minimumPlayers` is at least two
and that `maximumPlayers` is less than `20` and that `minimumPlayers` is less
than or equal to `maximumPlayers`. If any of those are invalid we'll return a
`422` (Unprocessable Entity) status code. This would let the API user know that
we could not handle their request.

The first requirement is that we have at least two players. We can add this
statement at the beginning of our method:

```csharp
if (gameToCreate.MinimumPlayers < 2)
{
    return UnprocessableEntity();
}
```

Inside the condition will return a different kind of `ActionResult`, in this
case an `UnprocessableEntity`.

If you run this code, and modify the `minimumPlayers` to `1` or less you will
see a response like this:

![](./assets/422-unprocessable.png)

And while we do get a response code that indicates we could not handle the
request, that object returned is not very friendly. Let's improve that by
generating a new object for the API to return.

```csharp
if (gameToCreate.MinimumPlayers < 2)
{
    // Make a generic object containing just a message property
    var errorMessage = new { message = $"You only requested {gameToCreate.MinimumPlayers} but we need at least 2." };

    // Return a 422 error and supply a nice message
    return UnprocessableEntity(errorMessage);
}
```

When you run this code you'll see a much nicer error message to the user in the
JSON results.

In this final version of the code we will add the remaining validation.

```csharp
using System;
using System.Net;
using Microsoft.AspNetCore.Http;
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

            // Output something in the console so we can
            // see that we received all the data
            Console.WriteLine("***********************");
            Console.WriteLine($"Name: {gameToCreate.Name}");
            Console.WriteLine($"Hosted by: {gameToCreate.Host}");
            Console.WriteLine("***********************");

            // emulate us writing to the database and getting
            // an ID for this new game.
            gameToCreate.Id = 42;

            // Return the modified game
            return CreatedAtAction(null, null, gameToCreate);
        }
    }
}
```

## Creating a full fledged app to keep track of games

In the next part we will expand our controller to be able to keep track of
created games, get a list of games, update a game, and remove a game.
