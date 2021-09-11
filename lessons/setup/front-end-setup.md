---
title: Front-End Setup
order: 50
---

# RunJS

RunJS is an application that allows us to run, and inspect,
JavaScript/TypeScript code. It is useful for trying out new features, working
through parts of an algorithm for a project or a codewar, or just analyzing why
some JavaScript/TypeScript code doesn't work.

## Installation

Visit [https://runjs.app/](https://runjs.app/) and download/install for the
platform of your choice.

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

From Terminal, and in any directory, run the following command:

```shell
npm install --global netlify-cli
```

## Setup

From Terminal, and in any directory, run the following command:

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

From Terminal, and in any directory, run the following command:

```shell
npm install --global prettier
```

<SectionSeparator />

# vite

Check [this](https://www.dictionary.com/browse/vite) for the pronuciation. It is
pronounced to rhyme with _meat_.

This is a tool we use to generate our web projects, run our code, and generate a
production version that we will deploy to `Netlify`.

## Installation

From Terminal, and in any directory, run the following command:

```shell
npm install --global vite
```

<SectionSeparator />

# degit

This is the tool we will use to download the templates we will customize for
ourselves. It is a general tool that can download a git repository to your
computer and allow you to make a new git/GitHub history for it.

## Installation

From Terminal, and in any directory, run the following command:

```shell
npm install --global degit
```
