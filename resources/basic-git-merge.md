---
title: Basic Git Merge Instructions
draft: true
---

## How to merge one branch into another.

There are lots of ways to merge one branch into another. This guide is NOT the only way, but it is a good practice.

Lets call the branch where you did your work A, and the destination branch B. A typical case is that A will be a feature branch, and B will be "master"

## Step 0: Make sure your branch is pristine and clean

- git checkout A
- git status
- This should confirm nothing to be staged, deleted, committed. It should say nothing to commit, working tree clean
- If this is NOT the case IMMEDIATELY HALT ALL WORK, contact your senior dev to review the status of your working environment.
- Make sure your test app pass and are green

## Step 1: Get "B" up to date.

Likely there are new commits here since you started your branch. You made a branch from this and other people have moved the work forward. Since you need your work to be compatible with it, you should make sure of that before merging your work in.

- git checkout B
- git pull
- Make sure there are no merge conflicts or other issues. If you git status it should also say nothing to commit, working tree clean
- Run the tests to make sure things are working

## Step 2: Lets merge "B" into "A"

Since "A" is your work, you are going to make sure that other new commits don't break your work, before enforcing your work on others. To do this, we'll merge their work into yours -- This is also where we will fix merge conflicts!

- git checkout A
- git pull
- git merge B
  At this point your merge is either clean or has conflicts -- if you have conflicts you will work on cleaning these up and ensuring no conflicts exist when you finish the commit. If you are unsure, you can always stop the merge with git merge --abort and it will cancel the merge and leave your A branch where it was.

## Step 3: Lets check your work

This is where you would run your tests, inspect the UI, make sure everything that the A branch is supposed to do still works with the latest work from B

## Step 4: Merge your work into "B" to share it with the world

- git checkout B
- git pull # (just to make sure)
- git merge A
- Resolve any conflicts! (Hopefully none since we just did that, but someone may have made a new commit...)
- An extra check here is to run the tests again if you like

## Step 5: Quick checks

- Check your work again quickly to make sure everything is still good (it should be)

## Step 5: Push!

- git push
