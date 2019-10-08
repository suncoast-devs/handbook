# Welcome to a simple API in .NET

An API (application programming interface) is an interface or communication protocol between a client and a server intended to simplify the building of client-side software. [wikipedia](https://en.wikipedia.org/wiki/Application_programming_interface). In our world that means that an API is a web server that allows developers to store, retreive and manipulate data.

## RESTful APIs

Like most ideas in the developer world, an API can be build in a variety of ways. SOAP and GraphQL are alternatives solutions but the majority of website are using RESTful APIs to power their front end applications. We will be exploring how to create a RESTful API.

### What is a RESTful API

A RESTful API is an API designed and built around the idea that everything in my server is a resource and all my service calls are stateless.

#### A Resource

A Resource is considered to be any named `thing` inside the system. This could be a image, a document, a object, a user, or a service. Each resources has a a unique URI (universal resource identifier). This URI is usually realized in the form of a URL. These URLs should always reflect `things`, not actions. Actions in a RESTful API are described in the HTTP Verbs of the request.

Good URI/URLs:

- https://www.sdg.com/api/students/4
- https://www.sdg.com/api/food/ice cream

#### Stateless

REST is an acronym that sounds for REpresentational State Transfer. This means that the server does not have any information about client.Statelessness means that every request to our server happens in complete isolation. Each request is idempotent. Each request The responsibility for storing and handling all state related information falls on the client; In our case, the client is a React App.

## RESTful and Web API

In the C# world, to build RESTful APIs, we use a technology called Web API. Web API is a part of ASP.NET, specifically designed for build APIs.

## Create a new API

To create a new API, we will use the dotnet scaffolding tools. For a basic web app, use the comment

```
dotnet new webapi -n MyCoolApiProject
```

That will make you a new API project called 'MyCoolApiProject'. `cd` into that project and open it with `code .` and run the project with `dotnet watch run`

### The key parts of an Web API project

#### StartUp.cs

The Startup.cs contains 2 important methods; `ConfigureServices` and `Configure`

- **ConfigureServices** is an optional (though usually defined) method that is called when the service is initially started. This method is used to configure and register different services for your webserver. Services are classes and libraries that we use in our apps to solve problems, such as database connections and also setting up authentication schemes. This is usually a

- **Configure** is how the server will respond to HTTP requests. This method creates what is called the HTTP pipeline. The HTTP pipeline denotes how the request is handled and in what order methods are run. Common tasks here include routing, enforce HTTPs, and establish where static files are.

These methods are usually touch very little.

Sample Startup.cs with comments in line

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

> Web API and web apps in general are structure in a MVC architectural pattern. To learn more about this pattern, [**read this page**](https://docs.microsoft.com/en-us/aspnet/core/mvc/overview?view=aspnetcore-3.0) and then come back.

Controllers are where our logic will take place. Controllers are classes that handle browser requests. They retrieve data from the database (the Models) and create the response for the View. This could be HTML or, for an API, JSON. For example, the controller accepts parameters from a incoming request, queries the database, and then will create the JSON structure to be retured to the view; in our case, a React app.

A Sample Controller with comments in line

```C#

// Mininal Using statements
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

// All controllers should go into the Contorller namespace, and by extension be in the controller folder
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

Controllers and the Startup.cs are the main part of the an API. In other lessons we will cover talking to databases and using a React app

### SDG Template

SDG has a template to make developing APIs even easier. To install the template:

```bash
dotnet new -i SDG.templates.Web.API
```

This has already installed and set up:

- CORS
- Postgres & EF Core
- Swagger
- Docker
