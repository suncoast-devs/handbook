---
title: Cheat Sheet
---

Here are some commands and processes to follow for working with Rails
applications. (Note: all of this is covered in the
[Rails Guides](http://guides.rubyonrails.org)

## Creating a new rails application

```shell
rails new NAME
```

Where `NAME` is the name of your app. Try to keep the name simple such as `Blog`
or `Twitter`

## Gavin's Rails Template

If you would like to use a Rails template that includes a prettier `scaffold`
output (using Bootstrap) you may edit a file named `~/.railsrc` and place this
content inside:

```
--skip-spring
--database postgresql
--skip-turbolinks
--skip-coffee
--skip-action-cable
--template=https://raw.githubusercontent.com/tiy-tpa-ruby/rails-template/master/.rails_template.rb
```

If you are using my template, it will ask you a few questions about using `HAML`
instead of `ERB` and if you want a `git` repository created and it pushed to
`GitHub` for you automatically

The template also includes `Bootstrap` and nicer, bootstrap-capable templates
which are friendlier than the Rails default scaffold.

## First steps

- After creating your new rails app you must `cd NAME` to `change directory`
  into the rails application folder.
- From here you can `atom .` to open the project in your editor
- You will want a minimum of _TWO_ terminal tabs running in this directory
  - One will be to run `rails server`
  - The other will be to run various `rails` task commands, or other tools such
    as `git`
- The first task to do in the directory is:
  - `bundle`
  - This ensures all the project's `gems` have been installed
- Then we should create the database(s) required:
  - `rails db:create`
- Then we can start the rails application
  - `rails server`

## Creating a scaffold for a resource

- When you identify a thing our application manages we can use the Rails
  scaffold system to generate migrations, models, views, controllers.
- Lets say we are building an app to manage Books. We identify these attributes
  of a book to track:
  - title
  - author
  - page_count
  - genre
- We could use the rails scaffold generator to create all the files needed:
  - `rails generate scaffold book title author page_count:integer genre`
- Once we confirm the migration in `db/migrate/` looks good we apply it to the
  database:
  - `rails db:migrate`

## What if we get the scaffold wrong

- If you realize you made an error you can destroy the scaffold and then
  recreate it.
- However if you have made changes to the controller, model, and view, you will
  lose any of that work.
- The alternative is to manually update everything
  - Create a migration to add/remove/change the column (see rails migration
    guide)
  - Add the column to the various views
  - Add the column to the `params` method at the bottom of the applicable
    controller

## Database seeds

- The `db/seeds.rb` is a very helpful file for loading sample data, or initial
  data the application might need
- Update the file and then apply the `db/seeds.rb` into the database
  - `rails db:seed`
- If you need to reset the database (dropping all data and table structure) and
  reapply the seeds
  - `rails db:schema:load db:seed`

## What to do when downloading an existing rails project

- Clone the repository
- `cd NAME` where `NAME` is the name of the directory where the repository was
  cloned
- `rails db:create db:schema:load db:seed`
- This will:
  - Create the database
  - Load the schema (table structure)
  - Initialize the seeds
