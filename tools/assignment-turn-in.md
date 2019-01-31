# Turning In Assignments

Assigned homework appear in your `issues` repository. Follow these steps to turn in, and get credit for your homework.

You should complete at least the tasks given for _explorer_ mode as listed in the assignment before turning it in, as well as before attempting _adventure_ or _epic_ modes.

**NOTE**: All the following commands need to be run in your terminal and _inside_ the project directory. You will need to `cd` into the directory where your project exists.

### Step 1: Commit your code to GitHub

Add all our work to git, and commit it:

```sh
git add .
git commit -m "Done with explorer mode."
```

** NOTE **: Please replace _"Done with explorer mode."_ with a more meaningful message. It should try to capture what work you did.

Push our local commits to GitHub:

```sh
git push
```

### Step 2: Deploy your code.

For unit-i and unit-ii we will be using Netlify for hosting our websites. To deploy your page, run the command:

```sh
yarn deploy
```

This command will run the tools and commands to push your code to Netlify. Running this command deploys your code and will give you a URL that you should have on your GitHub repository.

### Step 3: Turning your code in.

Once you have your code deployed and pushed to GitHub, go to the issue on our `assignments` repository in your web browser. As a comment, leave a link to the repository of your project and close the issue. To get the link to your repository, `hub browse` will open github.com with your repository URL loaded. Your assignment will not be considered done until you close the issue.\_

After you have closed the issue, your instructor will evaluate your work, and leave any comments. If deemed incomplete or unaccepted they will reopen the issue for you to work the project some more.
