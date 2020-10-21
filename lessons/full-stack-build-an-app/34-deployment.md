---
title: Deployment
order: 34
---

# Deployment

It is now time to deploy our application. For our application we are going to
deploy to a service named `Heroku`. Heroku is a
[Platform as a Service](https://en.wikipedia.org/wiki/Platform_as_a_service)
company that provides hosting for a large range of application types.

It provides a free tier that allows our application and database to support a
reasonable number of users and database size. It natively supports our Postgres
database and has optional "buildpacks" (third party extensions) to host our C#
application.

## Git Based Deployment

One of Heroku's nicer features is sending code for hosting is a familiar task:
`git push`

Heroku will maintain a copy of your git repository and use a fresh `git push` to
determine that new code is ready for deployment to "production."

## Getting setup

You should have a heroku account setup from the installation instructions. If
not, create a heroku account now.

In your project you will have a `STUDENT.md` file which includes instructions on
deployment. We'll repeat these steps here.

## Deploying

These steps are run _ONLY ONCE_ before you can deploy to heroku

> NOTE: You must choose an app name that is unique across all of heroku. If you
> want to use a name that isn't available, try appending unique like `-sdg` or
> `-janedoe` replacing `janedoe` with your name.

- `heroku apps:create NAMEOFAPP` - NOTE: replace `NAMEOFAPP` with something that
  is unique to your project.
- `heroku buildpacks:add suncoast-devs/dotnetcore-buildpack`

> NOTE: If your main branch of code is not `master` you'll have to run the
> command this way: `git push NAME:master` where `NAME` is the name of your
> branch

## To Setup Secrets for Heroku

Heroku stores secrets in your _environment variables_. You can change these from
the command line or from your app's configuration on `heroku.com`

If you are using JWT tokens, you need to do the following:

- `heroku config:set JWT_KEY="MY RANDOM STRING OF LETTERS AND NUMBERS TO USE FOR A KEY"`

If you are using a third party API you can set any configuration as such:

- `heroku config:set THIRD_PARTY_KEY_NAME="THIRD PARTY KEY VALUE"`

For instance, we might need these configurations. NOTE: use your real keys in
place of `REPLACE-THIS`

```
heroku config:set JWT_KEY=REPLACE-THIS
heroku config:set CLOUDINARY_CLOUD_NAME=REPLACE-THIS
heroku config:set CLOUDINARY_API_KEY=REPLACE-THIS
heroku config:set CLOUDINARY_API_SECRET=REPLACE-THIS
heroku config:set BING_MAPS_KEY=REPLACE-THIS
heroku config:set REACT_APP_MAPBOX_TOKEN=REPLACE-THIS
```

## `git push heroku master`

This command will push your code **JUST** to Heroku for hosting. This means when
you make a change you should push to github as normal (e.g. `git push master`)
and also to heroku (e.g. `git push heroku master`).

You will notice that after the typical messages you get from a `git push` your
terminal will show more messages from Heroku. A typical `git push heroku master`
will look something like the following. (NOTE: The specific numbers for your
application will be different than shown here)

```shell
Enumerating objects: 377, done.
Counting objects: 100% (377/377), done.
Delta compression using up to 8 threads
Compressing objects: 100% (367/367), done.
Writing objects: 100% (377/377), 1.43 MiB | 1.73 MiB/s, done.
Total 377 (delta 233), reused 0 (delta 0), pack-reused 0
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> ASP.NET Core app detected
remote: -----> Installing dotnet
remote: -----> Removing old cached .NET version
remote: -----> Fetching .NET SDK
remote: -----> Fetching .NET Runtime
remote: -----> Installing nodejs 12.18.3
remote: -----> Project Name: TacoTuesday
remote: -----> Publishing your project
remote: -----> Published
remote: -----> Cleaning up
remote:
remote:  ███████╗██╗   ██╗███╗   ██╗ ██████╗ ██████╗  █████╗ ███████╗████████╗
remote:  ██╔════╝██║   ██║████╗  ██║██╔════╝██╔═══██╗██╔══██╗██╔════╝╚══██╔══╝
remote:  ███████╗██║   ██║██╔██╗ ██║██║     ██║   ██║███████║███████╗   ██║
remote:  ╚════██║██║   ██║██║╚██╗██║██║     ██║   ██║██╔══██║╚════██║   ██║
remote:  ███████║╚██████╔╝██║ ╚████║╚██████╗╚██████╔╝██║  ██║███████║   ██║
remote:  ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝   ╚═╝
remote:
remote: -----> Discovering process types
remote:        Procfile declares types -> web
remote:
remote: -----> Compressing...
remote:        Done: 79.1M
remote: -----> Launching...
remote:        Released v5
remote:        https://taco-tuesday-sdg.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/taco-tuesday-sdg.git
 * [new branch]      master -> master
```

## To Copy Your Local Database to Heroku

Heroku maintains it's own copy of a database for your hosted application. That
means that all of the local data you have _won't_ be live on your site. You can
take all the data in your local database and upload that to your Heroku copy of
the database. See the instructions in the
[Heroku Quick Reference Guide](/lessons/misc-quick-reference/heroku) to learn
how to `Push a copy of your local database to Heroku`

## To Deploy Updates to Heroku

- `git push heroku master`

> NOTE: If your main branch of code is not `master` you'll have to run the
> command this way: `git push NAME:master` where `NAME` is the name of your
> branch

## To Open Your Deployed Application

- `heroku open`

## To Setup Continuous Deployment

Continuous deployment will update your code on Heroku every time you push. You
may choose to enable this mode of deploying to Heroku. However, you should know
that there is a limit to the number of times you can deploy per day this way.
You may only want to set this up if you are pushing code to Github infrequently.

- Visit [heroku.com](https://heroku.com) and go to the configuration page for
  your app
- Choose the `deploy` tab
- Select `github` as the deployment method. ![github](./assets/heroku1.png)
- Select `Connect to Github` ![github](./assets/heroku2.png)
- Browse for your repository ![github](./assets/heroku3.png)
- Connect to your repository ![github](./assets/heroku4.png)
- Enable automatic deploys ![github](./assets/heroku5.png)

## Viewing Logs When Something Breaks

Unlike your local environment you won't be able to see any errors in your
application. Heroku gives you a way to view the `logs` (or output) from your
application.

The command comes in two modes:

```shell
heroku logs
```

```shell
heroku logs --tail
```

The version with `--tail` will continue showing you the output of your code
until you press `Control-C`. This is useful when you have an error that happens
when you load a page in your application.
