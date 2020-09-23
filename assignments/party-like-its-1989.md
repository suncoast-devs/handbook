---
title: Party Like it's 1989!
tags: ['javascript', 'react']
---

It's 1989 and the Internet has just come online and Tim Berners-Lee is going to invent the World Wide Web. The Cold War is ending, and the Berlin Wall will be coming down. It's also going to be a great year for film. In this assignment, you're going to build a small webpage that showcases some of the most popular movies of 1989.

The data for this assignment comes from [The Movie DB](https://www.themoviedb.org) API.

You will need to sign up and make an account to get an API key. In the URL below replace the text **YOUR_KEY_HERE** with the key you receive when signing up for an account.

> NOTE: If you have any challenge signing up for an account, see your instructor.

This is the API end-point that supplied the data file for this project:

`https://api.themoviedb.org/3/discover/movie?primary_release_year=1989&sort_by=popularity.desc&api_key=YOUR_KEY_HERE`

An example of the movie object is

```json
{
  "popularity": 22.582,
  "vote_count": 2896,
  "video": false,
  "poster_path": "/2FC9L9MrjBoGHYjYZjdWQdopVYb.jpg",
  "id": 2493,
  "adult": false,
  "backdrop_path": "/aQ2ZbNqIaecoQsryNe33UmDtms.jpg",
  "original_language": "en",
  "original_title": "The Princess Bride",
  "genre_ids": [12, 35, 14, 10749, 10751],
  "title": "The Princess Bride",
  "vote_average": 7.6,
  "overview": "In this enchantingly cracked fairy tale, the beautiful Princess Buttercup and the dashing Westley must overcome staggering odds to find happiness amid six-fingered swordsmen, murderous princes, Sicilians and rodents of unusual size. But even death can't stop these true lovebirds from triumphing.",
  "release_date": "1987-09-25"
}
```

You'll notice that the poster images are just the file names. You can get the full URL to a poster by concatenating the path with the following base URL:

```
https://image.tmdb.org/t/p/w185
```

In this case:

```
https://image.tmdb.org/t/p/w185/2FC9L9MrjBoGHYjYZjdWQdopVYb.jpg
```

> NOTE: in place of `w185` you can also use `w92`, `w154`, `w185`, `w342`, `w500`, `w780`, or `original` for different image widths based on your design's need.

## Objectives

- Work with API data
- Understand and use React components
- Understand and use "props" in React
- Use `map` to render a collection of components in React

### Setup

```shell
app-app --gamma PartyLikeIts1989
```

### Explorer Mode

- [ ] Use the API to fetch the data and render it on the page, rather than the supplied JSON file.
- [ ] You should have at _least_ two components; `App` and `Movie`.
- [ ] Render at least the title, poster image, and plot overview. Feel free to include other pieces of the data.
- [ ] Try to capture a 1980's or early 90's aesthetic when you style your page. Have fun with it!

### Adventure Mode

- [ ] Sort the films by release date, rather than as they appear in the file.'
- [ ] Add a search bar that filters down the shown results. Note that is not making a new API call, just `filter`ing the current list
- [ ] Display the release date in a formatted manner, e.g. "May 24th", rather than `1989-05-24`. _HINT:_ `moment.js` or `date-fns` or some utility code you write yourself!

### Epic Mode

- [ ] Give the user a chance to "favorite" movies and store favorite movies in local storage
- [ ] Explore the API and use other endpoints.
- [ ] Allow the user to change the year they are searching for
- [ ] Change the style based on the decade they user selected

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [.map, .reduce & .filter, Oh My!](https://www.datchley.name/working-with-collections/)
- [Array map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
