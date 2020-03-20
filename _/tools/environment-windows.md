# Setting up your Development Environment

## Powershell

As a developer on the Windows platform, one of our main tools is `Powershell`. `Powershell` is the command line interface (or shell) we use to run commands and interact with our computer. Using the shell seems difficult at first, but with practice, this becomes a much more efficient way of using our computers. For a tutorial on using the shell, see [this page.](/handbook/skills/command-line)

To open `Powershell`, open your `start` menu or type \(Win + R\), then type `Powershell`, this searches your system and give you the option to start it, just like any other program.

## Git

Git is a distributed source control system. This allows us to work on and collaborate on different projects with little to no headache.

Git is how we will be managing our files and sharing code between each other. It will seem rough at first but with practice, you will never know how any else shares documents

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

Instead of `"Replace This With Your Full Name"` use your full name, e.g., "Jane Q Public" or "John Q Public".

Instead of `email-address-you-used-at-github@example.com` use the same email address you gave to GitHub.

Finally, we need to set up Git and GitHub to use the `https` protocol. Enter the following in your shell (`Powershell`):

```sh
git config --global hub.protocol https
```

## Hub

Hub is command line helper for github. It allows for easy github manipulation from our terminal.

From your terminal, run the following commands (current directory does not matter):

### How

Download and run [the installer](https://github.com/github/hub/releases/download/v2.11.2/hub-windows-amd64-2.11.2.zip).

After you have downloaded the zip file, extract the folder, and run `install.bat`

## Optional

## Posh-git (Windows Only)

`posh-git` is an extension for Powershell that allows easy management for git. Posh-git shows beneficial git information when we are in a repository.

### How

Follow [the instructions](https://github.com/dahlbyk/posh-git#installation).

To check the installation, you should be able to run `Import-Module posh-git` in a git repo and get a display.

### Set up to run every time you open up Powershell

- in Powershell run, `code %UserProfile%\My Documents\WindowsPowerShell\profile.ps1`
- in the file that opens, add `Import-Module posh-git`.
- save and close the file
- restart Powershell
