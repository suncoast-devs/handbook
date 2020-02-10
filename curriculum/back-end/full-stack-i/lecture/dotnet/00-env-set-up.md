# Get going with .NET Core

## CLI

To run dotnet applications need to install the latest SDK.

[Download the latest](https://dotnet.microsoft.com/download)

## VS Code extensions

Be sure to have VS Code configured according to the [VS Code setup instructions](/handbook/tools/editors)

## Scaffolding tools

To help get our projects started, we will install a few tools to help us create projects as we go.

For unit-i, you use the dotnet template for console apps. This template can be install (and updated) by running the command

```sh
dotnet new --install SDG.templates.Console
```

This only has to be done once per machine.

## Using the scaffolding

To create a new project with the scaffolding.

```sh
dotnet new sdg-console -o MyCoolProject
```
