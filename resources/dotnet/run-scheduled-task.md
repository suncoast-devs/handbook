# Using Heroku and docker with scheduled tasks

This guide walks you set up a project for a scheduled task that runs a C# program every so often. The goal is set up to use a .NET console app that does your work. This app is then wrapped in a docker container, then deployed to Heroku, and using an add-on, a schedule to run the container every so often.

## Step 0: The setup

To follow these steps, install the following:

- .NET SDK
- Heroku account
- Heroku CLI installed
- Docker installed

## Step 1: Create the app

Create a new .NET console app using:

```bash
dotnet new console -n NameOfMyCoolJob
```

Now you should write your code. Run and test your code locally using `dotnet run` or `dotnet watch run`.

NOTE: Highly advised to have `Console.WriteLine(something)` in a few places to verify that things are working and running

## Step 2: Creating the Heroku instance

Go to Heroku and create a new instance for your app. This app is a stand-alone application that is distinct from other apps. After its created, add the add-on called `Heroku Scheduler`.

Now create the job using the command: `web /bin/sh -c dotnet\ NameOfMyCoolJob.dll`. Select your interval and save.

## Step 3: Deployment

In your .NET app create two files, `dockerfile` and `deploy.sh.` The dockerfile is how you tell docker the environment to run your app.

Add the following to `dockerfile.`

```docker
FROM microsoft/dotnet:2.2-sdk
WORKDIR /app
COPY . .
CMD dotnet NameOfMyCoolJob.dll
```

NOTE: `NameOfMyCoolJob` is a placeholder for a more meaning name for your project

Add the following to the `deploy.sh`, note that `name-of-heroku-web-app` should be what ever you called your app you created in `Step 2`.

```bash
dotnet publish -c Release

cp dockerfile ./bin/release/netcoreapp2.2/publish

docker build -t docker-job-image ./bin/release/netcoreapp2.2/publish

docker tag docker-job-image registry.heroku.com/name-of-heroku-web-app/web

docker push registry.heroku.com/name-of-heroku-web-app/web

heroku container:release web -a  name-of-heroku-web-app

# sudo chmod 755 deploy.sh
# ./deploy.sh
```

These 6 commands are needed to deploy your app. Run these the same way you would run deploying a .NET API to Heroku.

## Step 4: Verification

Go into your Heroku app logs. You should see your app running every so often.
