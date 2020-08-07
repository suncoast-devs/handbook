---
title: Reopening a project
---

Developers need to return to projects more often than creating new projects, but
the process is very similar.

## Front-end Project

Before you started, make
[to have your developer env set up](/handbook/tools/environment) and be familiar
with [commands we like](/handbook/resources/bash/commands-we-like)

Front-end projects are projects that are done in entirely in HTML, CSS and
JavaScript and usually run on the users machine (phone, laptop, etc)

To resume a new client side project, open your terminal of choice.

1. Using `cd` navigate to the folder where you made the project. This will
   mostly likely be a folder that you created on the first day of class. You
   should be able to run `ls` and see your project files.

2. Once in your project directory, you will want to open it up in VS Code. Run
   the command:

```
code .
```

This opens the current directory in VS Code.

3. The final step is start your web server by running

```
npm start
```
