# GIT Cheat Sheet

## Basic

**`git status`** //returns status of the current git repository

**`git init`** //creates a local empty git repository

**`git add .`** //tells git that there are changes to track in the current directory

**`git stash`** //stash you changes if you aren't ready to commit, but need to switch branches

**`git stash list`** //shows you the list of stashes you've stored

**`git stash apply "Name of stash"`** //applies the specific stash you've named

**`git stash pop`** //applies the most recent stash and removes it from storage

**`git commit -m "Your descriptive commit message"`** //creating the save point with a comment

**`git commit -amend -m "Your corrected descriptive commit message"`** //a way to fix minor mistakes with the commit or the message 

**`git push`** //push the commit 

**`git pull`** //pull from a git repo to update local 

**`git pull origin master`** //pull from original repo to update local (you can also use `upstream master` if you have multiple branches)

**`git clone <url to repository>`** //clone an existing repository

**`git merge --abort`** //abort a merge

**`git checkout branchName`** //switch to a specific branch

**`git checkout master`** //switch to master

**`git checkout -`** //switch to previous branch

**`git checkout -b newBranchName`** //create a branch from Master

**`git checkout -b existingBranchName newBranchName`** //create Branch from a Branch

**`git reset HEAD~1`** //takes your branch back one commit, but your changes are still in the working tree (I recommend `git add .` next)

**`git reset --keep HEAD~1`** //resets head and working branch, keeps your changes, and won't override any unsaved changes.

**`git reset --hard specificCommitName`** //takes you back to that specific commit (you lose the commit - only for when you really mean it.)

### How to push to an already created repo’s master

**`git init`**
**`git remote add origin <url to repository>`**
**`git add .`**
**`git commit -m "A descriptive commit message"`**
**`git push origin master`**

## How to merge to an existing Branch

**`git checkout branchName`**
**`git merge --no-ff otherBranch`** // No fast-forwarding
**`git push origin branchName`**

## Advanced

### Fork an existing repo

**`Click Fork in upper right of repo on Github`** // this creates a copy of the repo on your account
**`Clone your fork onto your computer`**

### Syncing a Fork to keep it up-to-date with the original ('upstream') repository

**`git fetch upstream`** // check your forks local master branch
**`git checkout master`** // switch to master branch,
**`git merge upstream/master`** // merge your changes to upstream/master

### Creating a PR via your Fork

**`git push`** // push your changes up to your forked repo
**`Open your forked repo on github`**
**`Create PR from your forked repo on github`**
