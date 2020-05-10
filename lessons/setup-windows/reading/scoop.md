---
title: Scoop
---

Scoop is a tool to automatically install programs via the command line. This
simplifies the process of installing many of the tools we need by avoiding the
steps of visiting the website, downloading the installer and then running the
installer.

## Set Execution Policy

Answer "Y"es if the command below presents a prompt.

```sh
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
```

## Run the Installer

```sh
iwr -useb get.scoop.sh | iex
```

## Install the `extras`

```sh
scoop install git
scoop bucket add extras
scoop bucket add versions
```

## Install vcredist

```sh
scoop install vcredist
```
