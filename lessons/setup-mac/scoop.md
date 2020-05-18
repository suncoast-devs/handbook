---
title: Scoop
---

Scoop is a tool to automatically install programs via the command line. This
simplifies the process of installing many of the tools we need by avoiding the
steps of visiting the website, downloading the installer and then running the
installer.

## Installing

```shell
Set-ExecutionPolicy RemoteSigned -scope CurrentUser

```

Answer "Y"es to the prompt

```shell
iwr -useb get.scoop.sh | iex
```

Install the `extras`

```shell
scoop install git
scoop bucket add extras
scoop bucket add versions
```

Install vcredist

```shell
scoop install vcredist
```
