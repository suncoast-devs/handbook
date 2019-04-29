# Setting up your Development Environment

As a developers on the Windows platform, one of our main tools is `Powershell`. `Powershell` is the command line interface (or shell) we will use to run commands and interact with our computer. This will seem harder at first, but with practice, this will be a much more efficient way of using our computers.

A shell is a program that allows us to interact with our computer by executing commands and seeing the results. For a tutorial on using a shell, see [this page](/handbook/skills/command-line)

To open `Powershell`, open your `start` menu and type `powershell`, this will look in your system and give you the option to start it, just like any other program.

## Git

### What

Git is a distributed source control system. This allows us to work on and collaborate on different projects with little to no headache.

### Why

Git is how we will be managing our files and sharing code between each other. It will seem rough at first but with practice, you will never know how any else shares documents

### How

Download the install [Git for Windows](https://gitforwindows.org/).

NOTES: - There are lots of options here, and we only need to worry about 2:

1. Change your default editor to `Visual Studio Code`, instead of `vim`. This will cause git to use VS Code when it needs to use an editor.
2. The installer will ask you are adjusting your PATH. Select the 3rd option (`use git and optional unix tools`). This will allow git to be used in your terminal

After the installation, re-open Powershell. We need to run a few commands to configuration git correctly.

```sh
git config --global user.name "Replace This With Your Full Name"
```

```sh
git config --global user.email email-address-you-used-at-github@example.com
```

Instead of `"Replace This With Your Full Name"` use your fill name.

Instead of `email-address-you-used-at-github@example.com` use the same email address you gave to GitHub

Finally we will tell Git and GitHub to use the `https` protocol we will enter the following in Terminal:

```sh
git config --global hub.protocol https
```

## Node.js

### What

Node is a runtime for javascript. This means that with node, we can run javascript on our machines without having to be in a browser

### Why

For the first part of the training, we are concentrating on the HTML/CSS and JavaScript. Many useful tools for those languages are built with node.

### How

Run the [node.js installer](https://nodejs.org/en/).

## Yarn

### What

Yarn is a package manager for node packages. This means that we can install and use libraries that are written in node.

### Why

We will be using this to run our scripts and as well as installing packages. This will be more useful the more we dive deeper in JavaScript

### How

Follow [the instructions](https://yarnpkg.com/lang/en/docs/install/) for you operating system.

## App App

### What

App-App is a tool created by SDG for creating projects using HTML, CSS, and JavaScript

### Why

App App ensures a good project folder setup and includes all the needed tools

### How

With node installed, from powershell, run the following command (current directory does not matter):

```sh
npm install --global app-app
```

## Netlify

### What

Netlify is a static website hosting company. It allows for easy deploy of your websites so they are on the web!

### Why

We will use this to host some projects to see how the deploy process works and we can share our projects with other people.

### How

First you need to create an account [here](https://www.netlify.com/). Then you will need to

Once you have node installed, run the following command in terminal.

```sh
npm install netlify-cli -g
```

## Hub

### What

Hub is command line helper for github. It allows for easy github manipulation from powershell.

### How

Download and run [the installer](https://github.com/github/hub/releases/download/v2.11.2/hub-windows-amd64-2.11.2.zip).

After you have downloaded the zip file, extract the folder, and run `install.bat`

---

## Posh-git (Windows Only)

### What

`post-git` is a extenstion for powershell that allows easy management for git. It will give very useful information for us.

### How

Follow [the instructions](https://github.com/dahlbyk/posh-git#installation).

To check the installation, you should be able to run `Import-Module posh-git` in a git repo and get a display.

### Set up to run everytime you open up powershell

- in powershell run, `code %UserProfile%\My Documents\WindowsPowerShell\profile.ps1`
- in the file that opens, add `Import-Module posh-git`.
- save and close file
- restart powershell
