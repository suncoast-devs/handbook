# Party Like it's 1989!

It's 1989. The Internet has just come online and Tim Berners-Lee is going to invent the World Wide Web. The Cold War is ending, and the Berlin Wall will be coming down. It's also going to be a great year for film. In this assignment you're going to build a small webpage that showcases some of the most popular movies of 1989.

The data for this assignment comes from [The Movie DB](https://www.themoviedb.org) API.

Download and use [this JSON file](./assets/1989.json) as your data source. Take a look a the structure of the data. It contains an array of objects that look like this:

```JSON
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
  "overview":
    "When Dr. Henry Jones Sr. suddenly goes missing while pursuing the Holy Grail, eminent archaeologist Indiana must team up with Marcus Brody, Sallah and Elsa Schneider to follow in his father's footsteps and stop the Nazis from recovering the power of eternal life.",
  "release_date": "1989-05-24"
}
```

You'll notice that the poster images are just the file names. You can get the full URL to a poster by concatenating the path with the following base URL:

```
https://image.tmdb.org/t/p/w185_and_h278_bestv2
```

In this case:

```
https://image.tmdb.org/t/p/w185_and_h278_bestv2/4p1N2Qrt8j0H8xMHMHvtRxv9weZ.jpg
```

## Objectives

- Work with JSON data
- Use `create-react-app` to build a React project
- Understand and use React components
- Understand and use "props" in React
- Use `Array.prototype.map` to render a collection of components in React

## Requirements

You do _not_ need to use the tmdb.org API for this assignment; you should use the supplied JSON file (see above).

### Explorer Mode

- [ ] "Mapping" over the array, render all of the films in the supplied data file.
- [ ] You should have at _least_ two components; `App` and `Movie`.
- [ ] Render at least the title, poster image, and plot overview. Feel free to include other pieces of the data.
- [ ] Try to capture an 1980's or early 90's aesthetic when you style your page. Have fun with it!

### Adventure Mode

- [ ] Sort the films by release date, rather than as they appear in the file.
- [ ] Display the release date in a formatted manner, e.g. "May 24th", rather than `1989-05-24`.

### Epic Mode

- [ ] Use the API to fetch the data and render it on the page, rather than the supplied JSON file.

This is the API end-point that supplied the data file for this project:

`https://api.themoviedb.org/3/discover/movie?primary_release_year=1989&sort_by=popularity.desc&api_key=YOUR_KEY_HERE`

**NOTE**: You'll need to sign up for your own API key first.

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [.map, .reduce & .filter, Oh My!](https://www.datchley.name/working-with-collections/)
- [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
