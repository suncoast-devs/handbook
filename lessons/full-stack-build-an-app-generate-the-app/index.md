---
title: Generate a New Application
order: 3
---

# Generate a new app

For this full-stack application, we'll be using the last of the SDG `dotnet`
templates, `sdg-react`. This app includes:

- [API Server](/lessons/cs-api-servers)
- [LINQ](/lessons/cs-linq)
- [Entity Framework](/lessons/cs-object-relational-mapping)
- [React](/lessons/react-intro)
- and [React Router](https://reactrouter.com/)

The sdg-react template generates a full React application in the directory
`ClientApp` and ensures connectivity to the C# backend application found in the
rest of the directories.

## Generate the app

From your command line in the directory where you've stored your other
assignments, execute the following command

```shell
dotnet new sdg-react -o TacoTuesday
```

## `ClientApp` uses `npm`

When adding third-party libraries to our front end, we will be using `npm`.

You must also run those commands **from the ClientApp folder**. So before any
`npm install` commands you must first `cd ClientApp`

## Running the application

You'll need two terminal/PowerShell to run the app. In the first window:

```shell
dotnet watch run
```

and then in the second:

(You may need to `cd` again to your project if the new terminal/PowerShell starts in your "home" folder)

```shell
cd ClientApp
npm start
```

## Setting the JWT Key

You may see a page that says: `You do not have a valid JWT_KEY.`

To resolve this, you can run `dotnet user-secrets init` followed by the
`dotnet user-secrets set` command given on that page.

<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="cd14c5c3e43c53e566bd048c83c30f4783c899c4" />
