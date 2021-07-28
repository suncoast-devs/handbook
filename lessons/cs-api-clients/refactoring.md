---
title: Refactoring our One List API client
---

There is quite a bit of repetitive code in our application. Let's take a look at
places where we can share functionality.

## Extract a property for the common base URL

One of the first things you will notice in the application is the repetition of
the `https://one-list-api.herokuapp.com/items/` part of the URL. We can extract
this to a class property and access it throughout the code.

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

        static private string BASE_URL = "https://one-list-api.herokuapp.com/items/";

        static async Task ShowAllItems(string token)
        {
            var client = new HttpClient();

            var url = $"{BASE_URL}?access_token={token}";
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
                var url = $"{BASE_URL}{id}?access_token={token}";

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
            var url = $"{BASE_URL}{id}?access_token={token}";

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
                var url = $"{BASE_URL}{id}?access_token={token}";

                await client.DeleteAsync(url);
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

## Add method to show one item in a table

The next major repetition is the display of a single item in a table.

```csharp
// Make a table to output our new item.
var table = new ConsoleTable("ID", "Description", "Created At", "Updated At", "Completed");

// Add one row to our table
table.AddRow(item.Id, item.Text, item.CreatedAt, item.UpdatedAt, item.CompletedStatus);

// Write the table
table.Write(Format.Minimal);
```

We can make a method to handle this

```csharp
static void ShowOneItem(Item item)
{
    // Make a table to output our new item.
    var table = new ConsoleTable("ID", "Description", "Created At", "Updated At", "Completed");

    // Add one row to our table
    table.AddRow(item.Id, item.Text, item.CreatedAt, item.UpdatedAt, item.CompletedStatus);

    // Write the table
    table.Write(Format.Minimal);
}
```

## Add method to handle the response JSON when returning a single item

Next up is the processing of the response JSON. We can make a method to handle
that. Notice that since we call an `await` our method needs to be `async` and it
returns a `Task<Item>` since we want it to return an `Item` but we wrap it in a
`Task` so .NET can handle the async nature.

```csharp
static async Task<Item> ConvertResponseToItem(HttpResponseMessage response)
{
    // Get the response as a stream.
    var responseJson = await response.Content.ReadAsStreamAsync();

    // Supply that *stream of data* to a Deserialize that will interpret it as a *SINGLE* `Item`
    var item = await JsonSerializer.DeserializeAsync<Item>(responseJson);

    return item;
}
```

And now we can update the code to a pattern like:

```csharp
var item = await ConvertResponseToItem(response);
```

Notice the `GetOneItem` method, it is using `GetStreamAsync`, but if we change
this to `GetAsync` we can use our new `ConvertResponseToItem` method.

## Handle the code of converting an Item to an HTTP body

This code

```csharp
// Take the `newItem` and serialize it into JSON
var jsonBody = JsonSerializer.Serialize(updatedItem);

// We turn this into a StringContent object and indicate we are using JSON
// by ensuring there is a media type header of `application/json`
var jsonBodyAsContent = new StringContent(jsonBody);
jsonBodyAsContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
```

Is repeated in `UpdateOneItem` and `AddOneItem` so we can make a method for it

```csharp
static HttpContent ConvertItemToHttpBody(Item item)
{
    // Take the `newItem` and serialize it into JSON
    var jsonBody = JsonSerializer.Serialize(item);

    // We turn this into a StringContent object and indicate we are using JSON
    // by ensuring there is a media type header of `application/json`
    var jsonBodyAsContent = new StringContent(jsonBody);
    jsonBodyAsContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

    return jsonBodyAsContent;
}
```

Notice here that the method returns an `HttpContent`, not a `StringContent`,
this is because `HttpContent` is the _parent_ class and is more abstract. When
possible we should return abstract classes but create specific types.

## Final code

While there is more we could refactor here, this is a nice improvement over the
repeated code. It also makes each of the methods `GetOneItem`, `AddOneItem`,
etc. easier to read since we are only concentrating on the major elements of the
work each of those methods needs to do. The details are contained in shared
methods and we can peek into them when needed.

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

        static private string BASE_URL = "https://one-list-api.herokuapp.com/items/";

        static async Task ShowAllItems(string token)
        {
            var client = new HttpClient();

            var url = $"{BASE_URL}?access_token={token}";
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
                var url = $"{BASE_URL}{id}?access_token={token}";

                var response = await client.GetAsync(url);

                var item = await ConvertResponseToItem(response);

                ShowOneItem(item);
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

            var body = ConvertItemToHttpBody(newItem);

            // Send the POST request to the URL and supply the JSON body
            var response = await client.PostAsync(url, body);

            var item = await ConvertResponseToItem(response);

            ShowOneItem(item);
        }

        static async Task UpdateOneItem(string token, int id, Item updatedItem)
        {
            var client = new HttpClient();

            // Generate a URL specifically referencing the endpoint for getting a single
            // todo item and provide the id we were supplied
            var url = $"{BASE_URL}{id}?access_token={token}";

            var body = ConvertItemToHttpBody(updatedItem);

            // Send the POST request to the URL and supply the JSON body
            var response = await client.PutAsync(url, body);

            var item = await ConvertResponseToItem(response);

            ShowOneItem(item);
        }

        static async Task DeleteOneItem(string token, int id)
        {
            try
            {
                var client = new HttpClient();

                // Generate a URL specifically referencing the endpoint for getting a single
                // todo item and provide the id we were supplied
                var url = $"{BASE_URL}{id}?access_token={token}";

                await client.DeleteAsync(url);
            }
            catch (HttpRequestException)
            {
                Console.WriteLine("I could not find that item!");
            }
        }

        static HttpContent ConvertItemToHttpBody(Item item)
        {
            // Take the `newItem` and serialize it into JSON
            var jsonBody = JsonSerializer.Serialize(item);

            // We turn this into a StringContent object and indicate we are using JSON
            // by ensuring there is a media type header of `application/json`
            var jsonBodyAsContent = new StringContent(jsonBody);
            jsonBodyAsContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return jsonBodyAsContent;
        }

        static async Task<Item> ConvertResponseToItem(HttpResponseMessage response)
        {
            // Get the response as a stream.
            var responseJson = await response.Content.ReadAsStreamAsync();

            // Supply that *stream of data* to a Deserialize that will interpret it as a *SINGLE* `Item`
            var item = await JsonSerializer.DeserializeAsync<Item>(responseJson);

            return item;
        }

        static void ShowOneItem(Item item)
        {
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
