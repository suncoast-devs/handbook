---
title: GIT Cheat Sheet
---

## How to see the status of files

This will show you files that need to be staged for a commit.

```shell
git status
```

Example output:

```
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	deleted:    public/old.css

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	public/new.css
```

## Make a directory a git repository

This will take a directory that is _not_ managed by git and tell git to start
tracking files.

```shell
git init
```

## Add files to be committed

This command tells git to add all the files in the directory to a commit. NOTE,
you will have to do a `git commit` later to actually make the commit.

```shell
git add .
```

Alternatively you can add specific files

```shell
git add public/new.css
```

## Save changes temporarily

This command will allow you to save changes you aren't ready to commit so that
you can do other work in the repository such as switching branches or working on
other code.

```shell
git stash
```

The command alone won't stash untracked (new) files, to stash those at the same
time use `--include-untracked`.

```shell
git stash --include-untracked
```

## Show a list of stashes

Shows you the list of stashes you've stored.

```shell
git stash list
```

## Apply a stash

Brings back code from a specific stash.

```shell
git stash apply "Name of stash"
```

## Restore a stash

```shell
git stash pop
```

## Create a commit / save point

```shell
git commit -m "Your descriptive commit message"
```

## Amend a previous commit

As long as the commit has not been `git push` yet you may change the message
(and the contents).

```shell
git commit -amend -m "Your corrected descriptive commit message"
```

## Push the commit upstream

This will push to whatever the `origin` is, in most case this is github.

```shell
git push
```

## Pull down code from upstream

This will pull down new code from whatever the `origin` is, in most case this is
github.

```shell
git pull
```

## Pull down a specific branch from a specific remote

Pull from original repo to update local (you can also use `upstream master` if
you have multiple branches).

```shell
git pull origin master
```

## Clone an existing repository

Clone an existing repository from a URL to a local directory. This will make a
copy of the code from the URL and put it in a directory based on the last part
of the URL.

```shell
git clone <url to repository>
```

## Stop a merge and revert the merge

If you get conflicts when merging code you can undo the merge and revert to the
code before the merge started.

```shell
git merge --abort
```

## Change branches

```shell
git checkout branchName
```

## Checkout the master branch

```shell
git checkout master
```

## Switch to the previous branch

This will checkout the previously active branch.

```shell
git checkout -
```

## Create a new branch

This creates a new branch using the current branch/commit as the starting point.

```shell
git checkout -b newBranchName
```

## Go back _ONE_ commit

Takes your branch back one commit, but your changes are still in the working
tree.

```shell
git reset HEAD~1
```

## Go back to any commit and lose changes

Takes you back to that specific commit, losing all the commits since then. You
can use `HEAD~1` to mean "Back one commit from the current commit".

```shell
git reset --hard specificCommitName
```

## How to merge to an existing Branch

This will let you merge changes from `otherBranch` into `branchName`.

```shell
git checkout branchName
git merge --no-ff otherBranch
git push origin branchName
```

# Advanced

If you want to hack on open source projects (including this handbook) you will
do the following steps:

## Fork an existing repo

- Click Fork in upper right of repo on Github
- Clone your fork onto your computer (see above)
- Checkout a branch to contain your changes
  - `git checkout -b <branch-name>`

## Syncing a Fork to keep it up-to-date with the original ('upstream') repository

```shell
git fetch upstream
git checkout master
git merge upstream/master
```

### Creating a PR via your Fork

```shell
git push
```

If this repository is a fork, the message from github may include a link to
create a pull request.

If not:

- Open your forked repo on github
- Create PR from your forked repo on github
