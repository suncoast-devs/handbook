---
title: Heroku command line tools
---

# Heroku command line tool

The Heroku command line tool comes with many great tools.

There is also [documentation](https://devcenter.heroku.com/articles/heroku-cli)
Heroku CLI.

## Restart my application

Sometimes you need to restart your application on Heroku. This might be because
you've changed something other than something that is updated by
`git push heroku HEAD:master`.

To restart:

```shell
heroku ps:restart
```

## Live view the server logs

When you receive a `500` error, this means something went wrong on the server
side. Just like when you run `dotnet watch run` you can see the server's log
file. On Heroku this log file is stored by the server and we can view it with a
Heroku CLI command.

To view the server logs:

```shell
heroku logs --tail
```

This will keep updating until you stop it with `control-c`

## Directly interact with your production database

Sometimes you may need to directly update some database data on your production
database. You can get a `psql` interactive command line with your production
database by doing:

```shell
heroku pg:psql
```

You can end your session with the `exit` command.

> NOTE: Be _very_ careful since this gives you **LIVE** access to **PRODUCTION**
> data.

## Pull a copy of your Heroku database to your local database

Your app has it's **own** distinct database on Heroku. If you want a copy of
that database, it's tables and rows, you can pull **DOWN** the database from
Heroku to your local database by using `pg:pull`

```shell
heroku pg:pull DATABASE_URL my-database-name-goes-here-instead-of-this
```

> NOTE: replace `my-database-name-goes-here-instead-of-this` with the name of
> your local database. This would be the name you give to `pgcli` or `psql`
> locally.

So if your local database is called `SuperAwesomeAppDatabase` your command would
be:

```shell
heroku pg:pull DATABASE_URL SuperAwesomeAppDatabase
```

## Push a copy of your local database to Heroku

Perhaps you have spent a lot of time perfecting your database locally, and now
you want to send all that data to Heroku to have it use the same data.

You can do this, but **NOTE** that this will **ERASE** any data on the server
and replace it with your local data. This means anything users added will
**LOST** when you do this. So this is a command you typically do once before you
let users access your system.

```shell
heroku pg:reset
heroku pg:push my-database-name-goes-here-instead-of-this DATABASE_URL
```

> NOTE: replace `my-database-name-goes-here-instead-of-this` with the name of
> your local database. This would be the name you give to `pgcli` or `psql`
> locally.

```shell
heroku pg:reset
heroku pg:push SuperAwesomeAppDatabase DATABASE_URL
```

## See all the configuration values on Heroku

Locally in development we use `dotnet user-secrets` and the
`.env.development.local` files to configure values for `dotnet` and `react`
respectively. For heroku we use `heroku config`. To see all the values defined
you can run:

```shell
heroku config
```

And you will see something like:

```
~/dev/sdg/TacoTuesday [master] » heroku config
=== sdg-tacotuesday Config Vars
BING_MAPS_KEY:               ArcWE6Ra_ewB-efefefef7lLuureAMbOZbv0GeuiD7EfysblY3-zrLigs1pVsh_h
CLOUDINARY_CLOUD_API_KEY:    5995644444461399
CLOUDINARY_CLOUD_API_SECRET: cfip-8M9kMibmmmmmGET9ktDCog
CLOUDINARY_CLOUD_NAME:       suncoast-devs
DATABASE_URL:                postgres://esrunvboymjglt:21df9cf6292cdcdcdcdf386cf654b4e30d93653f74013aba648fedb8b4c0d9a7@ec2-34-192-173-173.compute-1.amazonaws.com:5432/daapbho704gs04
JWT_KEY:                     13452347538945723894123456757239485723948572349587234958723945872345
```

> NOTE: Your values will be different depending on your specific application

## Set a configuration value on Heroku

To set a specific configuration you will use `heroku config:set`. Let's say you
want to set the configuration value `AWS_KEY` to `123456789` you would run:

```shell
heroku config:set AWS_KEY=123456789
```

> NOTE: Your application will automatically reload when you run this command so
> it will see the new values

## Open my production application in the browser

To see your live application:

```shell
heroku open
```
