---
title: Turning In Assignments
---

Assigned homework appear in your `issues` repository on GitHub. Follow these steps to turn in, and get credit for your homework.

You should complete at least the tasks given for _explorer_ mode as listed in the assignment before turning it in, as well as before attempting _adventure_ or _epic_ modes.

**NOTE**: All the following commands need to be run in your terminal and _inside_ the project directory. You need to `cd` into the directory where your project exists.

### Step 0: Create a git repository.

Using vs code, create a new repository on Github. You can do this by use the `create-github` task in VS Code

How?

0. Open your project in VS Code, by navigating to that project and using `code .` to open it.
1. Open your command pallette by using (Mac) `shift + cmd + p` or (Windows) `shift + ctrl + p`
1. Search and Select `Tasks: Run Task`
1. Select `create-github` from the dropdown

This will create a git repository, both locally and on a Github, and push your current code.

### Step 1: Commit your code to GitHub

Once you are done, you will want to commit your code:

In the terminal, run:

```sh
git add .
git commit -m "Done with explorer mode."
```

** NOTE **: Please replace _"Done with explorer mode."_ with a more meaningful message. It should try to capture what work you did.

Push our local commits to GitHub:

```sh
git push
```

Your code should compile, with no warnings or errors and should run as intended.

### Step 2: Turning your code in.

Once you have your code deployed and pushed to GitHub, go to the issue on our `assignments` repository in your web browser. As a comment, leave a link to the repository of your project and close the issue. To get the link to your repository, `hub browse` opens github.com with your repository URL loaded. **Your assignment is not considered done until you close the issue.**

This link should look something like `https://www.github.com/your_username/project_name`.

After you have closed the issue, your instructor evaluates your work, and leave any comments. If deemed incomplete or unaccepted the instructor re-opens the issue with a list of items
