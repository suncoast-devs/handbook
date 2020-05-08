---
title: .NET Core
---

In order to create and run applications written in the `C#` language and the
`.NET Core` environment we need to install some tools on our computer. The tool
we need to download is called a `Software Development Kit`, or `SDK` for short.
Microsoft provides a download to install and configure the `.NET Core` `SDK` for
us.

## Installation (via Scoop)

```shell
scoop install dotnet-sdk
```

## Post Installation

We will need a few tools along the way so we will make sure they are installed
now:

### .NET EF Core

In a Powershell window:

```shell
dotnet tool install --global dotnet-ef
```

### .NET code generator

In a Powershell window:

```shell
dotnet tool install --global dotnet-aspnet-codegenerator
```

### SDG tools

In a Powershell window:

```shell
dotnet new --install SDG.templates.Console
```

```shell
dotnet new --install SDG.templates.Console.Database
```

```shell
dotnet new --install SDG.templates.Web.API
```

```shell
dotnet new --install SDG.templates.Web.React
```

### Set .NET locally to "Development Mode"

In a Powershell window:

```shell
setx ASPNETCORE_ENVIRONMENT Development
```

Mac users need to:

```shell
echo "export ASPNETCORE_ENVIRONMENT=Development" >> ~/.zshrc
echo "export ASPNETCORE_ENVIRONMENT=Development" >> ~/.bash_profile
```

## Security

```shell
dotnet dev-certs https --trust
```
