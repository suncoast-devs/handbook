---
title: Front-End Setup
order: 50
---

# Firefox

We recommend using [Firefox](https://firefox.com) during this course.

We are going to be using Firefox's `Development Tools` feature extensively when
developing front-end applications. Even if you do not use Firefox for your web
browsing experience, having all of your fellow students on the same development
tools will help.

## Installation

<OperatingSystemSwitch allowedOperatingSystems={['Mac']}>

```shell
brew install --cask firefox
```

</OperatingSystemSwitch>

<OperatingSystemSwitch allowedOperatingSystems={['Windows']}>

```shell
scoop install firefox
```

</OperatingSystemSwitch>

<SectionSeparator />

# Netlify

Netlify is a static website hosting company. It allows for easy deployment of
your websites so they are on the web!

## Pre-Installation Step

Before continuing, you **MUST** sign up for a _FREE_ account with
[Netlify](https://www.netlify.com/)

## Installation

From Terminal, run the following command (the current directory does not
matter):

```shell
npm install --global netlify-cli
```

## Setup

```shell
netlify login
```

<SectionSeparator />

# Prettier

Developing a clean writing style is just as important when writing code as it is
when writing prose. To help us with developing this style, we can use an
automatic code formatter. This will ensure that our code is formatted with the
proper indentation and the correct placement of syntax.

We will be using the `prettier` formatter for our HTML, CSS, and JavaScript
code.

## Installation

```shell
npm install --global prettier
```

<SectionSeparator />

# vite

This is a tool we use to generate our web projects, run our code, and generate a
production version that we will deploy to `Netlify`.

## Installation

```shell
npm install --global vite
```

# degit

This is the tool we will use to download the templates we will customize for
ourselves. It is a general tool that can download a git repository to your
computer and allow you to make a new git/GitHub history for it.

## Installation

```shell
npm install --global degit
```
