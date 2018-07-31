---
title: Turning In Assignments
---

**Note**: You should complete at least the tasks given for _explorer_ mode as listed in the assignment before turning
it in, as well as before attempting _adventure_ or _epic_ modes.

Your homework will be assigned to you via `issues` on your `assignments` repository. These steps will be followed for
almost every assignment going forward. Once you've completed at least _explorer_ mode and you're satisfied with your
work, let's get it published. First let's get it up on GitHub.

If you haven't already, create a local git repository for your project (**note**: the `app-app` generator will have done
this for you):

```sh
cd ~/sdg/my-cool-project
git init .
```

Add all our work to git, and commit it:

```sh
git add .
git commit -m "Hello, world."
```

Feel free to replace _"Hello, world."_ with a more meaningful message, if you'd like.

Push our local commits to GitHub:

```sh
git push -u origin master
```

The `-u` option tells git we want to making pushing the `master` branch to `origin` the default, so next time, we can
just type `git push`.

Now that our source code is up on GitHub, let's publish our page. A command to do this has already been setup for you:

```sh
npm run deploy
```

This command will deploy your website to a hosting platform called [Surge](http://surge.sh/). The first time you run it,
follow the prompts to set up your account.

---

Once you are done, go to the issue on our `assignments` repository in your web browser. As a comment, leave a link
to the repository of your project, and close the issue. Your instructors will not know you are done until you've closed
the issue.
