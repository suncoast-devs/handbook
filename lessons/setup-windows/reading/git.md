# Git

Git is a distributed source control system. This allows us to easily work, and collaborate, on many different projects.

Git is how we will be managing our files and sharing code with each other. Git is a complex tool and it will seem rough at first. However, with practice, you will become familiar with the commands and options.

## Pre Installation

First, make sure you have a [GitHub](http://github.com/) account.

## Installation (via Scoop)

```sh
scoop install git
```

## Installing

Download the install [Git for Windows](https://gitforwindows.org/).

There many options during the install, but we only need to worry about these two:

1. Change your default editor to `Visual Studio Code`, instead of `vim`. This setting tells git to use VS Code when it needs to use an editor.
2. The installer then asks you are to adjust your `PATH`. Select the 3rd option (`use git and optional Unix tools`). This setting allows Git to used in the terminal.
3. At the end you can un-check the option to view the release notes.

Leave the other options as the default choice.

## Post Installation Steps

After the installation, re-open Powershell. We need to run a few commands to configuration git correctly.

### Tell Git your Name

Every line of code you save with `git` will be attributed to you. `git` will need to know the name to associate with the code. You _should_ use your real name here, not a pseudonym or a `1337 haxor` name.

> NOTE: In the following command, instead of `"Replace This With Your Full Name"` use your full name, e.g., "Jane Q Public" or "John Q Public".

```sh
git config --global user.name "Replace This With Your Full Name"
```

### Tell Git your E-Mail Address

> NOTE: In the following command, instead of `email-address-you-used-at-github@example.com` use the **same email address you gave to GitHub**. Github uses this to make sure it can generate this awesome "activity" chart for you. ![github-activity](./github-activity.png)

```sh
git config --global user.email "email-address-you-used-at-github@example.com"
```

### Tell Git + Hub to use `HTTPS`

Finally, we need to set up Git and GitHub to use the `https` protocol. Enter the following in your shell (`Powershell`):

```sh
git config --global hub.protocol https
```
