# How does the web work

## Domains and Hosts
- How does the browser know where to go when "suncoast.io" is requested?
  - Domain names, host names, TLDs
    - _Top Level Domains_ (TLDs) allocated by ICANN
    - Domains registered with a domain registrar
      - Domain ownership specifies a number of things
        - Contact information
        - Main DNS (more on that later)
    - Host names come before the domain name
      - Controlled by the domain owner
  - DNS
    - Domain Name Service
    - Translates a host name, eventually, into an IP address.
  - Lookups and TTLs for DNS
    - DNS results come with a _Time To Live_ (expiry time)
    - Propagating DNS queries
    - This way new DNS entries can be updated
  - How to use `dig`, a tool to look up DNS

    ```sh
    dig gstark.com
    dig suncoast.io
    dig amazon.com
    ```

  - Load balancing (multiple A records), fault tolerance
  - Special name for referencing our own host:
    - `localhost` resolves to `127.0.0.1`

## Making Connections
- What happens after our computer resolves the address of a server?
  - Connect to a `service` over a `socket`
    - A service is something like 'http' or 'https', or email via 'pop3' or 'smtp', or our `postgres` database
    - The socket determines which `port number` to connect to. Each service dedicates a specific port number to listen on. Think of the `ip` as the address of a building and the `port number` as the apartment number or the office number. Port numbers for services can be between 1 and 65535, but are typically less than 1024. For instance `http` is `80` while `https` is `443`.
  - What service are we talking about (web, email, etc)
  - How does the server know? PORTS
  - Unencrypted web is port 80
    - e.g. http://gstark.com:80
  - Encrypted web is port 443
- How do we connect to one of these ports?
  - Try it like the browser does!
  - Use the tool: `telnet`
    - Mac OS: `brew install telnet`
    - Linux: likely already installed
  - Now that we are connected, how do we talk?
  - http protocol
    - [documented](https://tools.ietf.org/html/rfc2616)

### HTTP
- GET a page

  ```
  GET / HTTP/1.1
  Host: gstark.com

  ```

  (blank line after Host:)

- Spits back a webpage (and some other stuff)
  - Also headers
  - status codes (404 not found, 500 errors, ...)
  - https://http.cat
- What are other HTTP headers?
  - `Date`
    _Timestamp on Server_
  - `Content-Type`
    _How should this content be interpreted_
  - `Content-Length`
    _How long is this content in bytes_
  - `Last-Modified`
    _When was this content last modified_
  - `ETag`
    _A checksum of the content, would be the same value for the same content_

- Other tools
  - `curl`
  - `http` (httpie)
- `http amazon.com`
  - Get back a 301 redirect
  - redirects to `https://amazon.com`
  - which redirects to `https://www.amazon.com`

# Making our first web app

## Sinatra

- Gem for producing web applications
- Install with `gem install sinatra sinatra-contrib`

- Initial sinatra (hello world) app

  ```ruby
  require 'sinatra'

  get '/' do
    "Hello, World"
  end
  ```

- Breaking down the sinatra code
  `require 'sinatra'` - require the sinatra library
  `get '/' do` - defines a block of code to run whenever we `GET` the `/` URL
  `"Hello World"` - Whatever the block returns returns becomes the body of the page

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

- Then lets create a table to store our items. We'll name the column `text` to store the text of the item. We'll also add a boolean to mark if it is complete.

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

# Disabling `CORS` to allow a React front end to connect to this app

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

# This is the beginning of our introduction to the concepts of REST (REpresentational State Transfer)

### Tired of stopping and starting Sinatra after each code change?
- Install the `sinatra-contrib` gem and use the `reloader` it provides
  - `gem install sinatra-contrib`
  - `require 'sinatra/reloader' if development?`
