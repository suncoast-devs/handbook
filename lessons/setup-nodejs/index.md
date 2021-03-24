---
title: Node.js
---

Node is a runtime for javascript. This means that with node, we can run
javascript on our machines without having to be in a browser

When working with HTML, CSS, and JavaScript we will find many of the tools
require, or are written in, JavaScript with node.

## Installation

<OperatingSystemSwitch allowedOperatingSystems={['Mac']}>

```shell
brew install nodejs
```

</OperatingSystemSwitch>

<OperatingSystemSwitch allowedOperatingSystems={['Windows']}>

```shell
scoop install nodejs
```

## Build tools

Start a **PowerShell As Administrator**

```sh
npm install --global windows-build-tools
```

> NOTE: This may take a long time to complete

</OperatingSystemSwitch>

## SDG helper tools

Install this tool which includes some helpful add-on functionality we use at SDG

```shell
npm install --global suncoast-devs/cli
```

## Useful node tools

This tool is useful for removing files and directories

```shell
npm install --global rimraf
```
