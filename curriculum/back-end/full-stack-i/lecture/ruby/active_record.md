---
title: Intro to Active Record
draft: true
---

# Database setup

```sql
CREATE TABLE movies (
  id              SERIAL PRIMARY KEY,
  title           TEXT NOT NULL,
  primary_director  TEXT,
  year_released  INT,
  genre TEXT
);

CREATE TABLE Ratings (
  id SERIAL PRIMARY KEY,
  rating TEXT
);

ALTER TABLE movies ADD COLUMN rating_id INTEGER NULL REFERENCES ratings (id);
```

# Basic Active Record Setup

```ruby
require 'pg'
require 'active_record'

ActiveRecord::Base.logger = Logger.new(STDOUT)
ActiveRecord::Base.establish_connection(
  adapter: "postgresql",
  database: "movies"
)
```

# Setup models

```ruby
class Movie < ActiveRecord::Base
end

class Rating < ActiveRecord::Base
end
```

# Query

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
  - `Movie.where("year_released > ?", 1984)
- Get all movies where the name contains `aliens`
  - `Movie.where("title like ?", "%aliens%")

# Inserting
- `Movie.create(title: "SDG: The Adventure", primary_director: "Suncoast", year_released: 2018, genre: "code")`

# Deleting
- `Movie.where("year_released > ?", 1984).delete_all`
- `movie = Movie.find(42)` then `movie.delete`

# Updating
- `movie = Movie.find(4)`
- `movie.title = "New Title"`
- `movie.save`
- `movie.update_attributes(title: "Newer Title", year_released: 2007)`

# `ActiveRecord` resources

- [Active Record Basics](http://guides.rubyonrails.org/active_record_basics.html)
  - Sections 1, 2, 3, 5
- [Active Record Querying](http://guides.rubyonrails.org/active_record_querying.html)
  - Sections 1, 2, 3, 4, 5
- [Active Record Associations](http://guides.rubyonrails.org/association_basics.html)
  - Sections 1, 2

