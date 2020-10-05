---
title: The Rest
order: 99
---

# Implement "Add"

Let's turn our attention to the `AddRestaurant` component and how we will use
the endpoint `POST /api/Restaurants` to create a new restaurant.

## Track state for each input field

For each input field, we will need to track the data in the input form. Since
there are fields for `Name`, `Description`, `Address`, and `Telephone` we will
need a `state` for all of these.

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
existing `newRestaurant` object but with a new value for the `address`

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
all the `onChange` events for string based state:

```javascript
const handleStringFieldChange = event => {
  const value = event.target.value
  const fieldName = event.target.id

  const updatedRestaurant = { ...newRestaurant, [fieldName]: value }

  setNewRestaurant(updatedRestaurant)
}
```

> NOTE: If we have integer state we would need an equivalent
> `handleIntegerFieldChange` method.

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
> migration run will fail. You will have to add data to those rows or remove
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
  <div className="alert alert-danger" role="alert">{errorMessage}</div>
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
a restaurant's details we do not want the API to allow direct changing of these
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

# Representations of Resources

Before we move on to discuss how we are going to extend our API for upvotes and
downvotes, let's take a detour to discuss the idea of _resources_ and **REST**.

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

`A specific restaurant`

When we ask for a resource we specify a few things:

- The resource itself
- The format we wish the data in
- The action we wish to perform on the resource

In our API the `format we wish the data in` will always be JSON. We'll come back
to this in a moment.

Let's take the case of a single restaurant. There are _three_ endpoints in our
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
instance, `GET /api/Restaurants` retrieves that resource, the list itself.
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

For now, we will use this as a chance to experiment with having a controller
that represents an abstract resource.

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

```text
<span className="mr-2" role="img" aria-label="upvote">
  👍🏻
</span>
{restaurant.upvoteCount}
```

and

```text
<span className="mr-2" role="img" aria-label="downvote">
  👎🏻
</span>{restaurant.downvoteCount}
```

Then we will add click handlers for the buttons themselves

```jsx
<button className="btn btn-success btn-sm" onClick={handleUpvote}>
```

and

```jsx
<button className="btn btn-success btn-sm" onClick={handleDownvote}>
```

and define the `handle` methods:

```javascript
const handleUpvote = () => {
  const url = `/api/RestaurantVotes/${restaurant.id}/upvote`

  fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
  }).then(() => {
    console.log('Need to reload the restaurants')
  })
}

const handleDownvote = () => {
  const url = `/api/RestaurantVotes/${restaurant.id}/downvote`

  fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
  }).then(() => {
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

Next, we will change the code to extract the method that reloads the restaurants
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

```jsx
<SingleRestaurantFromList
  key={restaurant.id}
  restaurant={restaurant}
  handleVote={handleVote}
/>
```

And we can change the buttons to use it appropriately

```jsx
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

```jsx
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
the database wants. We do not want to leave this up to the database. Let's add a
sort order by the restaurant name.

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

In this case, we want the `:id` from `<Route path="/restaurants/:id">` so we can
add this to the beginning of the method:

```javascript
const params = useParams()
const id = params.id
```

With this, we can add a method that fetches the restaurant and stores it in the
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

namespace TacoTuesday.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Summary { get; set; }
        public string Body { get; set; }
        public int Stars { get; set; }
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

On the main listing, we want the **count** of reviews and on an individual
restaurant page, we want the list of all reviews.

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
psql --file=Models/seeds.sql TacoTuesdayDatabase
```

## Updating the interface to return the list of reviews

We can now use that to count these in the user interface in `Restaurants.jsx`

```jsx
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

```jsx
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

First, we must create a controller for the reviews. We will use the code
generator again to make this controller.

```shell
dotnet aspnet-codegenerator controller --model Review -name ReviewsController --useAsyncActions -api --dataContext DatabaseContext --relativeFolderPath Controllers
```

This will create _Controllers/ReviewsController.cs_ with code to create, read,
update, and delete reviews.

Looking at this controller and our user interface we see that we do not need to
get a listing of all reviews, nor do we need to access a single review, nor do
we need to update or delete reviews. Thus we should only keep the one endpoint,
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
`const id = parseInt(params.id)` to ensure that the `id` value is an integer
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

```jsx
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

```jsx
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

```jsx
<form onSubmit={handleNewReviewFieldChange}>
```

Then we will move `fetchRestaurant` from outside of the `useEffect` method so
both the `useEffect` and `handleNewReviewSubmit` can access it.

However, you'll notice that our form is not clearing after we create a new
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
application, we'll use `date-fns` to format dates.

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

```jsx
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

In our `NavBar` component, it is the `<form>` element we want to selectively
reveal based on the route. We can surround this element with a
`<Route exact path="/"></Route>` and this `<form>` element will only show on the
home page.

```jsx
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

---

# User accounts

In order to keep track of upvotes, downvotes, and who created what restaurants
and reviews we will need to add the idea of users and login/logout features.

We will create a user model and the associated controller to manage them. Then
we will make user interface components for creating accounts and for logging in.

## User Model

To begin we will create a user model that stores information about the user.
Each user will have the following attributes:

- Id
- Full Name
- Email Address
- Password

However, it is an unwise choice to store **unencrypted** passwords in our
database. Thus we will not store the raw password, but a **hashed** password.

### Hashing Passwords

The idea of a hashed password relies on the idea of a "one-way function", that
is a function that is fast and easy to compute in one direction, but difficult
to compute in the other.

Let's take a look at the idea of a "two-way function". A simple example would be
`double`, a function that takes a number and multiplies it by two. If I give you
the input of this function, say `42`, you can quickly and reliably compute the
output, `84`. However, if I give you output, say `246`, it is trivial for you to
figure out what a corresponding input would be, `123`. This would be true no
matter how large the numbers get. Given `24686850904684` you can quickly figure
out what the corresponding input is.

A classic example of a one-way function is the prime factorization function.
Given two prime numbers, say `17` and `5`, it is easy to multiply them together
and get `85`. Given a number like `85`, it isn't too hard to figure out which
two prime numbers multiply together to get that number. However, this isn't true
as the number gets larger. However, if I give you the number
`682654107378822049` it isn't so trivial to compute the two numbers that are its
prime factors (the answer is `982451653` and `694847533` by the way)

For something like a password, we will use the idea of a `hashing function`. A
`hashing function` attempts to take an input value and compute a fixed size and
_mostly_ unique value. Small changes in the input should make a large and
unpredictable change in the output.

A popular hashing function is `SHA256`. If we take the text `dotnet` and process
it with this algorithm we get back out the result:
`3831fff4af76125e90081ac7eb855a1bcce0733045f9d26cd620466e0d4acf97`. However if
we take the text `ditnet`, just one letter different we get
`fb89fe75f8be03f17435f563121e940360cd9fcfcbd3f8978b59c160fdaca711`

Given a result of a `SHA256` hash it is _very_ difficult to work out what text
generated it.

We will be using the built-in `dotnet` hashing algorithm that is based on
[`PBKDF2`](https://en.wikipedia.org/wiki/PBKDF2), a very strong password hashing
algorithm.

## Defining our model

For our model, we will want to treat the `Id`, `FullName`, and `Email` as we
have other fields. However, for the password, we will be creating and storing a
`HashedPassword` in the database. This field should **never** be exposed in any
API so we will mark it as `JsonIgnore` so that it is never serialized.

We also wish to be able to _assign_ a plain text password to a user. The
assigning of this plain text password should have the effect of hashing that
value and storing it in the `HashedPassword` property. We will also need a way
to validate a user password.

```csharp
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace TacoTuesday.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string Email { get; set; }

        [JsonIgnore]
        public string HashedPassword { get; set; }

        // Define a property for being able to _set_ a password
        public string Password
        {
            // Define only the `set` aspect of the property
            set
            {
                // When set, use the PasswordHasher to encrypt the password
                // and store the result in our HashedPassword
                this.HashedPassword = new PasswordHasher<User>().HashPassword(this, value);
            }
        }

        // Add a method that can validate this user's password
        public bool IsValidPassword(string password)
        {
            // Look to see if this password, and the user's hashed password can match
            var passwordVerification = new PasswordHasher<User>().VerifyHashedPassword(this, this.HashedPassword, password);

            // Return True if the verification was a success
            return passwordVerification == PasswordVerificationResult.Success;
        }
    }
}
```

We will also mark the `FullName` and the `Email` as required since we'll use the
email as the login and we want to be able to address the user by name.

This class uses a custom `setter` for the `Password` which will allow us to set
it from the API. That setter simply hashes the password and assigns the user's
`HashedPassword` property (which will be stored in the database)

We also have a method `IsValidPassword` that can identify if we have a valid
password.

## Generating a migration

Add the `Users` to the `DatabaseContext` class:

```csharp
// Tell the context about the User collection/table
public DbSet<User> Users { get; set; }
```

Add the migration:

```shell
dotnet ef migrations add AddUser
```

After validating the migration looks good, run it:

```shell
dotnet ef database update
```

## Files Updated

- [Models/User.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/024098fac176fa19494177ed7002e35eaf9fb590/Models/User.cs)
- [Models/DatabaseContext.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/024098fac176fa19494177ed7002e35eaf9fb590/Models/DatabaseContext.cs)
- [Migrations/20200708004113_AddUser.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/024098fac176fa19494177ed7002e35eaf9fb590/Migrations/20200708004113_AddUser.cs)
- [Migrations/20200708004113_AddUser.Designer.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/024098fac176fa19494177ed7002e35eaf9fb590/Migrations/20200708004113_AddUser.Designer.cs)
- [Migrations/DatabaseContextModelSnapshot.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/024098fac176fa19494177ed7002e35eaf9fb590/Migrations/DatabaseContextModelSnapshot.cs)

# Add a controller to create new Users

Let's use the code generator to make a new controller for managing users.
However, we will only be keeping the `POST` action to create a new user. Later
on, we may add user management features where we need to add back in other
commands like `DELETE` and `PUT`. We also certainly do not want to expose any
`GET` actions where someone could list all of our users!

```shell
dotnet aspnet-codegenerator controller --model User -name UsersController --useAsyncActions -api --dataContext DatabaseContext --relativeFolderPath Controllers
```

This is the only `Http` method we will leave in the file:

```csharp
[HttpPost]
public async Task<ActionResult<User>> PostUser(User user)
{
    // Indicate to the database context we want to add this new record
    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    // Return a response that indicates the object was created (status code `201`) and some additional
    // headers with details of the newly created object.
    return CreatedAtAction("GetUser", new { id = user.Id }, user);
}
```

# Add a user interface for creating a user

Similar to our interface for adding a restaurant we'll make a signup page.

Create the `Signup.jsx` file in the `pages` directory:

```jsx
import React, { useState } from 'react'
import { useHistory } from 'react-router'

export function SignUp() {
  const history = useHistory()

  const [errorMessage, setErrorMessage] = useState()

  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const handleStringFieldChange = event => {
    const value = event.target.value
    const fieldName = event.target.id

    const updatedUser = { ...newUser, [fieldName]: value }

    setNewUser(updatedUser)
  }

  const handleFormSubmit = event => {
    event.preventDefault()

    fetch('/api/Users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(apiResponse => {
        if (apiResponse.status === 400) {
          setErrorMessage(Object.values(apiResponse.errors).join(' '))
        } else {
          history.push('/')
        }
      })
  }

  return (
    <div className="card">
      <div className="card-header">Create an Account</div>
      <div className="card-body">
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              value={newUser.fullName}
              onChange={handleStringFieldChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={newUser.email}
              onChange={handleStringFieldChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={newUser.password}
              onChange={handleStringFieldChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
```

We will also add a route in `App.jsx`

```jsx
<Route path="/signup">
  <SignUp />
</Route>
```

And we will also add a button to our `<NavBar>`

```jsx
<Link className="btn btn-success mr-2" to="/signup">
  Signup
</Link>
```

And with this we have the ability for users to sign up to our app!

## Avoid duplicate email addresses

<!-- To make the email unique we can add a _unique index_ on the field. Indexes are a
database optimization technique that allows the database to have fast access to
looking up information based on a specific column. We automatically get an index
on our `Id` column to make those lookups fast. Most of the databases we've
worked with so far haven't been so large that indexes have been needed to make
them fast. However, we are going to use them here.

When creating an index we specify the columns involved. This makes lookups for
values in those columns fast. Of course creating an index takes up more space in
our database and it also makes **inserting** data slower since it needs to
insert data into our table and additionally update the index information as
well.

One of the aspects we can make of an index is to specify that for the column, or
columns, involved that the values be **unique**.

To create our unique index we will add some code to our `DatabaseContext` model.

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
   modelBuilder.Entity<User>() .HasIndex(user => user.Email) .IsUnique();
}
```

Then we will generate a migration:

```shell
dotnet ef migrations add AddUserEmailIndex
```

Then run the migration:

```shell
dotnet ef database update
``` -->

To make the email unique we can add logic to our `POST` method in our
`UsersController`. We can check for a user with the same email address and
return an error if there is already a match.

```csharp
var alreadyHaveUserWithTheEmail = _context.Users.Any(existingUser => existingUser.Email.ToLower() == user.Email.ToLower());
if (alreadyHaveUserWithTheEmail)
{
    // Make a custom error response
    var response = new
    {
        status = 400,
        errors = new List<string>() { "This account already exists!" }
    };

    // Return our error with the custom response
    return BadRequest(response);
}
```

Since we are generating the same style error that validation errors do we will
get a nice error in the UI when someone attempts to use an email address that
exists.

## Files Updated

- [ClientApp/src/App.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/1cd82cd8af0ab6b4005779e0c42e893e363799ff/ClientApp/src/App.jsx)
- [ClientApp/src/components/NavBar.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/1cd82cd8af0ab6b4005779e0c42e893e363799ff/ClientApp/src/components/NavBar.jsx)
- [ClientApp/src/pages/SignUp.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/1cd82cd8af0ab6b4005779e0c42e893e363799ff/ClientApp/src/pages/SignUp.jsx)
- [Controllers/UsersController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1cd82cd8af0ab6b4005779e0c42e893e363799ff/Controllers/UsersController.cs)

---

# Add the ability to Login

For our users to login, we need to present the user with a form where they can
provide their username and password. This data then needs to be processed by the
backend to validate the information is correct and then inform the client of the
success or failure.

We also need some way for the client to tell the server with every API request
it subsequently makes that the user was logged in and who they are. It would not
be a good idea to _store_ the user's password and include that with every
request. We want to handle the user's unencrypted password as little as
possible. To do this the client and the server communicate with a system known
as JavaScript Web Tokens or JWTs. (some pronounce this as Jay-Double-U-Tees and
others as `joots` to rhyme with `scoots`)

The idea of a JWT is an encoded and cryptographically **signed** bit of data
that the server can hand back to the client which means "If you hand me back
this data exactly, I'll recognize you as the user it specifies"). To do this the
server needs a way to format, "sign", and then encode the response.

JWTs can store any information we wish, though we should keep them small since
it does add overhead to each API request they are included with. Typically we
store some details from the user to include, but not be limited to, their user
id. We may also store their names and email.

## What does a JWT look like?

This is an example of a JWT:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEiLCJGdWxsTmFtZSI6IkdhdmluIFN0YXJrIiwiRW1haWwiOiJnYXZpbkBnc3RhcmsuY29tIiwibmJmIjoxNTk0MjMyOTE5LCJleHAiOjE1OTQyNjg5MTksImlhdCI6MTU5NDIzMjkxOX0.k-xpH_Fu45BBUQWWTWHVxATAZk-X_Ae-_hXZFjF8LQE
```

Pretty indecipherable, right? Fortunately, there are easily decoded by our
computers. The website `jwt.io` has a decoder right on their home page. Try
copying the above text and pasting it into their _Debugger_

What you will see is this:

![jwt](./assets/jwt.png)

On the left side is our original JWT. However, you will notice that it has
become color-coded. Each of the colors of the text represents what part of the
JWT it represents.

There are three parts to a JWT:

- Header
- Payload
- Verification

The `Header` section tells the JWT system what kind of token this is, and what
_algorithm_ was used to encode the token. This comes first so the JWT system can
properly decode the rest of the token.

Next comes the `payload`. This is the part we, as developers, can specify data
within. Each of these elements, though decoded as JSON are called `claims`. The
first _three_ claims here, `Id`, `FullName`, and `Email` were generated by code
(which we about to write) and represent the details of a logged-in user. The
next three represent details about the token itself. Each of these is encoded as
numbers. `nbf` is a claim that stands for `Not Before`, meaning that the token
is not valid for any time _earlier_ than the given timestamp. The claim `exp`
which stats for `Expiration` and represents the time when this token is no
longer valid. Finally, `iat` is a claim that indicates when the token was
issued.

The final section is the _signature_ of the token. It uses cryptographic
functions to add data to the token using a server's _secret key_. This data
represents a _hash_ of the other parts of the token. If anyone were to change
even a single character of the other parts of the message, say changing the `Id`
from `1` to `2` they would **not** be able to resign that message with valid
data. They lack the server's secret key. In this way, the data can easily be
decoded by anyone, but cannot be changed/updated by anyone other than the server
itself. Thus it is important not to put **secret** information in the payload
since JWT tokens are not **encrypted**.

When a user logs in we will have our server generate a new JWT token and return
this to the client. The client can simply store this token and provide it back
to the server with any API request that needs to be done by an _authenticated_
user. We do this by specifying a special `header` value that includes this
token.

## Adding a controller to manage "sessions"

Thinking again about _resources_ we will consider the user logging in to be the
_CREATION_ of a _Session_. While we won't record the creation of a session in
our database, though we could, we still think of this as it's own resource with
a `POST` create action.

As such we will create a `Sessions` controller to store this `POST` action.

```csharp
namespace TacoTuesday.Controllers
{
    // All of these routes will be at the base URL:     /api/Sessions
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case RestaurantsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        readonly protected string JWT_KEY;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public SessionsController(DatabaseContext context, IConfiguration config)
        {
            _context = context;
            JWT_KEY = config["JWT_KEY"];
        }
    }
}
```

You will notice a few things different than our traditional controller.

In addition to storing the `_context` with our `DatabaseContext`, we are also
storing a variable with a `JWT_KEY`. This is the secret key we will use to sign
the JWT tokens.

This token is passed to us when the controller is constructed, just as the
context is. It is available to us from a `config` variable that is supplied by
the framework.

From this `config` variable, we can ask for the `["JWK_KEY"]` and store that in
our variable.

This is another example of
[`Dependency Injection`](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-3.1).
The use of
[`Dependency Injection`](https://en.wikipedia.org/wiki/Dependency_injection)
allows the framework to provide information to our code, like our controller,
without us having to know details of how that information is managed or
accessed. In this case, a configuration object is supplied. In development, this
will be managed in local configuration files. In production, it will be managed
by our hosting provider. In either case, we are not concerned with those
details. We only need to accept this `config` variable and extract the data we
need.

## Creating our JWT_KEY for development

To set up our development mode for storing this secret `JWT_KEY` we need to
initialize support for `user secrets` by running this command:

```shell
dotnet user-secrets init
```

This creates a file outside our project to store secret information. This way
the data is not stored in our repository for others to see.

Next, we will tell the secrets to store `JWT_KEY`

```shell
dotnet user-secrets set "JWT_KEY" "Long set of Random Letters and Numbers like iExEUNxxv9zylIuT2VMrsMsQEKjjKs1XrYFntsafKgQs90HndTX0yw8xLhFHk9O"
```

The `JWT_KEY` should be a relatively long set of random characters. This is
called _high entropy_ implying that it will be very hard for someone to guess
this secret. A good website to generate these kinds of secrets is:
[Gibson Research Corporation's Password Page](https://www.grc.com/passwords.htm)

> NOTE: If you are going to deploy this with Heroku, you'll need to run
> `heroku config:set JWT_KEY="xxxx"` with your specific key in place of `xxxx`
> at least once before you deploy.

## Returning to the controller

Now that we have generated this JWT secret we can implement the `POST` method
for creating our user login session.

```csharp
[HttpPost]
public async Task<ActionResult> Login(LoginUser loginUser)
{
    var foundUser = await _context.Users.FirstOrDefaultAsync(user => user.Email == loginUser.Email);

    if (foundUser != null && foundUser.IsValidPassword(loginUser.Password))
    {
        // create a custom response
        var response = new
        {
            // This is the login token
            token = new TokenGenerator(JWT_KEY).TokenFor(foundUser),

            // The is the user details
            user = foundUser
        };

        return Ok(response);
    }
    else
    {
        // Make a custom error response
        var response = new
        {
            status = 400,
            errors = new List<string>() { $"User does not exist" }
        };

        // Return our error with the custom response
        return BadRequest(response);
    }
}
```

You'll notice the `POST` method doesn't take a `User` object, but a `loginUser`
of type `LoginUser`. We need to do this since we **do** need to read the
`Password` while the user is logging in. Thus we'll define this class inside the
`SessionsController` to store the `Email` and `Password` strings.

```csharp
public class LoginUser
{
    public string Email { get; set; }
    public string Password { get; set; }
}
```

The `POST` method attempts to find an existing user that has the same email
address as the received user.

Next, it uses the `IsValidPassword` method we wrote in the `User` class to
detect if the password matches.

If we found a user `foundUser != null` **AND** the password watches we will
generate a response that looks like this:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEiLCJGdWxsTmFtZSI6IkdhdmluIFN0YXJrIiwiRW1haWwiOiJnYXZpbkBnc3RhcmsuY29tIiwibmJmIjoxNTk0MjMyOTE5LCJleHAiOjE1OTQyNjg5MTksImlhdCI6MTU5NDIzMjkxOX0.k-xpH_Fu45BBUQWWTWHVxATAZk-X_Ae-_hXZFjF8LQE",
  "user": { "Id": "1", "FullName": "Gavin Stark", "Email": "gavin@suncoast.io" }
}
```

The `token` part of this object is created using
`new TokenGenerator(JWT_KEY).TokenFor(foundUser)`. This `TokenGenerator` class
is provided by SDG to generate JWT tokens for your users. If you are interested
in how the code works, it is documented within.

To use the `TokenGenerator` code we need to add a dependency to our project:

```shell
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

We also include the `user` object in the response. This is so the client has a
simple way to access this data.

This custom object is then returned as the payload of the successful API
response.

If either the `foundUser` is `null` or the password does not match, we return an
error message object which the form can process and display to the user.

## Give it a try!

To test if this works we can use both the `POST /api/Users` and
`POST /api/Sessions` endpoints from Insomnia. First, we can create a user, then
we can try the same `email` and `password` to the `Sessions` endpoint and see if
we get back a valid response. Try an invalid password or an email address that
doesn't correspond to an account to see the error messages.

Next up we'll connect the user interface to these controllers.

## Files Updated

- [TacoTuesday.csproj](https://raw.githubusercontent.com/gstark/TacoTuesday/0e631e89ef4595a655379fdbc0fab8f91cd3d786/TacoTuesday.csproj)
- [Models/User.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/0e631e89ef4595a655379fdbc0fab8f91cd3d786/Models/User.cs)
- [Models/TokenGenerator.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/0e631e89ef4595a655379fdbc0fab8f91cd3d786/Models/TokenGenerator.cs)
- [Controllers/SessionsController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/0e631e89ef4595a655379fdbc0fab8f91cd3d786/Controllers/SessionsController.cs)

---

# Adding user login to the user interface

Let's add a page to represent the login interface: `Signin.jsx`

```jsx
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { recordAuthentication } from './auth'

export function SignIn() {
  const history = useHistory()

  const [errorMessage, setErrorMessage] = useState()

  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  })

  const handleStringFieldChange = event => {
    const value = event.target.value
    const fieldName = event.target.id

    const updatedUser = { ...loginUser, [fieldName]: value }

    setLoginUser(updatedUser)
  }

  const handleFormSubmit = event => {
    event.preventDefault()

    fetch('/api/Sessions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(loginUser),
    })
      .then(response => response.json())
      .then(apiResponse => {
        if (apiResponse.status === 400) {
          setErrorMessage(Object.values(apiResponse.errors).join(' '))
        } else {
          recordAuthentication(apiResponse)
          window.location = '/'
        }
      })
  }

  return (
    <div className="card">
      <div className="card-header">Login</div>
      <div className="card-body">
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={loginUser.email}
              onChange={handleStringFieldChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={loginUser.password}
              onChange={handleStringFieldChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
```

This page is much like the `Signup` page except for the `handleFormSubmit` code
handling a successful API request

```javascript
recordAuthentication(apiResponse)
window.location = '/'
```

The `recordAuthentication` method is one we are going to provide along with many
other useful authentication methods in a `auth.js` file. The purpose of
`recordAuthentication` is to store the api response from the login in _local
storage_ so we can access it later.

## Local Storage

Local Storage is a key/value pair storage mechanism that can, for any string
key, store a string of data. This data is persistant across sessions and browser
restarts. The storage is _per site_ so each domain has its own set of key/value
pairs.

This makes for a convenient place to store the authentication data. However, we
should note that this local storage is available to any javascript that runs on
the page that **originates** from that domain. This should protect the data from
JavaScript running in an injected ad, but if some malicious software is able to
inject JavaScript into the page itself, it will be able to read these values. So
while local storage is convenient, it may not be the most secure way to store
the authentication information.

An alternative is to send the authentication data as a `cookie` value. However,
this too has security implications and concernts.
[This article](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)
gives a good overview of the differences. For now we will proceed with local
storage.

## Redirecting after login

Since we want the user to redirect to the main page we also want it to reload
any authentication data. For this reason we will use `window.location` to force
a page reload rather than `history.push` which would do a local, non-reload,
navigation.

## `auth.js`

The contents of `auth.js` give some useful client-side methods to:

- Determine if the user is logged in
- Fetch the user's ID
- Fetch the user details
- Get the details needed for an authentication header for `fetch`
- Store the authentication info `recordAuthentication`
- Logout

The contents of the `auth.js` are:

```javascript
// Returns an object that can be included in `fetch`
// headers to include the required bearer token
// for authentication
//
// Example usage:
//
// fetch('/api/Thing', {
//    method: 'POST',
//    headers: { 'content-type': 'application/json', ...authHeader() },
//    body: JSON.stringify(thing)
// })
//
export const authHeader = () => {
  const auth = authFromStorage()

  return auth.token
    ? {
        Authorization: `Bearer ${auth.token}`,
      }
    : {}
}

// Save the authentication received from the API
//
// This method stores the authentication data as
// a JSON string in local storage. Local storage
// requires everything to be in a string.
//
// This is typically called from a login component
//
export const recordAuthentication = auth => {
  localStorage.setItem('auth', JSON.stringify(auth))
}

// Returns a boolean if the user is logged in.
//
// Returns TRUE if there is an active user id, FALSE otherwise
//
export const isLoggedIn = () => {
  return getUserId() !== undefined
}

// Returns the user id of the logged in user, null otherwise
export const getUserId = () => {
  const auth = authFromStorage()

  return auth.user && auth.user.id
}

// Returns the user details retrieved from the authentication data
//
// Example:
//
// const user = getUser()
// console.log(user.fullName)
//
export const getUser = () => {
  const auth = authFromStorage()

  return auth.user
}

// Removes the authentication data, effectively "forgetting" the
// session information and logging the user out.
export const logout = () => {
  localStorage.removeItem('auth')
}

// Local method to fetch and decode the auth data from local storage
// If there is no local storage value, returns an empty object
const authFromStorage = () => {
  const auth = localStorage.getItem('auth')

  return auth ? JSON.parse(auth) : {}
}
```

## Using the authentication information

Let's upate the sign in and sign up buttons/links to only display if the user is
**not logged in**

```jsx
{
  isLoggedIn() || (
    <Link className="btn btn-success mr-2" to="/signin">
      Sign in
    </Link>
  )
}
{
  isLoggedIn() || (
    <Link className="btn btn-success mr-2" to="/signup">
      Sign up
    </Link>
  )
}
```

Here we test if the user is logged in, and if they are **not** then we show the
`<Link>`. This works since `isLoggedIn()` returns either `true` or `false` -- If
the value is `false` then JavaScript will interpret, and return the second part
of the boolean logic, which is the `<Link>` -- If the value is `true` then
JavaScript just renders that, and React renders a value of `true` as nothing.
The second part of the logic doesn't need to be considered. This effectively
only shows the links if the user is **not** logged in.

Next we can add a `Sign out` button after the form:

```jsx
{
  isLoggedIn() && (
    <span className="btn btn-success" onClick={handleLogout}>
      Sign out
    </span>
  )
}
```

This only shows the logout button if the user **is logged in**.

We will also add a method to handle the logout:

```jsx
const handleLogout = () => {
  logout()

  window.location = '/'
}
```

## Files Updated

- [ClientApp/src/App.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/4723132ca85774cfde99ef116235b50ebf0c422f/ClientApp/src/App.jsx)
- [ClientApp/src/components/NavBar.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/4723132ca85774cfde99ef116235b50ebf0c422f/ClientApp/src/components/NavBar.jsx)
- [ClientApp/src/pages/SignIn.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/4723132ca85774cfde99ef116235b50ebf0c422f/ClientApp/src/components/NavBar.jsx)
- [ClientApp/src/pages/auth.js](https://raw.githubusercontent.com/gstark/TacoTuesday/4723132ca85774cfde99ef116235b50ebf0c422f/ClientApp/src/pages/auth.js)

---

# Storing the user that created a restaurant and review

If we want to store the user that created a restaurant or a review, we need to
add some details to the models. Specifically, we will need to store the `UserId`
value in both of these models.

Add the following to both `Restaurant` and `Review`

```csharp
public int UserId { get; set; }
```

Once added we can run a single migration that will update both of these tables.

```shell
dotnet ef migrations add AddUserIdToRestaurantAndReview
```

and run the migrations

```shell
dotnet ef database update
```

## Storing the related user

We _could_ have the client send their `Id` along with the request to create a
restaurant and review. However, the current user id is not data we want to trust
to the API. Since anyone could change that value when sending a request we want
the **server** to be in control of associating that data. Thus we want to
provide the two controllers with a way to determine the id of the current user.

The first thing we need to do is modify `Startup.cs` slightly.

To the end of `ConfigureServices` add this code:

```csharp
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["JWT_KEY"]))
    };
});
```

Then, also in `Startup.cs` add this line of code just after `app.UseRouting()`:

```csharp
app.UseAuthorization();
```

Now we can a helper method to our controller just after the last method of the
controller in `RestaurantsController.cs`

```csharp
// Private helper method to get the JWT claim related to the user ID
private int GetCurrentUserId()
{
    // Get the User Id from the claim and then parse it as an integer.
    return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
}
```

We can then use this in our PostRestaurant method to help ensure we have user
IDs assigned.

To require a user to be logged in (have a valid JWT) add this line before the
`PostRestaurant` method:

```csharp
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
```

To assign a user to the restaurant, we will add this code to the _beginning_ of
the `PostRestaurant` implementation:

```csharp
// Set the UserID to the current user id, this overrides anything the user specifies.
restaurant.UserId = GetCurrentUserId();
```

Finally, lets send our authorization header token when making the request in
`AddRestuarant.jsx`:

```javascript
headers: { 'content-type': 'application/json', ...authHeader() },
```

And update our logic to handle `401` not authorized

```javascript
fetch('/api/Restaurants', {
  method: 'POST',
  headers: { 'content-type': 'application/json', ...authHeader() },
  body: JSON.stringify(newRestaurant),
})
  .then(response => {
    if (response.status === 401) {
      return { status: 401, errors: { login: 'Not Authorized ' } }
    } else {
      return response.json()
    }
  })
  .then(apiResponse => {
    if (apiResponse.status != 201) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      history.push('/')
    }
  })
```

Then we will make similar updates in the `ReviewsControler` and
`ShowRestaurant.jsx`

## Files Updated

- [ClientApp/src/pages/AddRestaurant.jsx}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/ClientApp/src/pages/AddRestaurant.jsx)
- [ClientApp/src/pages/ShowRestaurant.jsx}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/ClientApp/src/pages/ShowRestaurant.jsx)
- [Controllers/RestaurantsController.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Controllers/RestaurantsController.cs)
- [Controllers/ReviewsController.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Controllers/ReviewsController.cs)
- [Migrations/20200708205257_AddUserIdToRestaurantAndReview.Designer.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Migrations/20200708205257_AddUserIdToRestaurantAndReview.Designer.cs)
- [Migrations/20200708205257_AddUserIdToRestaurantAndReview.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Migrations/20200708205257_AddUserIdToRestaurantAndReview.cs)
- [Migrations/DatabaseContextModelSnapshot.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Migrations/DatabaseContextModelSnapshot.cs)
- [Models/Restaurant.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Models/Restaurant.cs)
- [Models/Review.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Models/Review.cs)
- [Startup.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Startup.cs)

# Restrict Upvote and Downvote

Let's add tracking of who performed up and downvoting. This will allow us to
only allow a user to record a single vote.

First, we will add a model for `RestaurantVote` which will now create a real
database entity for the _resource_ we made earlier.

```csharp
namespace TacoTuesday.Models
{
    public class RestaurantVote
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RestaurantId { get; set; }
        public string UpOrDown { get; set; }
    }
}
```

Add the `RestaurantVotes` to the `DatabaseContext.cs`:

```csharp
// Tell the context about the RestaurantVotes collection/table
public DbSet<RestaurantVote> RestaurantVotes { get; set; }
```

Then generate a migration and update the database:

```shell
dotnet ef migrations add AddRestaurantVotes
dotnet ef database update
```

Then we can update the `RestaurantVotes` controller to:

- Ensure we are an authenticated user
- Check to see if we have already registered a vote
- Create the voting record
- Increment the restaurant vote totals

Add this code just after the `HttpPost` method in
`RestaurantVotesController.cs`:

```csharp
// Private helper method to get the JWT claim related to the user ID
private int GetCurrentUserId()
{
    // Get the User Id from the claim and then parse it as an integer.
    return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
}
```

Add this above the method definition:

```csharp
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
```

Add this to the beginning of the method implementation. The `AnyAsync` query
will attempt to detect an existing vote for this restaurant belonging to the
user that is making the request. If one is found, a `400` Bad Request is
returned and we do not complete the rest of the method.

```csharp
// If there is already an existing vote, return a bad request
var existingVote = await _context.RestaurantVotes.AnyAsync(restaurantVote => restaurantVote.UserId == GetCurrentUserId() && restaurantVote.RestaurantId == id);
if (existingVote)
{
    return BadRequest();
}

// Add the restaurant vote to the table
var restaurantVote = new RestaurantVote
{
    RestaurantId = id,
    UserId = GetCurrentUserId(),
    UpOrDown = upOrDown
};
await _context.RestaurantVotes.AddAsync(restaurantVote);
```

In `Restaurants.jsx` add the authentication header:

```javascript
headers: { 'content-type': 'application/json', ...authHeader() },
```

and hide the voting buttons unless the user is logged in

```jsx
{
  isLoggedIn() && (
    <small className="mr-3">
      <button
        className="btn btn-success btn-sm"
        onClick={event => {
          event.preventDefault()
          props.handleVote(restaurant.id, 'upvote')
        }}
      >
        <span className="mr-2" role="img" aria-label="upvote">
          👍🏻
        </span>
        {restaurant.upvoteCount}
      </button>
    </small>
  )
}
{
  isLoggedIn() && (
    <small className="mr-3">
      <button
        className="btn btn-danger btn-sm"
        onClick={event => {
          event.preventDefault()
          props.handleVote(restaurant.id, 'downvote')
        }}
      >
        <span className="mr-2" role="img" aria-label="downvote">
          👎🏻
        </span>{' '}
        {restaurant.downvoteCount}
      </button>
    </small>
  )
}
```

Now the user will only allow one vote per restaurant and we only allow
authenticated users to vote.

## Files Updated

- [ClientApp/src/pages/Restaurants.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/ClientApp/src/pages/Restaurants.jsx)
- [Controllers/RestaurantVotesController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Controllers/RestaurantVotesController.cs)
- [Migrations/20200709004514_AddRestaurantVotes.Designer.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Migrations/20200709004514_AddRestaurantVotes.Designer.cs)
- [Migrations/20200709004514_AddRestaurantVotes.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Migrations/20200709004514_AddRestaurantVotes.cs)
- [Migrations/DatabaseContextModelSnapshot.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Migrations/20200709004514_AddRestaurantVotes.cs)
- [Models/DatabaseContext.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Models/DatabaseContext.cs)
- [Models/RestaurantVote.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Models/RestaurantVote.cs)

---

# Adding the restaurants to a map

Another nice feature would be to show the list of restaurants on a map. In order
to map these restaurants we need to know exactly where the restaurants are. The
process of turning an address into a position, as well as turning a position
into an address, is known as
[`Geocoding`](https://en.wikipedia.org/wiki/Geocoding)

When _geocoding_ an address we are often turning the text of the address, it's
street number and name along with the city, state, and zip/postal code, into a
pair of numbers. These decimal numbers,
[`latitutde` and `longitude`](https://www.timeanddate.com/geography/longitude-latitude.html)
describe a single position on the surface of the planet.

## Adding columns to store a coordinate

Let's get ready for our geocoding practice by adding columns to our
`Restaurants` table to store these values.

```csharp
public double Latitude { get; set; }

public double Longitude { get; set; }
```

Then we will generate a migration for these columns and update the database

```shell
dotnet ef migrations add AddLatitudeAndLongitudeToRestaurant
dotnet ef database update
```

## Adding a package to help us geocode

In order to turn the restaurants address into a latitude and longitude we will
use a third party library.

```shell
dotnet add package Geocoding.Core
dotnet add package Geocoding.Microsoft
```

The `Geocoding` package comes with support for other services other than
Microsoft, but this is the one we will use in this lesson. Each of the geocoding
systems requires an account and an API key. Microsoft's signup process is one of
the easiest and we'll choose that to proceed. To sign up for a key, follow
[these procedures](https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key)

Similar to our `JWT_KEY` we will have to add a secret for this API. We'll call
the sercret `BING_MAPS_KEY` and access it in our `RestaurantsController`:

To save the key in secrets:

```csharp
dotnet user-secrets set "BING_MAPS_KEY" "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

Where `"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"` is the key
you generated at Microsoft.

> NOTE: If you are going to deploy this with Heroku, you'll need to run
> `heroku config:set BING_MAPS_KEY="xxxx"` with your specific key in place of
> `xxxx` at least once before you deploy.

To acecss the key from the controller:

```csharp
private readonly string BING_MAPS_KEY;

// Constructor that recives a reference to your database context
// and stores it in _context for you to use in your API methods
public RestaurantsController(DatabaseContext context, IConfiguration config)
{
    _context = context;
    BING_MAPS_KEY = config["BING_MAPS_KEY"];
}
```

Now that we have added this library and setup an API key, lets add some code to
`PostRestaurant` just before `restaurant.UserId = GetCurrentUserId();`

```csharp
// Create a new geocoder
var geocoder = new BingMapsGeocoder(BING_MAPS_KEY);

// Request this address to be geocoded.
var geocodedAddresses = await geocoder.GeocodeAsync(restaurant.Address);

// ... and pick out the best address sorted by the confidence level
var bestGeocodedAddress = geocodedAddresses.OrderBy(address => address.Confidence).LastOrDefault();

// If we have a best geocoded address, use the latitude and longitude from that result
if (bestGeocodedAddress != null)
{
    restaurant.Latitude = bestGeocodedAddress.Coordinates.Latitude;
    restaurant.Longitude = bestGeocodedAddress.Coordinates.Longitude;
}
```

Let's add some restaurants to our database and see what results we get for
geocoded addresses. Enter some restaurants with addresses you know and then
check, using `pgcli` that there are values for `latitude` and `longitude`

## Files Updated

- [Controllers/RestaurantsController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/Controllers/RestaurantsController.cs)
- [Migrations/20200712144700_AddLatitudeAndLongitudeToRestaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/Migrations/20200712144700_AddLatitudeAndLongitudeToRestaurant.cs)
- [Migrations/20200712144700_AddLatitudeAndLongitudeToRestaurant.Designer.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/Migrations/20200712144700_AddLatitudeAndLongitudeToRestaurant.Designer.cs)
- [Migrations/DatabaseContextModelSnapshot.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/Migrations/DatabaseContextModelSnapshot.cs)
- [Models/Restaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/Models/Restaurant.cs)
- [TacoTuesday.csproj](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/TacoTuesday.csproj)

---

# Add maps to our front end

To render a map within our front end we will be using another third party
library, `react-map-0gl`.

```shell
cd ClientApp
npm install --save react-map-gl
cd ..
```

## Getting another license key for our front end code.

We will be using `mapbox` as our mapping information provider. We will visit
[their website](https://www.mapbox.com/) and register for an API key.

We will create a file `.env.development.local` in the same location as our
`package.json` to store our API key in develoment. This defines
`environment variables` for our application. An
[environment variable](https://en.wikipedia.org/wiki/Environment_variable) is a
set of string-based keys and text values that are associated with the execution
of our application. Environment variables control many aspects of our command
prompt as well as our running applications. Since these are a per-app
configuration they also serve as a location for values such as API keys.

> NOTE: This is a different approach then dotnet takes for it's local
> configuration data. Both are good solutions each with their own issues and
> benefits. We are using an environment variable since this is the approach that
> our front end app setup prefers.

```text
REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoiZ2F2aW4tc3RhcmsiLCJhIjoiY2s5NXN0NmdhMHBwbjNtb203N280dHpjdyJ9.xxxxxxxxxxj21vXN8cEi26A
```

> NOTE: After changing this file you should stop and restart your
> `dotnet watch run`

Once we have installed the library, signed up for a key, and set our API key in
configuration, we will update our `Restaurants.jsx` component to show a map.

## Adding the map to the UI

First we will import `ReactMapGL` from our library:

```javascript
import ReactMapGL from 'react-map-gl'
```

And then set a state variable to store information about the map's zoom level,
size, and the coordinates of the center of the map. Here we will use the
coordinates of the SDG campus as our map center.

```javascript
const [viewport, setViewport] = useState({
  width: 500,
  height: 500,
  latitude: 27.77101804911986,
  longitude: -82.66090611749074,
  zoom: 8,
})
```

With this state we can add a map to the user interface:

```jsx
<div className="my-3 d-flex justify-content-center">
  <ReactMapGL
    {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
  ></ReactMapGL>
</div>
```

You will notice that we are taking all the attributes of our `viewport` state
and **spreading** them into the `ReactMapGL`. We carefully chose the name of the
properties of this state variable to correspond to the various properties of the
map we wish to control. Also notice that we provide the `mapboxApiAccessToken`
here as well. To access the value we placed in the `.env.development.local`
file, we use `process.env` which is an object containing all the environment
variables configured for the current process (app).

## Moving around the map

You may notice that while we can render a map and see a particular area we
cannot adjust the map by dragging. This is a common map interface so lets add
that feature. Luckily, again, our `viewport` state is setup perfectly to allow
us to handle this.

The `ReactMapGL` expects a property for `onViewportChange` that is a method that
takes new values for a viewport change. And since our `setViewport` is exactly
such a function we can use it by adding this to `ReactMapGL`

```jsx
<ReactMapGL
  {...viewport}
  onViewportChange={setViewport}
  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
></ReactMapGL>
```

Try dragging, pinching, and zooming the map!

## Adding pins to the map

If we wish to add pins to the map we must render an array of `<Marker>`
components inside our `ReactMapGL` component. A `<Marker>` is another map-gl
component. It requires a `latitude` and `longitude` property. Luckily for us,
our `restaurants` state now has that information from our api!

We can use our old friend the JavaScript `map()` function to generate these
markers.

When generating the array of `<Marker>` elements we specify the `latitude` and
`longitude` from the specific restaurant. We then render each marker's visual as
anything we like; here we just use the existing emoji character. We could use
text, an image, or any other react component as the marker representation.

```jsx
<ReactMapGL
  {...viewport}
  onViewportChange={setViewport}
  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
>
  {restaurants.map(restaurant => (
    <Marker latitude={restaurant.latitude} longitude={restaurant.longitude}>
      <span role="img" aria-label="taco">
        🌮
      </span>
    </Marker>
  ))}
</ReactMapGL>
```

## Adding interaction to the map

Next lets make it so we can click on a specific map and see some details of the
restaurant itself.

To do that we will add another state variable to track the
`selectedMapRestaurant` and initially set that value to `null`. When this
variable is `null` we mean that no restaurant is selected in the map. When this
variable is **not** null it means the value of the variable is the restaurant we
want to show.

```javascript
const [selectedMapRestaurant, setSelectedMapRestaurant] = useState(null)
```

Then just before we render our array of `<Marker>` we will add this code:

```jsx
{
  selectedMapRestaurant && (
    <Popup
      latitude={selectedMapRestaurant.latitude}
      longitude={selectedMapRestaurant.longitude}
      closeButton={true}
      closeOnClick={false}
      onClose={() => setSelectedMapRestaurant(null)}
      offsetTop={-5}
    >
      <div className="card my-3">
        <div className="card-header">{selectedMapRestaurant.name}</div>
        <div className="card-body"></div>
        {selectedMapRestaurant.description}
      </div>
    </Popup>
  )
}
```

This will render, if there is a selectedMapRestaurant, a `map-gl` based `Popup`
component at the coordinates of the selected restaurant. We also define an
`onClose` which the popup will use to dismiss the popup. For that we simply set
the `selectedMapRestaurant` to `null`. Inside the popup we will render a few
details of the restaurant.

Lastly, we need to add an `onClick` for our `<Marker>` so we can set the value
of `selectedMapRestaurant`

```jsx
<span
  role="img"
  aria-label="taco"
  onClick={() => setSelectedMapRestaurant(restaurant)}
>
  🌮
</span>
```

When clicking on markers you may notice that the popup appears _behind_ other
markers on the page. To resolve this, add the following CSS to your project:

```css
.mapboxgl-popup {
  z-index: 1;
}
```

Now we have a zoomable, draggable, and clickable map that represents data pulled
from our API.

> NOTE: If you are going to deploy this with Heroku, you'll need to run
> `heroku config:set REACT_APP_MAPBOX_TOKEN="xxxx"` with your specific key in
> place of `xxxx` at least once before you deploy.

## Files Updated

- [ClientApp/src/pages/Restaurants.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/385b003aa796ff38c8635c833a2d63bf3045107e/ClientApp/src/pages/Restaurants.jsx)
- [ClientApp/src/custom.scss](https://raw.githubusercontent.com/gstark/TacoTuesday/385b003aa796ff38c8635c833a2d63bf3045107e/ClientApp/src/custom.scss)
- [ClientApp/package.json](https://raw.githubusercontent.com/gstark/TacoTuesday/385b003aa796ff38c8635c833a2d63bf3045107e/ClientApp/package.json)
- [ClientApp/package-lock.json](https://raw.githubusercontent.com/gstark/TacoTuesday/385b003aa796ff38c8635c833a2d63bf3045107e/ClientApp/package-lock.json)

---

# Add an image to the Restaurant

It would be nice to add a profile image for the restaurant so we know what the
place looks like.

When storing user provided assets we can choose between hosting these assets
ourselves or using an external service to do so. Storing them ourselves gives us
more control over how these assets are stored. However, external services are
often more optimized for this process, provied lower cost storage options,
provide faster networking and more geographically distributed caching of these
assets making for a more efficient service for our users.

There are a number of providers for asset storage:

- Amazon Web Services S3
- Azure
- Google Cloud
- Cloudinary

In this lesson we will be using Cloudinary as the integration is more
straightforward and it does not require a paid plan to get started. If you are
interested in replacing Cloudinary with one of the other services there are
existing dotnet libraries to use.

## Adding Cloudinary

First we will sign up at Cloudinary for an API KEY. When you have your account
created you'll need three values:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

We will set all three in our secrets:

```shell
dotnet user-secrets set "CLOUDINARY_CLOUD_NAME" "REPLACE THIS"
dotnet user-secrets set "CLOUDINARY_API_KEY"    "REPLACE THIS"
dotnet user-secrets set "CLOUDINARY_API_SECRET" "REPLACE THIS"
```

After securing these values we will add the `Cloudinary` third party package to
our app:

```shell
dotnet add package CloudinaryDotNet
```

## Creating a controller for uploading files

Again thinking of uploads as a resource itself we will create a
`UploadsController` with only a single `POST` endpoint for creating uploads.

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace TacoTuesday.Controllers
{
    // All of these routes will be at the base URL:     /api/Uploads
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case RestaurantsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class UploadsController : ControllerBase
    {
        private readonly string CLOUDINARY_CLOUD_NAME;
        private readonly string CLOUDINARY_API_KEY;
        private readonly string CLOUDINARY_API_SECRET;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public UploadsController(IConfiguration config)
        {
            CLOUDINARY_CLOUD_NAME = config["CLOUDINARY_CLOUD_NAME"];
            CLOUDINARY_API_KEY = config["CLOUDINARY_API_KEY"];
            CLOUDINARY_API_SECRET = config["CLOUDINARY_API_SECRET"];
        }

        // POST: api/Uploads
        //
        // Creates a new uploaded file
        //
        // The `body` of the request is parsed and then made available to us as a User
        // variable named user. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our User POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult Upload()
        {
            return Ok();
        }
    }
}
```

Here we have just the shell of our controller. Notice we have not incorporated
the `DatabaseContext` since this controller will not be doing anything with the
database, but simply receiving files from the user and uploading them to
_Cloudinary_. Thus our constructor only takes in the configuration and saves off
the various _Cloudinary_ configration values we will need.k

Also we have protected the endpoint to only allow authorized users to upload
content. j

## Changing the controller to accept a file upload

We will now update the controller definition to accept a file upload, process
it, upload it to _Cloudinary_ and return to the user a URL to where the newly
uploaded file was stored. The front end will send us a file and once done will
use the uploaded file location when creating/updating the model.

The first thing we will do is update our endpoint to accept a file as input.

```csharp
public ActionResult Upload(IFormFile file)
```

Next we will ensure that we only accept images and content of a type that will
be supported.

To do so we'll make a class property to hold a _set_ of strings of the content
types allowed. We will use the `HashSet` collection type since it is efficient
for fast lookups, and does not allow for duplicates (unlike a `List`)

```csharp
private readonly HashSet<string> VALID_CONTENT_TYPES = new HashSet<string> {
    "image/jpg",
    "image/jpeg",
    "image/pjpeg",
    "image/gif",
    "image/x-png",
    "image/png",
};
```

Then we can add this code at the beginning of our `Upload` method:

```csharp
// Check this content type against a set of allowed content types
var contentType = file.ContentType.ToLower();
if (!VALID_CONTENT_TYPES.Contains(contentType))
{
    // Return a 400 Bad Request when the content type is not allowed
    return BadRequest("Not Valid Image");
}
```

After validating the content type we can proceed to send the content to
_Cloudinary_

```csharp
// Create and configure a client object to be able to upload to Cloudinary
var cloudinaryClient = new Cloudinary(new Account(CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET));

// Create an object describing the upload we are going to process.
// We will provide the file name and the stream of the content itself.
var uploadParams = new ImageUploadParams()
{
    File = new FileDescription(file.FileName, file.OpenReadStream())
};

// Upload the file to the server
ImageUploadResult result = await cloudinaryClient.UploadLargeAsync(uploadParams);

// If the status code is a "OK" then the upload was accepted so we will return
// the URL to the client
if (result.StatusCode == HttpStatusCode.OK)
{
    var urlOfUploadedFile = result.SecureUrl.AbsoluteUri;

    return Ok(new { url = urlOfUploadedFile });
}
else
{
    // Otherwise there was some failure in uploading
    return BadRequest("Upload failed");
}
```

## Adding the photo URL to the model

Now we can update the `Restaurant.cs` model to store a URL to the uploaded
image.

```csharp
public string PhotoURL { get; set; }
```

```shell
dotnet ef migrations add AddPhotoURLToRestaurant
dotnet ef database update
```

## Updating the user interface to upload a photo when creating a restaurant

To allow a user to upload a file to our restaurant we'll use a fancy
drag-and-drop library to create an interface for the upload.

```shell
cd ClientApp
npm install --save react-dropzone
cd ..
```

This adds a react component library that has great support for dragging and
dropping files into our UI.

Then we will import this component on our `AddRestaurant.jsx` page:

```javascript
import { useDropzone } from 'react-dropzone'
```

The dropzone component is expecting a method to call when a file is dropped onto
a visible target in the UI. Lets add the method for that:

```javascript
const onDropFile = acceptedFiles => {
  // Do something with the files
  const fileToUpload = acceptedFiles[0]
  console.log(fileToUpload)
}
```

For now we will just have this log the details of the files dropped and get log
details of the first one. We are only going to allow single file drops for now.

Next we will get some configuration information from the dropzone library:

```javascript
const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop: onDropFile,
})
```

Now lets add some user interface to show the user where to drop their files:

```jsx
<div className="alert alert-primary">
  <div {...getRootProps()}>
    <input {...getInputProps()} />
    {isDragActive
      ? 'Drop the files here ...'
      : 'Drag a new file here to upload!'}
  </div>
</div>
```

Try dragging and dropping a file on that part of the UI. When you drop a file
you will see the details of your dropped file logged by the `onDropFile` method.

Now we can update `onDropFile` to process the upload.

```javascript
const onDropFile = async acceptedFiles => {
  // Do something with the files
  const fileToUpload = acceptedFiles[0]
  console.log(fileToUpload)

  // Create a formData object so we can send this
  // to the API that is expecting som form data.
  const formData = new FormData()

  // Append a field that is the form upload itself
  formData.append('file', fileToUpload)

  // Use fetch to send an authorization header and
  // a body containing the form data with the file
  const response = await fetch('/api/Uploads', {
    method: 'POST',
    headers: {
      ...authHeader(),
    },
    body: formData,
  })

  // If we receive a 200 OK response, set the
  // URL of the photo in our state so that it is
  // sent along when creating the restaurant,
  // otherwise show an error
  if (response.status === 200) {
    const apiResponse = await response.json()

    const url = apiResponse.url

    setNewRestaurant({ ...newRestaurant, photoURL: url })
  } else {
    setErrorMessage('Unable to upload image')
  }
}
```

Finally we will update the `ShowRestaurant` component to display the restaurant
image, if present, in place of the taco emoji.

```jsx
{
  restaurant.photoURL ? (
    <img
      alt="Restaurant Photo"
      width={200}
      className="pr-3"
      src={restaurant.photoURL}
    />
  ) : (
    <span className="pr-3 display-2" role="img" aria-label="taco">
      🌮
    </span>
  )
}
```

## Files Updated

- [ClientApp/package.json](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/ClientApp/package.json)
- [ClientApp/package-lock.json](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/ClientApp/package-lock.json)
- [TacoTuesday.csproj](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/TacoTuesday.csproj)
- [Models/Restaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/Models/Restaurant.cs)
- [Migrations/20200712195424_AddPhotoURLToRestaurant.Designer.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/Migrations/20200712195424_AddPhotoURLToRestaurant.Designer.cs)
- [Migrations/20200712195424_AddPhotoURLToRestaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/Migrations/20200712195424_AddPhotoURLToRestaurant.cs)
- [Migrations/DatabaseContextModelSnapshot.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/Migrations/DatabaseContextModelSnapshot.cs)
- [Controllers/UploadsController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/Controllers/UploadsController.cs)
- [ClientApp/src/pages/AddRestaurant.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/ClientApp/src/pages/AddRestaurant.jsx)
- [ClientApp/src/pages/ShowRestaurant.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/ClientApp/src/pages/ShowRestaurant.jsx)

<!-- Whats next

  Use Axios instead of `fetch` to show it being easier

 -->
