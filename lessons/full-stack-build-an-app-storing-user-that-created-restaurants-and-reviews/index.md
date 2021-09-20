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

Once added, we can run a single migration that will update both of these tables.

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
the **server** to control associating that data. Thus, we want to provide the
two controllers with a way to determine the current user's id.

We can add a helper to our controller just after the last method of the
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
`NewRestaurant.tsx`. The `...authHeader()` means to take all the information
that `authHeader` returns and add those keys and corresponding values to the
collection of headers.

```javascript
headers: { 'content-type': 'application/json', Authorization: authHeader() },
```

Then we will make similar updates in the `ReviewsController`.

To assign a user to the review, we will add this code to the _beginning_ of the
`PostReview` implementation:

```csharp
// Set the UserID to the current user id, this overrides anything the user specifies.
review.UserId = GetCurrentUserId();
```

Update `Restaurant.tsx`:

```javascript
headers: { 'content-type': 'application/json', Authorization: authHeader() },
```

<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="daeda98595fc934676dbaf93adbdb6a1bfcd685e" />
