---
title: View a single restaurant
order: 11
---

# Viewing a single restaurant

## Setting up a route

We can add a route to view a specific restaurant in `App.tsx`

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

## Updating the Restaurant component to use router

Inside any component rendered due to a `<Route>` match, we can add
`const params = useParams()` to get a variable, `params`, that will tell us the
matching parameters in the `path=` part of the route.

In this case, we want the `:id` from `<Route path="/restaurants/:id">` so we can
add this to the beginning of the method:

```typescript
const { id } = useParams<{ id: string }>()
```

With this, we can add a useQuery that fetches the restaurant.

First, we will define a function for fetching the restaurant:

```typescript
async function loadOneRestaurant(id: string) {
  const response = await fetch(`/api/restaurants/${id}`)

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}
```

We will also define a `NullRestaurant` that will represent the default value of
our object when there is no data being returned from `react query`

```typescript
const NullRestaurant: RestaurantType = {
  name: '',
  address: '',
  description: '',
  telephone: '',
}
```

With this setup we can add a `useQuery`

```typescript
const { data: restaurant = NullRestaurant } = useQuery<RestaurantType>(
  ['one-restaurant', id],
  () => loadOneRestaurant(id)
)
```

Notice that we use the `id` in the `useQuery` name, along with a unique label of
`one-restaurant`. This way if the `id` changes we will load a new restaurant.
Also notice that since we need to pass the `id` to the function we'll use an
inline arrow function to call `loadOneRestaurant` and provide the `id`

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

# Update the main restaurant listing to use react router links

We will update the `SingleRestaurantFromList` to make the name a clickable
`Link`.

```jsx
<h2>{restaurant.name}</h2>
```

```jsx
<h2>
  <Link to={`/restaurants/${props.restaurant.id}`}>{restaurant.name}</Link>
</h2>
```

# Update the restaurant page `<a>` link for home

Replace it with:

```jsx
<Link to="/">
  <i className="fa fa-home"></i>
</Link>
```

<!-- Implements showing a single restaurant -->
<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="e63f2dce5b98b57f4c7535838cdf0a530df59953" />
