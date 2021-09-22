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

# Using `react-query`

In this demonstration we will use the
[react-query](https://www.npmjs.com/package/react-query) library to integrate
with our backend api.

Before we can begin working with the library we first need to install it.

From the `ClientApp` directory (e.g. where you would run `npm start`)

```shell
npm install react-query
```

# Configuring `react-query`

To use the library we will need to add some configuration to `main.tsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { App } from './App'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

# Using `react-query` to load a list of restaurants

We can now introduce a query to load the list of restaurants.

However, we must first define a TypeScript `type` to specify the structure of
the data we'll be receiving from the API.

Open `types.ts` and add:

```ts
export type RestaurantType = {
  id?: number
  name: string
  description: string
  address: string
  telephone: string
}
```

We make the `id` **optional** by adding a trailing `?` to the name of the property.

This field is optional because we won't always have an `id` field. For example, when creating a new restaurant.

Now in `Restaurants.tsx` we can add:

```javascript
function Restaurants() {

  const { data: restaurants = [] } = useQuery<RestaurantType[]>(
    'restaurants',
    async function () {
      const response = await fetch('/api/restaurants')

      return response.json()
    }
  )

  console.log({restaurants})

  return (... implementation omitted for space ...)
}
```

> NOTE: In this code `const { data: restaurants = [] } =` we are destructuring
> the return of `react-query` to get the `data` property and **renaming** it
> `restaurants`. Then with `= []` we are ensuring that if `useQuery` returns a
> `restaurants` that is `undefined` then we will sue an empty array

> NOTE: The `console.log({ restaurants })` is a temporary debug statement we use
> to test that we are correctly loading data from our API

# Transform static list into dynamic list

Next, we will change our static list of a few sample restaurants to use
`restaurants.map(function(restaurant) {` to generate the list dynamically.

> note: we can't yet compute and display the number of starts, so we will leave
> that hard-coded for now.

```javascript
function restaurantlist() {
  const [restaurants, setrestaurants] = usestate([])

  return (...
     ... other content
     {restaurants.map(function(restaurants) {
       return (
         ... the code for a single restaurant
       )
     ))}
     ... other content
}
```

If we have done this successfully, we have a dynamically generated list of
restaurants on our home page.

> NOTE: We can now remove the `console.log({ restaurants })` since we have
> confidence the code is working properly.

## Files Updated

<!-- Loading restaurants from the API -->
<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="bd18683c61b93cd22c7c22470f461636adbb2450" />

## Refactor

At this point, we can refactor the code for a single restaurant into its own
component. We will put this in a file `SingleRestaurantFromList.tsx` in the
`components` directory

```jsx
function SingleRestaurantFromList(props) {
  return (
    ...
    code for a single restaurant
  )
}

function RestaurantList() {
  ... other content ...

  return (...
     ... other content
     <ul className="results">
        {restaurants.map((restaurant) => (
          <SingleRestaurantFromList
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}
      </ul>
     ... other content
}
```

## Files Updated

<!-- Refactors restaurant in a list into its own component -->
<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="4928a22c1fae76dbabc2beb0ae5dc39937169f12"/>
