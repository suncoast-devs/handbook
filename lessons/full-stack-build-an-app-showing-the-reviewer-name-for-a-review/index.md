---
title: Showing the Reviewer Name for a Review
order: 24
---

# Showing the Reviewer Name for a Review

Our design shows the name of the reviewer along with the review. Let's add
support for that.

In the `RestaurantController`, we will modify the `HttpGet` for a _single_
restaurant to include the `User` in the list of associated models we fetch.

```csharp
var restaurant = await _context.Restaurants.
                                    Include(restaurant => restaurant.Reviews).
                                    ThenInclude(review => review.User).
                                    Where(restaurant => restaurant.Id == id).FirstOrDefaultAsync();
```

We should update the `exampledata.sql` to specify a `UserId` for each of the
reviews. We'll give it a value of `1` even though we don't have any `Users` --
whatever user we create first will get those reviews.

```sql
-- Ensure we truncate the table and restart the identity, so our Id column starts at 1 each time
TRUNCATE TABLE "Restaurants", "Reviews", "Users" RESTART IDENTITY;

-- Ensure we have a user to associate to the reviews below
INSERT INTO "Users" ("FullName", "Email", "HashedPassword") VALUES ('Sarah', 'sarah@suncoast.io', 'xxxxx');
INSERT INTO "Users" ("FullName", "Email", "HashedPassword") VALUES ('Mary', 'mary@suncoast.io', 'xxxxx');

INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone", "UserId") VALUES ('Thoughtbeat', 'Inverse zero administration benchmark', '07 Meadow Vale Drive', '314-651-9791', 1);
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone", "UserId") VALUES ('Dabtype', 'Organized stable firmware', '7 Miller Park', '523-760-6681', 2);
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone", "UserId") VALUES ('Topdrive', 'Object-based interactive application', '65 Eliot Lane', '650-993-7074', 1);
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone", "UserId") VALUES ('Avaveo', 'Persistent zero defect process improvement', '2 Clarendon Junction', '715-663-5265', 2);

INSERT INTO "Reviews" ("RestaurantId", "CreatedAt", "Summary", "Body", "Stars", "UserId") VALUES (1, '2020-01-01 14:23:55', 'Yummy Food', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima modi impedit quisquam sit, saepe enim placeat a vero voluptas asperiores atque laudantium in, nobis sunt blanditiis dignissimos. Deleniti, esse optio!', 3, 1);
INSERT INTO "Reviews" ("RestaurantId", "CreatedAt", "Summary", "Body", "Stars", "UserId") VALUES (1, '2020-01-01 18:23:55', 'Mmmmm, good', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima modi impedit quisquam sit, saepe enim placeat a vero voluptas asperiores atque laudantium in, nobis sunt blanditiis dignissimos. Deleniti, esse optio!', 4, 1);
```

Update the `ReviewType` to indicate we know the associated user:

```typescript
export type ReviewType = {
  id: number | undefined
  summary: string
  body: string
  stars: number
  createdAt: Date
  restaurantId: number
  user: {
    id: number
    fullName: string
    email: string
  }
}
```

This will cause an issue with our existing use for creating a state. For now,
we'll create a new type `NewReviewType`, to handle this:

```typescript
export type NewReviewType = {
  id: number | undefined
  summary: string
  body: string
  stars: number
  createdAt: Date
  restaurantId: number
}
```

In `Restaurant.tsx`:

```typescript
const [newReview, setNewReview] = useState<NewReviewType>({
  id: undefined,
  body: '',
  stars: 5,
  summary: '',
  createdAt: new Date(),
  restaurantId: Number(id),
})
```

also

```typescript
async function submitNewReview(review: NewReviewType) {
```

Then in the `Restaurant.tsx`, we can access the `user` information.

```jsx
<div className="author">
  {review.user.fullName} said: <em>{review.summary}</em>
</div>
```

<!-- Showing the name of the person who created the review -->
<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="d79bf02d642a7b23b36817e9e7e983dbc5be6951" />
