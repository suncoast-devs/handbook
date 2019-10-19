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
- If you do not type `-m` and a message you may open `vim.`  Vim is a powerful text editor built into terminal.  If it opens, simply type `:wq` to save ('write') and quit Vim.  


## Possible Assignments

- list and link to possible assignments to follow up the lecture
- should include an 3 options. an 'easy', 'medium' 'hard' (i do not like those words)
- 1 for if the students struggled to grasp
- 1 for normal
- 1 if the students really grasped the concept or need a challenge

## Additional Resources

- [SDG's Git Cheat Sheet](https://suncoast.io/handbook/resources/Git-Cheat-Sheet.md)
- [Github Help](https://help.github.com/)
- [Bitbucket Git tutorial](https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud) - Bitbucket is a web based git control system like Github but owned and maintained by Atlassian
- [TIG](https://github.com/jonas/tig) - Tig is a text-mode interface you can use from termainl/powershell.  

## Recommended Practice:

- An (optional) list of external practice resources a student might use to exercise these learning objectives further,
  e.g. Codewars, Flexbox Froggy, etc.

## Next Lectures

- What are some topics/ideas that would make for natural progress for the next lecture
- either to start if every one 'gets it' or to act as a preview for what is to come
