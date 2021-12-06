---
title: How to use dotnet new with the SDG Templates
---

`dotnet new` can create new projects using `C#` and the `dotnet` frameworks. SDG
has created a number of templates to assist students with creating projects.

| Name                 | Description                            | Purpose                                                                  |
| -------------------- | -------------------------------------- | ------------------------------------------------------------------------ |
| sdg-console          | SDG Console App Template               | Runs a console based application _without_ a database                    |
| sdg-console-database | SDG Console App with Database Template | Same as sdg-console but adds database support                            |
| sdg-api              | SDG Web API Template                   | Runs a web API based application _without_ a database                    |
| sdg-react            | SDG React + .NET Template              | Combines a web API with Database support and a REACT based front end app |

> NOTE: All of the templates containing database support use the `PostgreSQL`
> database engine.

## Installation

If you are missing these templates you can install them via

```shell
dotnet new --install SDG.templates.Console
dotnet new --install SDG.templates.Console.Database
dotnet new --install SDG.templates.Web.API
dotnet new --install SDG.templates.Web.React
dotnet new --install SDG.templates.Web.React.NoClientApp
```

## Using

```shell
dotnet new sdg-react -o NameOfProject
```

Replace `sdg-react` with the specific template name you wish to use and
`NameOfProject` with a _camel cased_ project name preferably with a letter as
the first character of the project name.

During setup it will ask if you wish to create a GitHub repository. You should
say `YES` if you intend to push to github.

## Recreating a project

If you **recreate** a project with the same name, it will link to the existing
github repository. So if you have to **recreate** a project we recommend **using
a new unique name** or **deleting the old github project** before creating a new
local project
