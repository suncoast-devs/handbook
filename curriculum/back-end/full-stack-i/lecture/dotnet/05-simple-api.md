# Welcome to a simple API in .NET

An API (application programming interface) is an interface or communication protocol between a client and a server intended to simplify the building of client-side software. [wikipedia](https://en.wikipedia.org/wiki/Application_programming_interface). In our world, that means that an API is a web server that allows developers to store, retrieve, and manipulate data.

## RESTful APIs

Like most ideas in the software world, there are multiway ways to build an API. SOAP and GraphQL are alternatives solutions, but the majority of websites use RESTful APIs to power their front end applications. We are exploring how to create a RESTful API.

### What is a RESTful API

A RESTful API is an API designed and built around the idea that everything in my server is a resource, and all my service calls are stateless.

#### A Resource

A Resource is any named `thing` inside the system. A resource could be an image, a document, an object, a user, or a service, which, in turn, has a unique URI (universal resource identifier). This URI typically is a URL. These URLs should always reflect `things,` not actions. Actions in a RESTful API are described using the HTTP Verbs of the request.

Useful URI/URLs:

- https://www.sdg.com/api/students/4
- https://www.sdg.com/api/food/ice cream

#### Stateless

REST is an acronym that sounds for REpresentational State Transfer. The idea of REST means that the server does not have any information about the client. Statelessness means that every request to our server happens in complete isolation. Each request is idempotent. Each request The responsibility for storing and handling all state-related information falls on the client; In our case, the client is a React App.

## RESTful and Web API

In the C# world, to build RESTful APIs, we use a technology called Web API. Web API is a part of ASP.NET, designed explicitly for build APIs.

## Create a new API

To create a new API, we use the dotnet scaffolding tools. For a basic web app, use the comment.

```
dotnet new webapi -n MyCoolApiProject
```

That makes you a new API project called 'MyCoolApiProject'. `cd` into that project and open it with `code .` and run the project with `dotnet watch run`.

### The critical parts of a Web API project

#### StartUp.cs

The Startup.cs contains 2 important methods; `ConfigureServices` and `Configure`

- **ConfigureServices** is an optional (though usually defined) method that is called when the server is started. This method configures and registers different services for your webserver. Services are classes and libraries that we use in our apps to solve problems, such as database connections and also setting up authentication schemes.

- **Configure** is how the server responds to HTTP requests. This method creates what is called the HTTP pipeline. The HTTP pipeline denotes how requests to your web server are handled and in what order methods run. Usual tasks here include routing, enforce HTTPs, and establish where static files are.

These methods are usually touch very little.

Sample Startup.cs with comments inline

```C#

// The minimal libraries needed.
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace TestApi5
{
 public class Startup
 {

 public Startup(IConfiguration configuration)
 {
 Configuration = configuration;
 }

 public IConfiguration Configuration { get; }

 // This method gets called by the runtime. Use this method to add services to the container.
 public void ConfigureServices(IServiceCollection services)
 {
 // lets our app know we have controllers (see MVC for more about controllers)
 services.AddControllers();
 }

 // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
 public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
 {
 // checks if the incoming request is HTTPs, if its not, then it will redirect to HTTP
 app.UseHttpsRedirection();
 // The app that we are using some form of routing that will follow.
 app.UseRouting();
 // Checks if the incoming request has any authentication data (tokens, cookies, etc). If it does, then use it.
 app.UseAuthorization();
 // Maps our controllers to be our endpoints for out app
 app.UseEndpoints(endpoints =>
 {
 endpoints.MapControllers();
 });
 }
 }
}

```

#### Controllers

> Web API and web apps, in general, are structured in an MVC architectural pattern. To learn more about this pattern, [**read this page**](https://docs.microsoft.com/en-us/aspnet/core/mvc/overview?view=aspnetcore-3.0) and then come back.

Controllers are where our logic takes place. Controllers are classes that handle browser requests. They retrieve data from the database (the Models) and create the response for the View. The View could be HTML or, for an API, JSON. For example, the controller accepts parameters from an incoming request, queries the database, and then creates the JSON structure to be returned to the view; in our case, a React app.

A Sample Controller with comments inline

```C#

// Mininal Using statements
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

// All controllers should go into the Controller namespace, and by extension, be in the controller folder
namespace SampleApi.Controllers
{
 // enables certain API behaviors: https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-3.0#apicontroller-attribute
 [ApiController]
 // defines the URL for the controller. This one will be at https://domain.com/api/people
 [Route("api/[controller]")]
 // All controllers are just classes, and this class inherits from ControllerBase. ControllerBase gives basic support for handling web requests with Razor; read more : https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-3.0#controllerbase-class
 public class PeopleController : ControllerBase
 {
 // use the services to give the controller access to the database
 private readonly DatabaseContext _context;

 public PeopleController(DatabaseContext context)
 {
 _context = context
 }
 // each method on the class is a new endpoint in the API. This is a GET method and located at GET /api/People
 // this returns a HTTP 200, with a List of People
 [HttpGet]
 public ActionResult<IEnumerable<Person>> GetAllFavoritePeople()
 {
 return _context.People.Where(w => w.isFavorite);
 }
 }
}
```

Controllers and the Startup.cs are the central part of an API. In other lessons, we cover talking to databases and using a React app.

### SDG Template

SDG has a template to make developing APIs even more straightforward. To install the template:

```bash
dotnet new -i SDG.templates.Web.API
```

This template has already installed and set up:

- CORS
- Postgres & EF Core
- Swagger
- Docker
