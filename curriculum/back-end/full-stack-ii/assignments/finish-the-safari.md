# Finish the Safari

For this assignment, you should take your safari API that was already created, and create a simple react app that consumes that API.

## Objectives

- Work with an API that you created

## Requirements

- Create a React app that consumes an API that you created

### Explorer Mode

- [ ] Finish all the endpoints from the Safari API
- [ ] Create a simple react app, that uses some css make it looks friendly.
- [ ] The react app should:
  - [ ] Display all animals the user has seen
  - [ ] Display all animals seen in the `Jungle`
  - [ ] Remove all animals that I have seen in the `Desert`.
  - [ ] Add all the `CountOfTimesSeen` and get a total number of animals seen
  - [ ] Get the `CountOfTimesSeen` of `lions`, `tigers` and `bears`

### Adventure Mode

- [ ] Work on your capstone's HTML, CSS and JS

## Additional Resources

### .NET

Here are the interesting commands you will need for tonight's assignment

- To add Entity Framework to your project:

```
 dotnet add package Microsoft.EntityFrameworkCore.Design --version 2.1.3

 dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 2.1.2
```

- To create your database:

```
createdb <<DatabaseName>>
```

- To create the DbContext

```
dotnet ef dbcontext scaffold "server=localhost;database=<<DatabaseName>>" Npgsql.EntityFrameworkCore.PostgreSQL -c <<DatabaseName>>Context

```

- Add a migration:

```
 dotnet ef migrations add AddBaordGameTable
```

- Update your database

```
dotnet ef database update
```

- Documentation: [Dotnet EF CLI Docs](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet)
