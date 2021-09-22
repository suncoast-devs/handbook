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

(replace MyApp with your application name, e.g. `TacoTuesday`)

```shell
dotnet new sdg-react-no-client-app -o MyApp
```

## Generate a `ClientApp`

After doing a `cd` to change directory into your project's folder (e.g.
`cd TacoTuesday`) you can generate your client app.

```shell
degit YOUR-GITHUB-ACCOUNT-HERE/react-project-template ClientApp
```

```shell
git add .
```

```shell
git commit -m "Initial ClientApp"
```

## Running the application

You'll need two terminal/PowerShell to run the app. In the first window:

```shell
dotnet watch run
```

and then in the second:

(You may need to `cd` again to your project if the new terminal/PowerShell
starts in your "home" folder)

```shell
cd ClientApp
npm start
```

## Visit your app

Open your browser and visit `http://localhost:5000`, this is the URL we will use
to view our full stack web application.

## Setting the JWT Key

You may see a page that says: `You do not have a valid JWT_KEY.`

To resolve this warning, follow the instructions on the screen, restart
`dotnet watch run` and reload your browser at `http://localhost:5000` -- You
should see your default front end template's content.

<!-- Initial Commit -->
<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="29b8ca279a640861ccb77cc080d73a352abf6d78" />
