---
title: Back-End Setup Part 3
order: 40
---

# heroku

We will be deploying our `.NET` applications to the Heroku hosting service. They
offer a free service for hosting our applications and our databases.

You should [sign up for an account](https://heroku.com) and then we will install
the command line helper tool.

## Installation

<OperatingSystemSwitch allowedOperatingSystems={['Mac']}>

```shell
brew tap heroku/brew && brew install heroku
```

</OperatingSystemSwitch>

<OperatingSystemSwitch allowedOperatingSystems={['Windows']}>

```shell
scoop install heroku-cli
```

</OperatingSystemSwitch>

## Setup

```shell
heroku login
```
