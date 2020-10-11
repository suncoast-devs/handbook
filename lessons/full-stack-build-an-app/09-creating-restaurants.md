---
title: Creating Restaurants
order: 9
---

# Implement "Add"

Let's turn our attention to the `NewRestaurant` component and how we will use
the endpoint `POST /api/Restaurants` to create a new restaurant.

## Make the `NewRestaurant` the component we render in the `App`

Change the `App` component to render the `NewRestaurant` component for now. Once
we get these two pages working we'll add in `react-router` to be able to switch
between them.

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
  name="name"
  value="{newRestaurant.name}"
  onChange="{handleName}"
/>
```

We set the value to the part of the object corresponding to the name of the
object we are building. We also set a unique method to handle input/textarea
changes.

Lets implement one of the handling methods, `handleAddress`:

```javascript
function handleAddress(event) {
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
function handleDescription(event) {
  const newDescriptionText = event.target.value

  const updatedRestaurant = {
    ...newRestaurant,
    description: newDescriptionText,
  }

  setNewRestaurant(updatedRestaurant)
}
```

However, if you notice we added a field `name` to each of the inputs that have
the name of the field. We were careful to name these after the object's
properties. Thus we can use this to create a **single** handle method that is
reused amongst all the `onChange` events for string based state:

```javascript
function handleStringFieldChange(event) {
  const value = event.target.value
  const fieldName = event.target.name

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
async function handleFormSubmit(event) {
  event.preventDefault()

  const response = await fetch('/api/Restaurants', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newRestaurant),
  })

  const json = await response.json()
}
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

Once done, we process the JSON response.

# Time to add some React Router

It is now time to start to route our pages. We'd like the `Restaurants` page to
be at our home path of `/` and the `NewRestaurant` page to be at a path of
`/new`. Then when we add a restaurant we will redirect the user back to the home
page.

First we will setup the routes in our App.

```jsx
export function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Restaurants />
      </Route>
      <Route exact path="/new">
        <NewRestaurant />
      </Route>
    </Switch>
  )
}
```

Now in both the `Restaurants` and `NewRestaurant` pages lets update the button
in the header to be a correct link.

```jsx
<Link to="/new">
  <i className="fa fa-plus"></i> Restaurant
</Link>
```

Returning to our `NewRestaurant` component we can now have the user redirected
to the home page after submiting their new restaurant.

To do this we change handleFormSubmit to call `history.push('/')` after
submitting the API request.

We also add `const history = useHistory()` to the top of the `NewRestaurant`
component and import `useHistory` from `react-router-dom`

```javascript
async function handleFormSubmit(event) {
  event.preventDefault()

  const response = await fetch('/api/Restaurants', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newRestaurant),
  })

  const json = await response.json()

  history.push('/')
}
```

Now if you click on `+ Restaurant`, type in details for a restaurant and click
the submit, you will redirect to the home page and see your new restaurant
populated

## Files Updated

<GithubCommitViewer repo="gstark/TacoTuesday" commit="2434fa21daf71f7ff46439fa09fb02f776eb5a78"/>
