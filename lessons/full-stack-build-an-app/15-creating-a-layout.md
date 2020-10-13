---
title: Creating a layout
order: 15
---

# Creating a layout

We are repeating the header and footer on each page in our design. Now that we
have two pages working we should remove this duplication.

## Move the common elements to the `App`

Starting with `Restaurants.jsx` we will cut the `<header>` content and place it
in the `App.jsx` before the `<Switch>` -- We will also add a `<></>` pair around
all the content in `App` since now we have more than one element returned.

Since the header inclues the `avatar` image move the `import` statement for the
`avatar` to the `App.jsx`.

We can do the same for the `<footer>` element.

Now that the header and footer exist in the `App` we can delete the `<header>`
and `<footer>` content from the `Restaurant.jsx`

Since there is only one main element, `<main>` we can clean up these components
by removing the fragment tags, `<></>`

We will do the same for the other components in the `pages` folder.

<GithubCommitViewer repo="gstark/TacoTuesday" commit="7555464618f9ea604ef5f8bdef8a4cbadba27e90" />
