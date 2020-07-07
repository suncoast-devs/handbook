---
title: Build a Full Stack App
assignments:
  - suncoast-overflow
order: 1
---

In this lesson, we will be combining all of our skills from
`Introduction to Programming with C#` and
`Fundamentals of Front-end Web Development`. To do so we will build an
application that will let us track our favorite taco restaurants in town. As we
go we will incrementally add features to our application. The backend will be an
[API](/lessons/cs-api-servers) that we develop in `C#` using
[LINQ](/lessons/cs-linq) with
[Entity Framework](/lessons/cs-object-relational-mapping). The front end will be
a [React](/lessons/react-intro) application that will
[fetch data](/lessons/js-fetch) from our API and support multiple pages with
[React Router](https://reactrouter.com/)

---

# Getting Started

With any application, we should start by gathering the general use stories for
our application. In this case, we would like to gather all of the taco producers
in town in an organized way while allowing users to rank and review them.

As such our user stories might be something like the following:

- As a user, I should be able to view and search for taco restaurants.
- As a user, I should be able to view the details of a specific restaurant,
  including:
  - Name
  - Description
  - Address and phone number
  - A list of reviews
  - The number of upvotes
  - The number of downvotes.
- As a user, I should be able to anonymously post a new taco restaurant.
- As a user, I should be able to review an existing restaurant.
- As a user, I should be able to upvote or downvote a restaurant.
- As a user, I should be able to upvote or downvote a review.

# Generate a wireframe

Based on the various user stories we should be able to generate a rough
wireframe of the user interface that would support these features. We would try
to imagine a user experience that would make a usable application that
implements the minimum viable product.

For an application we expect to charge users for, this would be the least amount
of features and thus effort for which they would pay us. For an application that
we are building for private, or internal, use, this would be the least amount of
features that our users would adopt the system in place of whatever system they
are presently using.

![](https://brianpagan.net/wp-content/uploads/2015/08/Bya3nBvCQAASBGi.png)

> Via
> https://brianpagan.net/2015/lean-startup-mvp-how-to-make-meaningful-products/

Here we see the various elements that an application requires.

- Functionality: The actual functions of the system must exist and do what they
  claim they do
- Reliable: The system must be reliable. It must stay running, it must be
  resistant to user input errors, must return the data the user expects, and not
  lose existing data during the development process.
- Usable: Users should be able to quickly learn the system and use it. It must
  not be cumbersome, certainly not more cumbersome than the system it replaces.
- Emotional Design: The design of the system must inspire users to want to use
  the application. It must anticipate the user's needs and be consistent in its
  behavior and responses.

These are lofty goals and we cannot focus the entire time on any one level of
this pyramid. We must iterate through vertical slices as we visit each function
of our application. That is when working on each part of the system we want to
include all four of these aspects in some amount. As we proceed through the
various features we will make discoveries that will allow us to revisit each of
these aspects on all of the features. We may also discover, through iteration,
that certain features and functions may not be required, saving us a tremendous
amount of time.

> No code is easier to develop and executes more efficiently than code you never
> have to write.

## Home Page Wireframe

![wireframe](./assets/taco-tuesday-home-screen.png)

---

# ERD

From these wireframes, we can start to collect the details of the entities our
system needs to represent. From the user stories and wireframe we can see we may
have the following entities:

```text
Restaurant
----------
Name
Description
Address
Telephone
Upvote Count
Downvote Count
Review Count?
```

and

```text
Review
------
Summary
Body
Creation Timestamp
Restaurant
```

and we would describe the relationships between these two entities as:

```text
Restaurants have many Reviews
Review belongs to one Restaurant
```

## Validate the ERD

Validate that this ERD supports the data on the wireframes we have generated in
the previous step. See if you can identify what entities, and potentially what
queries, generate the data on each of the pages. What data does the page need to
operate? For instance, a page showing the details of a single restaurant will
need the restaurant ID (which we'll likely get from the URL and React Router)
while the main listing page will need a collection of many of the restaurants,
perhaps filtered by a phrase.

---

# Build a new app

For this full stack application we'll be using the last of the SDG `dotnet`
templates, `sdg-react`. This app includes:

- [API Server](/lessons/cs-api-servers)
- [LINQ](/lessons/cs-linq)
- [Entity Framework](/lessons/cs-object-relational-mapping)
- [React](/lessons/react-intro)
- and [React Router](https://reactrouter.com/)

It generates a full React application in the directory `ClientApp` and ensures
it is connected to the full C# backend application found in the rest of the
directories.

## Generate the app

From your command line in the **main directory** of your application.

```shell
dotnet new sdg-react -o TacoTuesday
```

## `ClientApp` uses `npm` and not `yarn`

When adding third party libraries to our front end, we will be using `npm` and
not `yarn` since the `dotnet` integration does not support the `yarn` package
manager.

You must also run those commands **from the ClientApp folder**. So before any
`npm install` commands you must first `cd ClientApp`

## Running the application

You can run both the _backend_ and the _front end_ from a **single** command of

```shell
dotnet watch run
```

# Create Static HTML and CSS

Taking our wireframe as a guide we can build _static_ versions of the pages of
our application.

In a React application, this may mean creating individual components for each of
the main wireframe drawings. In this process, we will use fake, but realistic
data. For a field like _name_ use a realistic name of about the length, you'd
expect. For _address_ fields use addresses of well-known locations that look
realistic. For _description_ fields use **lorem ipsum** data of about the length
you'd expect someone to generate.

By creating a pass at HTML and CSS for each of these pages we are achieving
several important steps:

1. Validating our design so far. Did our wireframe transfer to a visual design?
   Do we see all the places we need data and is it accounted for in our ERD?
2. We can review a more realistic user interface with our stakeholders and
   users.
3. If we add some simple navigation we can deploy this application and ask users
   to simply "click around the app" and see if they agree with the flow.
4. Even if we do not finish a specific feature we still have a UI we can show
   off and demonstrate. This allows us to consider if every page/feature is
   required for the MVP. We haven't invested a large amount of time in making
   the static pages into real and dynamic pages.

## Remove template code from the project

The `sdg-react` comes with existing elements in the `ClientApp`, we'll remove
the extra bits by:

1. Updating `App.jsx` to:

```javascript
import React from 'react'

import './custom.scss'

export function App() {
  return <p>App</p>
}
```

2. Update the line `import App from './App'` to `import { App } from './App'`
3. Removing the contents of the `components` directory.
4. Removing the contents of the 'pages' directory.

<!-- https://github.com/gstark/TacoTuesday/commit/5435a46398b41677f488911fc9a5bdf6a7fbcee2 -->

## Start by building the component right in the main `<App>`

A good place to start is a page that mostly lists data. These pages are
typically early in the user interaction with a page and often include quite a
bit of the data the system has. Starting with this page will help ensure you are
properly dealing with much of the data in your system.

## Extract components as you go

When you have enough of a page designed, start extracting parts of the page into
various components. At first, define them in the same file, but then use the
excellent `refactor` feature of `VS Code` to move the component to a dedicated
file. This will ensure all the correct `import` and `export` settings are
created and simplifies the details of the syntax. You can also drag the
component to the correct folder and `VS Code` will ensure the `import`
statements are correctly updated.

## Start with a mobile view

Start with the wireframes in their mobile view. This, again, helps keep away
feature creep and ensures you are only including the most critical features. It
also helps ensure that you have a good mobile design since it is likely that
many of the visitors of your site will be on narrow viewport devices such as
phones and tablets.

## Use react-router to make each page

By using simple `<Route>` with React Router, we can give the illusion of
navigation. It also allows us to start to understand what components need to be
associated with which components and how we might handle getting the data we
need. (eg. getting the restaurant ID for a `<RestaurantDetails>` component)

## Files Updated

<!-- https://github.com/gstark/TacoTuesday/commit/ac137ad972bcbb7732807096bf845dba3db1a391 -->

- [ClientApp/src/App.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/ac137ad972bcbb7732807096bf845dba3db1a391/ClientApp/src/App.jsx)
- [ClientApp/src/custom.scss](https://raw.githubusercontent.com/gstark/TacoTuesday/ac137ad972bcbb7732807096bf845dba3db1a391/ClientApp/src/custom.scss)
- [ClientApp/src/pages/Restaurants.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/ac137ad972bcbb7732807096bf845dba3db1a391/ClientApp/src/pages/Restaurants.jsx)
- [ClientApp/src/pages/AddRestaurant.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/ac137ad972bcbb7732807096bf845dba3db1a391/ClientApp/src/pages/AddRestaurant.jsx)
- [ClientApp/src/pages/ShowRestaurant.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/ac137ad972bcbb7732807096bf845dba3db1a391/ClientApp/src/pages/ShowRestaurant.jsx)
- [ClientApp/src/components/Header.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/ac137ad972bcbb7732807096bf845dba3db1a391/ClientApp/src/components/Header.jsx)
- [ClientApp/src/components/](https://raw.githubusercontent.com/gstark/TacoTuesday/ac137ad972bcbb7732807096bf845dba3db1a391/ClientApp/src/components/NavBar.jsx)

And at this point, we can navigate around the application but only with static
information.

---

# Create migrations

Given our ERD and the initial design of some pages, we can create the backend
database tables of the entities that support those pages. By starting with one
or two pages we can focus on just a few of the database models we need from our
ERD without having to create them all at once.

## Use the `EF Core` tools

First, create a new `C# class` in the `Models` directory. If you use `VS Code`
feature to `Create new C# class` by right-clicking on `Models` you will get a
file with the correct namespaces and `using` statements to start.

### Generate a model

For instance, we might design our `Restaurant` class like this:

```csharp
namespace TacoTuesday.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string Telephone { get; set; }
    }
}
```

### Let EF Core know about it

Once we have defined the model itself we must update the `DatabaseContext` file
to let `EF Core` know we wish to track a `DbSet` of these `Restaurant` models.

Add this line to `DatabaseContext.cs`

```csharp
public DbSet<Restaurant> Restaurants { get; set; }
```

### Create a migration

With this model created and the `DbSet` defined in the context, we can use this
command to automatically generate a migration that will create the table in the
database for us. However, we should first make sure our code is building
correctly.

```shell
dotnet build
```

if indicates errors then you must resolve those before moving on.

If `dotnet build` runs without any issues then we can run the command to
generate a migration.

```shell
dotnet ef migrations add CreateRestaurant
```

Once done we will see a file similar to `20200704182602_CreateRestaurant.cs` in
our `Migrations` folder.

**NOTE** You should take the time to review the contents of this file. A common
developer error is to _not_ check this file and ensure that `.net` generated the
code needed to create or update our database schema.

There should be **two** methods in this file `Up`, and `Down` and they should
have `C#` statements within that refer to the model and columns we would expect
to see given the definition in `Restaurant.cs` above.

### Update the database

Now we can _execute_ the migration so that the changes are made in our local
developer database.

```shell
dotnet ef database update
```

You should see a message indicating that the changes were applied to the
database.

### Insert some data

Use `pgcli` or any other database tool to insert some sample data.

One way to accomplish this is to create a seeding sql script.

Create a file `seeds.sql` and, using the following as an example, create your
own sample data.

Save this file in the `Models` directory.

```sql
TRUNCATE TABLE "Restaurants";

INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Thoughtbeat', 'Inverse zero administration benchmark', '07 Meadow Vale Drive', '314-651-9791');
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Dabtype', 'Organized stable firmware', '7 Miller Park', '523-760-6681');
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Topdrive', 'Object-based interactive application', '65 Eliot Lane', '650-993-7074');
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Avaveo', 'Persistent zero defect process improvement', '2 Clarendon Junction', '715-663-5265');
```

You can run this with the command line:

```shell
psql TacoTuesdayDatabase --file=Models/seeds.sql
```

## Files Updated

> NOTE: Your Migrations files will have different filenames with distinct
> timestamps

- [Models/Restaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4822b4cca25bae2d078202e5ca726190d6395123/Models/Restaurant.cs)
- [Models/DatabaseContext.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4822b4cca25bae2d078202e5ca726190d6395123/Models/DatabaseContext.cs)
- [Migrations/20200705195609_CreateRestaurant.Designer.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4822b4cca25bae2d078202e5ca726190d6395123/Migrations/20200705195609_CreateRestaurant.Designer.cs)
- [Migrations/20200705195609_CreateRestaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4822b4cca25bae2d078202e5ca726190d6395123/Migrations/20200705195609_CreateRestaurant.cs)
- [Migrations/DatabaseContextModelSnapshot.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4822b4cca25bae2d078202e5ca726190d6395123/Migrations/DatabaseContextModelSnapshot.cs)
- [Models/seeds.sql](https://raw.githubusercontent.com/gstark/TacoTuesday/4822b4cca25bae2d078202e5ca726190d6395123/Models/seeds.sql)

---

# Creating our initial controller to serve a list of restaurants

Now that we have migrations, a database, and some sample data, let's create a
controller to generate endpoints to: `Create`, `Read`, `Update`, and `Delete`
restaurants. This will give us the `C R U D` style interface we will use from
our front end.

## Using an automation tool to create the initial controller

One of the `dotnet` tools we installed is called `aspnet-codegenerator`. This
tool can generate a controller for us. This controller will do many, but not
all, of the things we need our controller to do.

To use this controller we will run this command line:

```shell
dotnet aspnet-codegenerator controller --model Restaurant -name RestaurantsController --useAsyncActions -api --dataContext DatabaseContext --relativeFolderPath Controllers
```

Here we are telling the `codegenerator` to create a controller named
`RestaurantsController`, that we wish to use `async` controller actions, that we
are generating an `api` style controller (as opposed to one that renders its own
HTML views), that the model used with this controller is `Restaurant`, our
database context class is named `DatabaseContext` and our controller folder is
`Controllers`

If we were generating a controller for a different model we would change the
`--name` and the `--model` arguments. All the others would remain the same.

When done we will have a `RestaurantsController.cs` file with a controller that
has the following routes:

```csharp
[Route("api/[controller]")]

// GET: api/Restaurants
//
// Returns a list of all your Restaurants
//
[HttpGet]

// GET: api/Restaurants/5
//
// Fetches and returns a specific restaurant by finding it by id. The id is specified in the
// URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
// to grab the id from the URL. It is then made available to us as the `id` argument to the method.
//
[HttpGet("{id}")]

// PUT: api/Restaurants/5
//
// Update an individual restaurant with the requested id. The id is specified in the URL
// In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
// to grab the id from the URL. It is then made available to us as the `id` argument to the method.
//
// In addition the `body` of the request is parsed and then made available to us as a Restaurant
// variable named restaurant. The controller matches the keys of the JSON object the client
// supplies to the names of the attributes of our Restaurant POCO class. This represents the
// new values for the record.
//
[HttpPut("{id}")]

// POST: api/Restaurants
//
// Creates a new restaurant in the database.
//
// The `body` of the request is parsed and then made available to us as a Restaurant
// variable named restaurant. The controller matches the keys of the JSON object the client
// supplies to the names of the attributes of our Restaurant POCO class. This represents the
// new values for the record.
//
[HttpPost]


// DELETE: api/Restaurants/5
//
// Deletes an individual restaurant with the requested id. The id is specified in the URL
// In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
// to grab the id from the URL. It is then made available to us as the `id` argument to the method.
//
[HttpDelete("{id}")]
```

> NOTE: The method implementations are not listed above

If we are running our application we can open up `https://localhost:5001` in our
browser and see an API documentation page:

![swagger](./assets/swagger.png)

Here we can see the API endpoints that were generated by the code generator.

**What is that `/api/` before each of the URLs?**

You may have noticed that there is a prefix of `/api` before each URL in our
controller. We have added this for a specific reason. Take a moment and see if
you can think of some good reasons.

The best reason for adding this prefix is to avoid _name collisions_. Soon we
will start to build more and more URLs for our front end. If our front end
**and** our API are both served from the same server we might have an overlap of
URLs and it won't be able to tell if we mean the front end route or potentially
a backend API endpoint. As such we prefix, and reserve, the path `/api/` for
anything to do with our backend API resources.

## Files Updated

- [Controllers/RestaurantsController](https://raw.githubusercontent.com/gstark/TacoTuesday/3bafd4231a8114a456577cd745c0510b58c3d261/Controllers/RestaurantsController.cs)

## Get a list of restaurants

Looking at `GET /api/Restaurants` we see that this will return a JSON array of
objects where each object represents the details of the sample restaurants we
placed in our database.

We can use this API endpoint to populate the list of restaurants on our home
page

---

# Returning to the UI to populate the list of restaurants

From our statically defined home page we will extract a component to render the
list of restaurants if we haven't already.

That component might look something like:

```javascript
function Restaurants() {
  return (... implementation omitted for space ...)
}
```

Where `...` is the implementation of the listing of restaurants.

We can now introduce a state to store the list of restaurants.

```javascript
function Restaurants() {
  const [restaurants, setRestaurants] = useState([])

  return (... implementation omitted for space ...)
}
```

> NOTE: we initialize this to an empty array since the list of restaurants from
> the API will be an array of restaurant objects. We want our default state to
> represent "no data" so an empty array is the correct choice.

Next we will change our static list of a few sample restaurants to use
`restaurants.map(restaurant =>` to generate the list dynamically

```javascript
function RestaurantList() {
  const [restaurants, setRestaurants] = useState([])

  return (...
     ... other content
     {restaurants.map(restaurants => (
       ... the code for a single restaurant
     ))}
     ... other content
}
```

This should render an _empty_ list of restaurants at first.

## Files Updated

- [ClientApp/src/pages/Restaurants](https://raw.githubusercontent.com/gstark/TacoTuesday/5b0f50e1af09c3bb332eaf8390e6b6d18a12fe28/ClientApp/src/pages/Restaurants.jsx)

## Fetching data

Now we will use the `fetch` method to load the list of restaurants from our API.
We will do this via the `useEffect` method. We will create a `useEffect` with an
empty dependency array so that the method is called only once when the component
is first added to the page.

```javascript
function RestaurantList() {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    fetch('/api/Restaurants')
      .then(response => response.json())
      .then(apiData => {
        setRestaurants(apiData)
      })
  }, [])

  return (...
     ... other content
     {restaurants.map(restaurant => (
       ... the code for a single restaurant
     ))}
     ... other content
}
```

If we have done this successfully we have a dynamically generated list of
restaurants on our home page.

## Files Updated

- [ClientApp/src/pages/Restaurants.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/518ef34e375b6989b667da16ad68da681ed2ec17/ClientApp/src/pages/Restaurants.jsx)

## Refactor

At this point we can refactor the code for a single restaurant into its own
component.

```javascript
function SingleRestaurantFromList(props) {
  return (
    ...
    code for a single restaurant
  )
}

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    fetch('/api/Restaurants')
      .then(response => response.json())
      .then(apiData => {
        setRestaurants(apiData)
      })
  }, [])

  return (...
     ... other content
     {restaurants.map(restaurant => (
       <SingleRestaurantFromList key={restaurant.id} restaurant={restaurant} />
     ))}
     ... other content
}
```

## Files Updated

- [ClientApp/src/pages/Restaurants.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/6500b761dc09d9064af4529621f6fb937f9f7dd8/ClientApp/src/pages/Restaurants.jsx)

# Representations of Resources

We've done a good job so far of providing a way for the front end to receive a
list of data from the backend via the `endpoint` of `GET /api/Restaurants`.

The API generated by our controller is following a particular style. You will
have noticed that all of the endpoints that deal with retrieving data use `GET`,
(e.g. `GET /api/Restaurants` and `GET /api/Restaurants/{id}`) while the endpoint
used to delete a restaurant uses `DELETE`

This introduces the idea of a `Resource` -- a `Resource` is like an `Entity`
from our `ERD` except that a `Resource` doesn't always directly correspond to a
database table.

A `resource` is any representation of data that we wish to address over the
network via an API. In this case we have two resources:

`The list of all restaurants`

and

`A specific restaurant given by its identifier`

When we ask for a resource we specify a few things:

- The resource itself
- The format we wish the data in
- The action we wish to preform on the resource

In our API the `format we wish the data in` will always be JSON. We'll come back
to this in a moment.

Lets take the case of a single restaurant. There are _three_ endpoints in our
API. `GET /api/Restaurants/{id}`, `PUT /api/Restaurants/{id}`, and
`DELETE /api/Restaurants/{id}`. In this case `/api/Restaurants/{id}` refer to
the resource itself: _the specific restaurant given by its identifier_ and the
verb (`GET`,`PUT`,`DELETE`) refers to the action we wish to take, _fetching_,
_updating_, and _removing_.

Thinking again about the idea of data formats and the endpoint
`GET /api/Restaurants/{id}` we said that this will return `JSON` data. What if,
for any given restaurant, we also store an image of this restaurant. We could
add another endpoint for the same **resource** but change the URL slightly such
as `GET /api/Restaurants/{id}.png` and we would know that we were requesting the
image of the restaurant, not the `JSON` data. Another way to handle this would
be to add a header that indicates the type of data we want. In this case, we
would specify the same URL of `GET /api/Restaurants/{id}` but include an
`Accept` header with a value such as `image/png` to indicate we want the image
version of this resource.

The _list of restaurants_ is also a **resource** that can be managed. For
instance `GET /api/Restaurants` retrieves that resource, the list itself.
Whereas `POST /api/Restaurants` serves to **add** a restaurant to that list.
Here there is a single resource with different verbs to represent the action we
can take.

The idea of endpoints, URLs, representing resources along with actions and
formats of data is a powerful concept wrapped up in an approach called `REST`
and when we follow this approach we say that we are creating a `REST API` or
`RESTful API`.

The full application of the `REST` programming style is simultaneously subtle as
well as complex. It is captured in
[the Ph.D. thesis](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)
of Roy Fielding. And while an academic paper it is well written and accessible.
It is well worth a read if you want to appreciate the simplicity of REST, along
with HTTP, but also build an understanding of the power of the architectural
idea.

For a simpler description of REST, I recommend an article titled
[How I Explained REST to My Wife](http://www.looah.com/source/view/2284)

# Adding a search feature to our API

Given our discussion of APIs and resources, let's consider adding a `search`
feature to our API to satisfy the `search / filter` UI from our navigation bar.

We could add another endpoint such as `GET /api/Restaurants/search`, but we
already have an endpoint that represents the resource we want: _the list of
restaurants_, we just want a **variant** of that list.

In this case, we can use the `query parameter` feature of HTTP to our advantage,
and it is specifically what this feature is meant for.

We will update the definition of the `GetRestaurants` method as such:

```csharp
[HttpGet]
public async Task<ActionResult<IEnumerable<Restaurant>>> GetRestaurants(string filter)
```

The `string filter` will be populated with the **value** of a query parameter
named `filter` if present, otherwise the variable `filter` will be `null`.

We can use this to our advantage in the implementation. If the `filter` variable
is `null` we simply return the list of all restaurants from the context.
Otherwise, we add a `Where` method to only include those `restaurant` where the
`Name` property contains the phrase in the `filter` variable.

```csharp
if (filter == null)
{
    return await _context.Restaurants.ToListAsync();
}
else
{
    return await _context.Restaurants.Where(restaurant => restaurant.Name.Contains(filter)).ToListAsync();
}
```

## Updating the UI to allow for filtering

First, let's update the `NavBar` to contain a state for the filter text.

```javascript
const [filterText, setFilterText] = useState('')
```

Then we will update the `<input>` tag

```html
<input className="form-control mr-sm-2" type="search" placeholder="Search"
aria-label="Search" value={filterText} onChange={event =>
setFilterText(event.target.value)} />
```

And add a click handler for the `Search` button itself

```html
<span
  className="btn btn-outline-success my-2 my-sm-0"
  onClick="{handleClickSearch}"
>
  Search
</span>
```

And finally the `handleClickSearch` method

```javascript
const handleClickSearch = () => {
  console.log(`The user wants to search for ${filterText}`)
}
```

## Files Updated

- [Controllers/RestaurantsController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/f7ad38c6da8f2d71efcee2d88e33fa648363c563/Controllers/RestaurantsController.cs)
- [ClientApp/src/components/NavBar.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/f7ad38c6da8f2d71efcee2d88e33fa648363c563/ClientApp/src/components/NavBar.jsx)

---

## Houston, we have a problem

Somehow this `filterText` has to make it from the `NavBar` over to the
`Restaurants` component. Remembering that **state always flows down** we
recognize that the active filter needs to be at the level (or above) where both
the `<NavBar/>` and the `<Restaurants/>` components are. This is so that the
state can be passed down. Also, we will pass down the method that **updates**
the state where needed.

Thus we will define a new state in the `<App/>` component for the `activeFilter`

```javascript
const [activeFilter, setActiveFilter] = useState('')
```

And we will pass it down where needed:

`<NavBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />`

and

`<Restaurants activeFilter={activeFilter} />`

Then in the `NavBar`, we can use the `setActiveFilter` method to change the
active filter in the `handleClickSearch` method.

First, update the function to accept props

```javascript
export function NavBar(props) {
```

And then set the active filter when ready

```javascript
const handleClickSearch = () => {
  console.log(`The user wants to search for ${filterText}`)
  props.setActiveFilter(filterText)
}
```

Now let's visit the `Restaurants` component and use the newly passed prop,
`activeFilter`

First, update the function to accept `props`

```javascript
export function Restaurants(props) {
```

Then update the `useEffect` to dynamically build the `url` to use based on the
presence of any text in the `activeFilter` props.

```javascript
console.log('RestaurantList rendering')

useEffect(() => {
  const url =
    props.activeFilter.length === 0
      ? `/api/Restaurants`
      : `/api/Restaurants/filter=${props.activeFilter}`

  console.log(`Fetching from ${url}`)

  fetch(url)
    .then(response => response.json())
    .then(apiData => {
      setRestaurants(apiData)
    })
}, [])
```

If you enter some text and search you **WILL** see the message
`RestaurantList rendering` you will **NOT** see a console log for
`Fetching from ...` nor will you see the list of restaurants update.

This is because even though the `Restaurants` component will be re-rendered when
the `activeFilter` state in the `<App>` changes, we haven't told the code inside
the `useEffect` to run when the contents of `props.activeFilter` change.

We need to **add** that variable to our now empty array of dependencies `[]` so
that the code becomes:

```javascript
console.log('RestaurantList rendering')

useEffect(() => {
  const url =
    props.activeFilter.length === 0
      ? `/api/Restaurants`
      : `/api/Restaurants?filter=${props.activeFilter}`

  console.log(`Fetching from ${url}`)

  fetch(url)
    .then(response => response.json())
    .then(apiData => {
      setRestaurants(apiData)
    })
}, [props.activeFilter])
```

Now our search works.

## Review this in-depth

- Our `NavBar` has its own local state variable, `filterText`

- When the input changes, we use `setFilterText` to update the `filterText`
  state with the value of the input (from `event.target.value`)

- This causes the `NavBar` to render and show the up-to-date `value` of the
  `<input>` element.

- When the user clicks on the `Search` button we call `handleClickSearch`

- The `handleClickSearch` method uses the supplied `props.setActiveFilter`
  method to set that to the current `filterText`

- `setActiveFilter` is sent to the `NavBar` from its parent (thus why it is a
  `props.` variable) where it maintains a state named `activeFilter`

- Since this was just **updated** the `App` will re-render

- The `App` also sends the state `activeFilter` to the `Restaurants` component

- Since the `Restaurant` component is monitoring `props.activeFilter` in a
  `useState`, the code inside that `useState` will execute again.

- That code looks at the value of `props.activeFilter`. If it has nothing
  (length === 0) then it uses the original URL. However, if it _does_ have any
  text, it uses a URL where the `?filter=` query param is filled in.

- The results of that `fetch` are then used to re-populate the list of
  restaurants.

- Since the controller, when given a `filter` query parameter, only returns
  restaurants with that text in the name, we will see an updated list of
  restaurants on the page.

> WHEW!

## Files Updated

- [ClientApp/src/App.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/4f61820cb80731c1124d5bcaceb0dd1115b608da/ClientApp/src/App.jsx)
- [ClientApp/src/components/NavBar.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/4f61820cb80731c1124d5bcaceb0dd1115b608da/ClientApp/src/components/NavBar.jsx)
- [ClientApp/src/pages/Restaurants.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/4f61820cb80731c1124d5bcaceb0dd1115b608da/ClientApp/src/pages/Restaurants.jsx)

---

# Implement "Add"

Let's turn our attention to the `AddRestaurant` component and the how we will
use the endpoint `POST /api/Restaurants` to create a new restaurant.

## Track state for each input field

For each input field, we will need to track the data in the input form. Since
there are fields for `Name`, `Description`, `Address` and `Telephone` we will
need state for all of these.

Typically we would create separate state variables for each of the input fields.
However, all of these are related to a restaurant. Let's look at the JSON we
need to send for creating a new restaurant:

![add-restaurant](./assets/add-restaurant.png)

We won't be sending the `id` field since the database will take care of that,
but the rest of the attributes are precisely what we want to generate. This
indicates that we could use a single state variable that was an object with this
shape. That is:

```javascript
const [newRestaurant, setNewRestaurant] = useState({
  name: '',
  description: '',
  address: '',
  telephone: '',
})
```

If we can update this state with the values from the input fields then we could
just `POST` this object to the API.

We will change each `<input>` and `textarea` to include a `value=` property and
an `onChange` property:

```html
<input
  type="text"
  className="form-control"
  id="name"
  value="{newRestaurant.name}"
  onChange="{handleName}"
/>
```

We set the value to the part of the object corresponding to the name of the
object we are building. We also set a unique method to handle input/textarea
changes.

Lets implement one of the handling methods, `handleAddress`:

```javascript
const handleAddress = event => {
  const newAddressText = event.target.value

  const updatedRestaurant = { ...newRestaurant, address: newAddressText }

  setNewRestaurant(updatedRestaurant)
}
```

Here we get the new text for the address from the `value` attribute of the
changed element. Then we construct a new object by first taking the existing
object and _spreading_ it. This takes each key/value pair and makes it a
key/value pair in the object we are creating. In essence this "copies" the
values to the new object. Then we add in the `address` field with its new value.
This has the effect of **overriding** any `address` key/value pair that was
already spread into the new object. In the end, we have a **copy** of the
existing `newRestaurant` object but with a new value for `address`

This pattern will repeat for the other form fields:

```javascript
const handleDescription = event => {
  const newDescriptionText = event.target.value

  const updatedRestaurant = {
    ...newRestaurant,
    description: newDescriptionText,
  }

  setNewRestaurant(updatedRestaurant)
}
```

However, if you notice we added a field `id` to each of the inputs that have the
name of the field. We were careful to name these after the object's properties.
Thus we can use this to create a **single** handle method that is reused amongst
all the `onChange` events:

```javascript
const handleFieldChange = event => {
  const value = event.target.value
  const fieldName = event.target.id

  const updatedRestaurant = { ...newRestaurant, [fieldName]: value }

  setNewRestaurant(updatedRestaurant)
}
```

Finally, let's handle the case of submitting the form. Instead of adding an
`onClick` method to the button, we will add an `onSubmit` for the `<form>`. This
is a more general method and handles all the other ways a form can be submitted
(e.g. pressing enter in an input field)

```html
<form onSubmit="{handleFormSubmit}"></form>
```

The implementation of `handleFormSubmit` must use the `fetch` API to `POST` an
object to the server and await a result.

```javascript
event.preventDefault()

fetch('/api/Restaurants', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(newRestaurant),
})
  .then(response => response.json())
  .then(() => {
    history.push('/')
  })
```

The very thing we must do is tell the event that we do not want the `form` to do
its normal processing, which would be to submit data to the server. We did not
fully configure the `<form>` element to do that and we are essentially
**replacing** its behavior. `preventDefault` stops that default behavior to
happen. For many events we have dealt with, we haven't had to stop the normal
behavior since it doesn't impact us.

This `fetch` usage is much like our `GET` except we add a second parameter that
is an object specifying that we wish to use the `POST` method (verb), that we
are sending `application/json` type data, and finally a serialized JSON body.

Once done, we process the JSON response and finally use the history object to
redirect the user back to the home page. We add a `const history = useHistory()`
at the top of the method to be able to access the history.

If you now type in the details of a restaurant and press the submit, you should
be redirected to the home page and your new restaurant will be at the end of the
list.

## Files Updated

- [ClientApp/src/pages/AddRestaurant.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/master/ClientApp/src/pages/AddRestaurant.jsx)

# Handling validation

You may also notice that our system allows us to enter blank information for
many of the fields. We shouldn't allow the restaurant to be created without at
least a name and address field.

Let's add that validation and the corresponding error handling in the user
interface.

## Required fields in the model

We can add an _annotation_ named
[`Required`](https://docs.microsoft.com/en-us/ef/core/modeling/entity-properties?tabs=data-annotations%2Cfluent-api%2Cwithout-nrt#explicit-configuration)
to both the `Name` and `Address` field in our `Restaurant.cs` to indicate that
these attributes must be filled in.

```csharp
using System.ComponentModel.DataAnnotations;

namespace TacoTuesday.Models
{
    public class Restaurant
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public string Address { get; set; }

        public string Telephone { get; set; }
    }
}
```

We will generate a new migration to capture this change. Any time we add or
change a **field** to a database-backed model we should generate a new
migration.

```shell
dotnet ef migrations add AddRestaurantRequiredFields
```

This will create a new migration with the following as the `Up()` method:

```csharp
protected override void Up(MigrationBuilder migrationBuilder)
{
    migrationBuilder.AlterColumn<string>(
        name: "Name",
        table: "Restaurants",
        nullable: false,
        oldClrType: typeof(string),
        oldType: "text",
        oldNullable: true);

    migrationBuilder.AlterColumn<string>(
        name: "Address",
        table: "Restaurants",
        nullable: false,
        oldClrType: typeof(string),
        oldType: "text",
        oldNullable: true);
}
```

When we run this migration it will enforce that these columns may not have
`null` and thus are required.

```shell
dotnet ef database update
```

> NOTE: If any of your data rows **DO** have `NULL` in these columns the
> migration run will fail. You will have to add data to those rows, or remove
> those rows before the migration will execute properly.

## Handling errors in the user interface

Try adding a new restaurant without a name or address. You will notice now that
you get a `400` response instead of a `200`. However, the UI still redirects us
back to the main page.

This is because the `fetch` usage is not looking for an error response from the
server.

If we look at the `JSON` that is returned when an error happens:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "|db64e96a-42aaf0a333dd69ff.",
  "errors": {
    "Name": ["The Name field is required."],
    "Address": ["The Address field is required."]
  }
}
```

We see there is a `status` field that contains the value `400`, an HTTP error
code. We can use that information, along with the `errors` to give the user
information about the error.

Let's create a state variable to hold an error text.

```
const [errorMessage, setErrorMessage] = useState()
```

Then in the `fetch` method, we can detect the `apiResponse.status === 400` and
set the error message. If there is not an error, we redirect as we once did.

```javascript
if (apiResponse.status === 400) {
  setErrorMessage(Object.values(apiResponse.errors).join(' '))
} else {
  history.push('/')
}
```

Now we can use the value `errorMessage` to optionally display an `alert`
bootstrap element to the user.

```html
<div className="card-body">
  {errorMessage && (
  <div className="alert alert-danger" role="alert">
    {errorMessage}
  </div>
  )}
</div>
```

If you try saving a restaurant now without a name and address, you'll see this
message:

![missing-name-and-address](./assets/missing-name-and-address.png)

However, if you fill in the name field, only the address will display an error.

![missing-address](./assets/missing-address.png)

## Improving the user experience

Rather than showing a sentence at the top we could store the error object and
use it to highlight each field that has an error, decorating the input field
with a red border and adding the error text next to the field.

We'll leave this as an exercise for the reader. Also, you may want to look into
some popular React forms libraries that add these capabilities for you.

## Files Updated

- [Models/Restaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/35f2cb19b1dad1896ad587968771410d20e41faa/Models/Restaurant.cs)
- [ClientApp/src/pages/AddRestaurant.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/master/ClientApp/src/pages/AddRestaurant.jsx)
- [Migrations/20200706004409_AddRestaurantRequiredFields.Designer.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/master/Migrations/20200706004409_AddRestaurantRequiredFields.Designer.cs)
- [Migrations/20200706004409_AddRestaurantRequiredFields.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/master/Migrations/20200706004409_AddRestaurantRequiredFields.cs)
- [Migrations/DatabaseContextModelSnapshot.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/master/Migrations/DatabaseContextModelSnapshot.cs)

---

# Recording upvotes and downvotes

To add the upvotes and downvotes we will add two new properties to our
`Restaurant` model: `UpvoteCount` and `DownvoteCount`.

These fields, however, are a little different than the others. While we do want
users of the API to be able to see these fields when creating, or even updating,
a restaurants details we do not want the API to allow direct changing of these
fields.

We will create a `set;` accessor for these fields. However, we will mark them as
private so that external code cannot access them. This prevents us from writing
code like `restaurant.UpvoteCount++` and from the API code allowing us to modify
the `upvoteCount` via JSON. However, we will still see a `upvoteCount` field on
the API to get a restaurant or a list of restaurants.

We also define a default value of `0` for the upvote and downvote so that when a
new record is created we default these to a reasonable value.

Finally, we add two methods to allow us to increase the upvote and downvote
count.

It is these values that we will use to modify the counts.

```csharp
public int UpvoteCount { get; private set; } = 0;
public void IncreaseUpvoteCount()
{
    this.UpvoteCount++;
}


public int DownvoteCount { get; private set; } = 0;
public void IncreaseDownvoteCount()
{
    this.DownvoteCount++;
}
```

## Add a migration and run it

Since we have modified a column on the model we will run a migration to add
these columns to the database.

```shell
dotnet ef migrations add AddUpAndDownVoteCountsToRestaurants
```

And now we can run the migration:

```shell
dotnet ef database update
```

## Check the API Swagger documentation

If you check the `GET` and `POST` API documentation you will see that
`upvoteCount` and `downvoteCount` are both available to read, but neither appear
in the documentation for `POST.

This is exactly what we want. Users should not be able to **give** us a new
value for either, but use a specific API for _incrementing_ either.

## Adding an API for incrementing an upvote or a downvote

To think about how we are going to extend our API to include a way for a user to
upvote or downvote a restaurant we'll have to think a little bit abstractly.
We'll have to think about resources.

Another way to think about an upvote or a downvote is simply as a resource of a
`vote` which has two flavors, up and down. And making an upvote or downvote is
like `CREATING` a `RestaurantVote`.

As such we could think of the API for this as a `POST` on a `RestaurantVote`
resource, and thus we can have a `RestaurantVotesController` to manage these.
The only action in this controller will be a `POST` action and the method itself
won't deal with a `RestaurantVote` model or table since no such thing exists.

The fact that a model or table doesn't exist shouldn't restrict our thinking
about the system as resources, even if these resources are conceptual only.

Another benefit of having a `RestaurantsVotesController` is that at some point
we **may** want to record details about up and down votes. For instance, we may
want to keep a person for up or downvoting a restaurant multiple times. In this
case, we **will** have a database table we will use to tell if a user has
previously voted. It would also give us a history of votes we could do some data
analysis on.

We could also have added an endpoint such as `POST /api/Restaurants/{id}/upvote`
and `POST /api/Restaurants/{id}/downvote` but this feels like we are attaching
special features to a restaurant. When you step back and look at your domain as
a set of resources, even if some don't map directly to tables, you can start to
see the benefit of the `REST` style.

For now we will use this as a chance to experiment with having a controller that
represents an abstract resource.

## Create a `RestaurantVotesController`

We won't use the scaffold here since we are creating this controller manually.

The only HTTP method in our code will be:

```csharp
// Up or down votes a specific restaurant
//
// Allow us to specify the restaurant id
// and a string to indicate if this is an up or downvote
//
// Examples:   /api/RestaurantVotes/42/upvote
// Examples:   /api/RestaurantVotes/100/downvote
[HttpPost("{id}/{upOrDown}")]
public async Task<IActionResult> PostRestaurantVote(int id, string upOrDown)
```

With this setup we must specify the restaurant id as well as a string indicating
which direction we are upvoting.

The body of the method will:

- Search for the specified restaurant
- Return a 404 Not Found if the ID doesn't exist
- If the `upOrDown` is upvote, call the method that increases the upvote
- If the `upOrDown` is downvote, call the method that increases the downvote
- Mark the restaurant as modified
- Save it
- Return a 204 NoContent to indicate success

```csharp
[HttpPost("{id}/{upOrDown}")]
public async Task<IActionResult> PostRestaurantVote(int id, string upOrDown)
{
    // Find the restaurant in the database using `FindAsync` to look it up by id
    var restaurant = await _context.Restaurants.FindAsync(id);

    // If we didn't find anything, we receive a `null` in return
    if (restaurant == null)
    {
        // Return a `404` response to the client indicating we could not find a restaurant with this id
        return NotFound();
    }

    switch (upOrDown)
    {
        case "upvote":
            restaurant.IncrementUpvoteCount();
            break;

        case "downvote":
            restaurant.IncrementDownvoteCount();
            break;

        default:
            return BadRequest();
    }

    // Tell the database to consider everything in restaurant to be _updated_ values. When
    // the save happens the database will _replace_ the values in the database with the ones from restaurant
    _context.Entry(restaurant).State = EntityState.Modified;

    // Try to save these changes.
    await _context.SaveChangesAsync();

    // return NoContent to indicate the update was done.
    return NoContent();
}
```

With this structure we:

- Hide the ability for a user to **directly** update the up and downvote count
  numbers
- Expose the current up and downvote values in the Restaurant `GET` APIs
- Add a specific API for `RestaurantVote` resources (upvotes and downvotes)

## Files Updated

- [Models/Restaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/76265c4cbb5fe4cbeb1af868fbe417224c9a9757/Models/Restaurant.cs)
- [Migrations/20200706021021_AddUpAndDownVoteCountsToRestaurants.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/76265c4cbb5fe4cbeb1af868fbe417224c9a9757/Migrations/20200706021021_AddUpAndDownVoteCountsToRestaurants.cs)
- [Migrations/20200706021021_AddUpAndDownVoteCountsToRestaurants.Designer.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/76265c4cbb5fe4cbeb1af868fbe417224c9a9757/Migrations/20200706021021_AddUpAndDownVoteCountsToRestaurants.Designer.cs)
- [Migrations/DatabaseContextModelSnapshot.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/76265c4cbb5fe4cbeb1af868fbe417224c9a9757/Migrations/DatabaseContextModelSnapshot.cs)
- [Controllers/RestaurantVotesController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/76265c4cbb5fe4cbeb1af868fbe417224c9a9757/Controllers/RestaurantVotesController.cs)

---

# Using the up and downvote API from the user interface

First, let's update the user interface to display the current up and downvote
numbers

```javascript
;<span className="mr-2" role="img" aria-label="upvote">
  👍🏻
</span>
{
  restaurant.upvoteCount
}
```

and

```javascript
<span className="mr-2" role="img" aria-label="downvote">
  👎🏻
</span>{' '}
{restaurant.downvoteCount}
```

Then we will add click handlers for the buttons themselves

```javascript
<button className="btn btn-success btn-sm" onClick={handleUpvote}>
```

and

```javascript
<button className="btn btn-success btn-sm" onClick={handleDownvote}>
```

and define the `handle` methods:

```javascript
const handleUpvote = () => {
  const url = `/api/RestaurantVotes/${restaurant.id}/upvote`

  fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
  })
    .then(response => response.json())
    .then(() => {
      console.log('Need to reload the restaurants')
    })
}

const handleDownvote = () => {
  const url = `/api/RestaurantVotes/${restaurant.id}/downvote`

  fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
  })
    .then(response => response.json())
    .then(() => {
      console.log('Need to reload the restaurants')
    })
}
```

However, both of these handlers will want to reload the restaurants. We have two
choices. The first is to pass the component a method that will reload the
restaurants. The other is to move the up and downvote to the parent class so
that the state we need to reload is available. Let's take that path.

We'll remove the `handleDownvote` method and **move** and **rename** the
`handleUpvote` method to the parent component `Restaurants`. We will also have
it take two arguments, the first being the id of the restaurant, and the other
which style vote we are processing.

```javascript
const handleVote = (id, type) => {
  const url = `/api/RestaurantVotes/${id}/${type}`

  fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
  }).then(() => {
    console.log('Need to reload the restaurants')
  })
}
```

Next we will change the code to extract the method that reloads the restaurants
so we can call it from this method **and** the `useEfffect`

```javascript
useEffect(() => {
  reloadRestaurants()
}, [props.activeFilter])

const reloadRestaurants = () => {
  const url =
    props.activeFilter.length === 0
      ? `/api/Restaurants`
      : `/api/Restaurants?filter=${props.activeFilter}`

  fetch(url)
    .then(response => response.json())
    .then(apiData => {
      setRestaurants(apiData)
    })
}

const handleVote = (id, type) => {
  const url = `/api/RestaurantVotes/${id}/${type}``

  fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
  }).then(() => {
    reloadRestaurants()
  })
}
```

Now we can pass the `handleVote` method to the `SingleRestaurantFromList`
component when it is used.

```javascript
<SingleRestaurantFromList
  key={restaurant.id}
  restaurant={restaurant}
  handleVote={handleVote}
/>
```

And we can change the buttons to use it appropriately

```javascript
<button
  className="btn btn-success btn-sm"
  onClick={() => props.handleVote(restaurant.id, 'upvote')}
>

...

<button
  className="btn btn-danger btn-sm"
  onClick={() => props.handleVote(restaurant.id, 'upvote')}
>
```

If you try this code you may notice a problem. The button is inside the `<Link>`
and we are **navigating** when we mean only for the button click to happen.

Again we have to augment the `button` with code to stop a normal behavior.

We will change the `button` code slightly

```javascript
<button
  className="btn btn-success btn-sm"
  onClick={event => {
    event.preventDefault()
    props.handleVote(restaurant.id, 'upvote')
  }}
>

...

<button
  className="btn btn-danger btn-sm"
  onClick={event => {
    event.preventDefault()
    props.handleVote(restaurant.id, 'downvote')
  }}
>
```

This is great. We can now up and down vote restaurants. However, you may notice
that the _order_ of the restaurants is not consistent. This is because the API
does not specify a sorting order and we get the records back in whatever order
the database wants. Clearly, we do not want to leave this up to the database.
Let's add a sort order by the restaurant name.

Update the code in `GetRestaurants` to have this instead:

```csharp
if (filter == null)
{
    return await _context.Restaurants.OrderBy(restaurant => restaurant.Name).ToListAsync();
}
else
{
    return await _context.Restaurants.OrderBy(restaurant => restaurant.Name).Where(restaurant => restaurant.Name.Contains(filter)).ToListAsync();
}
```

And now when we click an up/downvote we do not get a reordering of the
restaurants and the visual effect is that we are just incrementing the counter
as we should.

## Files Updated

- [ClientApp/src/pages/Restaurants.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/066e831b0dfe119282dae8ea9a74c9001cadfdc4/ClientApp/src/pages/Restaurants.jsx)
- [Controllers/RestaurantsController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/master/Controllers/RestaurantsController.cs)

---

# View a specific Restaurant

Now we can move on to the route that allows us to view one single restaurant.

First, we have to fix an error in `Restaurants.jsx` -- the link for a restaurant
is generated by `/tacos/${restaurant/id}` where this should be
`/restaurants/${restaurant.id}`

Once this is done we can implement the code in `ShowRestaurant` to fetch the
details of the restaurant.

## Using React Router

Inside any component that is rendered due to a `<Route>` match, we can add
`const params = useParams()` to get a variable, `params`, that will tell us the
matching parameters in the `path=` part of the route.

In this case we want the `:id` from `<Route path="/restaurants/:id">` so we can
add this to the beginning of the method:

```javascript
const params = useParams()
const id = params.id
```

With this we can add a method that fetches the restaurant and stores it in
state.

First, we will define the state variable:

```javascript
const [restaurant, setRestaurant] = useState({
  name: '',
  description: '',
  address: '',
  telephone: '',
})
```

You'll notice here we define the initial value of the restaurant as an object
with all the properties of a restaurant but with empty values. This is a good
practice as we'll see how this helps us in a later part of this lesson.

Next, we can use this state variable to represent all the data in the JSX.

Once we have updated the JSX, we'll add a `useState` to fetch the data

```javascript
useState(() => {
  const fetchRestaurant = () => {
    fetch(`/api/Restaurants/${id}`)
      .then(response => response.json())
      .then(apiData => setRestaurant(apiData))
  }

  fetchRestaurant()
}, [id])
```

Notice that we use the `id` in the `useEffect` dependency array since if this
`id` changes we want to load a new restaurant. We also define the
`fetchRestaurant` function _inside_ the `useState` function. This pattern allows
us to convert this to an async function if we wish.

For instance:

```javascript
useState(() => {
  const fetchRestaurant = async () => {
    const response = await fetch(`/api/Restaurants/${id}`)
    const apiData = await response.json()

    setRestaurant(apiData)
  }

  fetchRestaurant()
}, [id])
```

If we tried to apply `async` to the `() => {` anonymous function our Javascript
tools would warn us that this is not advised and direct us to this style.

Now we should be able to navigate around and see the various restaurants in the
system.

## Files Updated

- [ClientApp/src/pages/Restaurants.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/436c4ed6499d951b200acf096348ac22e12a8f9f/ClientApp/src/pages/Restaurants.jsx)
- [ClientApp/src/pages/ShowRestaurant.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/436c4ed6499d951b200acf096348ac22e12a8f9f/ClientApp/src/pages/ShowRestaurant.jsx)

---

# Adding reviews

We can now add the support for restaurant reviews.

## Database model

The first thing we will do is add a `POCO` model representing the `Review`.
Notice we include the `RestaurantId` since one `Review` _belongs to_ one
`Restaurant`. We also set a default date for the CreatedAt and make it's `set`
method _private_ so that it cannot be set via the API.

```csharp
using System;
j
namespace TacoTuesday.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Summary { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; private set; } = DateTime.Now;
        public int RestaurantId { get; set; }
    }
}
```

After adding this model we also add the review to the `DatabaseContext`

```csharp
// Tell the context about the Review collection/table
public DbSet<Review> Reviews { get; set; }
```

Now we can create the migration.

```shell
dotnet ef migrations add AddReviews
```

and we can update the database

```shell
dotnet ef database update
```

## Relationship

We also need to indicate that the `Restaurant` _has many_ `Reviews`. We do this
by adding a `List` based property to the `Restaurant`

```csharp
public List<Review> Reviews { get; set}
```

This will allow us to _navigate_ in code from a single restaurant to the list of
associated reviews.

## Files Updated

- [Models/Restaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/6ce8a68e7f3fc9b0631cd98725dce7aff4723119/Models/Restaurant.cs)
- [Models/Review.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/6ce8a68e7f3fc9b0631cd98725dce7aff4723119/Models/Review.cs)
- [Models/DatabaseContext.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/6ce8a68e7f3fc9b0631cd98725dce7aff4723119/Models/DatabaseContext.cs)
- [Migrations/20200706111326_AddReviews.Designer.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/6ce8a68e7f3fc9b0631cd98725dce7aff4723119/Migrations/20200706111326_AddReviews.Designer.cs)
- [Migrations/20200706111326_AddReviews.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/6ce8a68e7f3fc9b0631cd98725dce7aff4723119/Migrations/20200706111326_AddReviews.cs)
- [Migrations/DatabaseContextModelSnapshot.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/6ce8a68e7f3fc9b0631cd98725dce7aff4723119/Migrations/DatabaseContextModelSnapshot.cs)

## Restaurant API should return their associated reviews

On the main listing we want the **count** of reviews and on an individual
restaurant page we want the list of all reviews.

To achieve these, we will use the `Include` method of EF Core to incorporate
this data into our API response.

Change the logic in `GetRestaurants` to:

```csharp
if (filter == null)
{
    return await _context.Restaurants.OrderBy(restaurant => restaurant.Name).Include(restaurant => restaurant.Reviews).ToListAsync();
}
else
{
    return await _context.Restaurants.OrderBy(restaurant => restaurant.Name).Where(restaurant => restaurant.Name.Contains(filter)).Include(restaurant => restaurant.Reviews).ToListAsync();
}
```

so that now each restaurant will also include an **array** of reviews.

## Update the `seeds.sql` to generate reviews

Add the following sql to our seeds and rerun them to populate the database with
a few reviews.

```sql
TRUNCATE TABLE "Restaurants", "Reviews" RESTART IDENTITY;

INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Thoughtbeat', 'Inverse zero administration benchmark', '07 Meadow Vale Drive', '314-651-9791');
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Dabtype', 'Organized stable firmware', '7 Miller Park', '523-760-6681');
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Topdrive', 'Object-based interactive application', '65 Eliot Lane', '650-993-7074');
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Avaveo', 'Persistent zero defect process improvement', '2 Clarendon Junction', '715-663-5265');

INSERT INTO "Reviews" ("RestaurantId", "CreatedAt", "Summary", "Body") VALUES (1, '2020-01-01 14:23:55', 'Yummy Food', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima modi impedit quisquam sit, saepe enim placeat a vero voluptas asperiores atque laudantium in, nobis sunt blanditiis dignissimos. Deleniti, esse optio!');
INSERT INTO "Reviews" ("RestaurantId", "CreatedAt", "Summary", "Body") VALUES (1, '2020-01-01 18:23:55', 'Mmmmm, good', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima modi impedit quisquam sit, saepe enim placeat a vero voluptas asperiores atque laudantium in, nobis sunt blanditiis dignissimos. Deleniti, esse optio!');
```

```shell
psql TacoTuesdayDatabase --file=Models/seeds.sql
```

## Updating the interface to return the list of reviews

We can now use that to count these in the user interface in `Restaurants.jsx`

```javascript
<small>{restaurant.reviews.length} Reviews</small>
```

Now add similar `Include` code in the controller with `GetRestaurant`

```csharp
// Find the restaurant in the database using Include to ensure we have the associated reviews
var restaurant = await _context.Restaurants.Include(restaurant => restaurant.Reviews).Where(restaurant => restaurant.Id == id).FirstOrDefaultAsync();
```

Then in the `ShowRestaurant.jsx` we will add `reviews: []` to our default state
so that our initial state will have an empty array of reviews. We are going to
use the `reviews` property of the restaurant object to render each individual
review. This is why having an "empty" representation of the restaurant in the
state is useful.

Updating the JSX for showing the list of reviews we use `map` to loop over the
`restaurant.reviews` (again, why that default state of `reviews: []` is so
important). We also only generate this part of the JSX if there are more than
zero reviews.

```javascript
<div className="row mb-5">
  {restaurant.reviews.length > 0 && (
    <div className="col-12">
      <h3>Reviews</h3>
      <ul className="timeline">
        {restaurant.reviews.map(review => (
          <li key={review.id}>
            <p className="mb-2">
              {review.summary}
              <span className="float-right">{review.createdAt}</span>
            </p>
            <p>{review.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>
```

We should see one restaurant that has two reviews (based on our seed data)

## Files Updated

- [ClientApp/src/pages/Restaurants.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/e7547b5d1b87e13a80cd2b9b5ba30543594fee31/ClientApp/src/pages/Restaurants.jsx)
- [ClientApp/src/pages/ShowRestaurant.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/e7547b5d1b87e13a80cd2b9b5ba30543594fee31/ClientApp/src/pages/ShowRestaurant.jsx)
- [Controllers/RestaurantsController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/e7547b5d1b87e13a80cd2b9b5ba30543594fee31/Controllers/RestaurantsController.cs)
- [Models/seeds.sql](https://raw.githubusercontent.com/gstark/TacoTuesday/master/Models/seeds.sql)

---

# Create a review

Similar to how we created the new restaurant we will use a state variable to
track the values in the form and then POST them to the API.

## Create a controller

First we must create a controller for the reviews. We will use the code
generator again to make this controller.

```shell
dotnet aspnet-codegenerator controller --model Review -name ReviewsController --useAsyncActions -api --dataContext DatabaseContext --relativeFolderPath Controllers
```

This will create _Controllers/ReviewsController.cs_ with code to create, read,
update, and delete reviews.

Looking at this controller and our user interface we see that we do not need to
get a listing of all reviews, nor do we need to access a single review, nor do
we need to update or delte reviews. Thus we should only keep the one endpoint,
the `POST /api/Reviews` to create a new review. Remove all the methods other
than `PostReview`

## Update the user interface

We will add a state to track the fields of the review.

```javascript
const [newReview, setNewReview] = useState({
  body: '',
  summary: '',
  restaurantId: id,
})
```

Notice that we include, by default, the related restaurant id. This will be
required by the API to know which restaurant this review is associated to.

We will also have to change `const id = params.id` to
`const id = parseInt(params.id)` to ensure that the `id` value is an integer,
since the backend API will demand this.

Then we will create a method to track the changes of the various fields:

```javascript
const handleNewReviewFieldChange = event => {
  const id = event.target.id
  const value = event.target.value

  setNewReview({ ...newReview, [id]: value })
}
```

Lastly ensure that all the `input` and `textArea` fields are updated with the
values from `newReview`, the `onChange` event, and a correct `id` attribute.

```javascript
<input
  type="text"
  className="form-control"
  id="summary"
  aria-describedby="summaryHelp"
  value={newReview.summary}
  onChange={handleNewReviewFieldChange}
/>
```

and

```javascript
<textarea
  className="form-control"
  id="body"
  value={newReview.body}
  onChange={handleNewReviewFieldChange}
/>
```

Finally create a method to handle the form submit

```javascript
const handleNewReviewSubmit = event => {
  event.preventDefault()

  fetch(`/api/Reviews`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newReview),
  })
    .then(response => response.json)
    .then(apiResponse => {
      fetchRestaurant()
    })
}
```

and

```javascript
<form onSubmit={handleNewReviewFieldChange}>
```

Then we will move `fetchRestaurant` from outside of the `useEffect` method so
both the `useEffect` and `handleNewReviewSubmit` can access it.

However, you'll notice that our form is not clearing after we create the new
restaurant. We need to clear out the new restaurant fields. We'll add one more
`setNewRestaurant` after the `fetchNewRestaurant` in `handleNewReviewSubmit`

```javascript
const handleNewReviewSubmit = event => {
  event.preventDefault()

  fetch(`/api/Reviews`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newReview),
  })
    .then(response => response.json)
    .then(apiResponse => {
      fetchRestaurant()
      setNewReview({ ...newReview, body: '', summary: '' })
    })
}
```

## Files Updated

- [ClientApp/src/pages/ShowRestaurant.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/30a8065a328cbc8c23bfd0e3c36ec1b1a46c4c91/ClientApp/src/pages/ShowRestaurant.jsx)
- [Controllers/ReviewsController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/30a8065a328cbc8c23bfd0e3c36ec1b1a46c4c91/Controllers/ReviewsController.cs)

---

# Formatting dates

You may have noticed that the dates displayed for a review are not very user
friendly. We are getting values such as `2020-07-06T22:34:42.721481`. Let's look
at a way we can format these dates.

There are two popular libraries for formatting dates:
[date-fns](https://date-fns.org/) and [moment](https://momentjs.com/). In this
application we'll use `date-fns` to format dates.

In order to add the javascript library we need to:

- Stop `dotnet watch run`
- `cd ClientApp`
- `npm install date-fns --save`
- `cd ..`
- `dotnet watch run`

The [format](https://date-fns.org/v2.14.0/docs/format) function from `date-fns`
has many configuration options.

First we will import the format function:

```javascript
import format from 'date-fns/format'
```

We would like a format such as: "Monday, July 6th, 2020 at 10:50 PM". To
generate this we need to review the documentation for all the tokens to apply in
the format.

- `EEEE` day of the week
- `MMMM` month
- `do` day of the week
- `yyyy` calendar year
- `h` hour
- `mm` minute
- `aaa` AM or PM

So our format string is:

```javascript
const dateFormat = `EEEE, MMMM do, yyyy 'at' h:mm aaa`
```

Then to use this, we need to convert `review.createdAt` to a `Date` object and
pass that and the format string to the `format` function from `date-fns`

```javascript
<span className="float-right">
  {format(new Date(review.createdAt), dateFormat)}
</span>
```

Another nice option might to use a relative time (e.g. `20 days ago`) if the
review is recent (perhaps in the last month) and the long descriptive time if it
is older than that.

Look into `date-fns` method
[differenceInDays](https://date-fns.org/v2.14.0/docs/differenceInDays) as an
example of how to perform this type of logic.

## Files Updated

- [ClientApp/src/pages/ShowRestaurant.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/ad9ee5ac3e46601776fa6874c3c5877bce77f244/ClientApp/src/pages/ShowRestaurant.jsx)
- [ClientApp/package-lock.json](https://raw.githubusercontent.com/gstark/TacoTuesday/ad9ee5ac3e46601776fa6874c3c5877bce77f244/ClientApp/package-lock.json)
- [ClientApp/package.json](https://raw.githubusercontent.com/gstark/TacoTuesday/ad9ee5ac3e46601776fa6874c3c5877bce77f244/ClientApp/package.json)

---

# Customize the navigation bar

Notice that the "Add" and "Search" part of the navigation bar appears on every
page. These elements should really only be visible on the home page since that
is where we present the list of restaurants.

The `NavBar` is a child component of the `<App>` so we could use `<Route>` there
to render custom versions of `NavBar` depending on the route. However, there is
a better way. We can use `<Route/>` anywhere in the application to selectively
control what elements are on the page. We can do this as long as a `<Router>`
appears in a parent component. Since our `index.js` has a `<Router>` around the
entire application we can, essentially, use a `<Route>` anywhere.

In our `NavBar` component it is the `<form>` element we want to selectively
reveal based on the route. We can surround this element with a
`<Route exact path="/"></Route>` and this `<form>` element will only show on the
home page.

```javascript
<Route exact path="/">
  <form className="form-inline my-2 my-lg-0">
    <Link className="btn btn-success mr-2" to="/restaurants/add">
      + Add
    </Link>
    <input
      className="form-control mr-sm-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
      value={filterText}
      onChange={event => setFilterText(event.target.value)}
    />
    <span
      className="btn btn-outline-success my-2 my-sm-0"
      onClick={handleClickSearch}
    >
      Search
    </span>
  </form>
</Route>
```

This is one of the benefits we get from using react-router. Anywhere in our
application where content on the page is dependent on the URL we can use
`<Route>` and `<Switch>` to our advantage.

## Files Updated

- [ClientApp/src/components/NavBar.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/09d495cd303dfb8b83021a4a3a2df808900107d5/ClientApp/src/components/NavBar.jsx)
