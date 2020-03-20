import CodePen from '@handbook/CodePen'

# Using identity for authentication

When dealing with users, the very concept automatically adds several layers of complexity. Now we need to figure out how to store users, how to authenticate users and how to authorize users.

Because authenication is complex topic with many solutions, we discuess the theory behind how and then discuss a stragety using ASP.NET Core Identity to help manage our users.

## Theory

### Storing users

To start, our system will have users. Users is another noun in our system; that means we will be using a database to store our users. We treat this as we would any other entity in our system. The only special case is how we treat passwords. **Never store passwords in plain text**. We will be storing what is called a password hash. A hash is a one-way transformation from one string to another. When the server receives the password from the client, the server will run a hashing function on the password to generate a "shadow" of the password. We can store this "shadow" of the password and use that instead. Hashed passwords are secure because in order to figure out what the password is, it would an impractical amount of time (think centuries and longer)

### Authentication

Authentication is the next part of users that we need to look at. Authentication is the process in which we verify users are who they say they are. This typically takes the form of a username and a secret phrase (a password).

Authentication happens only when a user logs into an app. There are several authentication schemas, but they are do the same thing. At a basic level, they check that the secret phrase that you provided is valid for the user you are claiming to be.

### Authorization

Authorization is the process that we use to validate that user can do what they are trying to do. This will is when we are able to tell if the user is allowed to do what they are doing.

In practice, authorization and authentication usually go hand in hand. Typically use the same technology to accomplish both tasks. In modern apps one such strategy is to use [json web tokens(JWT)](https://jwt.io).

### JWT

[Json web tokens(JWT)](https://jwt.io) are a open, industry standard method of transferring verifiable data between two systems. We will use JWTs as a way to validate that our users have been authenticated.

## The code

// TODO:
Auth Controller

```C#
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AuthExample.Models;
using AuthExample.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace AuthExample.Controllers
{
  [Route("auth")]
  [ApiController]
  public class AuthController : ControllerBase
  {


    private readonly DatabaseContext db;

    public AuthController(DatabaseContext context)
    {
      this.db = context;
    }

    [HttpPost("signup")]
    public async Task<ActionResult> SignUpUser(NewUserModel userData)
    {

      var existingUser = await this.db.Users.FirstOrDefaultAsync(f => f.Username == userData.Username);
      if (existingUser != null)
      {
        return BadRequest(new { Message = "user already exists" });
      }

      var user = new User
      {
        Email = userData.Email,
        FullName = userData.FullName,
        Username = userData.Username,
        HashedPassword = ""
      };
      // hash the password

      var hashed = new PasswordHasher<User>().HashPassword(user, userData.Password);
      user.HashedPassword = hashed;

      this.db.Users.Add(user);
      await this.db.SaveChangesAsync();

      var expirationTime = DateTime.UtcNow.AddSeconds(10000);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim("id", user.Id.ToString())
        }),
        Expires = expirationTime,
        SigningCredentials = new SigningCredentials(
              new SymmetricSecurityKey(Encoding.ASCII.GetBytes("bRhYJRlZvBj2vW4MrV5HVdPgIE6VMtCFB0kTtJ1m")),
              SecurityAlgorithms.HmacSha256Signature
          )
      };
      var tokenHandler = new JwtSecurityTokenHandler();
      var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

      return Ok(new { user, token });
    }


    [HttpPost("login")]
    public async Task<ActionResult> LoginUser(LoginViewModel loginData)
    {
      var user = await this.db.Users.FirstOrDefaultAsync(f => f.Username == loginData.Username);
      if (user == null)
      {
        return BadRequest(new { Message = "User does not exist" });
      }

      var verificationResult = new PasswordHasher<User>().VerifyHashedPassword(user, user.HashedPassword, loginData.Password);

      if (verificationResult == PasswordVerificationResult.Success)
      {

        var expirationTime = DateTime.UtcNow.AddHours(10);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Subject = new ClaimsIdentity(new[]
          {
            new Claim("id", user.Id.ToString())
        }),
          Expires = expirationTime,
          SigningCredentials = new SigningCredentials(
                 new SymmetricSecurityKey(Encoding.ASCII.GetBytes("bRhYJRlZvBj2vW4MrV5HVdPgIE6VMtCFB0kTtJ1m")),
                SecurityAlgorithms.HmacSha256Signature
            )
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

        return Ok(new { user, token });
      }
      else
      {
        return BadRequest(new { message = "Wrong password" });
      }
    }

  }
}
```

Startup.cs

```C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using AuthExample.Models;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;


namespace AuthExample
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
      services.AddMvc();
      services.AddCors();
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
      });
      services.AddDbContext<DatabaseContext>();
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                     .AddJwtBearer(options =>
                     {
                       options.TokenValidationParameters = new TokenValidationParameters
                       {
                         ValidateIssuer = false,
                         ValidateAudience = false,
                         ValidateLifetime = true,
                         ValidateIssuerSigningKey = true,

                         IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("bRhYJRlZvBj2vW4MrV5HVdPgIE6VMtCFB0kTtJ1m"))
                       };
                     });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      app.UseCors(builder =>
        builder
         .AllowAnyHeader()
         .AllowAnyMethod()
         .AllowAnyOrigin()
         );

      app.UseHttpsRedirection();
      app.UseSwagger();

      // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
      // specifying the Swagger JSON endpoint.
      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = String.Empty;
      });
      app.UseRouting();

      app.UseAuthorization();
      app.UseAuthentication();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}

```

Authenicated controller

```C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthNo0Example.Models;
using AuthNo0Example.Services;
using AuthNo0Example.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace content.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class WhoController : ControllerBase
  {
    private readonly IUserService userService;

    public WhoController(IUserService userService)
    {
      this.userService = userService;
    }
    [HttpGet]
    public async Task<ActionResult<UserViewModel>> GetUserProfile()
    {
      var rv = await this.userService.GetUserFromDatabaseAsync(User);
      return new UserViewModel(rv);
    }
  }
}
```

import Nav from './Nav'

<Nav/>
