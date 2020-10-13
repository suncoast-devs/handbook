---
title: Prevent Duplicate Users
order: 19
---

## Avoid duplicate email addresses

To make the email unique we can add a _unique index_ on the field. Indexes are a
database optimization technique that allows the database to have fast access to
looking up information based on a specific column. We automatically get an index
on our `Id` column to make those lookups fast. Most of the databases we've
worked with so far haven't been so large that indexes have been needed to make
them fast. However, we are going to use them here.

When creating an index we specify the columns involved. This makes lookups for
values in those columns fast. Of course creating an index takes up more space in
our database and it also makes **inserting** data slower since it needs to
insert data into our table and additionally update the index information as
well.

One of the aspects we can make of an index is to specify that for the column, or
columns, involved that the values be **unique**.

To create our unique index we will add some code to our `DatabaseContext` model.

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
   modelBuilder.Entity<User>().HasIndex(user => user.Email) .IsUnique();
}
```

Then we will generate a migration:

```shell
dotnet ef migrations add AddUserEmailIndex
```

Then run the migration:

```shell
dotnet ef database update
```

If we attempt to create a user with a duplicate email address we will get an
_exception_ in our controller. To handle that we will _catch_ the exception and
instead of terminating the request we will send back a custom error message:

```csharp
[HttpPost]
public async Task<ActionResult<User>> PostUser(User user)
{
    try
    {

        // Indicate to the database context we want to add this new record
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Return a response that indicates the object was created (status code `201`) and some additional
        // headers with details of the newly created object.
        return CreatedAtAction("GetUser", new { id = user.Id }, user);
    }
    catch (Microsoft.EntityFrameworkCore.DbUpdateException)
    {
        // Make a custom error response
        var response = new
        {
            status = 400,
            errors = new List<string>() { "This account already exists!" }
        };

        // Return our error with the custom response
        return BadRequest(response);
    }
}
```

Since we are generating the same style error that validation errors do we will
get a nice error in the UI when someone attempts to use an email address that
exists.

<GithubCommitViewer repo="gstark/TacoTuesday" commit="ec731b3"/>
