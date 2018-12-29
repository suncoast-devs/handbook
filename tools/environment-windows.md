# Setting up your Development Environment

### Node.js

#### What

Node is a runtime for javascript. This means that with node, we can run javascript on our machines without having to be in a browser

#### Why

For the first part of the training, we are concentrating on the HTML/CSS and JavaScript. Many useful tools for those languages are built with node.

#### How

Run the [node.js installer](https://nodejs.org/en/).

### Yarn

#### What

Yarn is a package manager for node packages. This means that we can install and use libraries that are written in node.

#### Why

We will be using this to run our scripts and as well as installing packages. This will be more useful the more we dive deeper in JavaScript

#### How

Follow [the instructions](https://yarnpkg.com/lang/en/docs/install/) for you operating system.

### Surge

#### What

Surge is a static website hosting company. It allows for easy deploy of your websites so they are on the web!

#### Why

We will use this to host some projects to see how the deploy process works

#### How

Once you have node installed, run the following command in terminal.

```sh
npm install --global surge
```

### Git

#### What

Git is a distributed source control system. This allows us to work on and collaborate on different projects with little to no headache.

#### Why

Git is how we will be managing our files and sharing code between each other. It will seem rough at first but with practice, you will never know how any else shares documents

#### How

Download the install [Git for Windows](https://gitforwindows.org/).

NOTES: - It will ask you about your path variable, I recommend selecting the third option `use git and optional unix tools`. This will allow git to be used in your terminal

To configure Git to know who you are, we need to teach it your email address and your full name.

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

### Hub

#### What

Hub is command line helper for github. It allows for easy github manipulation from powershell.

#### How

Download and run [the installer](https://github.com/github/hub/releases/download/v2.3.0-pre9/hub-windows-amd64-2.3.0-pre9.zip).

---

### Posh-git (Windows Only)

#### What

`post-git` is a extenstion for powershell that allows easy management for git. It will give very useful information for us.

#### How

Follow [the instructions](https://github.com/dahlbyk/posh-git#installation).

to move on, you should be able to run `Import-Module posh-git` in a git repo and get a display.

#### Set up to run everytime you open up powershell

- in powershell run, `code %UserProfile%\My Documents\WindowsPowerShell\profile.ps1`
- in the file that opens, add `Import-Module posh-git`.
- save and close file
- restart powershell
