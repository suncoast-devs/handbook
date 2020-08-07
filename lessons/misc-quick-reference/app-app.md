---
title: How to use app-app to create front end projects
---

`app-app` is a tool created by SDG for students to easily create front end
projects for each of the phases of our program.

## Installation

```shell
npm install --global app-app
```

Alternatively you can use `npx` before all the commands below and not need
`npm install --global app-app`

## Using

### Getting help

```shell
app-app --help
```

### Simple mode

```shell
app-app PutYourApplicationNameHereInsteadOfThis
```

This will walk you through a series of questions to determine what kind of
project to create.

The first option is which stack you wish to use

```
? Which stack? (Use arrow keys)
❯ ALPHA:       Vanilla stack with HTML, CSS, linting, and BrowserSync
  BETA:        Vanilla stack with HTML, CSS, linting, JavaScript and BrowserSync
  GAMMA:       React stack
  GAMMA HOOKS: React stack with hooks
  DELTA:       React stack and React Router
  DELTA HOOKS: React stack and React Router with HOOKS
```

Each of the options sets up a different style project depending on what
configuration you want, and what libraries you want included

Next up you will be asked for your project title. If `app-app` made a good
guess, simply press ENTER, otherwise type a new, better, title.

```
? Which stack? BETA:        Vanilla stack with HTML, CSS, linting, JavaScript and BrowserSync
? What's your project's title? (Put Your Application Name Here Instead Of This)
```

Next up you'll be asked if you wish to create a github project. Answer `Y` if
you want to create a git repository and a corresponding github project for this
application. If you say `no` you can always choose to do so later.

```
? Which stack? BETA:        Vanilla stack with HTML, CSS, linting, JavaScript and BrowserSync
? What's your project's title?
? Create GitHub repository? (Y/n)
```

At this point `app-app` will start to generate your project. When complete
you'll see a message like this:

```
Success! Created "Put Your Application Name Here Instead Of This"


We suggest that you begin by typing:

  cd put-your-application-name-here-instead-of-this
  code .
  npm start
```

The suggestions at the end state that you need to `cd` into the project
directory app-app created. The next two lines `code .` and `npm start` will
start your code editor and then start the project by running the code and
opening a browser.

### Specifying a stack on the command line.

If you wish you can specify the stack on the command line.

For instance:

```shell
app-app --beta PutYourApplicationNameHereInsteadOfThis
```

This will assume the `beta` stack and skip asking you that question during the
process.

## Happy coding!
