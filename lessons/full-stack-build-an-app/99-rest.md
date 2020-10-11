---
title: The Rest
order: 99
---

# User accounts

In order to keep track of upvotes, downvotes, and who created what restaurants
and reviews we will need to add the idea of users and login/logout features.

We will create a user model and the associated controller to manage them. Then
we will make user interface components for creating accounts and for logging in.

## User Model

To begin we will create a user model that stores information about the user.
Each user will have the following attributes:

- Id
- Full Name
- Email Address
- Password

However, it is an unwise choice to store **unencrypted** passwords in our
database. Thus we will not store the raw password, but a **hashed** password.

### Hashing Passwords

The idea of a hashed password relies on the idea of a "one-way function", that
is a function that is fast and easy to compute in one direction, but difficult
to compute in the other.

Let's take a look at the idea of a "two-way function". A simple example would be
`double`, a function that takes a number and multiplies it by two. If I give you
the input of this function, say `42`, you can quickly and reliably compute the
output, `84`. However, if I give you output, say `246`, it is trivial for you to
figure out what a corresponding input would be, `123`. This would be true no
matter how large the numbers get. Given `24686850904684` you can quickly figure
out what the corresponding input is.

A classic example of a one-way function is the prime factorization function.
Given two prime numbers, say `17` and `5`, it is easy to multiply them together
and get `85`. Given a number like `85`, it isn't too hard to figure out which
two prime numbers multiply together to get that number. However, this isn't true
as the number gets larger. However, if I give you the number
`682654107378822049` it isn't so trivial to compute the two numbers that are its
prime factors (the answer is `982451653` and `694847533` by the way)

For something like a password, we will use the idea of a `hashing function`. A
`hashing function` attempts to take an input value and compute a fixed size and
_mostly_ unique value. Small changes in the input should make a large and
unpredictable change in the output.

A popular hashing function is `SHA256`. If we take the text `dotnet` and process
it with this algorithm we get back out the result:
`3831fff4af76125e90081ac7eb855a1bcce0733045f9d26cd620466e0d4acf97`. However if
we take the text `ditnet`, just one letter different we get
`fb89fe75f8be03f17435f563121e940360cd9fcfcbd3f8978b59c160fdaca711`

Given a result of a `SHA256` hash it is _very_ difficult to work out what text
generated it.

We will be using the built-in `dotnet` hashing algorithm that is based on
[`PBKDF2`](https://en.wikipedia.org/wiki/PBKDF2), a very strong password hashing
algorithm.

## Defining our model

For our model, we will want to treat the `Id`, `FullName`, and `Email` as we
have other fields. However, for the password, we will be creating and storing a
`HashedPassword` in the database. This field should **never** be exposed in any
API so we will mark it as `JsonIgnore` so that it is never serialized.

We also wish to be able to _assign_ a plain text password to a user. The
assigning of this plain text password should have the effect of hashing that
value and storing it in the `HashedPassword` property. We will also need a way
to validate a user password.

```csharp
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace TacoTuesday.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string Email { get; set; }

        [JsonIgnore]
        public string HashedPassword { get; set; }

        // Define a property for being able to _set_ a password
        public string Password
        {
            // Define only the `set` aspect of the property
            set
            {
                // When set, use the PasswordHasher to encrypt the password
                // and store the result in our HashedPassword
                this.HashedPassword = new PasswordHasher<User>().HashPassword(this, value);
            }
        }

        // Add a method that can validate this user's password
        public bool IsValidPassword(string password)
        {
            // Look to see if this password, and the user's hashed password can match
            var passwordVerification = new PasswordHasher<User>().VerifyHashedPassword(this, this.HashedPassword, password);

            // Return True if the verification was a success
            return passwordVerification == PasswordVerificationResult.Success;
        }
    }
}
```

We will also mark the `FullName` and the `Email` as required since we'll use the
email as the login and we want to be able to address the user by name.

This class uses a custom `setter` for the `Password` which will allow us to set
it from the API. That setter simply hashes the password and assigns the user's
`HashedPassword` property (which will be stored in the database)

We also have a method `IsValidPassword` that can identify if we have a valid
password.

## Generating a migration

Add the `Users` to the `DatabaseContext` class:

```csharp
// Tell the context about the User collection/table
public DbSet<User> Users { get; set; }
```

Add the migration:

```shell
dotnet ef migrations add AddUser
```

After validating the migration looks good, run it:

```shell
dotnet ef database update
```

## Files Updated

- [Models/User.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/024098fac176fa19494177ed7002e35eaf9fb590/Models/User.cs)
- [Models/DatabaseContext.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/024098fac176fa19494177ed7002e35eaf9fb590/Models/DatabaseContext.cs)
- [Migrations/20200708004113_AddUser.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/024098fac176fa19494177ed7002e35eaf9fb590/Migrations/20200708004113_AddUser.cs)
- [Migrations/20200708004113_AddUser.Designer.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/024098fac176fa19494177ed7002e35eaf9fb590/Migrations/20200708004113_AddUser.Designer.cs)
- [Migrations/DatabaseContextModelSnapshot.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/024098fac176fa19494177ed7002e35eaf9fb590/Migrations/DatabaseContextModelSnapshot.cs)

# Add a controller to create new Users

Let's use the code generator to make a new controller for managing users.
However, we will only be keeping the `POST` action to create a new user. Later
on, we may add user management features where we need to add back in other
commands like `DELETE` and `PUT`. We also certainly do not want to expose any
`GET` actions where someone could list all of our users!

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

# Add a user interface for creating a user

Similar to our interface for adding a restaurant we'll make a signup page.

Create the `Signup.jsx` file in the `pages` directory:

```jsx
import React, { useState } from 'react'
import { useHistory } from 'react-router'

export function SignUp() {
  const history = useHistory()

  const [errorMessage, setErrorMessage] = useState()

  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const handleStringFieldChange = event => {
    const value = event.target.value
    const fieldName = event.target.id

    const updatedUser = { ...newUser, [fieldName]: value }

    setNewUser(updatedUser)
  }

  const handleFormSubmit = event => {
    event.preventDefault()

    fetch('/api/Users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(apiResponse => {
        if (apiResponse.status === 400) {
          setErrorMessage(Object.values(apiResponse.errors).join(' '))
        } else {
          history.push('/')
        }
      })
  }

  return (
    <div className="card">
      <div className="card-header">Create an Account</div>
      <div className="card-body">
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              value={newUser.fullName}
              onChange={handleStringFieldChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={newUser.email}
              onChange={handleStringFieldChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={newUser.password}
              onChange={handleStringFieldChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
```

We will also add a route in `App.jsx`

```jsx
<Route path="/signup">
  <SignUp />
</Route>
```

And we will also add a button to our `<NavBar>`

```jsx
<Link className="btn btn-success mr-2" to="/signup">
  Signup
</Link>
```

And with this we have the ability for users to sign up to our app!

## Avoid duplicate email addresses

<!-- To make the email unique we can add a _unique index_ on the field. Indexes are a
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
   modelBuilder.Entity<User>() .HasIndex(user => user.Email) .IsUnique();
}
```

Then we will generate a migration:

```shell
dotnet ef migrations add AddUserEmailIndex
```

Then run the migration:

```shell
dotnet ef database update
``` -->

To make the email unique we can add logic to our `POST` method in our
`UsersController`. We can check for a user with the same email address and
return an error if there is already a match.

```csharp
var alreadyHaveUserWithTheEmail = _context.Users.Any(existingUser => existingUser.Email.ToLower() == user.Email.ToLower());
if (alreadyHaveUserWithTheEmail)
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
```

Since we are generating the same style error that validation errors do we will
get a nice error in the UI when someone attempts to use an email address that
exists.

## Files Updated

- [ClientApp/src/App.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/1cd82cd8af0ab6b4005779e0c42e893e363799ff/ClientApp/src/App.jsx)
- [ClientApp/src/components/NavBar.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/1cd82cd8af0ab6b4005779e0c42e893e363799ff/ClientApp/src/components/NavBar.jsx)
- [ClientApp/src/pages/SignUp.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/1cd82cd8af0ab6b4005779e0c42e893e363799ff/ClientApp/src/pages/SignUp.jsx)
- [Controllers/UsersController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1cd82cd8af0ab6b4005779e0c42e893e363799ff/Controllers/UsersController.cs)

---

# Add the ability to Login

For our users to login, we need to present the user with a form where they can
provide their username and password. This data then needs to be processed by the
backend to validate the information is correct and then inform the client of the
success or failure.

We also need some way for the client to tell the server with every API request
it subsequently makes that the user was logged in and who they are. It would not
be a good idea to _store_ the user's password and include that with every
request. We want to handle the user's unencrypted password as little as
possible. To do this the client and the server communicate with a system known
as JavaScript Web Tokens or JWTs. (some pronounce this as Jay-Double-U-Tees and
others as `joots` to rhyme with `scoots`)

The idea of a JWT is an encoded and cryptographically **signed** bit of data
that the server can hand back to the client which means "If you hand me back
this data exactly, I'll recognize you as the user it specifies"). To do this the
server needs a way to format, "sign", and then encode the response.

JWTs can store any information we wish, though we should keep them small since
it does add overhead to each API request they are included with. Typically we
store some details from the user to include, but not be limited to, their user
id. We may also store their names and email.

## What does a JWT look like?

This is an example of a JWT:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEiLCJGdWxsTmFtZSI6IkdhdmluIFN0YXJrIiwiRW1haWwiOiJnYXZpbkBnc3RhcmsuY29tIiwibmJmIjoxNTk0MjMyOTE5LCJleHAiOjE1OTQyNjg5MTksImlhdCI6MTU5NDIzMjkxOX0.k-xpH_Fu45BBUQWWTWHVxATAZk-X_Ae-_hXZFjF8LQE
```

Pretty indecipherable, right? Fortunately, there are easily decoded by our
computers. The website `jwt.io` has a decoder right on their home page. Try
copying the above text and pasting it into their _Debugger_

What you will see is this:

![jwt](./assets/jwt.png)

On the left side is our original JWT. However, you will notice that it has
become color-coded. Each of the colors of the text represents what part of the
JWT it represents.

There are three parts to a JWT:

- Header
- Payload
- Verification

The `Header` section tells the JWT system what kind of token this is, and what
_algorithm_ was used to encode the token. This comes first so the JWT system can
properly decode the rest of the token.

Next comes the `payload`. This is the part we, as developers, can specify data
within. Each of these elements, though decoded as JSON are called `claims`. The
first _three_ claims here, `Id`, `FullName`, and `Email` were generated by code
(which we about to write) and represent the details of a logged-in user. The
next three represent details about the token itself. Each of these is encoded as
numbers. `nbf` is a claim that stands for `Not Before`, meaning that the token
is not valid for any time _earlier_ than the given timestamp. The claim `exp`
which stats for `Expiration` and represents the time when this token is no
longer valid. Finally, `iat` is a claim that indicates when the token was
issued.

The final section is the _signature_ of the token. It uses cryptographic
functions to add data to the token using a server's _secret key_. This data
represents a _hash_ of the other parts of the token. If anyone were to change
even a single character of the other parts of the message, say changing the `Id`
from `1` to `2` they would **not** be able to resign that message with valid
data. They lack the server's secret key. In this way, the data can easily be
decoded by anyone, but cannot be changed/updated by anyone other than the server
itself. Thus it is important not to put **secret** information in the payload
since JWT tokens are not **encrypted**.

When a user logs in we will have our server generate a new JWT token and return
this to the client. The client can simply store this token and provide it back
to the server with any API request that needs to be done by an _authenticated_
user. We do this by specifying a special `header` value that includes this
token.

## Adding a controller to manage "sessions"

Thinking again about _resources_ we will consider the user logging in to be the
_CREATION_ of a _Session_. While we won't record the creation of a session in
our database, though we could, we still think of this as it's own resource with
a `POST` create action.

As such we will create a `Sessions` controller to store this `POST` action.

```csharp
namespace TacoTuesday.Controllers
{
    // All of these routes will be at the base URL:     /api/Sessions
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case RestaurantsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        readonly protected string JWT_KEY;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public SessionsController(DatabaseContext context, IConfiguration config)
        {
            _context = context;
            JWT_KEY = config["JWT_KEY"];
        }
    }
}
```

You will notice a few things different than our traditional controller.

In addition to storing the `_context` with our `DatabaseContext`, we are also
storing a variable with a `JWT_KEY`. This is the secret key we will use to sign
the JWT tokens.

This token is passed to us when the controller is constructed, just as the
context is. It is available to us from a `config` variable that is supplied by
the framework.

From this `config` variable, we can ask for the `["JWK_KEY"]` and store that in
our variable.

This is another example of
[`Dependency Injection`](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-3.1).
The use of
[`Dependency Injection`](https://en.wikipedia.org/wiki/Dependency_injection)
allows the framework to provide information to our code, like our controller,
without us having to know details of how that information is managed or
accessed. In this case, a configuration object is supplied. In development, this
will be managed in local configuration files. In production, it will be managed
by our hosting provider. In either case, we are not concerned with those
details. We only need to accept this `config` variable and extract the data we
need.

## Creating our JWT_KEY for development

To set up our development mode for storing this secret `JWT_KEY` we need to
initialize support for `user secrets` by running this command:

```shell
dotnet user-secrets init
```

This creates a file outside our project to store secret information. This way
the data is not stored in our repository for others to see.

Next, we will tell the secrets to store `JWT_KEY`

```shell
dotnet user-secrets set "JWT_KEY" "Long set of Random Letters and Numbers like iExEUNxxv9zylIuT2VMrsMsQEKjjKs1XrYFntsafKgQs90HndTX0yw8xLhFHk9O"
```

The `JWT_KEY` should be a relatively long set of random characters. This is
called _high entropy_ implying that it will be very hard for someone to guess
this secret. A good website to generate these kinds of secrets is:
[Gibson Research Corporation's Password Page](https://www.grc.com/passwords.htm)

> NOTE: If you are going to deploy this with Heroku, you'll need to run
> `heroku config:set JWT_KEY="xxxx"` with your specific key in place of `xxxx`
> at least once before you deploy.

## Returning to the controller

Now that we have generated this JWT secret we can implement the `POST` method
for creating our user login session.

```csharp
[HttpPost]
public async Task<ActionResult> Login(LoginUser loginUser)
{
    var foundUser = await _context.Users.FirstOrDefaultAsync(user => user.Email == loginUser.Email);

    if (foundUser != null && foundUser.IsValidPassword(loginUser.Password))
    {
        // create a custom response
        var response = new
        {
            // This is the login token
            token = new TokenGenerator(JWT_KEY).TokenFor(foundUser),

            // The is the user details
            user = foundUser
        };

        return Ok(response);
    }
    else
    {
        // Make a custom error response
        var response = new
        {
            status = 400,
            errors = new List<string>() { $"User does not exist" }
        };

        // Return our error with the custom response
        return BadRequest(response);
    }
}
```

You'll notice the `POST` method doesn't take a `User` object, but a `loginUser`
of type `LoginUser`. We need to do this since we **do** need to read the
`Password` while the user is logging in. Thus we'll define this class inside the
`SessionsController` to store the `Email` and `Password` strings.

```csharp
public class LoginUser
{
    public string Email { get; set; }
    public string Password { get; set; }
}
```

The `POST` method attempts to find an existing user that has the same email
address as the received user.

Next, it uses the `IsValidPassword` method we wrote in the `User` class to
detect if the password matches.

If we found a user `foundUser != null` **AND** the password watches we will
generate a response that looks like this:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEiLCJGdWxsTmFtZSI6IkdhdmluIFN0YXJrIiwiRW1haWwiOiJnYXZpbkBnc3RhcmsuY29tIiwibmJmIjoxNTk0MjMyOTE5LCJleHAiOjE1OTQyNjg5MTksImlhdCI6MTU5NDIzMjkxOX0.k-xpH_Fu45BBUQWWTWHVxATAZk-X_Ae-_hXZFjF8LQE",
  "user": { "Id": "1", "FullName": "Gavin Stark", "Email": "gavin@suncoast.io" }
}
```

The `token` part of this object is created using
`new TokenGenerator(JWT_KEY).TokenFor(foundUser)`. This `TokenGenerator` class
is provided by SDG to generate JWT tokens for your users. If you are interested
in how the code works, it is documented within.

To use the `TokenGenerator` code we need to add a dependency to our project:

```shell
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

We also include the `user` object in the response. This is so the client has a
simple way to access this data.

This custom object is then returned as the payload of the successful API
response.

If either the `foundUser` is `null` or the password does not match, we return an
error message object which the form can process and display to the user.

## Give it a try!

To test if this works we can use both the `POST /api/Users` and
`POST /api/Sessions` endpoints from Insomnia. First, we can create a user, then
we can try the same `email` and `password` to the `Sessions` endpoint and see if
we get back a valid response. Try an invalid password or an email address that
doesn't correspond to an account to see the error messages.

Next up we'll connect the user interface to these controllers.

## Files Updated

- [TacoTuesday.csproj](https://raw.githubusercontent.com/gstark/TacoTuesday/0e631e89ef4595a655379fdbc0fab8f91cd3d786/TacoTuesday.csproj)
- [Models/User.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/0e631e89ef4595a655379fdbc0fab8f91cd3d786/Models/User.cs)
- [Models/TokenGenerator.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/0e631e89ef4595a655379fdbc0fab8f91cd3d786/Models/TokenGenerator.cs)
- [Controllers/SessionsController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/0e631e89ef4595a655379fdbc0fab8f91cd3d786/Controllers/SessionsController.cs)

---

# Adding user login to the user interface

Let's add a page to represent the login interface: `Signin.jsx`

```jsx
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { recordAuthentication } from './auth'

export function SignIn() {
  const history = useHistory()

  const [errorMessage, setErrorMessage] = useState()

  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  })

  const handleStringFieldChange = event => {
    const value = event.target.value
    const fieldName = event.target.id

    const updatedUser = { ...loginUser, [fieldName]: value }

    setLoginUser(updatedUser)
  }

  const handleFormSubmit = event => {
    event.preventDefault()

    fetch('/api/Sessions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(loginUser),
    })
      .then(response => response.json())
      .then(apiResponse => {
        if (apiResponse.status === 400) {
          setErrorMessage(Object.values(apiResponse.errors).join(' '))
        } else {
          recordAuthentication(apiResponse)
          window.location = '/'
        }
      })
  }

  return (
    <div className="card">
      <div className="card-header">Login</div>
      <div className="card-body">
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={loginUser.email}
              onChange={handleStringFieldChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={loginUser.password}
              onChange={handleStringFieldChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
```

This page is much like the `Signup` page except for the `handleFormSubmit` code
handling a successful API request

```javascript
recordAuthentication(apiResponse)
window.location = '/'
```

The `recordAuthentication` method is one we are going to provide along with many
other useful authentication methods in a `auth.js` file. The purpose of
`recordAuthentication` is to store the api response from the login in _local
storage_ so we can access it later.

## Local Storage

Local Storage is a key/value pair storage mechanism that can, for any string
key, store a string of data. This data is persistant across sessions and browser
restarts. The storage is _per site_ so each domain has its own set of key/value
pairs.

This makes for a convenient place to store the authentication data. However, we
should note that this local storage is available to any javascript that runs on
the page that **originates** from that domain. This should protect the data from
JavaScript running in an injected ad, but if some malicious software is able to
inject JavaScript into the page itself, it will be able to read these values. So
while local storage is convenient, it may not be the most secure way to store
the authentication information.

An alternative is to send the authentication data as a `cookie` value. However,
this too has security implications and concernts.
[This article](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)
gives a good overview of the differences. For now we will proceed with local
storage.

## Redirecting after login

Since we want the user to redirect to the main page we also want it to reload
any authentication data. For this reason we will use `window.location` to force
a page reload rather than `history.push` which would do a local, non-reload,
navigation.

## `auth.js`

The contents of `auth.js` give some useful client-side methods to:

- Determine if the user is logged in
- Fetch the user's ID
- Fetch the user details
- Get the details needed for an authentication header for `fetch`
- Store the authentication info `recordAuthentication`
- Logout

The contents of the `auth.js` are:

```javascript
// Returns an object that can be included in `fetch`
// headers to include the required bearer token
// for authentication
//
// Example usage:
//
// fetch('/api/Thing', {
//    method: 'POST',
//    headers: { 'content-type': 'application/json', ...authHeader() },
//    body: JSON.stringify(thing)
// })
//
export const authHeader = () => {
  const auth = authFromStorage()

  return auth.token
    ? {
        Authorization: `Bearer ${auth.token}`,
      }
    : {}
}

// Save the authentication received from the API
//
// This method stores the authentication data as
// a JSON string in local storage. Local storage
// requires everything to be in a string.
//
// This is typically called from a login component
//
export const recordAuthentication = auth => {
  localStorage.setItem('auth', JSON.stringify(auth))
}

// Returns a boolean if the user is logged in.
//
// Returns TRUE if there is an active user id, FALSE otherwise
//
export const isLoggedIn = () => {
  return getUserId() !== undefined
}

// Returns the user id of the logged in user, null otherwise
export const getUserId = () => {
  const auth = authFromStorage()

  return auth.user && auth.user.id
}

// Returns the user details retrieved from the authentication data
//
// Example:
//
// const user = getUser()
// console.log(user.fullName)
//
export const getUser = () => {
  const auth = authFromStorage()

  return auth.user
}

// Removes the authentication data, effectively "forgetting" the
// session information and logging the user out.
export const logout = () => {
  localStorage.removeItem('auth')
}

// Local method to fetch and decode the auth data from local storage
// If there is no local storage value, returns an empty object
const authFromStorage = () => {
  const auth = localStorage.getItem('auth')

  return auth ? JSON.parse(auth) : {}
}
```

## Using the authentication information

Let's upate the sign in and sign up buttons/links to only display if the user is
**not logged in**

```jsx
{
  isLoggedIn() || (
    <Link className="btn btn-success mr-2" to="/signin">
      Sign in
    </Link>
  )
}
{
  isLoggedIn() || (
    <Link className="btn btn-success mr-2" to="/signup">
      Sign up
    </Link>
  )
}
```

Here we test if the user is logged in, and if they are **not** then we show the
`<Link>`. This works since `isLoggedIn()` returns either `true` or `false` -- If
the value is `false` then JavaScript will interpret, and return the second part
of the boolean logic, which is the `<Link>` -- If the value is `true` then
JavaScript just renders that, and React renders a value of `true` as nothing.
The second part of the logic doesn't need to be considered. This effectively
only shows the links if the user is **not** logged in.

Next we can add a `Sign out` button after the form:

```jsx
{
  isLoggedIn() && (
    <span className="btn btn-success" onClick={handleLogout}>
      Sign out
    </span>
  )
}
```

This only shows the logout button if the user **is logged in**.

We will also add a method to handle the logout:

```jsx
const handleLogout = () => {
  logout()

  window.location = '/'
}
```

## Files Updated

- [ClientApp/src/App.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/4723132ca85774cfde99ef116235b50ebf0c422f/ClientApp/src/App.jsx)
- [ClientApp/src/components/NavBar.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/4723132ca85774cfde99ef116235b50ebf0c422f/ClientApp/src/components/NavBar.jsx)
- [ClientApp/src/pages/SignIn.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/4723132ca85774cfde99ef116235b50ebf0c422f/ClientApp/src/components/NavBar.jsx)
- [ClientApp/src/pages/auth.js](https://raw.githubusercontent.com/gstark/TacoTuesday/4723132ca85774cfde99ef116235b50ebf0c422f/ClientApp/src/pages/auth.js)

---

# Storing the user that created a restaurant and review

If we want to store the user that created a restaurant or a review, we need to
add some details to the models. Specifically, we will need to store the `UserId`
value in both of these models.

Add the following to both `Restaurant` and `Review`

```csharp
public int UserId { get; set; }
```

Once added we can run a single migration that will update both of these tables.

```shell
dotnet ef migrations add AddUserIdToRestaurantAndReview
```

and run the migrations

```shell
dotnet ef database update
```

## Storing the related user

We _could_ have the client send their `Id` along with the request to create a
restaurant and review. However, the current user id is not data we want to trust
to the API. Since anyone could change that value when sending a request we want
the **server** to be in control of associating that data. Thus we want to
provide the two controllers with a way to determine the id of the current user.

The first thing we need to do is modify `Startup.cs` slightly.

To the end of `ConfigureServices` add this code:

```csharp
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["JWT_KEY"]))
    };
});
```

Then, also in `Startup.cs` add this line of code just after `app.UseRouting()`:

```csharp
app.UseAuthorization();
```

Now we can a helper method to our controller just after the last method of the
controller in `RestaurantsController.cs`

```csharp
// Private helper method to get the JWT claim related to the user ID
private int GetCurrentUserId()
{
    // Get the User Id from the claim and then parse it as an integer.
    return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
}
```

We can then use this in our PostRestaurant method to help ensure we have user
IDs assigned.

To require a user to be logged in (have a valid JWT) add this line before the
`PostRestaurant` method:

```csharp
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
```

To assign a user to the restaurant, we will add this code to the _beginning_ of
the `PostRestaurant` implementation:

```csharp
// Set the UserID to the current user id, this overrides anything the user specifies.
restaurant.UserId = GetCurrentUserId();
```

Finally, lets send our authorization header token when making the request in
`AddRestuarant.jsx`:

```javascript
headers: { 'content-type': 'application/json', ...authHeader() },
```

And update our logic to handle `401` not authorized

```javascript
fetch('/api/Restaurants', {
  method: 'POST',
  headers: { 'content-type': 'application/json', ...authHeader() },
  body: JSON.stringify(newRestaurant),
})
  .then(response => {
    if (response.status === 401) {
      return { status: 401, errors: { login: 'Not Authorized ' } }
    } else {
      return response.json()
    }
  })
  .then(apiResponse => {
    if (apiResponse.status != 201) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      history.push('/')
    }
  })
```

Then we will make similar updates in the `ReviewsControler` and
`ShowRestaurant.jsx`

## Files Updated

- [ClientApp/src/pages/AddRestaurant.jsx}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/ClientApp/src/pages/AddRestaurant.jsx)
- [ClientApp/src/pages/ShowRestaurant.jsx}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/ClientApp/src/pages/ShowRestaurant.jsx)
- [Controllers/RestaurantsController.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Controllers/RestaurantsController.cs)
- [Controllers/ReviewsController.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Controllers/ReviewsController.cs)
- [Migrations/20200708205257_AddUserIdToRestaurantAndReview.Designer.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Migrations/20200708205257_AddUserIdToRestaurantAndReview.Designer.cs)
- [Migrations/20200708205257_AddUserIdToRestaurantAndReview.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Migrations/20200708205257_AddUserIdToRestaurantAndReview.cs)
- [Migrations/DatabaseContextModelSnapshot.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Migrations/DatabaseContextModelSnapshot.cs)
- [Models/Restaurant.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Models/Restaurant.cs)
- [Models/Review.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Models/Review.cs)
- [Startup.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Startup.cs)

# Restrict Upvote and Downvote

Let's add tracking of who performed up and downvoting. This will allow us to
only allow a user to record a single vote.

First, we will add a model for `RestaurantVote` which will now create a real
database entity for the _resource_ we made earlier.

```csharp
namespace TacoTuesday.Models
{
    public class RestaurantVote
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RestaurantId { get; set; }
        public string UpOrDown { get; set; }
    }
}
```

Add the `RestaurantVotes` to the `DatabaseContext.cs`:

```csharp
// Tell the context about the RestaurantVotes collection/table
public DbSet<RestaurantVote> RestaurantVotes { get; set; }
```

Then generate a migration and update the database:

```shell
dotnet ef migrations add AddRestaurantVotes
dotnet ef database update
```

Then we can update the `RestaurantVotes` controller to:

- Ensure we are an authenticated user
- Check to see if we have already registered a vote
- Create the voting record
- Increment the restaurant vote totals

Add this code just after the `HttpPost` method in
`RestaurantVotesController.cs`:

```csharp
// Private helper method to get the JWT claim related to the user ID
private int GetCurrentUserId()
{
    // Get the User Id from the claim and then parse it as an integer.
    return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
}
```

Add this above the method definition:

```csharp
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
```

Add this to the beginning of the method implementation. The `AnyAsync` query
will attempt to detect an existing vote for this restaurant belonging to the
user that is making the request. If one is found, a `400` Bad Request is
returned and we do not complete the rest of the method.

```csharp
// If there is already an existing vote, return a bad request
var existingVote = await _context.RestaurantVotes.AnyAsync(restaurantVote => restaurantVote.UserId == GetCurrentUserId() && restaurantVote.RestaurantId == id);
if (existingVote)
{
    return BadRequest();
}

// Add the restaurant vote to the table
var restaurantVote = new RestaurantVote
{
    RestaurantId = id,
    UserId = GetCurrentUserId(),
    UpOrDown = upOrDown
};
await _context.RestaurantVotes.AddAsync(restaurantVote);
```

In `Restaurants.jsx` add the authentication header:

```javascript
headers: { 'content-type': 'application/json', ...authHeader() },
```

and hide the voting buttons unless the user is logged in

```jsx
{
  isLoggedIn() && (
    <small className="mr-3">
      <button
        className="btn btn-success btn-sm"
        onClick={event => {
          event.preventDefault()
          props.handleVote(restaurant.id, 'upvote')
        }}
      >
        <span className="mr-2" role="img" aria-label="upvote">
          👍🏻
        </span>
        {restaurant.upvoteCount}
      </button>
    </small>
  )
}
{
  isLoggedIn() && (
    <small className="mr-3">
      <button
        className="btn btn-danger btn-sm"
        onClick={event => {
          event.preventDefault()
          props.handleVote(restaurant.id, 'downvote')
        }}
      >
        <span className="mr-2" role="img" aria-label="downvote">
          👎🏻
        </span>{' '}
        {restaurant.downvoteCount}
      </button>
    </small>
  )
}
```

Now the user will only allow one vote per restaurant and we only allow
authenticated users to vote.

## Files Updated

- [ClientApp/src/pages/Restaurants.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/ClientApp/src/pages/Restaurants.jsx)
- [Controllers/RestaurantVotesController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Controllers/RestaurantVotesController.cs)
- [Migrations/20200709004514_AddRestaurantVotes.Designer.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Migrations/20200709004514_AddRestaurantVotes.Designer.cs)
- [Migrations/20200709004514_AddRestaurantVotes.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Migrations/20200709004514_AddRestaurantVotes.cs)
- [Migrations/DatabaseContextModelSnapshot.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Migrations/20200709004514_AddRestaurantVotes.cs)
- [Models/DatabaseContext.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Models/DatabaseContext.cs)
- [Models/RestaurantVote.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Models/RestaurantVote.cs)

---

# Adding the restaurants to a map

Another nice feature would be to show the list of restaurants on a map. In order
to map these restaurants we need to know exactly where the restaurants are. The
process of turning an address into a position, as well as turning a position
into an address, is known as
[`Geocoding`](https://en.wikipedia.org/wiki/Geocoding)

When _geocoding_ an address we are often turning the text of the address, it's
street number and name along with the city, state, and zip/postal code, into a
pair of numbers. These decimal numbers,
[`latitutde` and `longitude`](https://www.timeanddate.com/geography/longitude-latitude.html)
describe a single position on the surface of the planet.

## Adding columns to store a coordinate

Let's get ready for our geocoding practice by adding columns to our
`Restaurants` table to store these values.

```csharp
public double Latitude { get; set; }

public double Longitude { get; set; }
```

Then we will generate a migration for these columns and update the database

```shell
dotnet ef migrations add AddLatitudeAndLongitudeToRestaurant
dotnet ef database update
```

## Adding a package to help us geocode

In order to turn the restaurants address into a latitude and longitude we will
use a third party library.

```shell
dotnet add package Geocoding.Core
dotnet add package Geocoding.Microsoft
```

The `Geocoding` package comes with support for other services other than
Microsoft, but this is the one we will use in this lesson. Each of the geocoding
systems requires an account and an API key. Microsoft's signup process is one of
the easiest and we'll choose that to proceed. To sign up for a key, follow
[these procedures](https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key)

Similar to our `JWT_KEY` we will have to add a secret for this API. We'll call
the sercret `BING_MAPS_KEY` and access it in our `RestaurantsController`:

To save the key in secrets:

```csharp
dotnet user-secrets set "BING_MAPS_KEY" "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

Where `"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"` is the key
you generated at Microsoft.

> NOTE: If you are going to deploy this with Heroku, you'll need to run
> `heroku config:set BING_MAPS_KEY="xxxx"` with your specific key in place of
> `xxxx` at least once before you deploy.

To acecss the key from the controller:

```csharp
private readonly string BING_MAPS_KEY;

// Constructor that recives a reference to your database context
// and stores it in _context for you to use in your API methods
public RestaurantsController(DatabaseContext context, IConfiguration config)
{
    _context = context;
    BING_MAPS_KEY = config["BING_MAPS_KEY"];
}
```

Now that we have added this library and setup an API key, lets add some code to
`PostRestaurant` just before `restaurant.UserId = GetCurrentUserId();`

```csharp
// Create a new geocoder
var geocoder = new BingMapsGeocoder(BING_MAPS_KEY);

// Request this address to be geocoded.
var geocodedAddresses = await geocoder.GeocodeAsync(restaurant.Address);

// ... and pick out the best address sorted by the confidence level
var bestGeocodedAddress = geocodedAddresses.OrderBy(address => address.Confidence).LastOrDefault();

// If we have a best geocoded address, use the latitude and longitude from that result
if (bestGeocodedAddress != null)
{
    restaurant.Latitude = bestGeocodedAddress.Coordinates.Latitude;
    restaurant.Longitude = bestGeocodedAddress.Coordinates.Longitude;
}
```

Let's add some restaurants to our database and see what results we get for
geocoded addresses. Enter some restaurants with addresses you know and then
check, using `pgcli` that there are values for `latitude` and `longitude`

## Files Updated

- [Controllers/RestaurantsController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/Controllers/RestaurantsController.cs)
- [Migrations/20200712144700_AddLatitudeAndLongitudeToRestaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/Migrations/20200712144700_AddLatitudeAndLongitudeToRestaurant.cs)
- [Migrations/20200712144700_AddLatitudeAndLongitudeToRestaurant.Designer.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/Migrations/20200712144700_AddLatitudeAndLongitudeToRestaurant.Designer.cs)
- [Migrations/DatabaseContextModelSnapshot.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/Migrations/DatabaseContextModelSnapshot.cs)
- [Models/Restaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/Models/Restaurant.cs)
- [TacoTuesday.csproj](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/TacoTuesday.csproj)

---

# Add maps to our front end

To render a map within our front end we will be using another third party
library, `react-map-0gl`.

```shell
cd ClientApp
npm install --save react-map-gl
cd ..
```

## Getting another license key for our front end code.

We will be using `mapbox` as our mapping information provider. We will visit
[their website](https://www.mapbox.com/) and register for an API key.

We will create a file `.env.development.local` in the same location as our
`package.json` to store our API key in develoment. This defines
`environment variables` for our application. An
[environment variable](https://en.wikipedia.org/wiki/Environment_variable) is a
set of string-based keys and text values that are associated with the execution
of our application. Environment variables control many aspects of our command
prompt as well as our running applications. Since these are a per-app
configuration they also serve as a location for values such as API keys.

> NOTE: This is a different approach then dotnet takes for it's local
> configuration data. Both are good solutions each with their own issues and
> benefits. We are using an environment variable since this is the approach that
> our front end app setup prefers.

```text
REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoiZ2F2aW4tc3RhcmsiLCJhIjoiY2s5NXN0NmdhMHBwbjNtb203N280dHpjdyJ9.xxxxxxxxxxj21vXN8cEi26A
```

> NOTE: After changing this file you should stop and restart your
> `dotnet watch run`

Once we have installed the library, signed up for a key, and set our API key in
configuration, we will update our `Restaurants.jsx` component to show a map.

## Adding the map to the UI

First we will import `ReactMapGL` from our library:

```javascript
import ReactMapGL from 'react-map-gl'
```

And then set a state variable to store information about the map's zoom level,
size, and the coordinates of the center of the map. Here we will use the
coordinates of the SDG campus as our map center.

```javascript
const [viewport, setViewport] = useState({
  width: 500,
  height: 500,
  latitude: 27.77101804911986,
  longitude: -82.66090611749074,
  zoom: 8,
})
```

With this state we can add a map to the user interface:

```jsx
<div className="my-3 d-flex justify-content-center">
  <ReactMapGL
    {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
  ></ReactMapGL>
</div>
```

You will notice that we are taking all the attributes of our `viewport` state
and **spreading** them into the `ReactMapGL`. We carefully chose the name of the
properties of this state variable to correspond to the various properties of the
map we wish to control. Also notice that we provide the `mapboxApiAccessToken`
here as well. To access the value we placed in the `.env.development.local`
file, we use `process.env` which is an object containing all the environment
variables configured for the current process (app).

## Moving around the map

You may notice that while we can render a map and see a particular area we
cannot adjust the map by dragging. This is a common map interface so lets add
that feature. Luckily, again, our `viewport` state is setup perfectly to allow
us to handle this.

The `ReactMapGL` expects a property for `onViewportChange` that is a method that
takes new values for a viewport change. And since our `setViewport` is exactly
such a function we can use it by adding this to `ReactMapGL`

```jsx
<ReactMapGL
  {...viewport}
  onViewportChange={setViewport}
  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
></ReactMapGL>
```

Try dragging, pinching, and zooming the map!

## Adding pins to the map

If we wish to add pins to the map we must render an array of `<Marker>`
components inside our `ReactMapGL` component. A `<Marker>` is another map-gl
component. It requires a `latitude` and `longitude` property. Luckily for us,
our `restaurants` state now has that information from our api!

We can use our old friend the JavaScript `map()` function to generate these
markers.

When generating the array of `<Marker>` elements we specify the `latitude` and
`longitude` from the specific restaurant. We then render each marker's visual as
anything we like; here we just use the existing emoji character. We could use
text, an image, or any other react component as the marker representation.

```jsx
<ReactMapGL
  {...viewport}
  onViewportChange={setViewport}
  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
>
  {restaurants.map(restaurant => (
    <Marker latitude={restaurant.latitude} longitude={restaurant.longitude}>
      <span role="img" aria-label="taco">
        🌮
      </span>
    </Marker>
  ))}
</ReactMapGL>
```

## Adding interaction to the map

Next lets make it so we can click on a specific map and see some details of the
restaurant itself.

To do that we will add another state variable to track the
`selectedMapRestaurant` and initially set that value to `null`. When this
variable is `null` we mean that no restaurant is selected in the map. When this
variable is **not** null it means the value of the variable is the restaurant we
want to show.

```javascript
const [selectedMapRestaurant, setSelectedMapRestaurant] = useState(null)
```

Then just before we render our array of `<Marker>` we will add this code:

```jsx
{
  selectedMapRestaurant && (
    <Popup
      latitude={selectedMapRestaurant.latitude}
      longitude={selectedMapRestaurant.longitude}
      closeButton={true}
      closeOnClick={false}
      onClose={() => setSelectedMapRestaurant(null)}
      offsetTop={-5}
    >
      <div className="card my-3">
        <div className="card-header">{selectedMapRestaurant.name}</div>
        <div className="card-body"></div>
        {selectedMapRestaurant.description}
      </div>
    </Popup>
  )
}
```

This will render, if there is a selectedMapRestaurant, a `map-gl` based `Popup`
component at the coordinates of the selected restaurant. We also define an
`onClose` which the popup will use to dismiss the popup. For that we simply set
the `selectedMapRestaurant` to `null`. Inside the popup we will render a few
details of the restaurant.

Lastly, we need to add an `onClick` for our `<Marker>` so we can set the value
of `selectedMapRestaurant`

```jsx
<span
  role="img"
  aria-label="taco"
  onClick={() => setSelectedMapRestaurant(restaurant)}
>
  🌮
</span>
```

When clicking on markers you may notice that the popup appears _behind_ other
markers on the page. To resolve this, add the following CSS to your project:

```css
.mapboxgl-popup {
  z-index: 1;
}
```

Now we have a zoomable, draggable, and clickable map that represents data pulled
from our API.

> NOTE: If you are going to deploy this with Heroku, you'll need to run
> `heroku config:set REACT_APP_MAPBOX_TOKEN="xxxx"` with your specific key in
> place of `xxxx` at least once before you deploy.

## Files Updated

- [ClientApp/src/pages/Restaurants.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/385b003aa796ff38c8635c833a2d63bf3045107e/ClientApp/src/pages/Restaurants.jsx)
- [ClientApp/src/custom.scss](https://raw.githubusercontent.com/gstark/TacoTuesday/385b003aa796ff38c8635c833a2d63bf3045107e/ClientApp/src/custom.scss)
- [ClientApp/package.json](https://raw.githubusercontent.com/gstark/TacoTuesday/385b003aa796ff38c8635c833a2d63bf3045107e/ClientApp/package.json)
- [ClientApp/package-lock.json](https://raw.githubusercontent.com/gstark/TacoTuesday/385b003aa796ff38c8635c833a2d63bf3045107e/ClientApp/package-lock.json)

---

# Add an image to the Restaurant

It would be nice to add a profile image for the restaurant so we know what the
place looks like.

When storing user provided assets we can choose between hosting these assets
ourselves or using an external service to do so. Storing them ourselves gives us
more control over how these assets are stored. However, external services are
often more optimized for this process, provied lower cost storage options,
provide faster networking and more geographically distributed caching of these
assets making for a more efficient service for our users.

There are a number of providers for asset storage:

- Amazon Web Services S3
- Azure
- Google Cloud
- Cloudinary

In this lesson we will be using Cloudinary as the integration is more
straightforward and it does not require a paid plan to get started. If you are
interested in replacing Cloudinary with one of the other services there are
existing dotnet libraries to use.

## Adding Cloudinary

First we will sign up at Cloudinary for an API KEY. When you have your account
created you'll need three values:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

We will set all three in our secrets:

```shell
dotnet user-secrets set "CLOUDINARY_CLOUD_NAME" "REPLACE THIS"
dotnet user-secrets set "CLOUDINARY_API_KEY"    "REPLACE THIS"
dotnet user-secrets set "CLOUDINARY_API_SECRET" "REPLACE THIS"
```

After securing these values we will add the `Cloudinary` third party package to
our app:

```shell
dotnet add package CloudinaryDotNet
```

## Creating a controller for uploading files

Again thinking of uploads as a resource itself we will create a
`UploadsController` with only a single `POST` endpoint for creating uploads.

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace TacoTuesday.Controllers
{
    // All of these routes will be at the base URL:     /api/Uploads
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case RestaurantsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class UploadsController : ControllerBase
    {
        private readonly string CLOUDINARY_CLOUD_NAME;
        private readonly string CLOUDINARY_API_KEY;
        private readonly string CLOUDINARY_API_SECRET;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public UploadsController(IConfiguration config)
        {
            CLOUDINARY_CLOUD_NAME = config["CLOUDINARY_CLOUD_NAME"];
            CLOUDINARY_API_KEY = config["CLOUDINARY_API_KEY"];
            CLOUDINARY_API_SECRET = config["CLOUDINARY_API_SECRET"];
        }

        // POST: api/Uploads
        //
        // Creates a new uploaded file
        //
        // The `body` of the request is parsed and then made available to us as a User
        // variable named user. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our User POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult Upload()
        {
            return Ok();
        }
    }
}
```

Here we have just the shell of our controller. Notice we have not incorporated
the `DatabaseContext` since this controller will not be doing anything with the
database, but simply receiving files from the user and uploading them to
_Cloudinary_. Thus our constructor only takes in the configuration and saves off
the various _Cloudinary_ configration values we will need.k

Also we have protected the endpoint to only allow authorized users to upload
content. j

## Changing the controller to accept a file upload

We will now update the controller definition to accept a file upload, process
it, upload it to _Cloudinary_ and return to the user a URL to where the newly
uploaded file was stored. The front end will send us a file and once done will
use the uploaded file location when creating/updating the model.

The first thing we will do is update our endpoint to accept a file as input.

```csharp
public ActionResult Upload(IFormFile file)
```

Next we will ensure that we only accept images and content of a type that will
be supported.

To do so we'll make a class property to hold a _set_ of strings of the content
types allowed. We will use the `HashSet` collection type since it is efficient
for fast lookups, and does not allow for duplicates (unlike a `List`)

```csharp
private readonly HashSet<string> VALID_CONTENT_TYPES = new HashSet<string> {
    "image/jpg",
    "image/jpeg",
    "image/pjpeg",
    "image/gif",
    "image/x-png",
    "image/png",
};
```

Then we can add this code at the beginning of our `Upload` method:

```csharp
// Check this content type against a set of allowed content types
var contentType = file.ContentType.ToLower();
if (!VALID_CONTENT_TYPES.Contains(contentType))
{
    // Return a 400 Bad Request when the content type is not allowed
    return BadRequest("Not Valid Image");
}
```

After validating the content type we can proceed to send the content to
_Cloudinary_

```csharp
// Create and configure a client object to be able to upload to Cloudinary
var cloudinaryClient = new Cloudinary(new Account(CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET));

// Create an object describing the upload we are going to process.
// We will provide the file name and the stream of the content itself.
var uploadParams = new ImageUploadParams()
{
    File = new FileDescription(file.FileName, file.OpenReadStream())
};

// Upload the file to the server
ImageUploadResult result = await cloudinaryClient.UploadLargeAsync(uploadParams);

// If the status code is a "OK" then the upload was accepted so we will return
// the URL to the client
if (result.StatusCode == HttpStatusCode.OK)
{
    var urlOfUploadedFile = result.SecureUrl.AbsoluteUri;

    return Ok(new { url = urlOfUploadedFile });
}
else
{
    // Otherwise there was some failure in uploading
    return BadRequest("Upload failed");
}
```

## Adding the photo URL to the model

Now we can update the `Restaurant.cs` model to store a URL to the uploaded
image.

```csharp
public string PhotoURL { get; set; }
```

```shell
dotnet ef migrations add AddPhotoURLToRestaurant
dotnet ef database update
```

## Updating the user interface to upload a photo when creating a restaurant

To allow a user to upload a file to our restaurant we'll use a fancy
drag-and-drop library to create an interface for the upload.

```shell
cd ClientApp
npm install --save react-dropzone
cd ..
```

This adds a react component library that has great support for dragging and
dropping files into our UI.

Then we will import this component on our `AddRestaurant.jsx` page:

```javascript
import { useDropzone } from 'react-dropzone'
```

The dropzone component is expecting a method to call when a file is dropped onto
a visible target in the UI. Lets add the method for that:

```javascript
const onDropFile = acceptedFiles => {
  // Do something with the files
  const fileToUpload = acceptedFiles[0]
  console.log(fileToUpload)
}
```

For now we will just have this log the details of the files dropped and get log
details of the first one. We are only going to allow single file drops for now.

Next we will get some configuration information from the dropzone library:

```javascript
const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop: onDropFile,
})
```

Now lets add some user interface to show the user where to drop their files:

```jsx
<div className="alert alert-primary">
  <div {...getRootProps()}>
    <input {...getInputProps()} />
    {isDragActive
      ? 'Drop the files here ...'
      : 'Drag a new file here to upload!'}
  </div>
</div>
```

Try dragging and dropping a file on that part of the UI. When you drop a file
you will see the details of your dropped file logged by the `onDropFile` method.

Now we can update `onDropFile` to process the upload.

```javascript
const onDropFile = async acceptedFiles => {
  // Do something with the files
  const fileToUpload = acceptedFiles[0]
  console.log(fileToUpload)

  // Create a formData object so we can send this
  // to the API that is expecting som form data.
  const formData = new FormData()

  // Append a field that is the form upload itself
  formData.append('file', fileToUpload)

  // Use fetch to send an authorization header and
  // a body containing the form data with the file
  const response = await fetch('/api/Uploads', {
    method: 'POST',
    headers: {
      ...authHeader(),
    },
    body: formData,
  })

  // If we receive a 200 OK response, set the
  // URL of the photo in our state so that it is
  // sent along when creating the restaurant,
  // otherwise show an error
  if (response.status === 200) {
    const apiResponse = await response.json()

    const url = apiResponse.url

    setNewRestaurant({ ...newRestaurant, photoURL: url })
  } else {
    setErrorMessage('Unable to upload image')
  }
}
```

Finally we will update the `ShowRestaurant` component to display the restaurant
image, if present, in place of the taco emoji.

```jsx
{
  restaurant.photoURL ? (
    <img
      alt="Restaurant Photo"
      width={200}
      className="pr-3"
      src={restaurant.photoURL}
    />
  ) : (
    <span className="pr-3 display-2" role="img" aria-label="taco">
      🌮
    </span>
  )
}
```

## Files Updated

- [ClientApp/package.json](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/ClientApp/package.json)
- [ClientApp/package-lock.json](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/ClientApp/package-lock.json)
- [TacoTuesday.csproj](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/TacoTuesday.csproj)
- [Models/Restaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/Models/Restaurant.cs)
- [Migrations/20200712195424_AddPhotoURLToRestaurant.Designer.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/Migrations/20200712195424_AddPhotoURLToRestaurant.Designer.cs)
- [Migrations/20200712195424_AddPhotoURLToRestaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/Migrations/20200712195424_AddPhotoURLToRestaurant.cs)
- [Migrations/DatabaseContextModelSnapshot.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/Migrations/DatabaseContextModelSnapshot.cs)
- [Controllers/UploadsController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/Controllers/UploadsController.cs)
- [ClientApp/src/pages/AddRestaurant.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/ClientApp/src/pages/AddRestaurant.jsx)
- [ClientApp/src/pages/ShowRestaurant.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/ClientApp/src/pages/ShowRestaurant.jsx)

<!-- Whats next

  Use Axios instead of `fetch` to show it being easier

 -->
