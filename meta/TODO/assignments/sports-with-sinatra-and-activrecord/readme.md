# Sinatra, Bootstrap, and Database Powered SDG Sports

Congratulations! Your design of the SDG Sports homepage was a huge success and you have been approved to implement the application as a dynamic web application powered by Ruby, Sinatra, and the Postgres database!

See the *resources* at the bottom

## Setup

### Step 1

Fork [this repo](https://github.com/tiy-tpa-ruby/tiy-sports-with-sinatra-bootstrap-pg)

### Step 2

From Terminal:

Make a directory for today's work

### Step 3

Clone the repository to your hard drive

### Step 4

Change directory to your cloned repository


### Step 5

Create the database:

```sh
createdb sports
```

### Step 6

Load the database with data

```sh
uudecode -o /dev/stdout < sports.dmp | psql sports
```

### Step 7

Install the gems we need

```sh
gem install pg sinatra
```

## Running the app

- Run the web app:
  - `ruby app.rb`

- Visit the app in the browser
  - `http://localhost:4567`

- Top Tip: You may want to open a second terminal to run `pgcli` - OR - launch a separate tab in your existing terminal window

## Tables and data

Here are the tables I have created for you. AND I've loaded some teams and players for you.

```sql
create table players(id serial, name text);
create table teams(id serial, name text, description text, image_url text);
create table memberships(id serial, team_id integer, player_id integer);
```

## Explorer Mode

- The design has a hard coded list of `Teams` in the HTML.
- We no longer wany this to be hard coded, we want this to come from the live data in the database.
- Change `home.erb` and replace the hard coded `317 teams` with some `<%= %>` erb code to make that dynamic.
- You'll have to have some _queries_ in your `app.rb` to fetch the right information
- The data you will need:
  - Each team's image URL, name, description, and count of players
- You can leave the pagination and the games section as static HTML.

## Adventure Mode

- Create tables to store the information about the games. There is no existing tables or data for this in the database.
- Then you can turn the games table into dynamically generated data (including the scores)

## Epic Mode

- Turn the pagination of teams into dynamically generated page identifiers and make the pagination work.
- Use 5 as the number of teams per `page` and insert many more teams into the system.

## Resources
- [Sinatra Home Page](http://sinatrarb.com)
- [Sinatra Docs](http://www.sinatrarb.com/intro.html)
- [Bootstrap](http://getbootstrap.com)
