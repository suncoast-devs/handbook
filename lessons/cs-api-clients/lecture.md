theme: Next,1

# [fit] API Clients in `C#`

---

# [fit] One List API

---

# [fit] HttpClient to access the API

---

# Creating our one list API client.

We will generate a console application with:

```shell
dotnet new sdg-console -o OneListClient
```

---

# Create an instance of `HttpClient`

```csharp
var client = new HttpClient();
```

The `HttpClient` is the built-in class we will use to send and receive information to APIs over HTTP.

The `HttpClient` object we create, in the variable named `client`, will have many methods for both sending and receiving data.

---

# Basic GET

The first we will review is a method that makes a `GET` request to a server and returns the `response body` as a `string`.

---

# GetStringAsync

```csharp
var responseAsString = client.GetStringAsync(
  "https://one-list-api.herokuapp.com/items?access_token=sdg-handbook"
);
```

---

# [fit] What is Async?

<br/>

## Synchronous

## vs

## Not-synchronous

^ Describe syncrhonous code.
^ What are the benefits of async? (multiple requests processing at once)
^ What are the challenges? (Have to deal with things happening in an order that doesn't follow the flow of the code)

---

# await

Add the keyword `await` before the `GetStringAsync`

Any time we ask a method, in this case `Main` to use `await` we need to make the method itself `async` or to have it return a new kind of object called a `Task`.

If you place your cursor on the error and press `Control .` (Windows) or `Command .` (Mac) you will see the _Quick Fix_ suggestion `Make method async`. Doing so turns the code into:

---

```csharp
static async System.Threading.Tasks.Task Main(string[] args)
{
    var client = new HttpClient();

    var responseAsString = await client.GetStringAsync(
      "https://one-list-api.herokuapp.com/items?access_token=sdg-handbook"
    );
```

---

One last refactor is to take the long `System.Threading.Tasks.Task` and make it just `Task` and then add a `using System.Threading.Tasks;` to our code.

---

# [fit] Run the code

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
```

---

# [fit] CONGRATULATIONS

You have just written your first API client that accesses data remotely over the Internet!

---

# Processing the data

Notice that this is just one long string of data.

Notice that the JSON data represent an array.

It would be convenient if we could _convert_ this JSON string into some objects that `C#` knows how to deal with nicely.

This introduces the idea of **`serialization`**

---

# Serialization / Deserialization

`Serial` - meaning one at a time.

|                   |                                                        |
| ----------------- | ------------------------------------------------------ |
| `Deserialization` | Turn a string of characters into more structured data. |
| `Serialization`   | Turn structured data into a string of characters.      |

---

# Processing the data by defining a class to store the results

The data returned from our `GET` is an array of items.

The objects in that array follow this format:

```C#
id: int
text: string
complete: bool
created_at: string
updated_at: string
```

---

# [fit] Define a C# class to represent this JSON

```csharp
class Item
{
    public int id { get; set; }
    public string text { get; set; }
    public bool complete { get; set; }
    public string created_at { get; set; }
    public string updated_at { get; set; }
}
```

---

# Mapping

Notice that we define the _properties_ of our class to have **the same names as the keys of our JSON object**.

This is a **CRITICAL** point because the _deserializer_ will use this pattern to know where to put the data.

This process is very similar to the ORM mapping we use with Entity Framework.

---

# Example

```json
{
  "id": 6,
  "text": "Finish Assignment",
  "complete": true,
  "created_at": "2016-08-17T20:06:34.874Z",
  "updated_at": "2018-10-02T16:10:59.754Z"
}
```

---

The deserializer will make a new _instance_ of `Item` for us and copy the `6` from the `"id"` JSON key into the `id` property in our object.

Then it will copy the value `"Finish Assignment"` from the `"text"` key in the JSON into the `text` property of our object, and so on.

If we follow this _convention_ (pattern) the deserializer will do a lot of work on our behalf without having to write individual statements to tell it how to work.

---

# Using the _deserializer_

In order to use the _deserializer_ to convert our response into a `List` of `Item` objects we need to make a modification.

The first is to not retrieve the `GET` result as a `string` but as a `stream`.

A `stream` is a variable that knows how to read data one chunk at a time (often one character at a time).

By using a `stream` the _deserializer_ can process data a little at a time in case the input is quite large.

---

# Modify the code

```csharp
var responseAsStream = await client.GetStreamAsync(
  "https://one-list-api.herokuapp.com/items?access_token=sdg-handbook"
);
```

And then we need to supply this `stream` to the _deserializer_

```csharp
var items =
 await JsonSerializer.DeserializeAsync<List<Item>>(
   responseAsStream
);
```

---

# Walk the code

```csharp
//
// Wait for the async
// |
// |                    Use the deserializer
// |                    |
// |                    |                Deserialize a list of items
// |                    |                |
// |                    |                |
// v                    v                v
   await JsonSerializer.DeserializeAsync<List<Item>>(
     responseAsStream
   );
```

---

```csharp
// For each item in our deserialized List of Item
foreach (var item in items)
{
    // Output some details on that item
    Console.WriteLine($"The task {item.text}" +
    $" was created on {item.created_at} and " +
    $" has a completion of: {item.complete}");
}
```

---

# Improve

Date is formatted as a long string that is not very user friendly.

We can improve this by changing the data type from `string` to `DateTime` in our `Item` class.

Thus when the _deserializer_ is processing those fields it will try to _convert_ (the technical term is _coerce_) the string format into a
`DateTime`.

Luckily for us that string is in a very specific format called an [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) format and `DateTime` knows how to deal with it.

---

# Complete Status

The `False` is not friendly so let's improve that. We can add another custom property which contains logic for its `get` implementation:

```csharp
public string CompletedStatus
{
    get
    {
        return complete ? "completed" : "not completed";
    }
}
```

---

# Use C# style property names

```csharp
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
```

---

# Make the output pretty

```shell
dotnet add package ConsoleTables
```

The [documentation for ConsoleTables](https://github.com/khalidabuhakmeh/ConsoleTables) shows us how to create a table with headers, add rows, and output the table itself.

---

```csharp
var table = new ConsoleTable(
  "Description",
  "Created At",
  "Completed");

// For each item in our deserialized List of Item
foreach (var item in items)
{
    // Add one row to our table
    table.AddRow(
      item.Text,
      item.CreatedAt,
      item.CompletedStatus);
}

// Write the table
table.Write();
```

---

# Getting the name of the list from the command line.

We've been ignoring a variable that has been present in all of our `C#` applications so far, `args`.

The `string[] args` parameter to `Main` are the command line arguments that appear after our `dotnet run` command.

So we can use this to get the name of the list we want to process.

---

# Getting name of list

Since this is an array we can access the 0th (first) element: `var token=args[0]` and then use string interpolation to generate our URL:

```csharp
var url = $"https://one-list-api.herokuapp.com/items?access_token={token}";
```

---

# What if we don't supply a token?

```csharp
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
```

---

# Add a menu

^ This starts in the `continued.md` lesson section

---

# Show all

```csharp
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
```

# Fetching a specific todo item

```csharp
case "O":
    Console.Write("Enter the ID of the item to show: ");
    var id = int.Parse(Console.ReadLine());

    await GetOneItem(token, id);

    Console.WriteLine("Press ENTER to continue");
    Console.ReadLine();
    break;
```

---

# [fit] Implement `GetOneItem`

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

---

# What if the user enters an item that doesn't exist?

^ 404 error

---

# [fit] Wrap code in a `try / catch` to capture exception

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

---

# [fit] Handling an item that doesn't exist

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

---

# [fit] Creating a new element

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

---

# [fit] Implement the `AddOneItem` method.

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

---

# [fit] Updating an item

---

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

---

# [fit] UpdateOneItem

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

---

# [fit] Delete an item

```csharp
case "D":
    Console.Write("Enter the ID of the item to delete: ");
    var idToDelete = int.Parse(Console.ReadLine());

    await DeleteOneItem(token, idToDelete);

    Console.WriteLine("Press ENTER to continue");
    Console.ReadLine();
    break;
```

---

# [fit] Implement DeleteOneItem

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

---

# [fit] Complete TODO client app!
