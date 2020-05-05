---
title: Adding secret configuration values to a project
---

When developing, there are sometimes values we do not to keep in source control
(git). These values include things like api keys, connection strings, api
secrets and other sever configarations.

One way to hide these values is to use
[`user-secrets`](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-3.1&tabs=linux).
This is way to store values on our local development machine, use those value
sin our code, and also not put them in git.

## Setting up secrets

This code sample is the most basic example of keep secrets in .NET core.

_NOTE_: All commands must be run in the project directory

## Set up

First, we need to init secrets in our code base.

```sh
dotnet user-secrets init
```

This command sets up a secrets reference to your project.

## Add the secrets to the secrets store

Next, you want to add the actual values. These values are stored on your machine
in a plain text, key-value structure.

```sh
dotnet user-secrets set "ConnectionString" "server=localhost;database=MyApiDatabase"
```

The above command will add new key called `ConnectionString` with the
value:`server=localhost;database=MyApiDatabase`

## Using the value

To get a value, we must use
[dependency injection](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-3.1).
That is because our server is loading the configuration when the server starts.
This configuration is accessible in our apps when we inject the configuration
into our code where needed.

To use DI in our code, go to the class where the configuration setting is needed
and a constructor (or modify the existing one) to accept a parameter of
`IConfiguration configuration`. Your constructor should look like this:

```C#
public DatabaseContext(IConfiguration configuration)
{

}
```

With the configuration being injected we can now access the setting we need by
using the the bracket notation. So our full constructor should look like this:

```C#
public DatabaseContext(IConfiguration configuration)
{
 this.ConnectionString = configuration["ConnectionString"];
}
```

In this constructor, we are setting a property on our class to the connection
string in the configuration. This statement allows us to use
`this.ConnectionString` anywhere in this class with the value that is in our
user-secrets

## Development mode

Secrets will only be loaded when you app is development mode. You will need
update your environment variables on your machine to have
`ASPNETCORE_ENVIRONMENT` set to `Development`

## Full example

[Full Example here](https://github.com/mdewey/SecretExampel)

## Read More

Checkout the latest
[documentation](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-3.1&tabs=linux)
