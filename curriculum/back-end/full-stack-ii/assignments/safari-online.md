---
title: Take the Safari Online.
draft: true
---

# Let's Continue our safari adventure

You are tasked with taking the Safari DB you created and putting that into an API. This API should use the simple Safari Database that we created. 



## Objectives
- Practice Creating Simple APIs
- Practice working with API Tools, such as POSTMAN (https://www.getpostman.com/)

## Requirements
- Using Ruby on Rails or ASP.NET create a simple API for you Safari Database
- Use your language's naming conventions where appropriate. 


### Explorer Mode

* [ ] Create the following endpoints: 
    - [ ] Create `GET /Animals` Endpoint that returns all animals you have seen
    - [ ] Create `GET /Search?species=lion` that returns all animals where the species name contains the title parameter
    - [ ] Create a `POST /Animal` endpoints that adds a movie to the database. THis should take a JSON body
    - [ ] Create a `GET /Animal/{location}` that returns animals of only that location
    - [ ] Create a `PUT /Animal/{animal}` endpoint that adds 1 to that animal
    - [ ] Create a `DELETE /Animal/{animal}` endpoint that deletes that animal from the database
 
### Adventure Mode
- [ ] Normalize your database to have `Location` be its own table
- [ ] Extend your `Search` endpoint to search by animal or by location
- [ ] Create a `PUT /Animal/{animal}/{amount}` endpoint that adds `{amount}` to that animal


### Epic Mode
- [ ] Create a React or Vue app that talks to your API and Interacts with all the endpoints


## Additional Resources

### .NET 

Here are the interesting commands you will need for tonights assignment

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







NOTES: 
- You may want to delete and recreate your database