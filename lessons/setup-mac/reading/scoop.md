---
title: Scoop
---

Scoop is a tool to automatically install programs via the command line. This
simplifies the process of installing many of the tools we need by avoiding the
steps of visiting the website, downloading the installer and then running the
installer.

## Installing

```sh
Set-ExecutionPolicy RemoteSigned -scope CurrentUser

```

Answer "Y"es to the prompt

```sh
iwr -useb get.scoop.sh | iex
```

Install the `extras`

```sh
scoop install git
scoop bucket add extras
scoop bucket add versions
```

Install vcredist

```sh
scoop install vcredist
```
