---
title: Building API Clients in C# and .NET
---

## Consuming API services

In [this lesson](/lessons/misc-api-intro) we discussed the idea of an API which
operates over the internet via HTTP.

In this lesson we will build a console application that will interact with the
`One List API` to manage todo lists. All of the information about the todo items
will be stored in the API itself. In this way our console application will be
considered a `client` of the API. In other lessons we will build full web page
applications that also serve as a client that runs in our browser. We could also
develop a mobile phone application in Android or iOS that could also access this
API. In this way the API is _agnostic_ to it's client. As long as the client
software (in this case our `C#` console application) complies with the API
requirements it will work with the API. This is why APIs are so powerful and
help power the modern internet.

## Creating our one list API client.

We will generate a console application with:

```shell
dotnet new sdg-console --name OneListClient
```

Initially this application contains just the
`Console.WriteLine("Hello World!");` code so we will remove that and add this
code:

```csharp
var client = new HttpClient();
```

> NOTE: You will need to add `using System.Net.Http;`

The `HttpClient` is the built-in class we will use to send and receive
information to APIs over HTTP. The `HttpClient` object we create, `client`, will
have many methods for both sending and receiving data which we will see over the
course of this lesson.

The first we will review is a method that makes a `GET` request to a server and
returns the `response body` as a `string`.

## Fetching data from a server and receiving back a string

The next line of code we would like to add uses the `HttpClient` method
`GetStringAsync`. However, before we can add a line such as
`var responseAsString = client.GetStringAsync("https://one-list-api.herokuapp.com/items?access_token=sdg-handbook");`
we need to take a minor detour to talk about the concept of `Async`.

## DETOUR: ASYNC

As we mentioned in our discussion of APIs we are making these requests over the
internet. Anyone who has visited a busy web page will notice that sending data
to, and receiving information from, a remote service (web site, API, etc) on the
internet is not _instantaneous_. There is always going to be some amount of
delay as the request is constructed, sent out by our computer, traverses the
various connections over the internet on it's way to the destination server,
received, parsed, executed, response created, and the response traversing the
return path through the internet back to our computer. Due to the inherent and
unpredictable delay in sending requests and receiving a response the code we
write for interacting with such services should be `a-synchronous`. The term
_synchronous_ means "at the same time" and in this context we could also
interpret it as "stop and wait for this to be done." Thus the idea of
`asynchronous` or `async` would mean that opposite, or "do not wait for this to
be done"

We would like these requests to be asynchronous so that our programs do not
freeze while we are waiting for the response. We've all experienced a
synchronous event when our browsers give us a "wait" cursor (spinning wheel,
etc) when a web page freezes. That does not provide a great user experience.

The idea of async methods will become very common as we write code that
interacts with remote resources such as HTTP APIs or even our own database. That
the .NET core team made these methods asynchronous allows us the flexibility to
make our applications as responsive as possible.

However, learning to deal with `async` methods requires an even longer detour
than we want to take at this time. Fortunately the `C#` and `dotnet` team
provided a way to allow us to tell these `async` methods that we'd just prefer
to wait for them to be done.

For this we introduce a new keyword, the `await` keyword. When we put this
keyword in front of any function call we make that is `async` we tell the code
that we wish for it to make the `async` as it would but to immediately just wait
for it to be complete and return the result. In this way we turn something
_asynchronous_ into something _synchronous_. This does mean, however, that our
code will **pause** while the function is running and may make our application
seem unresponsive.

## Fetching data, with `GetStringAsync` and `await`

Let's add code to fetch a list of todo items from `One List`

```csharp
using System;
using System.Net.Http;

namespace OneListClient
{
    class Program
    {
        static void Main(string[] args)
        {
            var client = new HttpClient();

            var responseAsString = await client.GetStringAsync("https://one-list-api.herokuapp.com/items?access_token=sdg-handbook");

            Console.WriteLine(responseAsString);
        }
    }
}
```

If we were look in our editor or try to run this code we will notice an error.

```
The 'await' operator can only be used within an async method. Consider marking this method with the 'async' modifier and changing its return type to 'Task'
```

Any time we ask a method, in this case `Main` to use `await` we need to make the
method itself `async` or to have it return a new kind of object called a `Task`.
We need to do this so that the code that calls **us** know that we will be
synchronous. This allows the calling method to know that they can run **us** in
an async way to make the system responsive. So while `await + async` is powerful
it does come with some conditions we need to adhere to.

If you place your cursor on the error and press `Control .` (Windows) or
`Command .` (Mac) you will see the _Quick Fix_ suggestion `Make method async`.
Doing so turns the code into:

```csharp
using System;
using System.Net.Http;

namespace OneListClient
{
    class Program
    {
        static async System.Threading.Tasks.Task Main(string[] args)
        {
            var client = new HttpClient();

            var responseAsString = await client.GetStringAsync("https://one-list-api.herokuapp.com/items?access_token=sdg-handbook");

            Console.WriteLine(responseAsString);
        }
    }
}
```

Notice that `Main` has changed from `public void Main` to
`public async System.Threading.Tasks.task Main`. We have made this method
`async` and note that it returns a `Task`. This satisfies .NET to allow us to
use `await`. It tells the calling code, in this case our entire program run,
that our code uses `await` and thus **Main** should be treated as asynchronous.
The idea of returning `Task` will come more into play when we are **creating**
APIs. For now know that if our method returns `Task` we can return a variable
that is, itself, the result of an `async` call (such as `GetStringAsync`) and
the `Task` will run that code and process the results for us. This will be
helpful when we learn to write our own APIs.

One last refactor is to take the long `System.Threading.Tasks.Task` and make it
just `Task` and then add a `using System.Threading.Tasks;` to our code.

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace OneListClient
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var client = new HttpClient();

            var responseAsString = await client.GetStringAsync("https://one-list-api.herokuapp.com/items?access_token=sdg-handbook");

            Console.WriteLine(responseAsString);
        }
    }
}
```

Go ahead and run this code to see an output similar to (but perhaps different if
there are more, less, or different tasks in the API at the moment)

```json
[
  {
    "id": 1590,
    "user_id": 143,
    "text": "Write some documentation about Insomnia",
    "complete": false,
    "created_at": "2020-04-24T19:32:43.653Z",
    "updated_at": "2020-04-24T19:32:43.653Z"
  },
  {
    "id": 1591,
    "user_id": 143,
    "text": "Write more about how awesome APIs are",
    "complete": false,
    "created_at": "2020-04-24T19:37:21.547Z",
    "updated_at": "2020-04-24T19:37:21.547Z"
  },
  {
    "id": 1592,
    "user_id": 143,
    "text": "Write more about the PEDAC process of problem solving.",
    "complete": true,
    "created_at": "2020-04-24T19:37:46.305Z",
    "updated_at": "2020-04-24T19:37:46.305Z"
  }
]
```

Notice that this JSON, even though it is not formatted nicely with extra
whitespace and indentation, is just like the results we would receive if we used
a tool such as `httpie` or `Insomnia` to interact with the API.

> CONGRATULATIONS, you have just written your first API client that accesses
> data remotely over the Internet!

## Processing the data

However, notice that this is just one long string of data. Also notice that the
JSON data represent an array. It would be convenient if we could _convert_ this
JSON string into some objects that `C#` knows how to deal with nicely.

This introduces the idea of `serialization`

## DETOUR: Serialization

One part of sending and receiving information over an API is how the data is
_represented_ as it is sent to the API and when results return. We have also
learned that `JSON` is a very common data format for this representation. Thus
there must be a way we can take data we send **to** an API and format it in JSON
and there must also be a way to take information **from** an API and convert it
from JSON to `C#` objects we are familiar with.

Fortunately there is a process knows as `serialization` and `de-serialization`,
coming from the idea that we are taking data and turning it into a series of
characters, like a JSON string. Serialization is the process of taking an object
(an array, a string, a number, a date, an array of objects, or any complex data
structure) and turning it into a string (series of characters) in a specific
form (in this case JSON). De-serialization is the reverse of this process,
taking a series of characters (a string) and processing it via a format (in this
case JSON) to restore the original object (an array, a string, a number, a date,
an array of objects, or any complex data structure)

Additionally it is fortunate that `C#` and `dotnet` provide us a set of built-in
classes to handle this.

Let's add those to our code to get back a better representation of our object.

## Processing the data by defining a class to store the results

Looking at the API we see that the return from our `GET` is an array of items.
And looking at the objects in that array we see they follow this format:

```
id: number
text: string
complete: bool
created_at: string
updated_at: string
```

We would like to deal with each of the entries as a familiar object, a POCO
(Plain Old Csharp Object). So we can define a `class` to represent these items:

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace OneListClient
{
    class Program
    {
        class Item
        {
            public int id { get; set; }
            public string text { get; set; }
            public bool complete { get; set; }
            public string created_at { get; set; }
            public string updated_at { get; set; }
        }

        static async Task Main(string[] args)
        {
            var client = new HttpClient();

            var responseAsString = await client.GetStringAsync("https://one-list-api.herokuapp.com/items?access_token=sdg-handbook");

            Console.WriteLine(responseAsString);
        }
    }
}
```

Notice that we define the _properties_ of our class to have **the same names as
the keys of our JSON object**. This is a **CRITICAL** point because it is this
pattern the _deserializer_ will use to know where to put the data. For instance
if we were to receive this data in the response:

```json
{
  "id": 6,
  "text": "Finish Assignment",
  "complete": true,
  "created_at": "2016-08-17T20:06:34.874Z",
  "updated_at": "2018-10-02T16:10:59.754Z"
}
```

The deserializer will make a new _instance_ of `Item` for us and copy the `6`
from the `"id"` JSON key into the `id` property in our object. Then it will copy
the value `"Finish Assignment"` from the `"text"` key in the JSON into the
`text` property of our object, and so on. If we follow this _convention_
(pattern) the deserializer will do a lot of work on our behalf without having to
write individual statements to tell it how to work.

> NOTE: This follows an idea known as "Convention Over Configuration". That is,
> by following a set of _rules_ we can rely on behavior of code to do work for
> us without having to _configure_ (or _code_) each and every step. This is a
> powerful developer tool as it saves us time when coding. It also allows us not
> to think about different names in the JSON data and our objects. For instance,
> if we called the `text` property `Description` we would have to remember: "Oh,
> yeah, Description property comes from the text JSON key." These small
> nuisances on a large project can add up over time. Let's use these
> _conventions_ to our advantage.

In order to use the _deserializer_ to convert our response into a `List` of
`Item` objects we need to make a modification. The first is to not retrieve the
`GET` result as a `string` but as a `stream`. A `stream` is a variable that
knows how to read data one chunk at a time (often one character at a time). By
using a `stream` the _deserializer_ can process data a little at a time in case
the input is quite large.

`var responseAsStream = await client.GetStreamAsync("https://one-list-api.herokuapp.com/items?access_token=sdg-handbook");`

And then we need to supply this `stream` to the _deserializer_

`var items = await JsonSerializer.DeserializeAsync<List<Item>>(responseAsStream);`

> NOTE: we need to add `using System.Text.Json;` as well as
> `using System.Collections.Generic` here

Again we see `await` since the process of deserializing the list is done in an
`async` manner. The `JsonSerializer.DeserializeAsync` also requires us to tell
it what kind of object to extract. We do that by specifying `List<Item>` inside
of `<>`. The outer `<>` are for the `DeserializeAsync` to mean "inside these
`<>` is the type of data to try to deserialize" and inside the `List<Item>` says
that the JSON data, inside the `responseAsStream` should be processed as a
`List` of `Item` objects. Finally we supply the stream, `responseAsStream`

This gives us a `List<Item>` that we can iterate.

```csharp
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace OneListClient
{
    class Program
    {
        class Item
        {
            public int id { get; set; }
            public string text { get; set; }
            public bool complete { get; set; }
            public string created_at { get; set; }
            public string updated_at { get; set; }
        }

        static async Task Main(string[] args)
        {
            var client = new HttpClient();

            // Make a `GET` request to the API and get back a *stream* of data.
            var responseAsStream = await client.GetStreamAsync("https://one-list-api.herokuapp.com/items?access_token=sdg-handbook");

            // Supply that *stream of data* to a Deserialize that will interpret it as a List of Item objects.
            var items = await JsonSerializer.DeserializeAsync<List<Item>>(responseAsStream);

            // For each item in our deserialized List of Item
            foreach (var item in items)
            {
                // Output some details on that item
                Console.WriteLine($"The task {item.text} was created on {item.created_at} and has a completion of: {item.complete}");
            }
        }
    }
}
```

Running the code you will see a much nicer output:

```
The task Write some documentation about Insomnia was created on 2020-04-24T19:32:43.653Z and has a completion of: False
The task Write more about how awesome APIs are was created on 2020-04-24T19:37:21.547Z and has a completion of: False
The task Write more about the PEDAC process of problem solving. was created on 2020-04-24T19:37:46.305Z and has a completion of: True
```

## Improve our `Item` class

Notice the date is formatted as a long string that is not very user friendly. We
can improve this by changing the data type from `string` to `DateTime` in our
`Item` class. Thus when the _deserializer_ is processing those fields it will
try to _convert_ (the technical term is _coerce_) the string format into a
`DateTime`. Luckily for us that string is in a very specific format called an
[ISO8601](https://en.wikipedia.org/wiki/ISO_8601) format and `DateTime` knows
how to deal with it.

```csharp
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace OneListClient
{
    class Program
    {
        class Item
        {
            public int id { get; set; }
            public string text { get; set; }
            public bool complete { get; set; }
            public DateTime created_at { get; set; }
            public DateTime updated_at { get; set; }
        }

        static async Task Main(string[] args)
        {
            var client = new HttpClient();

            // Make a `GET` request to the API and get back a *stream* of data.
            var responseAsStream = await client.GetStreamAsync("https://one-list-api.herokuapp.com/items?access_token=sdg-handbook");

            // Supply that *stream of data* to a Deserialize that will interpret it as a List of Item objects.
            var items = await JsonSerializer.DeserializeAsync<List<Item>>(responseAsStream);

            // For each item in our deserialized List of Item
            foreach (var item in items)
            {
                // Output some details on that item
                Console.WriteLine($"The task {item.text} was created on {item.created_at} and has a completion of: {item.complete}");
            }
        }
    }
}
```

And now our output looks like:

```
The task Write some documentation about Insomnia was created on 4/24/2020 7:32:43 PM and has a completion of: False
The task Write more about how awesome APIs are was created on 4/24/2020 7:37:21 PM and has a completion of: False
The task Write more about the PEDAC process of problem solving. was created on 4/24/2020 7:37:46 PM and has a completion of: False
```

The `False` is not friendly so lets improve that. We can add another custom
property which contains logic for it's `get` implementation:

```csharp
public string CompletedStatus
{
    get
    {
        // Uses a ternary to return "completed" if the `complete` variable is true, returns "not completed" if false
        return complete ? "completed" : "not completed";
    }
}
```

And we can use it as such:

```csharp
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace OneListClient
{
    class Program
    {
        class Item
        {
            public int id { get; set; }
            public string text { get; set; }
            public bool complete { get; set; }
            public DateTime created_at { get; set; }
            public DateTime updated_at { get; set; }

            public string CompletedStatus
            {
                get
                {
                    // Uses a ternary to return "completed" if the `complete` variable is true, returns "not completed" if false
                    return complete ? "completed" : "not completed";
                }
            }
        }

        static async Task Main(string[] args)
        {
            var client = new HttpClient();

            // Make a `GET` request to the API and get back a *stream* of data.
            var responseAsStream = await client.GetStreamAsync("https://one-list-api.herokuapp.com/items?access_token=sdg-handbook");

            // Supply that *stream of data* to a Deserialize that will interpret it as a List of Item objects.
            var items = await JsonSerializer.DeserializeAsync<List<Item>>(responseAsStream);

            // For each item in our deserialized List of Item
            foreach (var item in items)
            {
                // Output some details on that item
                Console.WriteLine($"The task {item.text} was created on {item.created_at} and is {item.CompletedStatus}");
            }
        }
    }
}
```

You may have noticed we gave the `CompletedStatus` a more tradition `C#` name in
`CapitalCase` styling. We can do the same for the other fields with a little bit
of work.

But first we will make yet another detour.

## DETOUR: C# Attributes

We are going to add some _hints_ to our `Item` class to tell the serializer how
to match the names in the JSON to the names of our properties. We will do that
by adding the concept of an `attribute`. A `C#` attribute is written in `[]`
just before the class, method, or property it describes. Different language
features and libraries add specific attributes that add abilities to the
classes, methods, or properties they are attached to. Over the course of our
`C#` work we will use `attributes` in many ways to apply configuration to the
code we write.

> NOTE: Here we are using the `Configuration` part of
> `Convention over Configuration`. We are deciding that having better `C#`
> property names is better since we are familiar with the `CapitalCase` style
> rather than the `snake_case` that the API is using. We aren't renaming the
> properties (though we could do that as well) we are just making the case-style
> more familiar.

In this instance we are using the `JsonPropertyName` attribute. It takes an
argument of the name of the JSON key used to populate the `C#` property that
follows.

## Using JsonPropertyName to give better property names.

Applying `JsonPropertyName` to all of our `Item` properties allows us to use
`C#` style properties.

```csharp
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace OneListClient
{
    class Program
    {
        class Item
        {
            [JsonPropertyName("id")]
            public int Id { get; set; }

            [JsonPropertyName("text")]
            public string Text { get; set; }

            [JsonPropertyName("complete")]
            public bool Complete { get; set; }

            [JsonPropertyName("created_at")]
            public DateTime CreatedAt { get; set; }

            [JsonPropertyName("updated_at")]
            public DateTime UpdatedAt { get; set; }

            public string CompletedStatus
            {
                get
                {
                    // Uses a ternary to return "completed" if the `complete` variable is true, returns "not completed" if false
                    return Complete ? "completed" : "not completed";
                }
            }
        }

        static async Task Main(string[] args)
        {
            var client = new HttpClient();

            // Make a `GET` request to the API and get back a *stream* of data.
            var responseAsStream = await client.GetStreamAsync("https://one-list-api.herokuapp.com/items?access_token=sdg-handbook");

            // Supply that *stream of data* to a Deserialize that will interpret it as a List of Item objects.
            var items = await JsonSerializer.DeserializeAsync<List<Item>>(responseAsStream);

            // For each item in our deserialized List of Item
            foreach (var item in items)
            {
                // Output some details on that item
                Console.WriteLine($"The task {item.Text} was created on {item.CreatedAt} and is {item.CompletedStatus}");
            }
        }
    }
}
```

## Add some visual appeal!

Wow, we have a great little app that can fetch todo items from our API. It
deserves a little bit of extra styling. First let's put the output in a nice
table format. To do this we will add an external library to our app:

```shell
dotnet add package ConsoleTables
```

The
[documentation for ConsoleTables](https://github.com/khalidabuhakmeh/ConsoleTables)
shows us how to create a table with headers, add rows, and output the table
itself.

```csharp
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using ConsoleTables;

namespace OneListClient
{
    class Program
    {
        class Item
        {
            [JsonPropertyName("id")]
            public int Id { get; set; }

            [JsonPropertyName("text")]
            public string Text { get; set; }

            [JsonPropertyName("complete")]
            public bool Complete { get; set; }

            [JsonPropertyName("created_at")]
            public DateTime CreatedAt { get; set; }

            [JsonPropertyName("updated_at")]
            public DateTime UpdatedAt { get; set; }

            public string CompletedStatus
            {
                get
                {
                    // Uses a ternary to return "completed" if the `complete` variable is true, returns "not completed" if false
                    return Complete ? "completed" : "not completed";
                }
            }
        }

        static async Task Main(string[] args)
        {
            var client = new HttpClient();

            // Make a `GET` request to the API and get back a *stream* of data.
            var responseAsStream = await client.GetStreamAsync("https://one-list-api.herokuapp.com/items?access_token=sdg-handbook");

            // Supply that *stream of data* to a Deserialize that will interpret it as a List of Item objects.
            var items = await JsonSerializer.DeserializeAsync<List<Item>>(responseAsStream);

            var table = new ConsoleTable("Description", "Created At", "Completed");

            // For each item in our deserialized List of Item
            foreach (var item in items)
            {
                // Add one row to our table
                table.AddRow(item.Text, item.CreatedAt, item.CompletedStatus);
            }

            // Write the table
            table.Write();
        }
    }
}
```

and now our output looks like this:

```
+--------------------------------------------------------+----------------------+---------------+
| Description                                            | Created At           | Completed     |
+--------------------------------------------------------+----------------------+---------------+
| Write some documentation about Insomnia                | 4/24/2020 7:32:43 PM | not completed |
+--------------------------------------------------------+----------------------+---------------+
| Write more about how awesome APIs are                  | 4/24/2020 7:37:21 PM | not completed |
+--------------------------------------------------------+----------------------+---------------+
| Write more about the PEDAC process of problem solving. | 4/24/2020 7:37:46 PM | completed     |
+--------------------------------------------------------+----------------------+---------------+
```

Nice! However, our application still only allows us to show the list for a
predefined token. Let's update the code to supply the token via the command
line! Now we can have multiple lists and switch between them.

## Getting the name of the list from the command line.

We've been ignoring a variable that has been present in all of our `C#`
applications so far, `args`. The `string[] args` parameter to `Main` are the
command line arguments that appear after our `dotnet run` command. So we can use
this to get the name of the list we want to process. Since this is an array we
can access the 0th (first) element: `var token=args[0]` and then use string
interpolation to generate our URL:
`var url = $"https://one-list-api.herokuapp.com/items?access_token={token}";`

```csharp
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using ConsoleTables;

namespace OneListClient
{
    class Program
    {
        class Item
        {
            [JsonPropertyName("id")]
            public int Id { get; set; }

            [JsonPropertyName("text")]
            public string Text { get; set; }

            [JsonPropertyName("complete")]
            public bool Complete { get; set; }

            [JsonPropertyName("created_at")]
            public DateTime CreatedAt { get; set; }

            [JsonPropertyName("updated_at")]
            public DateTime UpdatedAt { get; set; }

            public string CompletedStatus
            {
                get
                {
                    // Uses a ternary to return "completed" if the `complete` variable is true, returns "not completed" if false
                    return Complete ? "completed" : "not completed";
                }
            }
        }

        static async Task Main(string[] args)
        {
            var token = args[0];

            var client = new HttpClient();

            // Make a `GET` request to the API and get back a *stream* of data.
            var url = $"https://one-list-api.herokuapp.com/items?access_token={token}";
            var responseAsStream = await client.GetStreamAsync(url);

            // Supply that *stream of data* to a Deserialize that will interpret it as a List of Item objects.
            var items = await JsonSerializer.DeserializeAsync<List<Item>>(responseAsStream);

            var table = new ConsoleTable("Description", "Created At", "Completed");

            // For each item in our deserialized List of Item
            foreach (var item in items)
            {
                // Add one row to our table
                table.AddRow(item.Text, item.CreatedAt, item.CompletedStatus);
            }

            // Write the table
            table.Write();
        }
    }
}
```

```shell
dotnet run sdg-handbook
```

```
-------------------------------------------------------------------------------------------------
| Description                                            | Created At           | Completed     |
-------------------------------------------------------------------------------------------------
| Write some documentation about Insomnia                | 4/24/2020 7:32:43 PM | not completed |
-------------------------------------------------------------------------------------------------
| Write more about how awesome APIs are                  | 4/24/2020 7:37:21 PM | not completed |
-------------------------------------------------------------------------------------------------
| Write more about the PEDAC process of problem solving. | 4/24/2020 7:37:46 PM | not completed |
-------------------------------------------------------------------------------------------------
```

However, what would happen if the user forgot to supply a name?

```shell
dotnet run
```

```
Unhandled exception. System.IndexOutOfRangeException: Index was outside the bounds of the array.
```

Uh oh, let's handle that in the code by prompting the user if there is nothing
in the `args` array.

```csharp
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using ConsoleTables;

namespace OneListClient
{
    class Program
    {
        class Item
        {
            [JsonPropertyName("id")]
            public int Id { get; set; }

            [JsonPropertyName("text")]
            public string Text { get; set; }

            [JsonPropertyName("complete")]
            public bool Complete { get; set; }

            [JsonPropertyName("created_at")]
            public DateTime CreatedAt { get; set; }

            [JsonPropertyName("updated_at")]
            public DateTime UpdatedAt { get; set; }

            public string CompletedStatus
            {
                get
                {
                    // Uses a ternary to return "completed" if the `complete` variable is true, returns "not completed" if false
                    return Complete ? "completed" : "not completed";
                }
            }
        }

        static async Task Main(string[] args)
        {
            var token = "";

            if (args.Length == 0)
            {
                Console.Write("What list would you like? ");
                token = Console.ReadLine();
            }
            else
            {
                token = args[0];
            }

            var client = new HttpClient();

            // Make a `GET` request to the API and get back a *stream* of data.
            var url = $"https://one-list-api.herokuapp.com/items?access_token={token}";
            var responseAsStream = await client.GetStreamAsync(url);

            // Supply that *stream of data* to a Deserialize that will interpret it as a List of Item objects.
            var items = await JsonSerializer.DeserializeAsync<List<Item>>(responseAsStream);

            var table = new ConsoleTable("Description", "Created At", "Completed");

            // For each item in our deserialized List of Item
            foreach (var item in items)
            {
                // Add one row to our table
                table.AddRow(item.Text, item.CreatedAt, item.CompletedStatus);
            }

            // Write the table
            table.Write();
        }
    }
}
```

Our todo list app is really going places!

Next up, lets add a little menu system that will let us get a list of items, get
a specific item by it's ID, add an item, and remove an item.
