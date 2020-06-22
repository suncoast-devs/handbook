---
title: Reactocats
tags: ['javascript', 'react']
---

The Octodex is a fun way to celebrate a powerful tool we use for development. In that same spirit, recreate [this site](https://octodex.github.com/)

You'll identify the main `Component`s on the page and create React components for each, breaking down those `Component`s into smaller ones as needed.

## Objectives

- Learn to identify parts of a web site as `Component`s
- Use `app-app` (GAMMA stack) to build a React project
- Understand and use React components

## Stretch Objectives

- Understand and use "props" in React

### Explorer Mode

- [ ] Create your React app using `app-app` `GAMMA`
- [ ] If you have done the non-React version of octodex, use your existing HTML as the `render()` method of your `App` component. Otherwise, figure out the main components of the page and implement the `render()` method of `App`
- [ ] Your CSS should be in `index.css` -- feel free to copy your previous project's css if you have done the non-React version of this assignment.
- [ ] You should have at _least_ two components... (Hint, perhaps Header, and an Octocat)
- [ ] Use props to try to reuse components (reuse the Octocat component)

### Adventure Mode

- [ ] Place the definition of each Octocat in an `array` of objects and use `map` to generate the Octocat components

### Epic Mode

- [ ] Put the `array` of Octocats in an `octocats.json` file and `import` that into your app.
- _OR_
- [ ] Use the `fetch` API to retrieve the list of Octocats from [this api](https://sdg-octodex.herokuapp.com/) instead

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [.map, .reduce & .filter, Oh My!](https://www.datchley.name/working-with-collections/)
- [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
