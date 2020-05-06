---
title: # Making our first web app
---

### Sinatra

- Gem for producing web applications
- Install with `gem install sinatra sinatra-contrib`

- Initial sinatra (hello world) app

  ```ruby
  require 'sinatra'

  get '/' do
    "Hello, World"
  end
  ```

- Breaking down the sinatra code `require 'sinatra'` - require the sinatra
  library `get '/' do` - defines a block of code to run whenever we `GET` the
  `/` URL `"Hello World"` - Whatever the block returns returns becomes the body
  of the page

- Lets make an _APP_

  ```ruby
  require 'sinatra'
  require 'sinatra/json'

  get '/' do
    json ['hello', 'world']
  end
  ```

### Parsing parameters

- How can we send information to our application
- Simplest way is via _query parameters_
- We can tack these on to the end of our URLS: `http://localhost:4567?item=3`

  ```ruby
  ITEMS = [
    "Pick up laundry",
    "Finish Homework",
    "Cook Dinner",
    "Read Book",
  ]

  get '/item' do
    number = params["number"].to_i

    json item: ITEMS[number]
  end
  ```

- Can also supply them in the URL

  ```ruby
  get '/items/:id' do
    id = params["id"].to_i

    json item: ITEMS[id]
  end
  ```

### Lets put or items into a database

- Combining `SQL` + `activerecord` + `sinatra`
- Lets add the 'activerecord' gem to our sinatra app
- `require 'active_record'`
- Lets create a database:

  ```sh
  createdb items
  ```

- Then lets create a table to store our items. We'll name the column `text` to
  store the text of the item. We'll also add a boolean to mark if it is
  complete.

  ```sql
  CREATE TABLE items(id serial, text text, complete bool);
  ```

- Lets update our app to show us the items in our database

  ```ruby
  require 'active_record'
  require 'sinatra'
  require 'sinatra/json'

  ActiveRecord::Base.establish_connection(
    adapter: "postgresql",
    database: "items"
  )

  class Item < ActiveRecord::Base
  end

  # Get one item
  get '/items/:id' do
    item_from_database = Item.find(params["id"])

    json item: item_from_database
  end
  ```

- Then lets create an endpoint to show all the items

  ```ruby

  # Get all the items
  get '/items' do
    all_items = Item.all

    json items: all_items
  end
  ```

- Lets add an endpoint to create a item

  ```ruby

  # Create one item
  post '/items' do
    item_params = params["item"]

    new_item = Item.create(item_params)

    json item: new_item
  end
  ```

- And an endpoint to update a item

  ```ruby

  # Update a item
  put '/items/:id' do
    item_params = params["item"]

    existing_item = Item.find(params["id"])
    existing_item.update(item_params)

    json item: existing_item
  end
  ```

- And an endpoint to delete a item

  ```ruby

  # Delete a item
  delete '/items/:id' do
    deleting_item = Item.find(params["id"])

    deleting_item.destroy

    json item: deleting_item
  end
  ```

## Disabling `CORS` to allow a React front end to connect to this app

- First install this gem:

```sh
gem install rack-cors
```

Then add this code before our first `get`/`post`/`put`/`delete`

```ruby
# Allow anyone to access our API via a browser
use Rack::Cors do |config|
  config.allow do |allow|
    allow.origins '*'
    allow.resource '*'
  end
end
```

## This is the beginning of our introduction to the concepts of REST (REpresentational State Transfer)

### Tired of stopping and starting Sinatra after each code change?

- Install the `sinatra-contrib` gem and use the `reloader` it provides
  - `gem install sinatra-contrib`
  - `require 'sinatra/reloader' if development?`
