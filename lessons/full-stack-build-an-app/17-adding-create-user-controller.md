---
title: Adding "create user" controller
order: 17
---

# Add a controller to create new Users

Let's use the code generator to make a new controller for managing users. We
will keep the `POST` action to create a new user. Later on, we may add user
management features where we need to add back in other commands like `DELETE`
and `PUT`. We also certainly do not want to expose any `GET` actions where
someone could list all the users!

```shell
dotnet aspnet-codegenerator controller --model User -name UsersController --useAsyncActions -api --dataContext DatabaseContext --relativeFolderPath Controllers
```

This is the only `Http` method we will leave in the file:

```csharp
[HttpPost]
public async Task<ActionResult<User>> PostUser(User user)
{
    // Indicate to the database context we want to add this new record
    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    // Return a response that indicates the object was created (status code `201`) and some additional
    // headers with details of the newly created object.
    return CreatedAtAction("GetUser", new { id = user.Id }, user);
}
```

<GithubCommitViewer repo="gstark/TacoTuesday" commit="cbefbb4"/>
