---
title: Storing the User that Created Restaurants and Reviews
order: 23
---

# Storing the User that Created Restaurant and Reviews

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

We can a helper method to our controller just after the last method of the
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
`NewRestaurant.jsx`. The `...authHeader()` means to take all the information
that `authHeader` returns and add those keys and corresponding values to the
collection of headers.

```javascript
headers: { 'content-type': 'application/json', ...authHeader() },
```

And update our logic to handle `401` not authorized

```javascript
async function handleFormSubmit(event) {
  event.preventDefault()

  const response = await fetch('/api/Restaurants', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...authHeader() },
    body: JSON.stringify(newRestaurant),
  })

  if (response.status === 401) {
    setErrorMessage('Not Authorized')
  } else {
    if (response.status === 400) {
      const json = await response.json()

      setErrorMessage(Object.values(json.errors).join(' '))
    } else {
      history.push('/')
    }
  }
}
```

Then we will make similar updates in the `ReviewsControler`. Update
`Restaurant.jsx` to have an `errorMessage` state and display. Then update
`Restaurant.jsx` to handle the error result.

To assign a user to the review, we will add this code to the _beginning_ of the
`PostReview` implementation:

```csharp
// Set the UserID to the current user id, this overrides anything the user specifies.
review.UserId = GetCurrentUserId();
```

```javascript
async function handleNewReviewSubmit(event) {
  event.preventDefault()

  const response = await fetch(`/api/Reviews`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...authHeader() },
    body: JSON.stringify(newReview),
  })

  if (response.status === 401) {
    setErrorMessage('Not Authorized')
  } else {
    const json = await response.json()

    if (response.status === 400) {
      setErrorMessage(Object.values(json.errors).join(' '))
    } else {
      setNewReview({
        ...newReview,
        body: '',
        summary: '',
        stars: 0,
      })

      fetchRestaurant()
    }
  }
}
```

<GithubCommitViewer repo="gstark/TacoTuesday" commit="64a689f5b716a0ca734e62d8afb968204ba6ddd9" />
