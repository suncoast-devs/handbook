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

It generates a full React application in the directory `ClientApp` and ensures
it is connected to the full C# backend application found in the rest of the
directories.

## Generate the app

From your command line in the **main directory** of your application.

```shell
dotnet new sdg-react -o TacoTuesday
```

## `ClientApp` uses `npm`

When adding third party libraries to our front end, we will be using `npm`.

You must also run those commands **from the ClientApp folder**. So before any
`npm install` commands you must first `cd ClientApp`

## Running the application

You can run both the _backend_ and the _front end_ from a **single** command of

```shell
dotnet watch run
```

## Setting the JWT Key

You may be promted by a page that says: `You do not have a valid JWT_KEY.`

To resolve this you can run `dotnet user-secrets init` followed by the
`dotnet user-secrets set` command given on that page.

<GithubCommitViewer repo="gstark/TacoTuesday" commit="62ad5422797541b00f236632a141b86082dc8a84" />
