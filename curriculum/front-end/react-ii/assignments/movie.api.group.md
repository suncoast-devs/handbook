# Let's all go to the movies

This weekend, you will pair up in groups of 2 to create a "Now Playing in Theatres" website. This will use an API, and few pages to display what is currently showing.

## Objectives

- Work with an API to display data
- Work with React and React Router
- Work in groups to create a project together

## Requirements

- Use [this API](https://developers.themoviedb.org/3/getting-started/introduction)
  - You will have to create an account to get a key, Feel free to use the address and phone number of campus to sign up with
- Work in groups of 2, these must be decided by the time you leave today
- Each group will be working on one repository, decide in each group who's account it goes under
- Use React Router to create the pages.

### Explorer Mode

- [ ] Create a home page that has:
  - [ ] the list of all "now showing" movies, returned from this API `https://api.themoviedb.org/3/movie/now_playing?api_key=<<your key here>>>&language=en-US&page=1`
  - [ ] this page should also random highlight a random "now showing" movie at the top of the page
- [ ] Create a `/Movie/:moveidId` page that shows all the details for a given movie and the cast of the movie. The cast end point is `https://api.themoviedb.org/3/movie/<<<Movie Id>>>/credits?api_key=<<your key here>>>`
- [ ] Each member of the group must still submit the repository for their assignment. This repository should have commits from both students.

### Adventure Mode

- [ ] Add a page to view all the movies for actor. This page should show as much as you get from the API about this actor. _HINT:_ Use the `People` section of the API for this

### Epic Mode

- [ ] Do the same thing, except with TV Shows. Try to reuse as many components as possible

## Recommended Practice:

- Plan early and communicate! The most successful teams work together to create a plan of attack, and communicate what is going on
- Wireframe out the pages first, that way each member of the group knows the end goal. After you agree on the wireframes, Stick to the wireframes.
- Work in branches or forks. This will help when you need to merge everything together
- Like making a git commit, merging & pulling should happen frequently. **Do not wait until Monday night to try to merge everything together**
