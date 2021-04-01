---
title: View a single restaurant
order: 11
---

# Viewing a single restaurant

## Setting up a route

We can add a route to view a specific restaurant in `App.jsx`

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
      <Route exact path="/restaurants/:id">
        <Restaurant />
      </Route>
    </Switch>
  )
}
```

## Updating the Restaurants component to use router

Inside any component rendered due to a `<Route>` match, we can add
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

You'll notice here we define the restaurant's initial value as an object with
all the properties of a restaurant but with empty values. Using an object with
all the properties initialized with empty values in a state variable is good
since the component will render **at least** once before any `useEffect` code
updates the state.

Next, we can use this state variable to represent all the data in the JSX.

Once we have updated the JSX, we'll add a `useEffect` to fetch the data.

```javascript
useEffect(() => {
  async function fetchRestaurant() {
    const response = await fetch(`/api/Restaurants/${id}`)

    if (response.code === 200) {
      const apiData = await response.json()

      setRestaurant(apiData)
    }
  }

  fetchRestaurant()
}, [id])
```

Notice that we use the `id` in the `useEffect` dependency array since if this
`id` changes we want to load a new restaurant. We also define the
`fetchRestaurant` function _inside_ the `useState` function. This pattern allows
us to use async functionality.

If we tried to apply `async` to the `() => {` anonymous function our Javascript
tools would warn us to change our style.

# Update the component to show dynamic data

Locate all the hardcoded information in the component and replace it with
dynamic data.

An example of such a change is:

```jsx
<address>8005 Benjamin Rd, Tampa, FL 33634</address>
```

```jsx
<address>{restaurant.address}</address>
```

# Update the restaurant component to use react router links

Update the static `<a>` links in `Restaurant.jsx` to become `<Link>` react
router enabled links.

# Update the main restaurant listing to use react router links

We will update the `SingleRestaurantFromList` to make the name a clickable
`Link`.

```jsx
<h2>{props.restaurant.name}</h2>
```

```jsx
<h2>
  <Link to={`/restaurants/${props.restaurant.id}`}>
    {props.restaurant.name}
  </Link>
</h2>
```

<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="323c05bd5b0db947bc0b5c6c8f13b3a9bbca456d" />
