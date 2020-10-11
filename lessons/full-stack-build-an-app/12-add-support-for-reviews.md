---
title: Add support for reviews
order: 12
---

# Add support for reviews

We can now add the support for restaurant reviews.

## Database model

The first thing we will do is add a `POCO` model representing the `Review`.
Notice we include the `RestaurantId` since one `Review` _belongs to_ one
`Restaurant`. We also set a default date for the CreatedAt and make it's `set`
method _private_ so that it cannot be set via the API.

```csharp
using System;

namespace TacoTuesday.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Summary { get; set; }
        public string Body { get; set; }
        public int Stars { get; set; }
        public DateTime CreatedAt { get; private set; } = DateTime.Now;
        public int RestaurantId { get; set; }
    }
}
```

After adding this model we also add the review to the `DatabaseContext`

```csharp
// Tell the context about the Review collection/table
public DbSet<Review> Reviews { get; set; }
```

Now we can create the migration.

```shell
dotnet ef migrations add AddReviews
```

and we can update the database

```shell
dotnet ef database update
```

## Relationship

We also need to indicate that the `Restaurant` _has many_ `Reviews`. We do this
by adding a `List` based property to the `Restaurant`

```csharp
public List<Review> Reviews { get; set; }
```

This will allow us to _navigate_ in code from a single restaurant to the list of
associated reviews.

## Restaurant API should return their associated reviews

On the main listing, we want the **count** of reviews and on an individual
restaurant page, we want the list of all reviews.

To achieve these, we will use the `Include` method of EF Core to incorporate
this data into our API response.

Change the logic in `GetRestaurants` to:

```csharp
if (filter == null)
{
    return await _context.Restaurants.OrderBy(restaurant => restaurant.Name).Include(restaurant => restaurant.Reviews).ToListAsync();
}
else
{
    return await _context.Restaurants.OrderBy(restaurant => restaurant.Name).Where(restaurant => restaurant.Name.Contains(filter)).Include(restaurant => restaurant.Reviews).ToListAsync();
}
```

so that now each restaurant will also include an **array** of reviews.

> NOTE: This is not the most efficient implementation. Imagine if our site
> because popular and started to receive heavy traffic. To display our homepage
> we would be fetching all the restaurants _AND_ the complete list of reviews to
> count them. We'll review more efficient approaches in a later step. For now
> we'll go with this approach. Remember: working code before perfect code.

## Update the `exampledata.sql` to generate reviews

Add the following sql to our seeds and rerun them to populate the database with
a few reviews.

```sql
-- Ensure we truncate the table and restart the identity so our Id column starts at 1 each time
TRUNCATE TABLE "Restaurants", "Reviews" RESTART IDENTITY;

INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Thoughtbeat', 'Inverse zero administration benchmark', '07 Meadow Vale Drive', '314-651-9791');
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Dabtype', 'Organized stable firmware', '7 Miller Park', '523-760-6681');
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Topdrive', 'Object-based interactive application', '65 Eliot Lane', '650-993-7074');
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Avaveo', 'Persistent zero defect process improvement', '2 Clarendon Junction', '715-663-5265');

INSERT INTO "Reviews" ("RestaurantId", "CreatedAt", "Summary", "Body", "Stars") VALUES (1, '2020-01-01 14:23:55', 'Yummy Food', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima modi impedit quisquam sit, saepe enim placeat a vero voluptas asperiores atque laudantium in, nobis sunt blanditiis dignissimos. Deleniti, esse optio!', 3);
INSERT INTO "Reviews" ("RestaurantId", "CreatedAt", "Summary", "Body", "Stars") VALUES (1, '2020-01-01 18:23:55', 'Mmmmm, good', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima modi impedit quisquam sit, saepe enim placeat a vero voluptas asperiores atque laudantium in, nobis sunt blanditiis dignissimos. Deleniti, esse optio!', 4);
```

```shell
psql --file=Models/exampledata.sql TacoTuesdayDatabase
```

## Updating the interface to return the list of reviews

We can now use that to count these in the user interface in `Restaurants.jsx`

Change the hard coded:

```
2,188
```

```jsx
({props.restaurant.reviews.length})
```

Now add similar `Include` code in the controller with `GetRestaurant`

```csharp
// Find the restaurant in the database using Include to ensure we have the associated reviews
var restaurant = await _context.Restaurants.Include(restaurant => restaurant.Reviews).Where(restaurant => restaurant.Id == id).FirstOrDefaultAsync();
```

Then in the `Restaurant.jsx` we will add `reviews: []` to our default state so
that our initial state will have an empty array of reviews. We are going to use
the `reviews` property of the restaurant object to render each individual
review. This is why having an "empty" representation of the restaurant in the
state is useful.

Change the hard coded:

```
2,188
```

```jsx
({restaurant.reviews.length})
```

Updating the JSX for showing the list of reviews we use `map` to loop over the
`restaurant.reviews` (again, why that default state of `reviews: []` is so
important). We also only generate this part of the JSX if there are more than
zero reviews.

Replace the contents of `<ul className="reviews">` with:

```jsx
<ul className="reviews">
  {restaurant.reviews.map(review => (
    <li key={review.id}>
      <div className="author">
        Gavin said: <em>{review.summary}</em>
      </div>
      <div className="body">
        <p>{review.body}</p>
      </div>
      <div className="meta">
        <span
          className="stars"
          style={{ '--rating': review.stars }}
          aria-label={`Star rating of this location is ${review.stars} out of 5.`}
        ></span>
        <time>{review.createdAt}</time>
      </div>
    </li>
  ))}
</ul>
```

We should see one restaurant that has two reviews (based on our seed data)

You will also notice that there are some features we haven't finished.

- Each entry still says "Gavin says" -- We can fix this once we introduce the
  idea of users
- The date formatting needs improvement.

We will come back and revise this in a later step.

<GithubCommitViewer repo="gstark/TacoTuesday" commit="2a9efbc49dc22c70afda630f558fb27c968d8638" />
