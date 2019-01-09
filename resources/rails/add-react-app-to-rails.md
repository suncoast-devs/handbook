# Add a React App to Rails

If you are creating a Rails API, or a Rails Monolith, and you want to add a full React app within that repository, this guide will set that up.

The React app will exist at the root of the site (e.g. `/`) and any routes that the Rails app does not supply will be handled by the React app. Thus you likely want your _api_ to be in a namespace like `/api` and your admin pages in a namespace like `/admin` -- setting that up is not covered in this guide.

## Step 0 - Install the 'json` tool

```sh
npm install -g json
```

## Step 1 - Create or Copy the React app

We need to get our React application into the Rails application. We have two choices, either we make a new react app or we copy an existing one.

From the base of your Rails application:

*Choice A* - if you already have a separate React app you want to merge

- Copy that project into the root of the rails application and rename it to `client`
- If that project was a git project then do `trash client/.git` or `rm -r client/.git` to dis-associate it from that git repository

*Choice B* - if you are creating a *NEW* react application

```sh
# Only run this if you are making a BRAND NEW react app
app-app --gamma client
```

_NOTE_ Do _not_ choose to create a GitHub project if prompted

_NOTE_ - The use of the app name of `client` is important here. We will refer to this later

## Step 2 - Add `rack-cors` to our Gemfile

Run the following command:

```sh
bundle add rack-cors
```

Add this content to the end of `config/initializers/cors.rb`:

```ruby
if Rails.env.development?
  Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'localhost:*'
      resource '*', headers: :any
    end
  end
end
```

## Step 3 - Configure the `package.json` file in the main Rails application

This configuration will ensure that the client folder is built when deployed.

```sh
[ -f package.json ] || echo '{ "private": true }' > package.json
json -I -f package.json -e 'this.cacheDirectories=["client/node_modules"]'
json -I -f package.json -e 'this.scripts={}'
json -I -f package.json -e 'this.scripts.build="cd client && npm install && npm run build && cd .."'
json -I -f package.json -e 'this.scripts.deploy="cp -a client/build/. public/"'
json -I -f package.json -e 'this.scripts.postinstall="npm run build && npm run deploy"'
```

## Step 4 - Configure the `package.json` file in the client application

This will allow us to send our JSON API requests to the Rails server when in development mode

```sh
json -I -f client/package.json -e 'this.proxy="http://localhost:3000"'
```

## Step 5 - Configure the Rails app to forward any unknown assets to the front end

Edit the file `config/routes.rb` and _JUST_ before the last `end` in the file, add this line:

```ruby

  if Rails.env.production?
    CLIENT_HTML = File.read(Rails.root.join('public/index.html'))

    get "*path", to: proc { [200, {}, [CLIENT_HTML]] }
  end
```

## Step 6 - Stop here unless you are ready to setup deployment

## Step 7 - Create the heroku app if needed

See existing instructions

## Step 8 - Do at least ONE deploy to heroku

```sh
git push heroku master
```

## Step 8 - Add the node buildpack

```sh
heroku buildpacks:add --index 1 heroku/nodejs
```

## Step 9 - Do a new push to heroku

```sh
git commit --allow-empty -m "Empty Commit"
git push heroku master
```
