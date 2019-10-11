# Deploying with .NET and Docker

## Working Sample:

See a full working example at [https://github.com/mdewey/WordApi](https://github.com/mdewey/WordApi). Clone and following along if you want!

## Learning the basics

### Welcome to Docker!

Docker is a platform for developing, shipping, and running applications. Docker allows developers to run your app in an isolated and controlled environment.

#### Key terms

- An **image** is a blueprint of how the server should run. Images are considered a snapshot of the environment the app should run in.
- A **container** is an instance of an image. You can use an image to make many containers.
- A **registry** is a platform to host images.

We use Docker to craft an image; to create a container; to publish to a registry; to update our site with the latest code.

Sample Docker file:

This file takes our current code, builds it into a container, and then runs in a separate container. This file describes how to build an image that builds and runs our .NET Core application.

```dockerfile
2

```

_NOTE: `WordApi.dll` should be the name of the `.dll` of your project_

To build an image, we run this command in the root of your project.

```shell
docker build -t sdg-words-image .
```

The above command uses Docker to build an image called `sdg-words-image` using the current directory (`.`)

To run a container of this image:

```shell
docker run -p 4000:80 sdg-words-image
```

This command runs our app in a container, using the image `sdg-words-image` that we built above, on port 4000.

Now, if you go to [https://localhost:4000/api/words](http://localhost:4000/api/words), you should see a list of words

Now with a basic understanding of Docker, we can use this to deploy our web apps. We are using Docker to build an image, to run a container on Heroku.

## Steps for deploying your .NET app

_NOTE: this assumes the project you are deploying uses with the SDG .NET templates_

Inside the root of your project, you will two files `deploy.sh` and `dockerfile`. These files are the key to deploying your app.

The Docker should not have to be touched, just double check that the .dll is the same as the .dll that your app builds.

### Install the Heroku CLI and Docker tools

Install the following:

- [heroku cli](https://devcenter.heroku.com/articles/heroku-cli)
- Docker CLI
  - [mac](https://docs.docker.com/docker-for-mac/install/)
  - [windows premium](https://docs.docker.com/docker-for-windows/install/)
  - [windows home](https://docs.docker.com/toolbox/toolbox_install_windows/)

### set up Heroku (only has to be done once)

_frequency: only has to be done once_

1. Create a [heroku account](https://heroku.com)
2. Sign in to the Heroku CLI by running

```shell
heroku login
```

3. Let Heroku know you are using the Heroku registry by running

```shell
 heroku container:login
```

### Create the app (once per project)

_frequency: only has to be done once per project_

4. You need to create your app in Heroku first. In your terminal, run

```shell
heroku create my-cool-heroku-name

```

### Add the database

_frequency: only has to be done once per web app_

5. Add a database to your new server

```shell
heroku addons:create heroku-postgresql:hobby-dev
```

### Update the deploy.sh

_frequency: only has to be done once per project_

In the deploy.sh file, this is the set of 4 commands to deploy our app.

```shell
docker build -t my-cool-image .

docker tag my-cool-image registry.heroku.com/my-cool-heroku-name/web

docker push registry.heroku.com/my-cool-heroku-name/web

heroku container:release web -a my-cool-heroku-name
```

In your file, you should update 5 places.

- replace `my-cool-image`, in both places, with a unique name for your image.

- replace `my-cool-Heroku-name` with the name of your Heroku web app.

#### using the Deploy script

_frequency: only has to be done once per project to set up, once per deployment to deploy our app_

With the commands updated, we want to run `deploy.sh.

##### For Mac users

First, you need to make the file runnable.

```shell
sudo chmod 755 deploy.sh
```

Now, to deploy( or redeploy) you should able to run

```shell
./deploy.sh
```

##### For Windows

Rename the file from `deploy.sh` to `deploy.bat`.

You can run with

```shell
.\deploy.bat
```
