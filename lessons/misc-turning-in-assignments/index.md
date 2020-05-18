---
title: Turning in Assignments
---

Assigned homework appear in your `issues` repository on GitHub. Follow these
steps to turn in, and get credit for your homework.

You should complete all the tasks listed for _explorer_ mode first. Then follow
these instructions for turning in that work. If you choose to proceed to
_adventure_ or _epic_ modes you should follow these instructions _again_ to turn
in each of those modes.

**NOTE**: All the following commands need to be run in your terminal and
_inside_ the project directory. You need to `cd` into the directory where your
project exists.

### Step 0: Create a git repository.

> **REMINDER** It is **critical** to make sure you are **in** the directory
> where your project code is before starting these steps. Use the `pwd` or `ls`
> commands to ensure you are in the directory where your code is. If you are
> not, then use `cd` to go to that directory.

You may have done this when you created your project. The tools we provide offer
the option to create a `git` and `github` repository for you. If you chose that
option you may skip this step.

If you are unsure if you have a github repository you may use the command
`hub browse` from your project directory. If this opens a github page with the
name of your project you are all set. If you see a `404 Page Not Found` page you
should follow these steps.

How?

0. Tell `git` to manage this directory: `git init`
1. Tell `hub` to create a github repository for this directory: `hub create`

This will create a git repository, both locally and on Github.

### Step 1: Commit your code to GitHub

Once you are done, you will want to commit your code:

In the terminal, run:

```shell
git add .
git commit -m "Done with explorer mode."
```

** NOTE **: Please replace _"Done with explorer mode."_ with a more meaningful
message. It should try to capture what work you did.

Push our local commits to GitHub:

```shell
git push
```

### Step 2: Turning your code in.

Once you have your code deployed and pushed to GitHub, go to the issue on our
`assignments` repository in your web browser. As a comment, leave a link to the
repository of your project and close the issue. **Your assignment is not
considered done until you close the issue.**

> NOTE: To get the link to your repository, run the command `hub browse` from
> your project directory. This opens github.com with your repository URL loaded.

This link should look something like
`https://www.github.com/your_username/project_name`.

After you have closed the issue, your instructor evaluates your work, and leave
any comments. If deemed incomplete or unaccepted the instructor re-opens the
issue with a list of items to complete before turning in the assignment again.
