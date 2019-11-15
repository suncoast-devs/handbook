# The Shell

Developers typically like working on the command line (shell). The shell is a [REPL]() for running commands against the operation system directly. By running commands in this manner, developers can more efficiently use their machines to get work done. Common tasks that developers use the terminal for are:

- navigate to your "Documents."
- create a director
- create a file
- open a file
- run a program

There are many more commands and tools that the shell can use. What makes these powerful and useful is that eventually we will ba able to chain these commands together and run scripts that help automate the boring repeative tasks.

A shell is called different names on different operating systems, but the idea is the same across all platforms. Typically, but not all the time, Mac users use `terminal`, Windows users use `PowerShell`, and Unix systems use `bash`. The commands might be slightly different across all operating systems, but the ideas are the same.

## Useful commands

The following commands are the basic commands that we at SDG teach new developers. These commands are not an exhaustive list, but rather a resource to check for commands to help guide when you are lost.

### pwd

#### How to use

> pwd

#### What does it do?

This simple command stands for "print working directory." This command shows you which directory you currently are in by printing the current directory. Knowing where you are, helps you to know what commands you can run and what tools, programs, and files you can manipulate.

#### When do use pwd?

Use `pwd` to help you see where you currently are in your terminal.

### mkdir

#### How to use

> mkdir _folder_name_

#### What does it do?

This command allows us to create a folder from the terminal.

#### When do use mkdir?

Use this command to create a new folder. We can and should create new folders to help us manage our various projects.

### List

#### How to use

> ls

#### What does it do?

This command lists the files and directories in your current folder. `ls` is usually used to see where you are and what files you can currently use.

#### When do use ls?

Use `ls` to help you see what files are in your current directory.

### Change Directory

#### How to use

> cd _folder_name_

#### What is it?

To navigate our computer, we need to be able to change folders and navigate our file structure. The file structure on our system is set up like a tree. When we open a new folder, we say, we are going down into the new folder. To go down into a new folder, we use the command

```shell
cd folder_name
```

This switches our current working directory to the new directory. Switching directories is roughly equal to double-clicking a folder in finder. This switching moves you down to the new directory. If you wanted to go back up to the parent directory, we use `..` to represent the parent directory

For example, consider the following folder structure.

- Home
  - football-rosters
  - budget
  - family-pictures
    - clearwater-beach-2019,
    - disney-world-2018

`home` is the parent directory of `football rosters`, `budget` and `family-pictures`; and `family-pictures` is the parent of `clearwater-beach-2019` and `disney-world-2018`.

If your current directory is `home`, you can run:

```shell
cd family-pictures
```

The above command changes my current directory to be `family-pictures`. If you want to move back up the `home` directory, you run:

```shell
cd ..
```

#### When to use cd?

Use cd to navigate to a new folder, a current project, or another place on your computer.

### Open VS Code

#### How to use

> code _folder_name_

#### What does it do?

This command is how we open our IDE, Visual Studio Code (VS code). An IDE is a text editor (like a word processor) that has tools and features tailored to developers. We use VS Code to write and edit our code. To learn more about VS Code and what extensions we recommend, [check this out](/handbook/tools/editors).

Typically, we use this to open the current folder, using:

```shell
code .
```

The `.` represents the current directory. Note the "space" between `code` and `.`. You can also use this to open up folders by using it like

```shell
code my_project
```

#### When do use code?

Use this when you want to open a file or project and write or edit code or files.

### node

#### How to use

> node _file_name.js_

#### What does it do?

Node is a runtime for javascript. Using node, we can run javascript on our machines without having to be in a browser.

#### When do use node?

We typically use this for running JavaScript code. This how we can run and test specific ideas without having to use a browser (like Chrome). We use this in one of two ways.
<br/>

First, we use this as a [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) to run lines of JavaScript. This way allows us to run an individual or a small number of lines of code to test out an algorithm or idea.
<br/>

The second time to use this to the run `*.js` files. This how we run node files or any javascript files that do not interact with the DOM.
<br/>

Usually, students at the beginning of their journey do not run node directly but use node to run other tools.

### npm

#### How to use

> npm [command][parameters]

#### What does it do?

`npm` stands for "node package manager." This program is a way for us to install tools and packages. `npm` is not typically used until students get more into the journeyman level development.

#### When do use node?

You need to use npm to install new tools in the command line from time to time.

Generally, you need to run this command when dealing with project setups or to use new tools

### yarn

#### How to use

> yarn [command][parameters]

#### What does it do?

Yarn is a package manager for node. Yarn is also a task runner. We can use the run and manage individual node packages and tasks for our websites.

For a new developer, this is the tool we use to run and deploy our apps.

#### When do use yarn?

Once we are on in our project directory, we use yarn to start our HTML/CSS/JavaScript apps by running:

```shell
yarn start
```

We also use yarn to run other tasks (such as `yarn deploy` for deployment) and other scripts we might make later.

### app-app

#### How to use

> app-app _project-name_

#### What does it do?

`app-app` is a tool built by SDG to help kick start projects. `app-app` is a scaffolding tool. A scaffolding tool allows developers to quickly built projects based on a template that includes many tools and process that start the same for every project

`app-app` currently has 3 different stacks built in; ALPHA, BETA, and GAMMA. ALPHA stack is a basic HTML and CSS website. BETA stack adds vanilla JavaScript. GAMMA stack gives a basic React app.

#### When do use app-app?

We only use `app-app` to create a new front end development project. Which means, it is only once run when we start a new HTML/CSS/JavaScript project that we want to run in the browser.

### git

#### How to use

> git [action]

#### What does it do?

Git is a distributed version control system for tracking changes in source code during software development. Git is designed for coordinating work among programmers, but it can be used to track changes in any set of files. Its goals include speed, data integrity, and support for distributed, non-linear workflows [[from wikipedia]](https://en.wikipedia.org/wiki/Git).

Git is different than [GitHub](http://github.com). GitHub is a web-based provider of a git; whereas git is the underlying tool. Github runs git, and we save our changes to our code to GitHub using git.

#### When do use git?

You want to use git to save your changes. The most common tasks with git are usually "making a commit" or "pushing to GitHub". Git can do much more than that, but for right now, that is all a new developer needs to know.

To create a commit on our _local machine_, you need to run

```shell
git add  .
git commit -m "A message about what you did
```

To save your changes to GitHub, you need to run:

```shell
git push origin master
```

To learn more about git [check this out](http://try.github.io/)

### hub

#### How to use

> hub [command]

#### What does it do?

Hub is the last bit of glue that ties our local git code and repositories to GitHub. Hub is a command line program that lets you more easily work with GitHub, the place where we store our code.

#### When do use hub?

This tool is mostly used in the background to set up and help manage your repositories. The two useful commands are:

```shell
hub browse
```

If your current directory is a git repository, this command will open the corresponding GitHub repository.

### open the current directory in finder

#### How to use

Mac OX

> open _folder_name_

Windows

> start _folder_name_

#### What does it do?

This command opens your present working directory in your file explorer for you. Even though the shell is robust, sometimes the file explorer is easier to use.

#### When do use start/open?

We use this when we need to see the current directory in our file explorer.

### Stopping long-running tasks

#### How to use

pressing both `control` and `c` - commonly denoted as `ctrl + c`

#### What does it do?

Sometimes when we are running tasks in our shell, we want to stop the task as it is running. Using this shortcut, we stop tasks that are already running.

#### When do use ctrl+c?

Typical times to use this as a new developer are to :

- Stop `yarn start`
- Quit something that has crashed
- Stop `app-app` from finishing creating a new app.
