---
title: Visual Studio Code
---

Developers debate about which code editing environment is better. Here at SDG,
we require using Visual Studio Code. VS Code is a extendable lightweight editor
that is still full featured and supports useful plugins.

## Installation

```shell
scoop install vscode
```

## Enable Extensions

VS Code has a large number of optional extensions that increase the capabilities
of the editor. We have chosen a few that we feel improve the workflow during the
course. We recommend running the following commands to install these extensions
into your Visual Studio Code

### General Extensions:

In any PowerShell/Terminal (and any directory) run the following:

```shell
code --install-extension 2gua.rainbow-brackets
code --install-extension hasanali.gitignore-templates
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension meganrogge.template-string-converter
```

### C#/.NET Extensions:

In any PowerShell/Terminal (and any directory) run the following:

```shell
code --install-extension ms-dotnettools.csharp
code --install-extension austincummings.razor-plus
code --install-extension jchannon.csharpextensions
code --install-extension jorgeserrano.vscode-csharp-snippets
code --install-extension ms-azuretools.vscode-docker
```

### Front End Extensions:

In any PowerShell/Terminal (and any directory) run the following:

```shell
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
code --install-extension formulahendry.auto-rename-tag

```

## Configure Visual Studio Code

In VS Code Use `Control Shift P` to launch the command palette and type
`Open Settings JSON` and select option that does _NOT_ mention "Default" or
"Workspace"

This will open an editor window.

If this file contains:

```
{
}
```

or

```
{}
```

You may proceed with the next step. If it contains anything else **STOP** and
ask for assistance.

**Replace** the contents of this file with:

```
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "javascript.implicitProjectConfig.checkJs": true,
  "[csharp]": {
    "editor.insertSpaces": true,
    "editor.tabSize": 4
  }
}
```

Save this file and close the tab.

## Turn off all auto suggests in VS Code

Some students do not like the auto complete nature of VS Code. If you want, you
can turn these features off.

Simply redo the 'Open Settings (JSON)" from above and just after the **opening**
brace paste this:

```
"editor.suggest.showConstants": false,
"editor.suggest.showConstructors": false,
"editor.suggest.showCustomcolors": false,
"editor.suggest.showEnums": false,
"editor.suggest.showFields": false,
"editor.suggest.showEvents": false,
"editor.suggest.showFolders": false,
"editor.suggest.showFunctions": false,
"editor.suggest.showIssues": false,
"editor.suggest.showKeywords": false,
"editor.suggest.showInterfaces": false,
"editor.suggest.showMethods": false,
"editor.suggest.showProperties": false,
"editor.suggest.showModules": false,
"editor.suggest.showOperators": false,
"editor.suggest.showReferences": false,
"editor.suggest.showSnippets": false,
"editor.suggest.showStructs": false,
"editor.suggest.showTypeParameters": false,
"editor.suggest.showUnits": false,
"editor.suggest.showUsers": false,
"editor.suggest.showValues": false,
"editor.suggest.showVariables": false,
"editor.suggest.showWords": false,
"editor.suggest.showColors": false,
"editor.suggest.showClasses": false,
```

Your file may look like this:

```json
{
  "editor.suggest.showConstants": false,
  "editor.suggest.showConstructors": false,
  "editor.suggest.showCustomcolors": false,
  "editor.suggest.showEnums": false,
  "editor.suggest.showFields": false,
  "editor.suggest.showEvents": false,
  "editor.suggest.showFolders": false,
  "editor.suggest.showFunctions": false,
  "editor.suggest.showIssues": false,
  "editor.suggest.showKeywords": false,
  "editor.suggest.showInterfaces": false,
  "editor.suggest.showMethods": false,
  "editor.suggest.showProperties": false,
  "editor.suggest.showModules": false,
  "editor.suggest.showOperators": false,
  "editor.suggest.showReferences": false,
  "editor.suggest.showSnippets": false,
  "editor.suggest.showStructs": false,
  "editor.suggest.showTypeParameters": false,
  "editor.suggest.showUnits": false,
  "editor.suggest.showUsers": false,
  "editor.suggest.showValues": false,
  "editor.suggest.showVariables": false,
  "editor.suggest.showWords": false,
  "editor.suggest.showColors": false,
  "editor.suggest.showClasses": false,
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "javascript.implicitProjectConfig.checkJs": true,
  "[csharp]": {
    "editor.insertSpaces": true,
    "editor.tabSize": 4
  }
}
```

Save this file and close the tab.
