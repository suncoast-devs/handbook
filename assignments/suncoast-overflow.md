---
title: 'Suncoast Overflow: Part I'
tags: ['full-stack', 'erd']
---

A good way to practice the concepts of creating full-stack web applications is to duplicate an existing site. For this project, you will be creating a copy of a site that you know very well, StackOverflow.

## Objectives

- Create a full-stack web app, from the database to the API, to the styled and responsive frontend.

## Requirements

Create an anonymous question and answer site that allows users to up-vote and down-vote questions and answers.

Here are the user stories for this application:

- [ ] As a user I should be able to view and search previously asked questions.
- [ ] As a user I should be able to view a specific question and all of its answers.
- [ ] As a user I should be able to anonymously post a question.
- [ ] As a user I should be able to answer an existing question.
- [ ] As a user I should be able to upvote or downvote a question.
- [ ] As a user I should be able to upvote or downvote an answer.

### Setup

```shell
dotnet new sdg-react -o SuncoastOverflow
```

### Day 1

### Explorer Mode

You have a choice to create a custom design or to start with existing HTML and CSS we provide.

- [ ] If you are going to create a custom design:
  - [ ] Create wireframes for your app.
- [ ] Create an ERD for the core functionality.
- [ ] Generate your `dotnet new` project.
- [ ] If you are going to create a custom design:
- [ ] Create the _static_ HTML and CSS for all the pages the app will need.
- [ ] If you are going to use our starter files:
- [ ] Update the design or layout to fit your needs. Practice some HTML and CSS.
- [ ] Create React components for each page
- [ ] Setup React Router to render these, but still just static representations

### Day 2

- [ ] Generate your database migrations based on your ERD.
- [ ] Insert sample questions, and corresponding answers into your database.
- [ ] Create the API for generating the list of questions to show on the home page.
- [ ] Create the API for posting a new question.

### Day 3

- [ ] Create the API for fetching a single question along with its answers.
- [ ] Create the API for posting a new question.

### Day 4

- [ ] Create the API for upvoting and downvoting questions and answers

### Adventure Mode

- [ ] Add the ability to have users.
  - [ ] Track which user created a question.
  - [ ] Track which user created an answer.
  - [ ] Only allow a user to upvote or downvote any answer or question once.
  - [ ] Add the ability for a user to _edit_ a question or answer but only if they are the original author.

### Epic Mode

- [ ] Add the ability to upload an image along with a question.
