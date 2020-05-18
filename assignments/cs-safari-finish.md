---
title: Finish the Safari
---

For this assignment, you should take your safari API that was already created, and create a simple react app that consumes that API.

## Objectives

- Work with an API that you created

## Requirements

- Create a React app that consumes an API that you created

### Explorer Mode

- [ ] Add 3 the endpoints to the Safari API

  - [ ] Create a `GET /Animal/{location}` that returns animals of only that location
  - [ ] Create a `PUT /Animal/{id}` endpoint that adds 1 to the count of times seen for that animal (given by id)
  - [ ] Create a `DELETE /Animal/{id}` endpoint that deletes that animal id from the database

- [ ] Create a simple react app, that uses some css make it looks friendly.
- [ ] The react app should:
  - [ ] Display all animals the user has seen
  - [ ] Display all animals seen in the `Jungle`
  - [ ] Remove all animals that I have seen in the `Desert`.
  - [ ] Add all the `CountOfTimesSeen` and get a total number of animals seen
  - [ ] Get the `CountOfTimesSeen` of `lions`, `tigers` and `bears`

### Adventure Mode

- [ ] Work on your capstone' front end. This should include, creating the react app, adding react-router and also start thing about the AJAX (axios/fetch) calls your app needs.
