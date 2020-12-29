---
title: Full Env Set up
---

This is a walkthough of the all the tools, templates, and software to setup a
new computer. This is targeted towards people who have been through the cohort
and need to setup a new machine.

## Tools

These are tool that all developers should have.

- Slack
- VS Code
- Git
- Hub
- Node
- brew (mac only)

The following VS Code Extensions

```shell
code   --install-extension  2gua.rainbow-brackets
code   --install-extension  ms-vsliveshare.vsliveshare
code   --install-extension  streetsidesoftware.code-spell-checker
code   --install-extension  wayou.vscode-todo-highlight
code   --install-extension  bierner.markdown-preview-github-styles
```

## Front end

- app-app
- Netlify

The following VS Code Extensions

```shell

code   --install-extension  dbaeumer.vscode-eslint
code   --install-extension  ecmel.vscode-html-css
code   --install-extension  eg2.tslint
code   --install-extension  esbenp.prettier-vscode
code   --install-extension  mikestead.dotenv
code   --install-extension  skyran.js-jsx-snippets
code   --install-extension  xabikos.ReactSnippets

```

## Back end (.NET)

- Heroku
- Docker

- postgres
- pgcli

- Dotnet CLI

- dotnet tools:

```
dotnet tool install -g dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-ef
```

- The following VS Code Extensions:

```shell
code   --install-extension  jchannon.csharpextensions
code   --install-extension  jorgeserrano.vscode-csharp-snippets
code   --install-extension  ms-dotnettools.csharp
code   --install-extension  ScottSauber.blazorsnippets
code   --install-extension  Zignd.html-css-class-completion
```

Templates:

```
dotnet new -i SDG.templates.Web.API
dotnet new -i SDG.templates.Console
dotnet new -i SDG.templates.Console.Database

```

## Full Stack (.NET)

- All the Front end tools
- All the back end tools

Templates:

```
dotnet new -i SDG.templates.Web.React
```
