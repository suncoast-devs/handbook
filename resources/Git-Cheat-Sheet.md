# GIT Cheat Sheet

**git status**  //returns status of the current git repository

**git init** //creates a local empty git repository

**git add .**   //tells git that there are changes to track in the current directory

**git commit -m commentHere** //creating the save point with a comment

**git push**  //push the commit

**git pull** //pull from a git repo to update local

**git clone repoUrlhere** //clone an existing repository  

**git merge --abort** //abort a merge

**git checkout branchNamehere** //switch to a specific branch

**git checkout master** //switch to master

**git checkout -** //switch to previous branch

**git checkout -b newBranchname** //create a branch from Master

**git checkout -b existingBranchNamehere newBranchnamehere** //create Branch from a Branch

How to push to an already created repo’s master  
**git init**  
**git remote add origin <repo url here>**  
**git add .**  
**git commit -m**  
**git push origin master**  

How to merge to an existing Branch    
**git checkout <branchname>**  
**git merge --no-ff <newbranch> -m <messagehere>** // No fast-forwarding  
**git push origin <branchname>**  
