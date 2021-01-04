---
title: hub
---

Hub is command line helper for github. It allows for easy github manipulation
from our terminal.

From your terminal, run the following commands (current directory does not
matter):

## GitHub Token

To setup `hub` we will need an API token from GitHub.

Follow the
[Creating a personal access token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)
guide to generate a new token. Give your token a helpful name such as "Token for
using with hub on my laptop". Select the `repo` checkbox before creating the
token.

You will need to leave this token **VISIBLE** on screen for the next steps.

> NOTE: This is the _ONLY_ time this token will be displayed. To ensure its
> safety copy it to a secure location such as a password manager.

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
address. Enter the token you received above as your password.

If you see `Connected` then you have logged into your github account. Otherwise
you will see "Not Connected"
