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
- `git push heroku master`

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
heroku config:set CLOUDINARY_CLOUD_NAME=REPLACE-THIS
heroku config:set CLOUDINARY_API_KEY=REPLACE-THIS
heroku config:set CLOUDINARY_API_SECRET=REPLACE-THIS
heroku config:set BING_MAPS_KEY=REPLACE-THIS
```

## To Deploy to Heroku

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
