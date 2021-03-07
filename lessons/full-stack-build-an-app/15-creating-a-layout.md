---
title: Creating a layout
order: 15
---

# Creating a layout

We are repeating the header and footer on each page in our design. Now that we
have two pages working, we should remove this duplication.

## Move the common elements to the `App`

Starting with `Restaurants.jsx` we will cut the `<header>` content and place it
in the `App.jsx` before the `<Switch>` -- We will also add a `<></>` pair around
all the content in `App` since now we have more than one element returned.

Since the header includes the `avatar` image, move the `import` statement for
the `avatar` to the `App.jsx`.

We can do the same for the `<footer>` element.

Now that the header and footer exist in the `App` we can delete the `<header>`
and `<footer>` content from the `Restaurant.jsx`

Since there is only one main element, `<main>`, we can clean up these components
by removing the fragment tags, `<></>`

We will do the same for the other components in the `pages` folder.

<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="ef38b498b4af2f96ac67426c3f2c0c7994a00553" />
