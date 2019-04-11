# Add Heroku hosting to our rails application

We are going to use [Heroku](https://heroku.com) to host our rails application.

## Create a Heroku account

Before continuing ensure that you have a [Heroku](https://heroku.com) account.

## Install the Client (MAC)

```sh
brew tap heroku/brew && brew install heroku
```

## Install the Client (Linux Subsystem for Windows)

```sh
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
```

## Adding heroku to our application

From the main directory of your rails application

```sh
echo "On the next line type the name of your application" && echo "" && echo "It must *NOT* have spaces in the name, use dashes for separation" && echo "" && echo "Example:  my-cool-app" && echo "" && echo -n "Type the name of the application: " && read name && heroku create "${name}"
```

## Push once to heroku

Heroku is going to manage our application via `git` -- We will use `git push` to send our code to Heroku just like we do for storing it on GitHub for safekeeping. However, we need to tell `git push` that we aren't pushing to the default of GitHub, but to Heroku.

We do this with the following command:

```sh
git push heroku master
```

## Add nodejs buildpack if we have a built in React application

*NOTE* Skip this step if you do not have a React application embedded in your Rails app

```sh
heroku buildpacks:add --index 1 heroku/nodejs
git commit --allow-empty -m "Adding nodejs buildpack to Heroku"
git push heroku master
```

## Ensure our database is migrated in production

Every time we push code to Heroku that has new migrations we must run these migrations before using our application

We do that with the command

```sh
heroku run rails db:migrate
```

## Ensure our seed/sample data is in production (if we want)

If you want your seed/sample data in production you can run the same rails command in Heroku that you ran locally.

For instance if you created a task named `sampledata:load` and you used `rails sampledata:load` in development, then in production you can run `heroku run rails sampledata:load`


