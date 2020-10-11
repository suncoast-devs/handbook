---
title: Create Static HTML and CSS
order: 4
---

# Create Static HTML and CSS

Taking our wireframe as a guide we can build _static_ versions of the pages of
our application.

In a React application, this may mean creating individual components for each of
the main wireframe drawings. In this process, we will use fake, but realistic
data. For a field like a _name_ use a realistic name of about the length, you'd
expect. For _address_ fields use addresses of well-known locations that look
realistic. For _description_ fields use **lorem ipsum** data of about the length
you'd expect someone to generate.

By creating a pass at HTML and CSS for each of these pages we are achieving
several important steps:

1. Validating our design so far. Did our wireframe transfer to visual design? Do
   we see all the places we need data and is it accounted for in our ERD?
2. We can review a more realistic user interface with our stakeholders and
   users.
3. If we add some simple navigation we can deploy this application and ask users
   to simply "click around the app" and see if they agree with the flow.
4. Even if we do not finish a specific feature we still have a UI we can show
   off and demonstrate. This allows us to consider if every page/feature is
   required for the MVP. We haven't invested a large amount of time in making
   the static pages into real and dynamic pages.

## Remove template code from the project

The `sdg-react` comes with existing elements in the `ClientApp`, we'll remove
the extra bits by:

1. Updating `App.jsx` to:

```jsx
import React from 'react'

import './custom.scss'

export function App() {
  return <p>App</p>
}
```

2. Update the line `import App from './App'` to `import { App } from './App'`
3. Removing the contents of the `components` directory.
4. Removing the contents of the 'pages' directory.

## Remove bootstrap if you are not going to use it

Remove the line `import 'bootstrap/dist/css/bootstrap.css'` from `index.js` if
you don't intend on using bootstrap. You may also choose to remove the
dependency with these commands:

```shell
cd ClientApp
npm uninstall bootstrap
```

Not including the CSS is enough to remove the Bootstrap styles.

## Start by building the component directly into the main `<App>`

A good place to start is a page that primarily lists data. These pages are
typically early in the user interaction with a page and often include much of
the data the system has. Starting with this page will help ensure you are
properly dealing with much of the data in your system.

## Extract components as you go

When you have enough of a page designed, start extracting parts of the page into
various components. At first, define them in the same file, but then use the
excellent `refactor` feature of `VS Code` to move the component to a dedicated
file. This will ensure all the correct `import` and `export` settings are
created and simplify the details of the syntax. You can also drag the component
to the correct folder and `VS Code` will ensure the `import` statements are
correctly updated.

## Start with a mobile view

Start with the wireframes in their mobile view. This, again, helps keep away
feature creep and ensures you are only including the most critical features. It
also helps ensure that you have a good mobile design since it is likely that
many of the visitors to your site will be on narrow viewport devices such as
phones and tablets.

## Files Updated

<GithubCommitViewer repo="gstark/TacoTuesday" commit="8ce2d4d1eb9dac5690f9a4e63e02e64ad691ec1a"/>
