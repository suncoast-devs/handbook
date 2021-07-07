---
title: Building API Clients in C# and .NET (Continued)
order: 2
---

## Regarding API "IDs"

The `One List API` provides an endpoint (URL and VERB) for fetching a specific
todo item. Let's update our table to show the todo item ID so the user can know
which item to refer to.

Many APIs will assign an `ID` to a specific item. By having a unique ID these
elements can be identified without using a field that might change, such as
`text` in our case. Many APIs will use a number that starts at `1` and
continually increases, never reusing IDs for items that are deleted. Other APIs
might use a long string of numbers and digits which has no obvious sequence to
it. In our case we do not care what the ID represents just that it is data we
can use to reference a specific item.

```
 --------------------------------------------------------------------------------------------------------
 | ID   | Description                                            | Created At           | Completed     |
 --------------------------------------------------------------------------------------------------------
 | 1590 | Write some documentation about Insomnia                | 4/24/2020 7:32:43 PM | not completed |
 --------------------------------------------------------------------------------------------------------
 | 1591 | Write more about how awesome APIs are                  | 4/24/2020 7:37:21 PM | not completed |
 --------------------------------------------------------------------------------------------------------
 | 1592 | Write more about the PEDAC process of problem solving. | 4/24/2020 7:37:46 PM | not completed |
 --------------------------------------------------------------------------------------------------------
```

First we will add a simple menu to our application. Take a moment to review the
code as we will be building on it. Much of the code should be familiar but here
are a few things to notice:

1. We've added a `while` loop with some prompting of a user's choice and then
   calling a method to handle the user's choice.
2. We've moved the code for getting a list of all the items to a method
   `ShowAllItems` - Notice we need to _pass_ it the `token` so we have access to
   it. Also notice that we have to tell the `Main` method to `await` it's
   completion since it is now marked `async.
3. The `client` variable is also moved into `ShowAllItems`.

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

        static async Task ShowAllItems(string token)
        {
            var client = new HttpClient();

            var url = $"https://one-list-api.herokuapp.com/items?access_token={token}";
            var responseAsStream = await client.GetStreamAsync(url);

            // Supply that *stream of data* to a Deserialize that will interpret it as a List of Item objects.
            var items = await JsonSerializer.DeserializeAsync<List<Item>>(responseAsStream);

            var table = new ConsoleTable("ID", "Description", "Created At", "Completed");

            // For each item in our deserialized List of Item
            foreach (var item in items)
            {
                // Add one row to our table
                table.AddRow(item.Id, item.Text, item.CreatedAt, item.CompletedStatus);
            }

            // Write the table
            table.Write(Format.Minimal);

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

            var keepGoing = true;
            while (keepGoing)
            {
                Console.Clear();
                Console.Write("Get (A)ll todo, or (Q)uit: ");
                var choice = Console.ReadLine().ToUpper();

                switch (choice)
                {
                    case "Q":
                        keepGoing = false;
                        break;

                    case "A":
                        await ShowAllItems(token);

                        Console.WriteLine("Press ENTER to continue");
                        Console.ReadLine();
                        break;

                    default:
                        break;
                }
            }

        }
    }
}
```

## Fetching a specific todo item

Let's add a new menu item to prompt the user for a specific item ID and then
fetch details about it.

We'll update the menu code first. Changing
`Console.Write("Get (A)ll todo, or Get (O)ne todo, or (Q)uit: ");` and adding a
`case` statement to our `switch`.

```csharp
case "O":
    Console.Write("Enter the ID of the item to show: ");
    var id = int.Parse(Console.ReadLine());

    await GetOneItem(token, id);

    Console.WriteLine("Press ENTER to continue");
    Console.ReadLine();
    break;
```

Then we will make a new method to handle `GetOneItem`

```csharp
static async Task GetOneItem(string token, int id)
```

Notice that this method requires two pieces of information in order to do it's
work. First it needs the list's `token`, and second it requires the _integer_
`id` of the specific item we are looking for.

The implementation of the method is:

```csharp
static async Task GetOneItem(string token, int id)
{
    var client = new HttpClient();

    // Generate a URL specifically referencing the endpoint for getting a single
    // todo item and provide the id we were supplied
    var url = $"https://one-list-api.herokuapp.com/items/{id}?access_token={token}";

    var responseAsStream = await client.GetStreamAsync(url);

    // Supply that *stream of data* to a Deserialize that will interpret it as a *SINGLE* `Item`
    var item = await JsonSerializer.DeserializeAsync<Item>(responseAsStream);

    var table = new ConsoleTable("ID", "Description", "Created At", "Updated At", "Completed");

    // Add one row to our table
    table.AddRow(item.Id, item.Text, item.CreatedAt, item.UpdatedAt, item.CompletedStatus);

    // Write the table
    table.Write(Format.Minimal);
}
```

This looks very similar to the implementation of our code for getting all the
items. However, you will notice that the `url` has been updated to specify the
`{id}`. This follows the [documentation](https://one-list-api.herokuapp.com) of
the _endpoint_ for getting a single item. Next our `DeserializeAsync` has been
modified from `<List<Item>>` to simply `<Item>`. This is because the API should
only be giving us back a single item, not a `List`. Correspondingly we name the
resulting variable `item` as a reminder that this is a single item and not a
list. NOTE, this is only _convetion_ as we could call the variable anything we
like. Finally when we create our fancy table, we do not iterate since we only
have the single `item` variable to add.

> Astute readers will notice that there is some repetition starting in the code.
> Specifically the `var client` and `https://one-list-api-herokuapp.com/items`
> part of the URL. There is also some repetition in how we are using the table,
> however we are printing _MORE_ information when we display a single item than
> when we display all items. Later in the lesson we will **refactor** this code
> to improve it.

> NOTE: As it pertains to refactoring code, we typically want to wait for a
> "rule of threes" when looking for repetitive code. A pattern repeated twice
> might not yet inspire us to refactor the code to clean it up. When we see the
> same pattern repeated a third time we should start to note these similarities
> and look for an opportunity to simplify the code.

## What if the user enters an item that doesn't exist?

Go ahead and try it!

What you will see is an exception printed to your terminal and the program
terminates.

```
Unhandled exception. System.Net.Http.HttpRequestException: Response status code does not indicate success: 404 (Not Found).
   at System.Net.Http.HttpResponseMessage.EnsureSuccessStatusCode()
   at System.Net.Http.HttpClient.FinishGetStreamAsync(Task`1 getTask)
```

Uh oh, there is one of those _not a success_ error codes. Since it is a `4xx`
code it indicates that the error is ours, not the servers (otherwise it would be
a `5xx` code). In this case the `404` error code means the item we were looking
for does not exist. Rather than displaying an exception we should display a
nicer message to our user.

In order to do this we need to take another detour.

## DETOUR: Exceptions

We must _handle the exception_ that this code is causing (called _throwing\_\_.)
When code we use _"throws"\_ an exception it is saying to the system "I could
not do the requested process and I'm raising the white flag in defeat hoping
that someone who called **me** can handle this!" We do this by wrapping the code
in a special syntax called `try/catch`.

```csharp
try
{
  // Code that might THROW an EXCEPTION
}
catch(KindOfException)
{
  // Code to handle if an exception happened
}
```

In this case we want to wrap our method in code that `catch`es an
`HttpRequestException` and shows the user a message.

## Handling an item that cannot be found

To handle the case where the API returns with something other than success
(`2xx`), in this case a `404`, we wrap the method in a `try/catch` block. In the
`catch` portion of the code we simply print the user an error message and end
the method.

```csharp
static async Task GetOneItem(string token, int id)
{
    try
    {
        var client = new HttpClient();

        // Generate a URL specifically referencing the endpoint for getting a single
        // todo item and provide the id we were supplied
        var url = $"https://one-list-api.herokuapp.com/items/{id}?access_token={token}";

        var responseAsStream = await client.GetStreamAsync(url);

        // Supply that *stream of data* to a Deserialize that will interpret it as a *SINGLE* `Item`
        var item = await JsonSerializer.DeserializeAsync<Item>(responseAsStream);

        var table = new ConsoleTable("ID", "Description", "Created At", "Updated At", "Completed");

        // Add one row to our table
        table.AddRow(item.Id, item.Text, item.CreatedAt, item.UpdatedAt, item.CompletedStatus);

        // Write the table
        table.Write(Format.Minimal);
    }
    catch (HttpRequestException)
    {
        Console.WriteLine("I could not find that item!");
    }
}
```

To those following along, this is the entirety of our program so far:

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

        static async Task ShowAllItems(string token)
        {
            var client = new HttpClient();

            var url = $"https://one-list-api.herokuapp.com/items?access_token={token}";
            var responseAsStream = await client.GetStreamAsync(url);

            // Supply that *stream of data* to a Deserialize that will interpret it as a List of Item objects.
            var items = await JsonSerializer.DeserializeAsync<List<Item>>(responseAsStream);

            var table = new ConsoleTable("ID", "Description", "Created At", "Completed");

            // For each item in our deserialized List of Item
            foreach (var item in items)
            {
                // Add one row to our table
                table.AddRow(item.Id, item.Text, item.CreatedAt, item.CompletedStatus);
            }

            // Write the table
            table.Write(Format.Minimal);
        }

        static async Task GetOneItem(string token, int id)
        {
            try
            {
                var client = new HttpClient();

                // Generate a URL specifically referencing the endpoint for getting a single
                // todo item and provide the id we were supplied
                var url = $"https://one-list-api.herokuapp.com/items/{id}?access_token={token}";

                var responseAsStream = await client.GetStreamAsync(url);

                // Supply that *stream of data* to a Deserialize that will interpret it as a *SINGLE* `Item`
                var item = await JsonSerializer.DeserializeAsync<Item>(responseAsStream);

                var table = new ConsoleTable("ID", "Description", "Created At", "Updated At", "Completed");

                // Add one row to our table
                table.AddRow(item.Id, item.Text, item.CreatedAt, item.UpdatedAt, item.CompletedStatus);

                // Write the table
                table.Write(Format.Minimal);
            }
            catch (HttpRequestException)
            {
                Console.WriteLine("I could not find that item!");
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

            var keepGoing = true;
            while (keepGoing)
            {
                Console.Clear();
                Console.Write("Get (A)ll todo, or Get (O)ne todo, or (Q)uit: ");
                var choice = Console.ReadLine().ToUpper();

                switch (choice)
                {
                    case "Q":
                        keepGoing = false;
                        break;

                    case "A":
                        await ShowAllItems(token);

                        Console.WriteLine("Press ENTER to continue");
                        Console.ReadLine();
                        break;

                    case "O":
                        Console.Write("Enter the ID of the item to show: ");
                        var id = int.Parse(Console.ReadLine());

                        await GetOneItem(token, id);

                        Console.WriteLine("Press ENTER to continue");
                        Console.ReadLine();
                        break;

                    default:
                        break;
                }
            }

        }
    }
}
```

## Creating a new element

Now that we can fetch all the todo items and fetch a single item, let's create a
method to make a new item.

First we update our prompt:
`Console.Write("Get (A)ll todo, or Get (O)ne todo, (C)reate a new item, or (Q)uit: ");`
and add some code to our `switch` statement.

```csharp
case "C":
    Console.Write("Enter the description of your new todo: ");
    var text = Console.ReadLine();

    var newItem = new Item
    {
        Text = text
    };

    await AddOneItem(token, newItem);

    Console.WriteLine("Press ENTER to continue");
    Console.ReadLine();
    break;
```

and finally we implement the `AddOneItem` method.

```csharp
static async Task AddOneItem(string token, Item newItem)
{
    var client = new HttpClient();

    // Generate a URL specifically referencing the endpoint for getting a single
    // todo item and provide the id we were supplied
    var url = $"https://one-list-api.herokuapp.com/items?access_token={token}";

    // Take the `newItem` and serialize it into JSON
    var jsonBody = JsonSerializer.Serialize(newItem);

    // We turn this into a StringContent object and indicate we are using JSON
    // by ensuring there is a media type header of `application/json`
    var jsonBodyAsContent = new StringContent(jsonBody);
    jsonBodyAsContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

    // Send the POST request to the URL and supply the JSON body
    var response = await client.PostAsync(url, jsonBodyAsContent);

    // Get the response as a stream.
    var responseJson = await response.Content.ReadAsStreamAsync();

    // Supply that *stream of data* to a Deserialize that will interpret it as a *SINGLE* `Item`
    var item = await JsonSerializer.DeserializeAsync<Item>(responseJson);

    // Make a table to output our new item.
    var table = new ConsoleTable("ID", "Description", "Created At", "Updated At", "Completed");

    // Add one row to our table
    table.AddRow(item.Id, item.Text, item.CreatedAt, item.UpdatedAt, item.CompletedStatus);

    // Write the table
    table.Write(Format.Minimal);
}
```

Whew, this is a long method and there is a lot going on. Let's go through it
line by line. First we create the `URL` we are going to send the request to.
Next up we start to create the JSON body we are going to send. Since this is a
`POST` endpoint we need to send the `Item` (in the variable `newItem`) as part
of the body. We first _serialize_ the `Item` into a JSON. The `PostAsync` method
only knows how to send `HttpContent`-like objects that have the content of the
body along with headers that indcate the type of data being sent. Thus we
convert the JSON body into a "StringContent" object and add a _header_ that
marks the body as JSON content.

Finally we can `await client.PostAsync(url, jsonBodyAsContent)` to send the
`POST` request to the URL.

Next we ask the `response` for it's `Content` and get a _stream_ from it which
we then send to our friend the _deserializer_ who in turn gives us an `Item`.
This is the `item` that is being returned from the API. We get this item so that
we can show the newly created item to the user (which would include it's ID,
creation time, etc.)

Using this feature would look like this:

```
Get (A)ll todo, or Get (O)ne todo, (C)reate a new item, or (Q)uit: C
Enter the description of your new todo: Testing
ID    Description  Created At            Updated At            Completed
----------------------------------------------------------------------------
1593  Testing      4/26/2020 8:50:48 PM  4/26/2020 8:50:48 PM  not completed

Press ENTER to continue
```

This is a lot of code and we will be able to _reuse_ quite a bit of it on our
next feature, the `Update`. For now here is our code so far:

```csharp
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
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

        static async Task ShowAllItems(string token)
        {
            var client = new HttpClient();

            var url = $"https://one-list-api.herokuapp.com/items?access_token={token}";
            var responseAsStream = await client.GetStreamAsync(url);

            // Supply that *stream of data* to a Deserialize that will interpret it as a List of Item objects.
            var items = await JsonSerializer.DeserializeAsync<List<Item>>(responseAsStream);

            var table = new ConsoleTable("ID", "Description", "Created At", "Completed");

            // For each item in our deserialized List of Item
            foreach (var item in items)
            {
                // Add one row to our table
                table.AddRow(item.Id, item.Text, item.CreatedAt, item.CompletedStatus);
            }

            // Write the table
            table.Write(Format.Minimal);
        }

        static async Task GetOneItem(string token, int id)
        {
            try
            {
                var client = new HttpClient();

                // Generate a URL specifically referencing the endpoint for getting a single
                // todo item and provide the id we were supplied
                var url = $"https://one-list-api.herokuapp.com/items/{id}?access_token={token}";

                var responseAsStream = await client.GetStreamAsync(url);

                // Supply that *stream of data* to a Deserialize that will interpret it as a *SINGLE* `Item`
                var item = await JsonSerializer.DeserializeAsync<Item>(responseAsStream);

                var table = new ConsoleTable("ID", "Description", "Created At", "Updated At", "Completed");

                // Add one row to our table
                table.AddRow(item.Id, item.Text, item.CreatedAt, item.UpdatedAt, item.CompletedStatus);

                // Write the table
                table.Write(Format.Minimal);
            }
            catch (HttpRequestException)
            {
                Console.WriteLine("I could not find that item!");
            }
        }

        static async Task AddOneItem(string token, Item newItem)
        {
            var client = new HttpClient();

            // Generate a URL specifically referencing the endpoint for getting a single
            // todo item and provide the id we were supplied
            var url = $"https://one-list-api.herokuapp.com/items?access_token={token}";

            // Take the `newItem` and serialize it into JSON
            var jsonBody = JsonSerializer.Serialize(newItem);

            // We turn this into a StringContent object and indicate we are using JSON
            // by ensuring there is a media type header of `application/json`
            var jsonBodyAsContent = new StringContent(jsonBody);
            jsonBodyAsContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            // Send the POST request to the URL and supply the JSON body
            var response = await client.PostAsync(url, jsonBodyAsContent);

            // Get the response as a stream.
            var responseJson = await response.Content.ReadAsStreamAsync();

            // Supply that *stream of data* to a Deserialize that will interpret it as a *SINGLE* `Item`
            var item = await JsonSerializer.DeserializeAsync<Item>(responseJson);

            // Make a table to output our new item.
            var table = new ConsoleTable("ID", "Description", "Created At", "Updated At", "Completed");

            // Add one row to our table
            table.AddRow(item.Id, item.Text, item.CreatedAt, item.UpdatedAt, item.CompletedStatus);

            // Write the table
            table.Write(Format.Minimal);
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

            var keepGoing = true;
            while (keepGoing)
            {
                Console.Clear();
                Console.Write("Get (A)ll todo, or Get (O)ne todo, (C)reate a new item, or (Q)uit: ");
                var choice = Console.ReadLine().ToUpper();

                switch (choice)
                {
                    case "Q":
                        keepGoing = false;
                        break;

                    case "A":
                        await ShowAllItems(token);

                        Console.WriteLine("Press ENTER to continue");
                        Console.ReadLine();
                        break;

                    case "C":
                        Console.Write("Enter the description of your new todo: ");
                        var text = Console.ReadLine();

                        var newItem = new Item
                        {
                            Text = text
                        };

                        await AddOneItem(token, newItem);

                        Console.WriteLine("Press ENTER to continue");
                        Console.ReadLine();
                        break;

                    case "O":
                        Console.Write("Enter the ID of the item to show: ");
                        var id = int.Parse(Console.ReadLine());

                        await GetOneItem(token, id);

                        Console.WriteLine("Press ENTER to continue");
                        Console.ReadLine();
                        break;

                    default:
                        break;
                }
            }

        }
    }
}
```

# Updating an item

Updating an item is much like creating an item except for two specific changes.
First we see the documentation asks us to use the `PUT` verb instead of `POST`
and we must specify the `id` of the item in the URL in the same way we did for
retrieving a specific item.

First we will prompt the user for the id of the item, and then prompt them to
enter new values for the text and the completed state. This user interface could
be enhanced if we were to first fetch the existing item and allow the user to
_change_ the values instead of providing new entries. We'll leave this as an
exercise and also revisit it during lessons when we create full web-based user
interfaces.

First we will change our prompt:
`Console.Write("Get (A)ll todo, or Get (O)ne todo, (C)reate a new item, (U)pdate an item, or (Q)uit: ");`
and add a `case` to prompt the user:

```csharp
case "U":
    Console.Write("Enter the ID of the item to update: ");
    var existingId = int.Parse(Console.ReadLine());

    Console.Write("Enter the new description: ");
    var newText = Console.ReadLine();

    Console.Write("Enter yes or no to indicate if the item is complete: ");
    var newComplete = Console.ReadLine().ToLower() == "yes";

    var updatedItem = new Item
    {
        Text = newText,
        Complete = newComplete
    };

    await UpdateOneItem(token, existingId, updatedItem);

    Console.WriteLine("Press ENTER to continue");
    Console.ReadLine();
    break;
```

And then implement the method `UpdateOneItem`. Notice that it takes the token,
the id, and the updatedItem. Also note there is a high similarity between this
method and the `AddOneItem` method. We will refactor this later.

```csharp
static async Task UpdateOneItem(string token, int id, Item updatedItem)
{
    var client = new HttpClient();

    // Generate a URL specifically referencing the endpoint for getting a single
    // todo item and provide the id we were supplied
    var url = $"https://one-list-api.herokuapp.com/items/{id}?access_token={token}";

    // Take the `newItem` and serialize it into JSON
    var jsonBody = JsonSerializer.Serialize(updatedItem);

    // We turn this into a StringContent object and indicate we are using JSON
    // by ensuring there is a media type header of `application/json`
    var jsonBodyAsContent = new StringContent(jsonBody);
    jsonBodyAsContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

    // Send the POST request to the URL and supply the JSON body
    var response = await client.PutAsync(url, jsonBodyAsContent);

    // Get the response as a stream.
    var responseJson = await response.Content.ReadAsStreamAsync();

    // Supply that *stream of data* to a Deserialize that will interpret it as a *SINGLE* `Item`
    var item = await JsonSerializer.DeserializeAsync<Item>(responseJson);

    // Make a table to output our new item.
    var table = new ConsoleTable("ID", "Description", "Created At", "Updated At", "Completed");

    // Add one row to our table
    table.AddRow(item.Id, item.Text, item.CreatedAt, item.UpdatedAt, item.CompletedStatus);

    // Write the table
    table.Write(Format.Minimal);
}
```

Using the application:

```
Get (A)ll todo, or Get (O)ne todo, (C)reate a new item, (U)pdate an item, or (Q)uit: U
Enter the ID of the item to update: 1593
Enter the new description: Also Testing
Enter yes or no to indicate if the item is complete: yes
ID    Description   Created At            Updated At             Completed
--------------------------------------------------------------------------
1593  Also Testing  4/26/2020 8:50:48 PM  4/27/2020 12:57:37 PM  completed

Press ENTER to continue
```

## Deleting an item

For deleting an item the API documentation states we use a `DELETE` verb and
specify the id in the URL.

First we will update our prompt
`Console.Write("Get (A)ll todo, or Get (O)ne todo, (C)reate a new item, (U)pdate an item, (D)elete an item, or (Q)uit: ");`
and add a case statement:

```csharp
case "D":
    Console.Write("Enter the ID of the item to delete: ");
    var idToDelete = int.Parse(Console.ReadLine());

    await DeleteOneItem(token, idToDelete);

    Console.WriteLine("Press ENTER to continue");
    Console.ReadLine();
    break;
```

And the implementation only needs to only send the deletion request.

```csharp
static async Task DeleteOneItem(string token, int id)
{
    try
    {
        var client = new HttpClient();

        // Generate a URL specifically referencing the endpoint for getting a single
        // todo item and provide the id we were supplied
        var url = $"https://one-list-api.herokuapp.com/items/{id}?access_token={token}";

        await client.DeleteAsync(url);
    }
    catch (HttpRequestException)
    {
        Console.WriteLine("I could not find that item!");
    }
}
```

Our code is now:

```csharp
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
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

        static async Task ShowAllItems(string token)
        {
            var client = new HttpClient();

            var url = $"https://one-list-api.herokuapp.com/items?access_token={token}";
            var responseAsStream = await client.GetStreamAsync(url);

            // Supply that *stream of data* to a Deserialize that will interpret it as a List of Item objects.
            var items = await JsonSerializer.DeserializeAsync<List<Item>>(responseAsStream);

            var table = new ConsoleTable("ID", "Description", "Created At", "Completed");

            // For each item in our deserialized List of Item
            foreach (var item in items)
            {
                // Add one row to our table
                table.AddRow(item.Id, item.Text, item.CreatedAt, item.CompletedStatus);
            }

            // Write the table
            table.Write(Format.Minimal);
        }

        static async Task GetOneItem(string token, int id)
        {
            try
            {
                var client = new HttpClient();

                // Generate a URL specifically referencing the endpoint for getting a single
                // todo item and provide the id we were supplied
                var url = $"https://one-list-api.herokuapp.com/items/{id}?access_token={token}";

                var responseAsStream = await client.GetStreamAsync(url);

                // Supply that *stream of data* to a Deserialize that will interpret it as a *SINGLE* `Item`
                var item = await JsonSerializer.DeserializeAsync<Item>(responseAsStream);

                var table = new ConsoleTable("ID", "Description", "Created At", "Updated At", "Completed");

                // Add one row to our table
                table.AddRow(item.Id, item.Text, item.CreatedAt, item.UpdatedAt, item.CompletedStatus);

                // Write the table
                table.Write(Format.Minimal);
            }
            catch (HttpRequestException)
            {
                Console.WriteLine("I could not find that item!");
            }
        }

        static async Task AddOneItem(string token, Item newItem)
        {
            var client = new HttpClient();

            // Generate a URL specifically referencing the endpoint for getting a single
            // todo item and provide the id we were supplied
            var url = $"https://one-list-api.herokuapp.com/items?access_token={token}";

            // Take the `newItem` and serialize it into JSON
            var jsonBody = JsonSerializer.Serialize(newItem);

            // We turn this into a StringContent object and indicate we are using JSON
            // by ensuring there is a media type header of `application/json`
            var jsonBodyAsContent = new StringContent(jsonBody);
            jsonBodyAsContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            // Send the POST request to the URL and supply the JSON body
            var response = await client.PostAsync(url, jsonBodyAsContent);

            // Get the response as a stream.
            var responseJson = await response.Content.ReadAsStreamAsync();

            // Supply that *stream of data* to a Deserialize that will interpret it as a *SINGLE* `Item`
            var item = await JsonSerializer.DeserializeAsync<Item>(responseJson);

            // Make a table to output our new item.
            var table = new ConsoleTable("ID", "Description", "Created At", "Updated At", "Completed");

            // Add one row to our table
            table.AddRow(item.Id, item.Text, item.CreatedAt, item.UpdatedAt, item.CompletedStatus);

            // Write the table
            table.Write(Format.Minimal);
        }

        static async Task UpdateOneItem(string token, int id, Item updatedItem)
        {
            var client = new HttpClient();

            // Generate a URL specifically referencing the endpoint for getting a single
            // todo item and provide the id we were supplied
            var url = $"https://one-list-api.herokuapp.com/items/{id}?access_token={token}";

            // Take the `newItem` and serialize it into JSON
            var jsonBody = JsonSerializer.Serialize(updatedItem);

            // We turn this into a StringContent object and indicate we are using JSON
            // by ensuring there is a media type header of `application/json`
            var jsonBodyAsContent = new StringContent(jsonBody);
            jsonBodyAsContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            // Send the POST request to the URL and supply the JSON body
            var response = await client.PutAsync(url, jsonBodyAsContent);

            // Get the response as a stream.
            var responseJson = await response.Content.ReadAsStreamAsync();

            // Supply that *stream of data* to a Deserialize that will interpret it as a *SINGLE* `Item`
            var item = await JsonSerializer.DeserializeAsync<Item>(responseJson);

            // Make a table to output our new item.
            var table = new ConsoleTable("ID", "Description", "Created At", "Updated At", "Completed");

            // Add one row to our table
            table.AddRow(item.Id, item.Text, item.CreatedAt, item.UpdatedAt, item.CompletedStatus);

            // Write the table
            table.Write(Format.Minimal);
        }

        static async Task DeleteOneItem(string token, int id)
        {
            try
            {
                var client = new HttpClient();

                // Generate a URL specifically referencing the endpoint for getting a single
                // todo item and provide the id we were supplied
                var url = $"https://one-list-api.herokuapp.com/items/{id}?access_token={token}";

                var response = await client.DeleteAsync(url);

                // Get the response as a stream.
                await response.Content.ReadAsStreamAsync();
            }
            catch (HttpRequestException)
            {
                Console.WriteLine("I could not find that item!");
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

            var keepGoing = true;
            while (keepGoing)
            {
                Console.Clear();
                Console.Write("Get (A)ll todo, or Get (O)ne todo, (C)reate a new item, (U)pdate an item, (D)elete an item, or (Q)uit: ");
                var choice = Console.ReadLine().ToUpper();

                switch (choice)
                {
                    case "Q":
                        keepGoing = false;
                        break;

                    case "A":
                        await ShowAllItems(token);

                        Console.WriteLine("Press ENTER to continue");
                        Console.ReadLine();
                        break;

                    case "C":
                        Console.Write("Enter the description of your new todo: ");
                        var text = Console.ReadLine();

                        var newItem = new Item
                        {
                            Text = text
                        };

                        await AddOneItem(token, newItem);

                        Console.WriteLine("Press ENTER to continue");
                        Console.ReadLine();
                        break;

                    case "O":
                        Console.Write("Enter the ID of the item to show: ");
                        var id = int.Parse(Console.ReadLine());

                        await GetOneItem(token, id);

                        Console.WriteLine("Press ENTER to continue");
                        Console.ReadLine();
                        break;

                    case "U":
                        Console.Write("Enter the ID of the item to update: ");
                        var existingId = int.Parse(Console.ReadLine());

                        Console.Write("Enter the new description: ");
                        var newText = Console.ReadLine();

                        Console.Write("Enter yes or no to indicate if the item is complete: ");
                        var newComplete = Console.ReadLine().ToLower() == "yes";

                        var updatedItem = new Item
                        {
                            Text = newText,
                            Complete = newComplete
                        };

                        await UpdateOneItem(token, existingId, updatedItem);

                        Console.WriteLine("Press ENTER to continue");
                        Console.ReadLine();
                        break;

                    case "D":
                        Console.Write("Enter the ID of the item to delete: ");
                        var idToDelete = int.Parse(Console.ReadLine());

                        await DeleteOneItem(token, idToDelete);

                        Console.WriteLine("Press ENTER to continue");
                        Console.ReadLine();
                        break;

                    default:
                        break;
                }
            }

        }
    }
}
```

# Conclusion

We have created a TODO list manager that supports:

- Using a remote HTTP based API
- Supports multiple lists via access tokens (supported by the API)
- Create todo items
- Read todo items (all items and single items)
- Update todo items
- Delete todo items

This Create, Read, Update, and Delete pattern is so familiar it is often called
`CRUD` for short. You will find many applications that fit this `CRUD` pattern
though sometimes we will have to look at our environment from a unique
perspective to see the `CRUD` nature of it.

While creating an API client in `C#` has been interesting we will mostly create
clients in our front-end lessons using JavaScript. However, all of the concepts
we have covered here will be familiar to us when we create our front ends. In
other lessons we will see how to create the code to manage the API itself which
we will continue to use `C#` to implement.

> NOTE: There is a quite a bit of code to refactor here and we will do that next
> if you would like to see how this code can be simplified.
