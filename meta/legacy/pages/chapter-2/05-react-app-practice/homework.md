# Stay in and watch TV

This weekend, you will create a "TV guide" website. This will use an API, and few pages to display what is currently showing.

## Objectives

- Work with an API to display data
- Work with React and React Router

## Requirements

- Use [this API](https://developers.themoviedb.org/3/getting-started/introduction)
  - You will have to create an account to get a key, Feel free to use the address and phone number of campus to sign up with
- Use React Router to create the pages.

### Explorer Mode

- [ ] Create a home page that has:
  - [ ] the list of all "Top Rated" TV shows, returned from this API `https://api.themoviedb.org/3/tv/top_rated?api_key=<<api_key>>&language=en-US&page=1`
  - [ ] this page should also highlight a random "Top Rated" TV show at the top of the page
- [ ] Create a `/tv/:showId` page that shows all the details for a given show and the cast of the show. The cast and crew end point is `https://api.themoviedb.org/3/tv/{tv_id}/credits?api_key=<<api_key>>&language=en-US`
- [ ] deploy your site

### Adventure Mode

- [ ] Add a page to view all the TV shows for cast member. This page should show as much as you get from the API about this actor. _HINT:_ Use the `People` section of the API for this
- [ ] Allow the user to add a rating for the TV show.

### Epic Mode

- [ ] Work on other assignments you might be assigned as well. Career support and Capstones
- [ ] Add a movies section to your site. Try to reuse as many components as possible

## Recommended Practice:

- Plan early and be proactive.
- Wireframe out the pages first. Wireframes provide a goal and guide to getting what you need done.
- (git) Commit early and often
