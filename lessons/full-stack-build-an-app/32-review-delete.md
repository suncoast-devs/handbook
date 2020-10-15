---
title: Review Delete
order: 32
---

# Review Delete

To delete a review we will first add a button to each review for the reviews
with a user id equal to the current user id.

```jsx
{
  review.user.id === user.id && (
    <div>
      <button
        className="small"
        onClick={event => handleDeleteReview(event, review.id)}
      >
        Delete
      </button>
    </div>
  )
}
```

Next we will add a method for `handleDeleteReview`. In the onClick we send both
the event (to prevent any default behavior) and the currently displayed review
id.

```jsx
async function handleDeleteReview(event, reviewId) {
  event.preventDefault()

  await fetch(`/api/Reviews/${reviewId}`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json', ...authHeader() },
  })

  fetchRestaurant()
}
```

## Add code to the controller

Add a method to process the deletion in the `ReviewsController`:

```csharp
// DELETE: api/Reviews/5
//
// Deletes an individual Review with the requested id. The id is specified in the URL
// In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
// to grab the id from the URL. It is then made available to us as the `id` argument to the method.
//
[HttpDelete("{id}")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public async Task<IActionResult> DeleteReview(int id)
{
    // Find this review by looking for the specific id
    var review = await _context.Reviews.FindAsync(id);
    if (review == null)
    {
        // There wasn't a review with that id so return a `404` not found
        return NotFound();
    }

    if (review.UserId != GetCurrentUserId())
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

    // Tell the database we want to remove this record
    _context.Reviews.Remove(review);

    // Tell the database to perform the deletion
    await _context.SaveChangesAsync();

    // return NoContent to indicate the update was done. Alternatively you can use the
    // following to send back a copy of the deleted data.
    //
    // return Ok(review)
    //
    return NoContent();
}
```
