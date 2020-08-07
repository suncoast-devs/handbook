---
title: The Shell
---

Developers typically like working on the command line (shell). The shell is a
[REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) for
running commands against the operation system directly. By running commands in
this manner, developers can more efficiently use their machines to get work
done. Common tasks that developers use the terminal for are:

- Navigate to a directory
- Creating a directory
- Creating a file
- Opening a file
- Running a program

There are many more commands and tools that the shell can use. What makes these
powerful and useful is that eventually we will ba able to chain these commands
together and run scripts that help automate the boring repetitive tasks.

Interacting with our operating system comes in two parts. The first is the
`shell`, the actual `REPL` we will interact with, the second being the
`terminal program` we use to run that shell. You can think of the `terminal`
like your browser and the `shell` like the web page it contains.

Different operating systems use different tools for both of the `terminal` and
the `shell`. For instance on Mac OS we use the `Terminal` application to
interact with our shell of either `bash` or `zsh` (depending on your OS
version). On Linux we use a terminal application that varies based on which
version of Linux you are using, however, the shell is typically again either
`bash` or `zsh`. On Windows both the terminal and shell are both called
`PowerShell`.

The commands might be slightly different across all operating systems, but the
ideas are the same.

## Useful commands

The following commands are the basic commands you will need to be familiar with
as a new developer. These commands are not an exhaustive list, but rather a
resource to help guide you when you are lost.

### Show my current directory

> `pwd`

- What does it do?

This simple command stands for "print working directory." This command shows you
which directory you currently are in by printing it's name. Knowing where you
are helps you to know what commands you can run and what tools, programs, and
files you can manipulate.

- When to use `pwd`?

Use `pwd` to help you see where you currently are in your terminal.

### Create a new directory

> `mkdir` _folder_name_

- What does it do?

This command allows us to create a new directory (_folder_) from the terminal.
The directory is created within whatever directory is currently active. (use
`pwd` to check if you need)

- When do use `mkdir`?

Use this command to create a new directory. We can, and should, create new
folders to help us manage our projects.

### List files and directories

> `ls`

- What does it do?

This command lists the files and directories in your current directory.

- When do use ls?

Use `ls` to help you see what files are in your current directory.

### Change Directory

> `cd` _directory name_

- What does it do?

To navigate our computer, we need to be able to change directories and navigate
our file structure. The file structure on our system is set up like a tree. When
using your desktop user interface (Finder, Windows Explorer, etc) and we open a
new folder we say: we are going down into the new folder. To go down into a new
directory from the shell, we use the command `cd`

The `cd` command changes our current working directory to the new directory.
Switching directories is roughly equal to double-clicking a folder in your
desktop user interface.

To go back **up** to the parent directory we use a special _directory name_
called `..` which means "the directory that is my parent"

For example, consider the following folder structure.

- Home
  - `football-rosters`
  - `budget`
  - `family-pictures`
    - `clearwater-beach-2019`
    - `disney-world-2018`

`Home` is the parent directory of `football rosters`, `budget` and
`family-pictures`; and `family-pictures` is the parent of
`clearwater-beach-2019` and `disney-world-2018`.

Starting out we will be in our `Home` directory

- Home `<=- You are here`
  - `football-rosters`
  - `budget`
  - `family-pictures`
    - `clearwater-beach-2019`
    - `disney-world-2018`

If your current directory is `home`, you can run:

```shell
cd family-pictures
```

- Home
  - `football-rosters`
  - `budget`
  - `family-pictures` `<=- You are here`
    - `clearwater-beach-2019`
    - `disney-world-2018`

The above command changes my current directory to be `family-pictures`. If you
want to navigate down further into `disney-world-2018` you can use `cd` again

```shell
cd disney-world-2018
```

- Home
  - `football-rosters`
  - `budget`
  - `family-pictures`
    - `clearwater-beach-2019`
    - `disney-world-2018` `<=- You are here`

If you want to move back up one directory, you run:

```shell
cd ..
```

And you will again be in the `family-pictures` directory again

- When to use cd?

Use cd to navigate to a new folder, a current project, or another place on your
computer.

### Open VS Code

> code _folder_name_

- What does it do?

This command is how we open our IDE, Visual Studio Code (VS code). An IDE is a
text editor (like a word processor) that has tools and features tailored to
developers. We use VS Code to write and edit our code.

Often we want to open VS Code with the contents of our _current directory_. Just
like `..` is a special directory meaning _the parent directory_ there is another
special directory named `.` that means _the current directory_

So to open the current directory's content in VS Code you use:

```shell
code .
```

- When do use code?

Use this when you want to open a file or project and write or edit code or
files.

### node

> node _file_name.js_

- What does it do?

Node is a runtime for javascript. Using node, we can run javascript on our
machines without having to be in a browser.

- When do use node?

We typically use this for running JavaScript code. This how we can run and test
specific ideas without having to use a browser (like Chrome). We use this in one
of two ways.

First, we use this as a
[REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) to
run lines of JavaScript. This way allows us to run an individual or a small
number of lines of code to test out an algorithm or idea.

The second time to use this to the run `*.js` files. This how we run node files
or any javascript files that do not interact with the DOM.

Usually, students at the beginning of their journey do not run node directly but
use node to run other tools.

### npm

> npm [command][parameters]

- What does it do?

`npm` stands for "node package manager." This program is a way for us to install
tools and packages.

- When do use node?

You need to use npm to install new tools in the command line from time to time.

Generally, you need to run this command when dealing with project setups or to
use new tools

### app-app

> app-app _project-name_

- What does it do?

`app-app` is a tool built by SDG to help kick-start projects. `app-app` is a
scaffolding tool. A scaffolding tool allows developers to quickly built projects
based on a template that includes common tools and functionality.

We will use `app-app` to build our front end projects.

- When do use app-app?

We use `app-app` to create new front end development projects.

### git

> git [action]

- What does it do?

Git is a `version control system` for tracking changes in source code during
software development. Git is designed for coordinating work among programmers
and is one of the most common _version control systems_ you will see as a
developer.

Git is different than [GitHub](http://github.com). GitHub is a web-based
provider of a git; whereas git is the underlying tool. Github runs git, and we
save our changes to our code to GitHub using git.

- When do use git?

You want to use `git` to save your changes. The most common tasks with git are
usually "making a commit" or "pushing to GitHub". Git can do much more than
that, but for right now, that is mostly what a new developer needs to know.

To create a commit on our _local machine_, you run:

```shell
git add  .
git commit -m "A message about what you did"
```

To send your changes to GitHub, you run:

```shell
git push
```

To learn more about git [check this out](http://try.github.io/)

### hub

> hub [command]

- What does it do?

Hub is the last bit of glue that ties our local git code and repositories to
GitHub. Hub is a command line program that lets you more easily work with
GitHub, the place where we store our code.

- When to use hub?

This tool is mostly used in the background to set up and help manage your
repositories.

The most useful command is to open the github page corresponding to your
project:

```shell
hub browse
```

You can also _create_ a new github repository by using:

```shell
hub create
```

Within this command `hub` will use the name of the directory you are in as the
name of the project. If you would like to use a custom name you may use the
following, substituting `CUSTOM-NAME` with your project name. NOTE, it should
not use spaces in the name.

```shell
hub create CUSTOM-NAME
```

### Open the current directory in your desktop user interface

Mac OX

> open _folder_name_

Windows

> start _folder_name_

- What does it do?

This command opens your present working directory in your file explorer for you.
Even though the shell is robust, sometimes the file explorer is easier to use.

- When do use start/open?

We use this when we need to see the current directory in our file explorer.

### Stopping long-running tasks

pressing both `control` and `c` - commonly denoted as `ctrl + c`

- What does it do?

Sometimes when we are running tasks in our shell, we want to stop the task as it
is running. Using this shortcut, we stop tasks that are already running.

- When do use ctrl+c?

You need to stop the program you are running and return to being able to type
commands in your shell.
