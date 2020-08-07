---
title: Creating a new project
---

When creating new projects, developers tend to use tools to help scaffold new
projects. These tools help create the boiler plate code that is the same for
every project.

## Front-end Project

Before you started, make
[to have your developer env set up](/handbook/tools/environment) and be familiar
with [commands we like](/handbook/resources/bash/commands-we-like)

Front-end projects are projects that are done in entirely in HTML, CSS and
JavaScript and usually run on the users machine (phone, laptop, etc)

To start a new client side project, open your terminal of choice.

1. Using `cd` navigate to the folder where you want the project. This will
   mostly likely be a folder that you created on the first day of class.

2. Once in the directory you want to be in. run

```
app-app project-name
```

After you select your stack accordingly, `app-app` will run the scaffolding to
create a new project.

3. Once `app-app` is done running, you will want to navigate to your new project
   using cd

```
cd project-name
```

4. Once in your project directory, you will want to open it up in VS Code. Run
   the command:

```
code .
```

This opens the current directory in VS Code.

5. The final step is start your web server by running

```
npm start
```
