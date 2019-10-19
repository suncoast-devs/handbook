# Intro to Git

Git is a distributed source control system and is how we will be managing our projects and sharing code during the program.

## Learning Objectives

- What is Git?
- How do we use Git?
- Students should be able to perform the basic git work flow after this lecture

## Recommended Previous Knowledge

- Opening and working from terminal
- A github account

## Slides

(optional) Any slide show that goes along with this lecture

## Full Code Samples

(recommended, probably required) Any and all complete code samples that will be created or walked through together during lecture

## Lecture notes

### What is Git?

- Git is a distributed source control system. This allows us to work on and collaborate on different projects with little to no headache.
- Git is how we will be managing our files and sharing code between each other. It will seem rough at first but with practice, you will never know how any else shares documents
- Begin by following the git installations for [Mac](https://suncoast.io/handbook/tools/environment-mac/) or [Windows](https://suncoast.io/handbook/tools/environment-windows/)
- At the start of this course, we will be using a static site generator called `app-app` to create our projects.  `App-app` also creates a github repo, but not all starter scripts will. If you are creating a new git repository from an existing project, follow the instructions at [SDG's Git Cheat Sheet](https://suncoast.io/handbook/resources/Git-Cheat-Sheet.md).

### Basic Git work flow

- Git is how we save changes we make
- The basic git flow is you `add` your changes to a `staging area` and then `commit` those changes to your repository.  
- Once you make changes to your project, from the command line type `git add .` to stage your changes.
- The `.` in `git add .` takes all the changes and adds them to the staging area.  
- Once you stage your changes, you want to commit them by typing `git commit -m 'a short commit message'`
- The `- m` stands for message and is followed by a short or descriptive message you put between quotes.
- If you do not type `-m` and a message you may open `vim.`  Vim is a powerful text editor built into terminal.  If it opens, simply type `:wq` to save ('write') and quit Vim. You can also close that window/tab and carry on.
- Once you have commited your changes you want to `push` those changes to Github by typing `git push`.  
- Make sure to add, commit and push often!

### Branches

- Branching is how we can maintain various versions of one project.
- Branchings is great if you are trying something out and not sure it will work _and_ do not want to risk breaking your existing code.
- When you initialize Git it creates a `master` branch.  
- If you want to create a new branch type `git branch <name-of-branch>` in the commandline within your project.  This creates a branch but does not take you to the branch.
- You _must_ `checkout` the branch in order to edit it.  Type `git checkout <name-of-branch>` to work on that branch.
- The command `git checkout -b <name-of-branch>` will create and checkout (take you) to that branch.
- Continue to add and commit as usual, but the first time you `push` your branch to Github, it will prompt you to `git push --set-upstream origin <name-of-branch>`.  Run that command and it will create a new `upstream` branch on Github.

### Merging a branch back into master

- If you like the work you have done on your new branch make sure to `git add .`, `git commit -m 'message'`, and `git push` as usual.
- Return to your master branch by typing `git checkout master`
- You can merge your branch into master from the command line by typing `git merge <name-of-branch>` or by creating a [`pull request`](https://help.github.com/en/articles/about-pull-requests)
- Once it is merged into master, add, commit and push your master branch to github.

### Tips

- Remember to commit often!  
- The more commits you have the easier it will be to [`revert to a previous commit`](https://www.atlassian.com/git/tutorials/undoing-changes/git-revert) if you make a big mistake.

## Possible Assignments

- Create a repo, add a file, change a file, stage your changes, commit your changes and push to Github.

## Additional Resources

- [SDG's Git Cheat Sheet](https://suncoast.io/handbook/resources/Git-Cheat-Sheet.md)
- [Github Help](https://help.github.com/)
- [TIG](https://github.com/jonas/tig) - Tig is a text-mode interface you can use from termainl/powershell.  

## Recommended Practice:

- [Bitbucket Git tutorial](https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud) - Bitbucket is a web based git control system like Github but owned and maintained by Atlassian.

