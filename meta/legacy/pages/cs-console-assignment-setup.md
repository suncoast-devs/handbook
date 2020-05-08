---
title: Setup for Assignments
---

During this course, you create many projects. It's essential to know how to set
up a new project.

Before you get started, make sure you have setup your computer according to:

- LINK TO WINDOWS SETUP
- LINK TO MAC SETUP
- LINK TO LINUX SETUP

And be familiar with LINK TO USEFUL-CONSOLE-COMMANDS

## Once per computer

_these commands you only need to run once per computer_

To keep our files organized, we should place all of our projects into one
folder; lets call that that folder `sdg`. To create this folder, open your shell
and run

```shell
mkdir sdg
```

This command creates a new folder called `sdg` in your **home** directory.

## Once per project

This section describes the process for setting up assignments for csharp
projects

Open your terminal, then create and change into the directory that stores your
projects. We do not enforce a directory structure, but we highly recommend to
keep your environment organized.

Navigating to your projects is a series of `cd` commands. It should look
something like:

```shell
cd sdg
cd unit-i
```

Run the `dotnet new` command to create a new project, and change into that
directory. As you work on different types of `csharp` projects this `dotnet new`
command will change as we will be creating different kinds of projects.

> Creating the project

```shell
dotnet new sdg-console -o MyCoolProject
```

> Ensuring your working directory is **inside** the project

```shell
cd MyCoolProject
```

> Opening the project in Visual Studio Code

```shell
code .
```

> Running your project

```shell
dotnet watch run
```
