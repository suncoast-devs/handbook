# Setup for Assignments

During this course, you create many projects. It's essential to know how to set up a new project.

## Once per computer

### Organization

_these commands you only need to run once per computer_

To keep our files organized, we should place all of our projects into one folder; lets call that that folder `sdg`. To create this folder, open your shell and run

```shell
mkdir sdg
```

This command creates a new folder called `sdg` in your home directory.

### Scaffolding

Scaffolding is this idea in software that we can use a tool to create a boilerplate project for use to get our ideas off the ground faster. Over the course, we explore many different types of scaffolding tools.

For unit-i, you use the dotnet template for console apps. This template can be install (and updated) by running the command

```sh
dotnet new --install SDG.templates.Console
```

## Once per project

This section describes the process for setting up assignments in unit i.

Before you started, make [to have your developer env set up](/handbook/tools/environment) and be familiar with [commands we like](/handbook/resources/bash/commands-we-like)

Open your terminal, then create and change into the directory that stores your projects. We do not enforce a directory structure, but we highly recommend to keep your environment organized. Navigating to your projects is a series of `cd` commands. It should look something like:

```sh
cd sdg
cd unit-i
```

Run the generator to create a boilerplate project, and change into that directory:

```sh
dotnet new sdg-console -o MyCoolProject
cd MyCoolProject
```

Open the project folder in your editor (remember, `.` is an alias for the current directory):

```sh
code .
```

Tab back to your terminal and start your program.

```sh
dotnet watch run
```

This command will a [watcher process that watches](https://docs.microsoft.com/en-us/aspnet/core/tutorials/dotnet-watch?view=aspnetcore-3.1) your C# files and rebuilds and runs your program every time you save your file.

**Note**: Remember to check your code often! Fast, continuous feedback of your code helps
you create your programs more efficiently.
