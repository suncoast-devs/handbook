# Required Dev tools 

Over the course the training you will be using a variety of tools. To get started we need the follow software and tools


## Tools

### Slack 

#### What
Slack will be our main form of communication. Download it to you computer and, if you have a smart phone, I highly recommend installing the app

#### How: 
For your computer, go here: (https://slack.com/downloads/windows)[https://slack.com/downloads/windows]


### HomeBrew (Mac Only)


#### What

Homebrew is an easy, terminal based way of installing apps to our Mac. It helps us, as developers, manage the apps and tools we use to create software. 

#### Why

This will make life a bit easier to install some of the other tools

#### How
Head [here](https://brew.sh/) and follow the directions



### Node.js

#### What

Node is a runtime for javascript. This means that with node, we can run javascript on our machines without having to be in a browser

#### Why

For the first part of the training, we are concentrating on the HTML/CSS and JavaScript. Many useful tools for those languages are built with node. 

#### How

**For Mac:** 
Run the command : 

`brew install node`

**For Windows:**

Run the installer here:
<br/>
[https://nodejs.org/en/](https://nodejs.org/en/)
 

### Yarn

#### What

Yarn is a package manager for node packages. This means that we can install and use libraries that are written in node.

#### Why

We will be using this to run our scripts and as well as installing packages. This will be more useful the more we dive deeper in JavaScript

#### How


**For Mac:**
 
In your terminal Run :
`brew install yarn`

**For Windows:**

Follow these instructions for you operating system: 

[https://yarnpkg.com/lang/en/docs/install/](https://yarnpkg.com/lang/en/docs/install/)


### Surge

#### What 

Surge is a static website hosting company. It allows for easy deploy of your websites so they are on the web!

#### Why

We will use this to host some projects to see how the deploy process works

#### How

Once you have node installed, run the following command in powershell.

``` 
npm install --global surge

```

### Git

#### What 

Git is a distributed source control system. This allows us to work on and collaborate on different projects with little to no headache.

#### Why

Git is how we will be managing our files and sharing code between each other. It will seem rough at first but with practice, you will never know how any else shares documents

#### How

**For Mac:** 
 
In your terminal Run :
`brew install git`

**For Windows:**

Go here and download the install: 
[https://gitforwindows.org/](https://gitforwindows.org/)


NOTES: 
    - It will ask you about your path variable, I recommend selecting the third option `use git and optional unix tools`. This will allow git to be used in your terminal
    

### Hub

#### What
 Hub is command line helper for github. It allows for easy github manipulation from powershell.

#### How

**For Mac:** 

In your terminal run: 
`brew install hub`

**For Windows:**
Download and run this installer: 
[https://github.com/github/hub/releases/download/v2.3.0-pre9/hub-windows-amd64-2.3.0-pre9.zip](https://github.com/github/hub/releases/download/v2.3.0-pre9/hub-windows-amd64-2.3.0-pre9.zip)


---
### IDEs

IDE stands for Integrated Developer Environment. Developers can be fiercely opinionated about which one is better. Here at SDG, we allow students to use any light weight editor they want, but  recommend using either Visual Studio Code or Atom.


### VS Code

#### What 
VS Code is a light weight text editor that produced by Microsoft that is being widely adopted by many developers. 

#### Why
VS Code is a extendable lightweight editor that allows us to see what is going on so if you ever get the more powerful tools (like Visual Studio or Eclipse). It will not be a crutch, but a tool. This is like starting with a screwdriver, and working our way up to power drill. 

#### How
Download here: 

(https://code.visualstudio.com/)[https://code.visualstudio.com/]


### Atom 

#### What 
Atom is a light weight editor created by GitHub that the open source community has embraced. 

#### Why 
Atom is a extendable, customizable editor that allows developers to grow with their tools. Atom starts out as an extremely simple editor that grows with the developer. 

#### How
Here [here](https://atom.io/) and follow the instructions.


### Posh-git (Windows Only)

#### What 

`post-git` is a extenstion for powershell that allows easy management for git. It will give very useful information for us.

#### How

Follow these instructions
https://github.com/dahlbyk/posh-git#installation

to move on, you should be able to run `Import-Module posh-git` in a git repo and get a display.

#### Set up to run everytime you open up powershell

- in powershell run, `code %UserProfile%\My Documents\WindowsPowerShell\profile.ps1`
- in the file that opens, add `Import-Module posh-git`. 
- save and close file
- restart powershell


