# Hub

Hub is command line helper for github. It allows for easy github manipulation from our terminal.

From your terminal, run the following commands (current directory does not matter):

## Installing

Download and run [the installer](https://github.com/github/hub/releases/download/v2.11.2/hub-windows-amd64-2.11.2.zip).

After you have downloaded the zip file, extract the folder, and run `install.bat`

You may see the message "Windows protected your PC". If you do, simply click "More info" and then "Run anyway".

## Post Installation

Start a new Powershell and enter the command:

```sh
hub api
```

This will ask for your `github.com username`, supply your username or email address.
Enter your `github.com` password.
If you have two-factor auth enabled, you'll have to enter an authorization code.

If you see output that looks similar to:

```sh
{"current_user_url":"https://api.github.com/user","current_user_authorizations_html_url":
```

Then you have setup `hub` correctly
