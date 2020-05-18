---
title: hub
---

Hub is command line helper for github. It allows for easy github manipulation
from our terminal.

From your terminal, run the following commands (current directory does not
matter):

## Installation

```shell
brew install hub
```

## Post Installation

Start a new Powershell and enter the command:

```shell
hub api | grep -q "current_user_url" && echo "Connected" || echo "Not Connected"
```

This will ask for your `github.com username`, supply your username or email
address. Enter your `github.com` password. If you have two-factor auth enabled,
you'll have to enter an authorization code.

If you see `Connected` then you have logged into your github account. Otherwise
you will see "Not Connected"
