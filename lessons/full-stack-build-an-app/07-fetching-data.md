---
title: Fetching Data
order: 7
---

## Get a list of restaurants

Looking at `GET /api/Restaurants` we see that this will return a JSON array of
objects where each object represents the details of the sample restaurants we
placed in our database.

We can use this API endpoint to populate the list of restaurants on our home
page

---

# Returning to the UI to populate the list of restaurants

From our statically defined home page, we will extract a component to render the
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
> represent "no data" so an empty array is a correct choice.

Next, we will change our static list of a few sample restaurants to use
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

## Fetching data

Now we will use the `fetch` method to load the list of restaurants from our API.
We will do this via the `useEffect` method. We will create a `useEffect` with an
empty dependency array so that the method is called only once when the component
is first added to the page.

```javascript
function RestaurantList() {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    async function loadRestaurants() {
      const response = await fetch('/api/restaurants')
      const json = await response.json()

      setRestaurants(json)
    }

    loadRestaurants()
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

<GithubCommitViewer repo="gstark/TacoTuesday" commit="961549d" />

## Refactor

At this point, we can refactor the code for a single restaurant into its own
component.

```jsx
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

<GithubCommitViewer repo="gstark/TacoTuesday" commit="e737bfdbcd30bd138f118e52702192980caa316b"/>
<GithubCommitViewer repo="gstark/TacoTuesday" commit="f4d9d3b5618705a82c9c58da6ee142b44fb22517"/>
