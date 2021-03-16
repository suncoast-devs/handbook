---
title: Showing the Reviewer Name for a Review
order: 24
---

# Showing the Reviewer Name for a Review

Our design shows the name of the reviewer along with the review. Let's add
support for that.

The first thing we will do is to add an accessor for the associated user in
`Review.cs`

```csharp
public User User { get; set; }
```

Then in the `RestaurantController` we will modify the `HttpGet` for a _single_
restaurant to include the `User` in the list of associated models we fetch.

```csharp
var restaurant = await _context.Restaurants.
                                    Include(restaurant => restaurant.Reviews).
                                    ThenInclude(review => review.User).
                                    Where(restaurant => restaurant.Id == id).FirstOrDefaultAsync();
```

We should update the `seeds.sql` to specify a `UserId` for each of the reviews.
We'll give it a value of `1` even though we don't have any `Users` -- whatever
user we create first will get those reviews.

```sql
-- Ensure we truncate the table and restart the identity so our Id column starts at 1 each time
TRUNCATE TABLE "Restaurants", "Reviews", "Users" RESTART IDENTITY;

INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Thoughtbeat', 'Inverse zero administration benchmark', '07 Meadow Vale Drive', '314-651-9791');
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Dabtype', 'Organized stable firmware', '7 Miller Park', '523-760-6681');
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Topdrive', 'Object-based interactive application', '65 Eliot Lane', '650-993-7074');
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone") VALUES ('Avaveo', 'Persistent zero defect process improvement', '2 Clarendon Junction', '715-663-5265');

-- Ensure we have a user to associate to the reviews below
INSERT INTO "Users" ("FullName", "Email", "HashedPassword") VALUES ('Sarah', 'sarah@suncoast.io', 'xxxxx');

INSERT INTO "Reviews" ("RestaurantId", "CreatedAt", "Summary", "Body", "Stars", "UserId") VALUES (1, '2020-01-01 14:23:55', 'Yummy Food', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima modi impedit quisquam sit, saepe enim placeat a vero voluptas asperiores atque laudantium in, nobis sunt blanditiis dignissimos. Deleniti, esse optio!', 3, 1);
INSERT INTO "Reviews" ("RestaurantId", "CreatedAt", "Summary", "Body", "Stars", "UserId") VALUES (1, '2020-01-01 18:23:55', 'Mmmmm, good', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima modi impedit quisquam sit, saepe enim placeat a vero voluptas asperiores atque laudantium in, nobis sunt blanditiis dignissimos. Deleniti, esse optio!', 4, 1);
```

Then in the `Restaurant.jsx` we can access the `user` information.

```jsx
<div className="author">
  {review.user.fullName} said: <em>{review.summary}</em>
</div>
```

<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="d79bf02d642a7b23b36817e9e7e983dbc5be6951" />
