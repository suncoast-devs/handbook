# Setting up your Development Environment

As a developer on the Windows platform, one of our main tools is `Powershell`. `Powershell` is the command line interface (or shell) we use to run commands and interact with our computer. Using the shell seems harder at first, but with practice, this is a much more efficient way of using our computers.

A shell is a program that allows us to interact with our computer by executing commands and seeing the results. For a tutorial on using a shell, see [this page](/handbook/skills/command-line)

To open `Powershell`, open your `start` menu and type `Powershell`, this searches your system and give you the option to start it, just like any other program.

## Git

### What

Git is a distributed source control system. Git allows us to work on and collaborate on different projects with little to no headache.

### Why

Git is how we manage our files and share code. It can be rough at first, but with practice, it becomes second nature.

### How

First, make sure you have a [GitHub](http://github.com/) account.

Then, download the install [Git for Windows](https://gitforwindows.org/).

There are lots of options during the install, but we only need to worry about 2:

1. Change your default editor to `Visual Studio Code`, instead of `vim`. This setting tells git to use VS Code when it needs to use an editor.
2. The installer then asks you are to adjust your `PATH`. Select the 3rd option (`use git and optional Unix tools`). This setting allows Git to used in the terminal.

Leave the other options as the default choice.

After the installation, re-open Powershell. We need to run a few commands to configuration git correctly.

```sh
git config --global user.name "Replace This With Your Full Name"
```

```sh
git config --global user.email email-address-you-used-at-github@example.com
```

Instead of `"Replace This With Your Full Name"` use your fill name.

Instead of `email-address-you-used-at-github@example.com` use the same email address you gave to GitHub.

Finally, we need to set up Git and GitHub to use the `https` protocol. Enter the following in your shell (`Powershell`):

```sh
git config --global hub.protocol https
```

## Node.js

### What

Node is a runtime for javascript. Using node, we can run javascript on our machines without having to be in a browser.

### Why

For the first part of the training, we are concentrating on the HTML/CSS and JavaScript. Many useful tools for those languages run on node.

### How

Run the [node.js installer](https://nodejs.org/en/).

## Yarn

### What

Yarn is a package manager for node packages. Yarn allows us to install and use libraries that run on node.

### Why

We use yarn to run our scripts and as well as installing packages. Package management more useful and meaningful the more we dive deeper in JavaScript.

### How

Follow [the instructions](https://yarnpkg.com/lang/en/docs/install/) for Windows.

## App App

### What

App-App is a tool created by SDG for creating projects using HTML, CSS, and JavaScript.

### Why

App-App ensures a good project folder setup and includes all the needed tools.

### How

With node installed, from Powershell, run the following command (current directory does not matter):

```sh
npm install --global app-app
```

## Netlify

### What

Netlify is a static website hosting company. It allows for easy deploy of your websites, so they are on the web!

### Why

We use Netlify this to host our projects to see how the deploy process works, and we can share our projects with other people.

### How

First, you need to create an account [here](https://www.netlify.com/).

Once you have node installed, run the following command in terminal.

```sh
npm install netlify-cli -g
```

## Hub

### What

Hub is command line helper for GitHub. It allows for easy GitHub manipulation from Powershell.

### How

Download and run [the installer](https://github.com/github/hub/releases/download/v2.11.2/hub-windows-amd64-2.11.2.zip).

After you have downloaded the zip file, extract the folder, and run `install.bat`

---

## Posh-git (Windows Only)

### What

`post-git` is an extension for Powershell that allows easy management for git. Posh-git shows beneficial git information when we are in a repository.

### How

Follow [the instructions](https://github.com/dahlbyk/posh-git#installation).

To check the installation, you should be able to run `Import-Module posh-git` in a git repo and get a display.

### Set up to run every time you open up Powershell

- in Powershell run, `code %UserProfile%\My Documents\WindowsPowerShell\profile.ps1`
- in the file that opens, add `Import-Module posh-git`.
- save and close the file
- restart Powershell
