---
title: Restaurant Delete
order: 31
---

# Restaurant Delete

When a user views a restaurant they created, we can add a delete button to
remove the restaurant.

## Update the `Restaurant.jsx`

We start by adding `history` (for redirecting) and the current user to the
`Restaurant.jsx` component

```javascript
const history = useHistory()

const user = getUser()
```

We also define a `handleDelete` method to send the API request:

```javascript
async function handleDelete(event) {
  event.preventDefault()

  const response = await fetch(`/api/Restaurants/${id}`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json', ...authHeader() },
  })

  if (response.status === 200 || response.status === 204) {
    history.push('/')
  }
}
```

and finally, a button that is rendered only if the current user-id matches:

```jsx
{
  restaurant.userId === user.id && (
    <button onClick={handleDelete}>Delete</button>
  )
}
```

## Updating the Restaurants controller

We'll add
`[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]` to
the `HttpDelete` method to ensure authentication.

And since we can't 100% trust that hiding the delete button on the client is
enough to prevent unauthorized users, we'll add a check on the server-side.

```csharp
if (restaurant.UserId != GetCurrentUserId())
{
    // Make a custom error response
    var response = new
    {
        status = 401,
        errors = new List<string>() { "Not Authorized" }
    };

    // Return our error with the custom response
    return Unauthorized(response);
}
```

<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="faa35b8bbdf6d0c6853bbff4222ce2aa3a54a30c" />
