---
title: Mac OS X - Setting up your Development Environment
draft: true
---

### HomeBrew (Mac Only)

#### What

Homebrew is an easy, terminal based way of installing apps to our Mac. It helps us, as developers, manage the apps and tools we use to create software.

#### Why

This will be how will install many of the other tools.

#### How

Head [here](https://brew.sh/) and follow the first direction under `Install Homebrew`

### Node.js

#### What

Node is a runtime for javascript. This means that with node, we can run javascript on our machines without having to be in a browser

#### Why

For the first part of the training, we are concentrating on the HTML/CSS and JavaScript. Many useful tools for those languages are built with node.

#### How

Run the command :

`brew install node`

### Yarn

#### What

Yarn is a package manager for node packages. This means that we can install and use libraries that are written in node.

#### Why

We will be using this to run our scripts and as well as installing packages. This will be more useful the more we dive deeper in JavaScript

#### How

In your terminal Run :
`brew install yarn`

### App App

#### What

App-App is a tool created by SDG for creating projects using HTML, CSS, and JavaScript

#### Why

App App ensures a good project folder setup and includes all the needed tools

#### How

Ensure you have the [`app-app` generator](https://github.com/suncoast-devs/app-app)

```sh
npm install -g app-app
```

### Surge

#### What

Surge is a static website hosting company. It allows for easy deploy of your websites so they are on the web!

#### Why

We will use this to host some projects to see how the deploy process works

#### How

Once you have node installed, run the following command in the terminal.

```
npm install --global surge
```

### Git

#### What

Git is a distributed source control system. This allows us to work on and collaborate on different projects with little to no headache.

#### Why

Git is how we will be managing our files and sharing code between each other. It will seem rough at first but with practice, you will never know how any else shares documents

#### How

In your terminal Run :
`brew install git`

To configure Git to know who you are, we need to teach it your email address and your full name.

`git config --global user.name "Replace This With Your Full Name"`
`git config --global user.email email-address-you-used-at-github@example.com`

Instead of `"Replace This With Your Full Name"` use your fill name.

Instead of `email-address-you-used-at-github@example.com` use the same email address you gave to GitHub

Finally we will tell Git and GitHub to use the `https` protocol we will enter the following in Terminal:

`git config --global hub.protocol https`

### Hub

#### What

Hub is command line helper for github. It allows for easy github manipulation from our terminal.

#### How

In your terminal run:
`brew install hub`

---

