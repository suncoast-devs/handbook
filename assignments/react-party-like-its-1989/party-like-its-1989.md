---
title: Party Like it's 1989!
---

It's 1989. The Internet has just come online and Tim Berners-Lee is going to
invent the World Wide Web. The Cold War is ending, and the Berlin Wall will be
coming down. It's also going to be a great year for film. In this assignment
you're going to build a small webpage that showcases some of the most popular
movies of 1989.

The data for this assignment comes from
[The Movie DB](https://www.themoviedb.org) API.

This is the API end-point that supplied the data file for this project:

`https://api.themoviedb.org/3/discover/movie?primary_release_year=1989&sort_by=popularity.desc&api_key=YOUR_KEY_HERE`

You will need to sign up and make an account to get an API key.

An example of the movie object is

```json
{
  "vote_count": 4300,
  "id": 89,
  "video": false,
  "vote_average": 7.7,
  "title": "Indiana Jones and the Last Crusade",
  "popularity": 18.43,
  "poster_path": "/4p1N2Qrt8j0H8xMHMHvtRxv9weZ.jpg",
  "original_language": "en",
  "original_title": "Indiana Jones and the Last Crusade",
  "genre_ids": [12, 28],
  "backdrop_path": "/vfvVuu1JdnEGcyZUj7VHrhhbeMj.jpg",
  "adult": false,
  "overview": "When Dr. Henry Jones Sr. suddenly goes missing while pursuing the Holy Grail, eminent archaeologist Indiana must team up with Marcus Brody, Sallah and Elsa Schneider to follow in his father's footsteps and stop the Nazis from recovering the power of eternal life.",
  "release_date": "1989-05-24"
}
```

You'll notice that the poster images are just the file names. You can get the
full URL to a poster by concatenating the path with the following base URL:

```
https://image.tmdb.org/t/p/w185_and_h278_bestv2
```

In this case:

```
https://image.tmdb.org/t/p/w185_and_h278_bestv2/4p1N2Qrt8j0H8xMHMHvtRxv9weZ.jpg
```

## Objectives

- Work with API data
- Understand and use React components
- Understand and use "props" in React
- Use `Array.prototype.map` to render a collection of components in React

### Explorer Mode

- [ ] Use the API to fetch the data and render it on the page, rather than the
      supplied JSON file.
- [ ] You should have at _least_ two components; `App` and `Movie`.
- [ ] Render at least the title, poster image, and plot overview. Feel free to
      include other pieces of the data.
- [ ] Try to capture an 1980's or early 90's aesthetic when you style your page.
      Have fun with it!

### Adventure Mode

- [ ] Sort the films by release date, rather than as they appear in the file.'
- [ ] Add a search bar that filters down the shown results. Note that is not
      making a new API call, just `filter`ing the current list
- [ ] Display the release date in a formatted manner, e.g. "May 24th", rather
      than `1989-05-24`. _HINT:_ moment.js or date-fns

### Epic Mode

- [ ] give the user a chance to "favorite" movies and store favorite movies in
      local storage
- [ ] Explore the API and use other endpoints.
- [ ] Allow the user to change the year they are searching for
- [ ] change the style based on the decade they user selected

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [.map, .reduce & .filter, Oh My!](https://www.datchley.name/working-with-collections/)
- [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
