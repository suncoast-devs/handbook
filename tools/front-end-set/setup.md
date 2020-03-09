# Front end development set up

Welcome the Front end development. This is were you apps start talking directly to users. This will walk you through setting up the tools needed to get started

## Node.js

Node is a runtime for javascript. This means that with node, we can run javascript on our machines without having to be in a browser

For the first part of the training, we are concentrating on the HTML/CSS and JavaScript. Many useful tools for those languages are built with node.

_for mac_

```sh
brew install node
```

_for windows_

Run the [node.js installer](https://nodejs.org/en/).

_for linux_

Run the correct [apt-get](https://github.com/nodesource/distributions/blob/master/README.md).

## Yarn

Yarn is a package manager for node packages. This means that we can install and use libraries that are written in node (JavaScript).

We will be using this to run our scripts and as well as installing packages. This will be more useful the more we dive deeper in JavaScript

From your terminal, run the following command (current directory does not matter):

_for mac_

```sh
brew install yarn
```

_for windows_

Follow [the instructions](https://yarnpkg.com/lang/en/docs/install/) for Windows.

_for linux_

Follow [the instructions](https://classic.yarnpkg.com/en/docs/install/#debian-stable).

## App App

App-App is a tool created by SDG for creating projects using HTML, CSS, and JavaScript

App App ensures a good project folder setup and includes all the needed tools

From your terminal, run the following command (current directory does not matter):

```sh
npm install --global app-app
```

## Netlify

Netlify is a static website hosting company. It allows for easy deployment of your websites so they are on the web!

Before continuing, please sign up for an account with [Netlify](https://www.netlify.com/)

```sh
npm install -g netlify-cli
```

## Chrome

Even though modern browsers are starting to align on features, not all are created equal when it comes to developing websites.

We recommend [Google Chrome](https://www.google.com/chrome/) for developing websites. Not only are there dev tools powerful, its currently the [most popular browser](https://gs.statcounter.com/)

## vs code

You should already have [VS Code]() installed. This is still a go to editor for front development.

We should now add these extensions, via the terminal:

```sh

code --install-extension aeschli.vscode-css-formatter
code --install-extension auchenberg.vscode-browser-preview
code --install-extension coderfee.open-html-in-browser
code --install-extension dbaeumer.vscode-eslint
code --install-extension ecmel.vscode-html-css
code --install-extension esbenp.prettier-vscode
code --install-extension hasanali.gitignore-templates
code --install-extension skyran.js-jsx-snippets
code --install-extension xabikos.ReactSnippets
code --install-extension Zignd.html-css-class-completion

```

## Prettier

To help keep our code clean, we need a prettier. This will help use format our code to be consistent and clean.

```sh
npm install --global prettier
```
