---
title: Create Static HTML and CSS
order: 4
---

# Create Static HTML and CSS

Taking our wireframe as a guide, we can build _static_ versions of the pages of
our application.

In a React application, this may mean creating individual components for each of
the primary wireframe drawings. In this process, we will use fake but realistic
data. For a field like a _name_ use a sensible name of about the length you'd
expect. For _address_ fields, use addresses of well-known locations that look
realistic. For _description_ fields use **lorem ipsum** data about the length
you'd expect someone to generate.

By creating a pass at HTML and CSS for each of these pages, we are achieving
several vital steps:

1. Validating our design so far. Did our wireframe transfer to visual design? Do
   we see all the places we need data, and is it accounted for in our ERD?
2. We can review a more realistic user interface with our stakeholders and
   users.
3. If we add some simple navigation, we can deploy this application and ask
   users to "click around the app" and see if they agree with the flow.
4. Even if we do not finish a specific feature, we still have a UI we can show
   off and demonstrate. The static HTML and CSS can determine if every
   page/feature supports the MVP. We haven't invested a large amount of time
   making the static pages into real and dynamic pages.

## Start by building the component directly into the main `<App>`

An excellent place to start is a page that primarily lists data. These pages are
typically early in the user interaction with an app and often include much of
the system's data. Starting with this page will help ensure you are properly
dealing with much of your system's data.

## Extract components as you go

When you have enough of a page designed, start extracting parts of the page into
various components. At first, define them in the same file, but then use the
excellent `refactor` feature of `VS Code` to move the component to a dedicated
file. The refactoring feature will ensure all the correct `import` and `export`
settings are created and simplify the syntax's details. You can also drag the
component to the correct folder, and `VS Code` will ensure the `import`
statements are correctly updated.

## Start with a mobile view

Starting with the wireframes in their mobile view helps keep away feature creep
and ensures you only include the most critical elements.

## Files Updated

<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="0489587b92b9d3069998087a08a07a2bf6df6e27"/>
