# GIT Cheat Sheet

**`git status`** //returns status of the current git repository

**`git init`** //creates a local empty git repository

**`git add .`** //tells git that there are changes to track in the current directory

**`git commit -m "Your descriptive commit message"`** //creating the save point with a comment

**`git push`** //push the commit

**`git pull`** //pull from a git repo to update local

**`git clone <url to repository>`** //clone an existing repository

**`git merge --abort`** //abort a merge

**`git checkout branchName`** //switch to a specific branch

**`git checkout master`** //switch to master

**`git checkout -`** //switch to previous branch

**`git checkout -b newBranchName`** //create a branch from Master

**`git checkout -b existingBranchName newBranchName`** //create Branch from a Branch

How to push to an already created repo’s master:

**`git init`**
**`git remote add origin <url to repository>`**
**`git add .`**
**`git commit -m "A descriptive commit message"`**
**`git push origin master`**

How to merge to an existing Branch:

**`git checkout branchName`**
**`git merge --no-ff otherBranch`** // No fast-forwarding
**`git push origin branchName`**
