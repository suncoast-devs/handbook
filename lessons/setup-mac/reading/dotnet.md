---
title: .NET Core
---

In order to create and run applications written in the `C#` language and the
`.NET Core` environment we need to install some tools on our computer. The tool
we need to download is called a `Software Development Kit`, or `SDK` for short.
Microsoft provides a download to install and configure the `.NET Core` `SDK` for
us.

## Installation

```sh
brew cask install dotnet-sdk
```

## Post Installation

We will need a few tools along the way so we will make sure they are installed
now:

### dotnet EF Core

In a Terminal window:

```sh
dotnet tool install --global dotnet-ef
```

### dotnet code generator

In a Terminal window:

```sh
dotnet tool install --global dotnet-aspnet-codegenerator
```

### SDG tools

In a Terminal window:

```sh
dotnet new --install SDG.templates.Console
```

```sh
dotnet new --install SDG.templates.Console.Database
```

```sh
dotnet new --install SDG.templates.Web.API
```

```sh
dotnet new --install SDG.templates.Web.React
```

### Set dotnet locally to "Development Mode"

In a Terminal window:

```sh
echo "export ASPNETCORE_ENVIRONMENT=Development" >> ~/.zshrc
echo "export ASPNETCORE_ENVIRONMENT=Development" >> ~/.bash_profile
```

## Security

In a Terminal window:

```sh
dotnet dev-certs https --trust
```
