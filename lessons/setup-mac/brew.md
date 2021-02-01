---
title: Homebrew
---

Homebrew is a tool for installing other programs and tools. We will use it to
install many of the development tools we need during this program.

## Pre Setup

Open a Terminal and run:

```shell
xcode-select --install
```

This will install the Apple developer tools we need for many of the steps that follow.

## Installation

Open a Terminal and run:

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

When this command runs it may ask for a _password_. This is the same password
you use to login to your Mac, or unlock the screen.

> NOTE: When you type your password it won't output anything, you'll be typing
> without any feedback. If you get the password wrong the installation process
> will let you know and you can try again.
