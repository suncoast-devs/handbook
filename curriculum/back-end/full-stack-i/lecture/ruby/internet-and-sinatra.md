# How does the web work

## Domains and Hosts
- How does the browser know where to go when "suncoast.io" go?
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
- What happens after resolving the address of a server?
  - Connect to a `service` over a `socket`
  - What service are we talking about (web, email, etc)
  - How does the server know? PORTS
  - Unencrypted web is port 80
    - e.g. http://gstark.com:80
  - Encrypted web is port 443
- How do we connect to one of these ports?
  - Try it like the browser does!
  - Use the tool: `telnet`
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
- Install with `gem install sintra sinatra-contrib`

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
- We can tack these on to the end of our URLS: `http://localhost:4567?joke=3`

  ```ruby
  JOKES = [
    "Why do programmers always mix up Halloween and Christmas?  Because Oct 31 equals Dec 25.",
    "How many programmers does it take to change a light bulb?  None – It’s a hardware problem",
    "There are only 10 kinds of people in this world: those who know binary and those who don’t.",
    "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
    "What do you call a fake noodle? An Impasta.",
    "How many apples grow on a tree? All of them.",
    "Want to hear a joke about paper? Nevermind it's tearable."
  ]

  get '/joke' do
    number = params["number"].to_i

    json joke: JOKES[number]
  end
  ```

- Can also supply them in the URL

  ```ruby
  get '/jokes/:id' do
    id = params["id"].to_i

    json joke: JOKES[id]
  end
  ```

### Lets put or jokes into a database

- Combining `SQL` + `activerecord` + `sinatra`
- Lets add the 'activerecord' gem to our sinatra app
- `require 'activerecord'`
- Lets create a database:

  ```sh
  createdb jokes
  ```

- Then lets create a table to store our jokes

  ```sql
  CREATE TABLE jokes(id serial, punchline text);
  ```

- Lets update our app to show us the jokes in our database

  ```ruby

  ActiveRecord::Base.establish_connection(
    adapter: "postgresql",
    database: "jokes"
  )

  class Joke < ActiveRecord::Base
  end

  # Get one joke
  get '/jokes/:id' do
    joke_from_database = Joke.find(params["id"])

    json joke: joke_from_database
  end
  ```

- Then lets create an endpoint to show all the jokes

  ```ruby

  # Get all the jokes
  get '/jokes' do
    all_jokes = Joke.all

    json jokes: all_jokes
  end
  ```

- Lets add an endpoint to create a joke

  ```ruby

  # Create one joke
  post '/jokes' do
    joke_params = params["joke"]

    new_joke = Joke.create(joke_params)

    json joke: new_joke
  end
  ```

- And an endpoint to update a joke

  ```ruby

  # Update a joke
  put '/jokes/:id' do
    joke_params = params["joke"]

    existing_joke = Joke.find(params["id"])
    existing_joke.update(joke_params)

    json joke: existing_joke
  end
  ```

- And an endpoint to delete a joke

  ```ruby

  # Delete a joke
  delete '/jokes/:id' do
    deleting_joke = Joke.find(params["id"])

    deleting_joke.destroy

    json joke: deleting_joke
  end
  ```

- This is the beginning of our introduction to the concepts of REST (REpresentational State Transfer)

### Tired of stopping and starting Sinatra after each code change?
- Install the `sinatra-contrib` gem and use the `reloader` it provides
  - `gem install sinatra-contrib`
  - `require 'sinatra/reloader' if development?`
