---
title: Adding Restaurant Validation
order: 10
---

# Handling validation

You may also notice that our system allows us to enter blank information for
many of the fields. A name and address should be required to create a new
restaurant.

Let's add that validation and the corresponding error handling in the user
interface.

## Required fields in the model

We can add an _annotation_ named
[`Required`](https://docs.microsoft.com/en-us/ef/core/modeling/entity-properties?tabs=data-annotations%2Cfluent-api%2Cwithout-nrt#explicit-configuration)
to both the `Name` and `Address` field in our `Restaurant.cs` to indicate these
attributes are mandatory.

Using the optional `(ErrorMessage = "Message")` you can customize the error
message.

```csharp
using System.ComponentModel.DataAnnotations;

namespace TacoTuesday.Models
{
    public class Restaurant
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required(ErrorMessage = "You must provide an address.")]
        public string Address { get; set; }

        public string Telephone { get; set; }
    }
}
```

We will generate a new migration to capture this change. Any time we add,
remove, or change a **field** in a database-backed model we must create a new
migration.

```shell
dotnet ef migrations add AddRestaurantRequiredFields
```

The new migration will have an `Up()` method:

```csharp
protected override void Up(MigrationBuilder migrationBuilder)
{
    migrationBuilder.AlterColumn<string>(
        name: "Name",
        table: "Restaurants",
        nullable: false,
        oldClrType: typeof(string),
        oldType: "text",
        oldNullable: true);

    migrationBuilder.AlterColumn<string>(
        name: "Address",
        table: "Restaurants",
        nullable: false,
        oldClrType: typeof(string),
        oldType: "text",
        oldNullable: true);
}
```

When we run this migration, it will enforce that these columns may not have
`null` and thus are required.

```shell
dotnet ef database update
```

> NOTE: If any of your data rows **DO** have `NULL` in these columns the
> migration run will fail. You will have to add data to those rows or remove
> those rows before the migration executes.

## Handling errors in the user interface

Try adding a new restaurant without a name or address. You will notice now that
you get a `400` response instead of a `200`. However, the UI still redirects us
back to the main page.

We are redirected because the `fetch` usage is not looking for an error response
from the server.

Let us inspect the `JSON` returned when an error happens:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "|db64e96a-42aaf0a333dd69ff.",
  "errors": {
    "Name": ["The Name field is required."],
    "Address": ["The Address field is required."]
  }
}
```

We see a `status` field containing the value `400`, an HTTP error code. We can
use that information and the `errors` to give the user information about the
error.

Let's create a state variable to hold an error text.

```
const [errorMessage, setErrorMessage] = useState()
```

Then in the `fetch` method, we can detect the `apiResponse.status === 400` and
set the error message. If there is not an error, we redirect as we once did.

```javascript
if (response.status === 400) {
  setErrorMessage(Object.values(json.errors).join(' '))
} else {
  history.push('/')
}
```

Now we can use the value `errorMessage` to optionally display an `alert`
bootstrap element to the user.

```jsx
{
  errorMessage ? <p>{errorMessage}</p> : null
}
```

If you try saving a restaurant now without a name and address, you'll see this
message:

```
The Name field is required. The Address field is required.
```

However, if you fill in the name field, only the address will display an error.

## Improving the user experience

Rather than showing a sentence at the top, we could store the error object and
use it to highlight each field that has an error, decorating the input field
with a red border and adding the error text next to the field.

We'll leave this as an exercise for the reader. Also, you may want to look into
some popular React forms libraries that add these capabilities for you.

## Files Updated

<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="2ec3292267e91ce26675e278ed99a6f8c19287d2" />
