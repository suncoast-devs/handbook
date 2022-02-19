---
title: Adding Search
order: 8
---

# Adding a search feature to our API

Let's consider adding a `search` feature to our API to satisfy the
`search/filter` in our UI.

We could add another endpoint such as `GET /api/Restaurants/search`, but we
already have an endpoint that represents what we want: _the list of
restaurants_, we want a **variant** of that list.

In this case, we can use the `query parameter` feature of HTTP to our advantage,
and it is precisely what this feature supports.

We will update the definition of the `GetRestaurants` method as such:

```csharp
[HttpGet]
public async Task<ActionResult<IEnumerable<Restaurant>>> GetRestaurants(string filter)
```

The `string filter` will be populated with the **value** of a query parameter
named `filter` if present, otherwise the variable `filter` will be `null`.

We can use this to our advantage in the implementation. If the `filter` variable
is `null,` we return all restaurants. Otherwise, we add a `Where` method to only
include the `restaurant` where the `Name` property contains the phrase in the
`filter` variable.

```csharp
if (filter == null)
{
    return await _context.Restaurants.ToListAsync();
}
else
{
    return await _context.Restaurants.Where(restaurant => restaurant.Name.ToLower().Contains(filter.ToLower())).ToListAsync();
}
```

## Updating the UI to allow for filtering

First, let's update `Restaurants.tsx` to contain a state for the filter text.

```javascript
const [filterText, setFilterText] = useState('')
```

Then we will update the `<input>` tag

```jsx
<input
  type="text"
  placeholder="Search..."
  value={filterText}
  onChange={function (event) {
    setFilterText(event.target.value)
  }}
/>
```

## Update the useQuery to take the filterText into consideration

- First, we change the unique identifier for the query to
  `['restaurants', filterText]`. This allows any caching that `react-query` does
  to be dependent on our filter text.
- Then we dynamically change the URL based on the filter. If there is no
  filterText, we use the default URL, otherwise, we send a query parameter with
  our filter text.

```javascript
const { data: restaurants = [] } = useQuery<RestaurantType[]>(
  ['restaurants', filterText],
  async function () {
    const response = await fetch(
      filterText.length === 0
        ? '/api/restaurants'
        : `/api/restaurants?filter=${filterText}`
    )

    return response.json()
  }
)
```

## Files Updated

<!-- Adds restaurant searching -->
<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="6db5ed8c7f0ae579f7a161da765211d175504866"/>
