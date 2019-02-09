# Setting up your Development Environment

Over the course the training you will be using a variety of tools. To get started we need the follow software and tools

## Slack

Slack will be our main form of communication. You will communicate with your instructors and SDG staff via Slack. You will get notifications of homework, links to resources, and be able to ask for help via Slack.

Download it to you computer; if you have a smart phone, I _highly_ recommend installing the app.

Open your browser and [download the desktop client](https://slack.com/downloads) for your platform.

Open your phone's application store and install the mobile application and sign in at least once.

You should have received an invitation to several Slack _Teams_ -- SDG maintains two main Slack Teams, one is for students and alumni _only_ and the other is a general Tampa Bay community team that includes over 1,300 members.

## Editors / IDEs

`IDE` stands for `Integrated Developer Environment`. Developers can be fiercely opinionated about which one is better. Here at SDG, we allow students to use any light weight editor they want, but recommend using Visual Studio Code.

### VS Code

VS Code is a extendable lightweight editor that allows us to see what is going on so if you ever get the more powerful tools (like Visual Studio or Eclipse). It will not be a crutch, but a tool. This is like starting with a screwdriver, and working our way up to power drill.

After [downloading VS Code](https://code.visualstudio.com), double-click the ZIP file to extract the application. Then drag the VS Code icon to our Applications folder.

See setup instructions here under `VS Code`: [Editors](/handbook/tools/editors)

# Mac OS X - Setting up your Development Environment

## Terminal

Terminal.app is the application that allows us to run our `shell` -- the default shell we will use is called `bash`

A shell is a program that allows us to interact with our computer by executing commands and seeing the results. For a tutorial on using a shell, see [this page](/handbook/skills/command-line)

## How

Using either Finder or Spotlight, start the `Terminal` application.

Lets do some configuration to give us a nice user interface.

- Open preferences by selecting "Preferences" from the "Terminal" menu
- Click the `Profiles` icon
- Click on "Pro" entry in the list that appears on the left
- Click the "default" button which is found underneath the list
- Ensure `Antialias text` is selected
- Click the area to the left "Color & Effects" found within the "Background" section
- Change `Opacity` to 100%
- Close the popup window
- Close Preferences
- Exit Terminal application

Now restart Terminal application. The background should be a solid black color.

If you haven't previously configured your command prompt, copy and paste the following command into terminal:

```sh
IyBHaXQgY29tcGxldGlvbnMKWyAtZiAvdXNyL2xvY2FsL2V0Yy9iYXNoX2NvbXBsZXRpb24uZC9naXQtY29tcGxldGlvbi5iYXNoIF0gJiYgc291cmNlIC91c3IvbG9jYWwvZXRjL2Jhc2hfY29tcGxldGlvbi5kL2dpdC1jb21wbGV0aW9uLmJhc2gKWyAtZiAvdXNyL2xvY2FsL2V0Yy9iYXNoX2NvbXBsZXRpb24uZC9naXQtcHJvbXB0LnNoIF0gJiYgc291cmNlIC91c3IvbG9jYWwvZXRjL2Jhc2hfY29tcGxldGlvbi5kL2dpdC1wcm9tcHQuc2gKCiMgUHJvbXB0IHdpdGggZnVsbCBwYXRoIGFuZCBnaXQgc3RhdHVzClBTMT0nXFtcZVszNm1cd1xdIFxbXGVbMzNtXF1cW1xlWzFtXF0kKF9fZ2l0X3BzMSAiKCVzKSIgMj4vZGV2L251bGwpICQgXFtcZVswbVxdJwoKIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KIyBSdWJ5IEdlbSBlbnN1cmUgcGF0aAojLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQpleHBvcnQgUEFUSD0iJChnZW0gZW52IGdlbWRpciAyPi9kZXYvbnVsbCkvYmluOiRQQVRIIgo= | base64 -D >> ~/.bash_profile
```

## Homebrew

Homebrew is an easy, terminal based way of installing apps to our Mac. It helps us, as developers, manage the apps and tools we use to create software.

This will be how will install many of the other tools.

Start Terminal application and copy the following line and paste it into your terminal window

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

The installation may prompt you for your password several times (your password won't show on screen when you type it) and it may take a while to complete the installation

## Git

Git is a distributed source control system. This allows us to work on and collaborate on different projects with little to no headache.

Git is how we will be managing our files and sharing code between each other. It will seem rough at first but with practice, you will never know how any else shares documents

From your terminal, run the following commands (current directory does not matter):

```sh
brew install git
```

To configure Git to know who you are, we need to teach it your email address and your full name.

From your terminal, run the following commands (current directory does not matter):

```sh
(
  echo -n "Type in your name as you used at GitHub: " && read name
  echo -n "Type in the email address you used at GitHub: " && read email

  git config --global user.name "${name}"
  git config --global user.email "${email}"
)
```

Finally we will tell Git and GitHub to use the `https` protocol we will enter the following in Terminal:

From your terminal, run the following commands (current directory does not matter):

```sh
git config --global hub.protocol https
```

## Node.js

Node is a runtime for javascript. This means that with node, we can run javascript on our machines without having to be in a browser

For the first part of the training, we are concentrating on the HTML/CSS and JavaScript. Many useful tools for those languages are built with node.

From your terminal, run the following command (current directory does not matter):

```sh
brew install node
```

## Yarn

Yarn is a package manager for node packages. This means that we can install and use libraries that are written in node.

We will be using this to run our scripts and as well as installing packages. This will be more useful the more we dive deeper in JavaScript

From your terminal, run the following command (current directory does not matter):

```sh
brew install yarn
```

## App App

App-App is a tool created by SDG for creating projects using HTML, CSS, and JavaScript

App App ensures a good project folder setup and includes all the needed tools

From your terminal, run the following command (current directory does not matter):

```sh
npm install --global app-app
```

## Netlify

Netlify is a static website hosting company. It allows for easy deploy of your websites so they are on the web!

We will use this to host some projects to see how the deploy process works

Before continuing, please sign up for an account with [Netlify](https://www.netlify.com/)

```sh
npm install -g netlify-cli

```

## Trash

A command line tool to safely delete files by placing them in the _trash folder_ instead of immediately deleting them.

From your terminal, run the following commands (current directory does not matter):

```sh
brew install trash
```

Then when you need to delete a file or folder from within terminal:

```sh
trash file
trash directory
```

## Hub

Hub is command line helper for github. It allows for easy github manipulation from our terminal.

From your terminal, run the following commands (current directory does not matter):

```sh
brew install hub
```

# Windows - Setting up your Development Environment

## Powershell

Powershell is the application that allows us to run our `shell` -- the default shell we will use is called `bash`

A shell is a program that allows us to interact with our computer by executing commands and seeing the results. For a tutorial on using a shell, see [this page](/handbook/skills/command-line)

### How

Powershell should already be install. To open, open your `start` menu and search for "powershell".

## Node.js

### What

Node is a runtime for javascript. This means that with node, we can run javascript on our machines without having to be in a browser. Many useful tools for those HTML, CSS and JavaScript are built with node.

### How

Run the [node.js installer](https://nodejs.org/en/).

## Yarn

### What

Yarn is a package manager for node packages. This means that we can install and use libraries that are written in node. We will be using this to run our scripts and as well as installing packages. This will be more useful the more we dive deeper in JavaScript

### How

Follow [the instructions](https://yarnpkg.com/lang/en/docs/install/) for you operating system.

## Netlify

Netlify is a static website hosting company. It allows for easy deploy of your websites so they are on the web!

We will use this to host some projects to see how the deploy process works

Before continuing, please sign up for an account with [Netlify](https://www.netlify.com/)

Run the following in Powershell.

```sh
npm install -g netlify-cli

```

## Git

### What

Git is a distributed source control system. This allows us to work on and collaborate on different projects with little to no headache. Git is how we will be managing our files and sharing code between each other. It will seem rough at first but with practice, you will never know how any else shares documents

### How

Download the install [Git for Windows](https://gitforwindows.org/).

NOTES: - It will ask you about your path variable, I recommend selecting the third option `use git and optional unix tools`. This will allow git to be used in your terminal

To configure Git to know who you are, we need to teach it your email address and your full name.

Instead of `"Replace This With Your Full Name"` use your fill name.

```sh
git config --global user.name "Replace This With Your Full Name"
```

Instead of `email-address-you-used-at-github@example.com` use the same email address you gave to GitHub

```sh
git config --global user.email email-address-you-used-at-github@example.com
```

Instead of `your-github-username` use your username on GitHub

```sh
git config --global github.user your-github-username
```

Finally we will tell Git and GitHub to use the `https` protocol we will enter the following in Terminal:

```sh
git config --global hub.protocol https
```

If all the commands where success, you be able to run `git config --global --list` and see the correct values

## Hub

### What

Hub is command line helper for github. It allows for easy github manipulation from powershell.

### How

Download and run [the installer](https://github.com/github/hub/releases/download/v2.3.0-pre9/hub-windows-amd64-2.3.0-pre9.zip).

---

## Posh-git (Windows Only)

### What

`post-git` is a extenstion for powershell that allows easy management for git. It will give very useful information for us.

### How

Follow [the instructions](https://github.com/dahlbyk/posh-git#installation).

to move on, you should be able to run `Import-Module posh-git` in a git repo and get a display.

### Set up to run every time you open up powershell

- in powershell run, `code %UserProfile%\My Documents\WindowsPowerShell\profile.ps1`
- in the file that opens, add `Import-Module posh-git`.
- save and close file
- restart powershell
