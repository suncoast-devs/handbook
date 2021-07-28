---
title: Code wars
---

[Code Wars](https://codewars.com) is a great site to practice your problem
solving in a variety of languages. This site is focused on practicing problem
solving and is a great way to work on your [PEDAC](/lessons/misc-pedac) skills.
Code wars is a very community orientated and driven as many of the problems are
submitted by fellow developers. You can also review, once you solve a problem,
the other solutions users have submitted. You can also join the "Suncoast
Developers Guild" clan and have a friendly competition for codewar points
amongst your classmates and alumni.

The site is organized into challenges that have a `kyu` . This `kyu` is a
community driven estimate to how hard a given challenge is. `8 kyu` is the
easiest and a great place to start for beginners.

# Organizing your codewars solutions

Keeping track of your codewar solutions is helpful in several ways:

1. You can track your progress over time
1. You can share your solutions with peers to discuss different algorithm and
   syntax approaches.
1. You get GitHub commit credits on your daily commit chart
1. Employers will see GitHub activity on a consistent basis if you are
   continually practicing

# Our example `kata template` repository

We have created a sample structure for organizing codewars solutions:

[Katas Template](https://github.com/suncoast-devs/katas-template)

The structure of the project gives you a place to keep coding practice results
from many sites (not just codewars) and directories within organize code by
language and then by the difficulty.

```
.
└── codewars
    ├── csharp
    │   ├── 1-kyu
    │   ├── 2-kyu
    │   ├── 3-kyu
    │   ├── 4-kyu
    │   ├── 5-kyu
    │   ├── 6-kyu
    │   ├── 7-kyu
    │   └── 8-kyu
    ├── javascript
    │   ├── 1-kyu
    │   ├── 2-kyu
    │   ├── 3-kyu
    │   ├── 4-kyu
    │   ├── 5-kyu
    │   ├── 6-kyu
    │   ├── 7-kyu
    │   └── 8-kyu
    ├── sql
    │   ├── 1-kyu
    │   ├── 2-kyu
    │   ├── 3-kyu
    │   ├── 4-kyu
    │   ├── 5-kyu
    │   ├── 6-kyu
    │   ├── 7-kyu
    │   └── 8-kyu
    └── typescript
        ├── 1-kyu
        ├── 2-kyu
        ├── 3-kyu
        ├── 4-kyu
        ├── 5-kyu
        ├── 6-kyu
        ├── 7-kyu
        └── 8-kyu
```

# To make your own copy of this project

We will be using the `degit` tool to make a local copy of this repository. We
will install this tool if we have not done so already.

```shell
npm install --global degit
```

Next we will make a copy of the repository locally.

Navigate to the folder where you keep your projects (adjust this if this is not
the directory you chose)

```shell
cd ~/sdg
```

Download the project template:

```shell
degit suncoast-devs/katas-template
```

Navigate into the template directory:

```shell
cd katas-template
```

Initialize your own GitHub copy of the template:

```shell
git init .
```

```shell
git commit -m "Initial Commit"
```

```shell
hub create
```

```shell
git push
```

Now you will have your own copy of the kata template and can put your codewars
solutions within.
