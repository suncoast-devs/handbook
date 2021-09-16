---
title: The Rise (again) of the Tamagotchi
tags: ['react', 'full-stack']
---

This project will build a front-end for an existing API. See the `The Rise of the Tamagotchi` assignment for the details of your API.

Your front end's functionality will include the four parts of a web app: create, read, update, and delete.

## Objectives

- Deploy your API.
- Create a front-end that implements CRUD features against your existing API.
- Practice React: `useState`, `useEffect`, maybe 'React Query', and `React Router`

## **_ BEFORE YOU GET STARTED _**

Before you get started on any of the following, you _must_ deploy your API assignment.

To do so:

1. Navigate to your old assignment.
1. Open the file `STUDENT.md` and follow the instructions for `To SETUP deployment to Heroku`
1. Once you have successfully deployed your application: Use the Insomnia app to work with your API. At a minimum, use your API endpoints to create and list your Pets

> NOTE: You may run into problems deploying your application for the first time. You may have database migration issues or other code issues. If you receive errors: **STOP** and seek the help of your instructor or teaching assistants.

### Setup

```shell
degit $GITHUB_USER/react-project-template TamagotchiFrontEnd
```

### Explorer Mode

- Design a front end application that has multiple features and pages:

  - Have fun with the styling. Make your CSS neat and presentable, but apply your creativity!
  - The home page should show a list of all the pets in your API. The listing should include their name, birthday, hunger level, and happiness level.
  - Add a form to your home page to input a new pet's name and use your "CREATE" API to make a new pet. The list of pets should refresh.
  - Make each pet on the home page a `<Link>` to a page showing the pet's detail. The detail page should show the name, birthday, hunger level, and happiness level.
  - On the detail page, add buttons to:
    - Play with the pet
    - Feed the pet
    - Scold the pet
  - After each of the above actions, reload the data for the pet (use React to do this, _NOT_ a force page reload)
  - Add a button to delete a pet. After deletion, redirect the user to the home page
  - Add a link on the detail page to navigate to the home page.

- DEPLOY your front end and test it on your `netlify` version.
- SHARE it with friends and brag about how you created the _entire_ code for this.

### Adventure Mode

- Add some new fields to your pet. Perhaps a string-based URL of an image of the pet to display beside its name.
- Add a "search" field on the home page. When the user types in that field, dynamically update the pet list only to include pets whose name includes the input text.
- Ensure the pets on the home page are sorted by their NAMES. You could implement this in the FRONT END or the BACK END.

### Epic Mode

Add a user interface on the home page to sort your pets by their name, hunger level, or happiness level.

