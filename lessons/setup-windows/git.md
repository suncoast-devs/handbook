---
title: Git
---

Git is a distributed source control system. This allows us to easily work, and
collaborate, on many different projects.

Git is how we will be managing our files and sharing code with each other. Git
is a complex tool and it will seem rough at first. However, with practice, you
will become familiar with the commands and options.

## Pre Installation

First, make sure you have a [GitHub](http://github.com/) account.

## Installation

```shell
scoop install git
```

## Post Installation Steps

After the installation, re-open Powershell. We need to run a few commands to
configuration git correctly.

### Default branch name

When working in `git` as a source control resource we work in `branches` of
code. Branches are series of changes to code for a particular purpose. The
default branch for a new git project has been `master`. SDG believes
master-slave is an oppressive metaphor and we empathize with those hurt by the
use of that term.

Git allows for a mechanism to change the default name of this branch. We suggest
changing this to something like `trunk` (to continue to the tree metaphor) or
`main` (since the first two letters match and help with auto-complete if you are
used to typing `master`)

Read more from
[the IETF](https://tools.ietf.org/id/draft-knodel-terminology-00.html),
[the git project](https://github.blog/2020-07-27-highlights-from-git-2-28/#introducing-init-defaultbranch),
and from
[the software conservatory](https://sfconservancy.org/news/2020/jun/23/gitbranchname/)

```shell
git config --global init.defaultBranch trunk
```

### Tell Git your Name

Every line of code you save with `git` will be attributed to you. `git` will
need to know the name to associate with the code. You _should_ use your real
name here, not a pseudonym or a `1337 haxor` name.

> NOTE: In the following command, instead of
> `"Replace This With Your Full Name"` use your full name, e.g., "Jane Q Public"
> or "John Q Public".

```shell
git config --global user.name "Replace This With Your Full Name"
```

### Tell Git your E-Mail Address

> NOTE: In the following command, instead of
> `email-address-you-used-at-github@example.com` use the **same email address
> you gave to GitHub**. Github uses this to make sure it can generate this
> awesome "activity" chart for you. ![github-activity](./github-activity.png)

```shell
git config --global user.email "email-address-you-used-at-github@example.com"
```

### Tell Git your Github username

Replace GITHUBNAME here with your github _LOGIN / USER_ name. You can get this
from the Github API by clicking on your user icon in the upper right hand
corner. It will say "Signed in as GITHUBUSERNAME"

```shell
git config --global github.user GITHUBNAME
```

### Ensure git uses VS Code for it's editor

```shell
git config --global core.editor "code --wait"
```

### Tell Git + Hub to use `HTTPS`

Finally, we need to set up Git and GitHub to use the `https` protocol. Enter the
following in your shell (`Powershell`):

```shell
git config --global hub.protocol https
```
