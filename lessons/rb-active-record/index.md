---
title: Introduction to ActiveRecord
---

## Pre-work

To get the most of out using Ruby for databases, we should do some configuration
of our `irb` sessions. This will make printing of database objects more
_awesome_

To achieve this we will install a `gem` and configure our `~/.irbrc` file to
configure our console with some nice features.

- Step 1: Install `awesome_print`

```shell
gem install awesome_print
```

- Step 2: Edit a file `~/.irbrc` and update it's content

If not `code`, use your favorite editor

```shell
code ~/.irbrc
```

Add this content. Don't worry too much about what it does, or how it works.

```ruby
#!/usr/bin/ruby

require 'irb/completion'
require 'irb/ext/save-history'

# Require awesome_print in our environment
begin
  require 'awesome_print'
rescue LoadError
end

# Keep an IRB history
IRB.conf[:SAVE_HISTORY] = 1000
IRB.conf[:HISTORY_FILE] = "#{ENV['HOME']}/.irb_history"

# Simple prompt mode
IRB.conf[:PROMPT_MODE] = :SIMPLE

# Configure awesome print if available
if defined?(AwesomePrint)
  require 'awesome_print/ext/active_support'
  require 'awesome_print/ext/active_record'

  AwesomePrint.irb!

  AwesomePrint.defaults = {
    plain: false,
    index: false,
    ruby19_syntax: true,
    color: {
      hash:       :pale,
      class:      :white,
      bigdecimal: :yellow,
      integer:    :yellow,
      fixnum:     :yellow,
      symbol:     :yellow,
    },
    indent: -2
  }
end

# If we are in Rails
if ENV['RAILS_ENV'] || defined?(Rails)
  # Customize the IRB prompt
  app_name = Rails.application.class.parent_name.downcase
  app_env  = Rails.env[0...3]

  IRB.conf[:PROMPT] ||= {}
  IRB.conf[:PROMPT][:RAILS] = {
    PROMPT_I: "#{app_name}> ",
    PROMPT_S: "#{app_name}* ",
    PROMPT_C: "#{app_name}? ",
    RETURN: "=> %s\n"
  }
  IRB.conf[:PROMPT_MODE] = :RAILS
end
```

## Database setup

- Step 1: Make sure you have these tables created. You likely have these created
  if you have previously followed
  [this lesson](/handbook/curriculum/back-end/full-stack-i/lecture/sql/intro-to-joins)

```sql
CREATE TABLE movies (
  id               SERIAL PRIMARY KEY,
  title            TEXT NOT NULL,
  primary_director TEXT,
  year_released    INT,
  genre            TEXT
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  rating TEXT
);

ALTER TABLE movies ADD COLUMN rating_id INTEGER NULL REFERENCES ratings (id);

CREATE TABLE actors (
  id        SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  birthday  DATE
);

CREATE TABLE roles (
  id       SERIAL PRIMARY KEY,
  movie_id  INTEGER REFERENCES movies (id),
  actor_id  INTEGER REFERENCES actors (id)
);
```

- Step 2: See
  [this lesson](/handbook/curriculum/back-end/full-stack-i/lecture/sql/intro-to-joins)
  for `INSERT INTO` statements to populate the database

## Using `bundler`

[Bundler](https://bundler.io) is the main package manager for Ruby. It is like
[npm](https://npmjs.org).

In most Ruby applications we will be using Bundler for managing the dependencies
of our code. Bundler is a very powerful tool that can add libraries to your code
from the main repository at [rubygems](https://rubygems.org) or from Github.
Bundler also allows you to require some libraries in development mode, some in
test, and others in production. It also has a very powerful and flexible version
requirement langauge.

For now we are going to use Bundler in it's
[inline](https://bundler.io/v2.0/guides/bundler_in_a_single_file_ruby_script.html)
mode since we'll only be dealing with a single Ruby file. Soon we will use
Bundler in it's typical mode by using a
[`Gemfile`](https://bundler.io/gemfile.html)

## Use bundler to require the Postgres and ActiveRecord libraries

Create a ruby script (`movies.rb`) to contain our Ruby code

```ruby
require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'pg'
  gem 'activerecord'
end

require 'active_record'
```

## Basic Active Record Setup

- NOTE: If you did not use the name `suncoast_movies`, replace
  `"suncoast_movies"` with the name of your database where the `movies`,
  `actors`, and `roles` tables were created.

```ruby
# Tell Ruby we are going to use Bundler
require 'bundler/inline'

# Define which libraries to use
gemfile do
  # Use the official source (rubygems)
  source 'https://rubygems.org'

  # Use postgres library
  gem 'pg'

  # Use ActiveRecord ORM
  gem 'activerecord'
end

# Load up the Active Record code
require 'active_record'

# When ActiveRecord needs to log something, like what SQL
# it is generating, send it to "STANDARD OUTput" (our terminal)
ActiveRecord::Base.logger = Logger.new(STDOUT)

# Hey ActiveRecord, establish a connection to our database
ActiveRecord::Base.establish_connection(
  adapter: "postgresql",
  database: "suncoast_movies"
)
```

## Setup models

```ruby
class Movie < ActiveRecord::Base
end

class Rating < ActiveRecord::Base
end
```

## Query

- Get all the movies
  - `Movie.all`
- Get the first movie
  - `Movie.first`
- Get the last movie
  - `Movie.last`
- Get a specific movie by id
  - `Movie.find(42)`
- Get a specific movie by title
  - `Movie.find_by(title: "Star Wars")`
- Get all movies released in 1984
  - `Movie.where(year_released: 1984)`
- Get all movies released after 1984
  - `Movie.where("year_released > ?", 1984)`
- Get all movies where the name contains `aliens`
  - `Movie.where("title like ?", "%aliens%")`

## Insert

- `Movie.create(title: "SDG: The Adventure", primary_director: "Suncoast", year_released: 2018, genre: "code")`

## Delete

- `Movie.where("year_released > ?", 1984).delete_all`
- `movie = Movie.find(42)` then `movie.delete`

## Update

- `movie = Movie.find(4)`
- `movie.title = "New Title"`
- `movie.save`
- `movie.update_attributes(title: "Newer Title", year_released: 2007)`

## Join

- Update the `Movie` model

```
class Movie < ActiveRecord::Base
  belongs_to :rating
end
```

Now we can write statements like these:

```ruby
movie = Movie.first
p movie.rating
```

- If we now extend the `Rating` model like this:

```ruby
class Rating < ActiveRecord::Base
  has_many :movies
end
```

we can write queries such as:

```
rating = Rating.first
p rating.movies
```

## Many to Many Join

- We must define a model for the `Role` model that joins the `Movie` model and
  the `Actor` model

```ruby
class Actor < ActiveRecord::Base
end

class Role < ActiveRecord::Base
  belongs_to :movie
  belongs_to :actor
end
```

- Now we can revise `Movie` and `Actor` to use the `Role` model as our join
  model, we call this `has_many :through`

```ruby
class Actor < ActiveRecord::Base
  has_many :roles
  has_many :movies, through: :roles
end

class Movie < ActiveRecord::Base
  has_many :roles
  has_many :actors, through: :roles
end
```

- And we can write code such as:

```ruby
movie = Movie.find_by(title: "The Lord of the Rings: The Two Towers")
p movie.actors

actor = Actor.find_by(full_name: "Martin Freeman")
p actor.movies
```

## Sneak peek at using this for APIs

Lets get all the `Movie` objects and print the resulting array of these movies
as JSON.

```ruby
movies = Movie.all
movies_as_a_hash = movies.as_json
puts JSON.pretty_generate(movies_as_a_hash)
```

The `movies.as_json` turns the collection of ActiveRecord objects into a Ruby
`hash` and then `JSON.pretty_generate` formats a nice, human readable, JSON
string. Finally `puts` prints the results.

If we were doing this _all at once_ this could look like:

```ruby
puts JSON.pretty_generate(Movie.all.as_json)
```

## Additional `ActiveRecord` resources

- [Active Record Basics](http://guides.rubyonrails.org/active_record_basics.html)
  - Sections 1, 2, 3, 5
- [Active Record Querying](http://guides.rubyonrails.org/active_record_querying.html)
  - Sections 1, 2, 3, 4, 5
- [Active Record Associations](http://guides.rubyonrails.org/association_basics.html)
  - Sections 1, 2
