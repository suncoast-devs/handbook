---
title: Stay in and watch TV
tags: ['javascript', 'react']
---

This weekend, you will pair up in groups of 2 to create a "TV guide" website.
This will use an API, and few pages to display what is currently showing.

## Objectives

- Work with an API to display data
- Work with React and React Router
- Work in groups to create a project together

## Requirements

- Use
  [this API](https://developers.themoviedb.org/3/getting-started/introduction)
  - You will have to create an account to get a key, Feel free to use the
    address and phone number of campus to sign up with
- Work in groups of 2, these must be decided by the "with me at 3"
- Each group will be working on one repository, decide in each group who's
  account it goes under
- Use React Router to create the pages.

### Setup

```shell
app-app --delta-hooks StayInAndWatchTV
```

### Explorer Mode

- Create a home page that has:
  - the list of all "Top Rated" TV shows, returned from this API
    `https://api.themoviedb.org/3/tv/top_rated?api_key=<<api_key>>&language=en-US&page=1`
  - this page should also highlight a random "Top Rated" TV show at the top
    of the page
- Create a `/tv/:showId` page that shows all the details for a given show
  and the cast of the show. The cast and crew end point is
  `https://api.themoviedb.org/3/tv/{tv_id}/credits?api_key=<<api_key>>&language=en-US`
- Each member of the group must still submit the repository for their
  assignment. This repository should have commits from both students. I will
  be checking the commit history.

### Adventure Mode

- Add a page to view all the TV shows for cast member. This page should show
  as much as you get from the API about this actor. _HINT:_ Use the `People`
  section of the API for this
- Allow the user to add a rating for the TV show.

### Epic Mode

- Do the same thing, except with Movies. Try to reuse as many components as
  possible

## Recommended Practice:

- Plan early and communicate! The most successful teams work together to create
  a plan of attack, and communicate what is going on
- Wireframe out the pages first, that way each member of the group knows the end
  goal. After you agree on the wireframes, Stick to the wireframes.
- Work in branches or forks. This will help when you need to merge everything
  together
- Like making a git commit, merging & pulling should happen frequently. **Do not
  wait until Monday night to try to merge everything together**
