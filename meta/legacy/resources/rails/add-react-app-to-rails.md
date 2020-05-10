---
title: Add a React App to Rails
---

If you are creating a Rails API, or a Rails Monolith, and you want to add a full
React app within that repository, this guide will set that up.

The React app will exist at the root of the site (e.g. `/`) and any routes that
the Rails app does not supply will be handled by the React app. Thus you likely
want your _api_ to be in a namespace like `/api` and your admin pages in a
namespace like `/admin` -- setting that up is not covered in this guide.

## Step 0 - Install the `json` tool

> NOTE: Run the following commands from the terminal (from any directory)

```shell
npm install -g json
```

## Step 1 - Create or Copy the React app

We need to get our React application into the Rails application. We have two
choices, either we make a new react app or we copy an existing one.

From the base of your Rails application:

_Choice A_ - if you already have a separate React app you want to merge

- Copy that project into the root of the rails application and rename it to
  `client`
- If that project was a git project then do `trash client/.git` or
  `rm -r client/.git` to dis-associate it from that git repository

_Choice B_ - if you are creating a _NEW_ react application

> NOTE: Run the following commands from the terminal while in the directory of
> your rails application (e.g. the same spot you'd normally run `rails server`)

```shell
# Only run this if you are making a BRAND NEW react app
app-app --gamma client
```

_NOTE_ Do _not_ choose to create a GitHub project if prompted

_NOTE_ - The use of the app name of `client` is important here. We will refer to
this later

## Step 2 - Add `rack-cors` to our Gemfile

If you previously added `rack-cors` to your project you can skip this step.

Do _ONE_ of the two following options:

**Option A**:

Uncomment the line `gem 'rack-cors'` in the Gemfile.

> Run the following commands from the terminal while in the directory of your
> rails application (e.g. the same spot you'd normally run `rails server`)

```shell
bundle install
```

**Option B**:

> Run the following commands from the terminal while in the directory of your
> rails application (e.g. the same spot you'd normally run `rails server`)

```shell
bundle add rack-cors
```

## Step 3: Configure CORS

The contents of the file `config/initializers/cors.rb` should be:

```ruby
if Rails.env.development?
  Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins "*"

      resource "*",
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
  end
end
```

## Step 4 - Configure the `package.json` file in the main Rails application

This configuration will ensure that the client folder is built when deployed.

> NOTE: Run the following commands from the terminal while in the directory of
> your rails application (e.g. the same spot you'd normally run `rails server`)

```shell
[ -f package.json ] || echo '{ "private": true }' > package.json
json -I -f package.json -e 'this.cacheDirectories=["client/node_modules"]'
json -I -f package.json -e 'this.scripts={}'
json -I -f package.json -e 'this.scripts.build="cd client && npm install && npm run build && cd .."'
json -I -f package.json -e 'this.scripts.deploy="cp -a client/build/. public/"'
json -I -f package.json -e 'this.scripts.postinstall="npm run build && npm run deploy"'
```

## Step 5 - Configure the `package.json` file in the client application

This will allow us to send our JSON API requests to the Rails server when in
development mode

> NOTE: Run the following commands from the terminal while in the directory of
> your rails application (e.g. the same spot you'd normally run `rails server`)

```shell
json -I -f client/package.json -e 'this.proxy="http://localhost:3000"'
```

This will remove any 'homepage' setting present in the client package.json file.
We remove this since we do not need to specify a homepage.

```shell
json -I -f package.json -e 'delete this.homepage'
```

## Step 6 - Configure the Rails app to forward any unknown assets to the front end

Add a file `config/initializers/mount_react_app.rb` with this content:

```ruby
if Rails.env.production?
  Rails.application.config.after_initialize do |app|
    CLIENT_HTML = File.read(Rails.root.join('public/index.html'))

    app.routes.append { match '*path', to: proc { [200, {}, [CLIENT_HTML]] }, via: [:get] }
  end
end
```

## Step 7 - Setup Heroku if you are ready to setup deployment

Follow the guide for
[adding heroku hosting](/handbook/resources/rails/add-heroku-hosting-to-our-rails-app)
if you are ready
