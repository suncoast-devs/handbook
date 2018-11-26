---
title: React-ified Octocats
draft: true
---

Your Octodex is amazing. It has revolutionized the Github Octodex experience and more people are viewing Octocats on their mobile devices than ever.

However, the code is repetitive and isn't yet setup to work with an API.

Your task now is to refactor the static Octodex into a static (non-API) version in React.

You'll identify the main `Component`s on the page and create React components for each, breaking down those `Component`s into smaller ones as needed.

## Objectives

- Learn to identify parts of a web site as `Component`s
- Use `create-react-app` to build a React project
- Understand and use React components

## Stretch Objectives

- Understand and use "props" in React
- Use `Array.prototype.map` to render a collection of components in React

### Explorer Mode

- [ ] Reuse your Octodex as a starting point for this assignment. Or use an existing well factored (HTML and CSS) Octodex.
- [ ] Figure out the main components of the page. These will be the main components in your `<App>` component.
- [ ] You should have at _least_ two components...
- [ ] Create your React app
- [ ] Copy the CSS from your Octodex into `index.css`
- [ ] Clear out the implementation in the `render` method of `App` and have it render your main components.
- [ ] Create those components and paste the appropriate HTML from your Octodex into the `render` method of those components.
- [ ] Break down those components and use `this.props` to dynamically customize the components that need it.

### Adventure Mode

- [ ] Place the definition of each Octocat in an `array` and use `map` to generate the Octocat components

### Epic Mode

- [ ] Put the `array` of Octocats in a `octocats.json` file and `import` that into your app.
- *OR*
- [ ] Use the `fetch` api to retrieve the list of Octocats from [this api](https://sdg-octodex.herokuapp.com/) instead

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [.map, .reduce & .filter, Oh My!](https://www.datchley.name/working-with-collections/)
- [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
