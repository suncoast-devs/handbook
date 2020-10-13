---
title: Stars
order: 25
---

# Stars

Let's update both the `Restaurant.jsx` and `Restaurants.jsx` to show the correct
average review stars for a restaurant.

## `Restaurant.jsx`

Before the `return` that renders the component we will compute the average
ranking of stars. We begin by using `reduce` to total up the number of stars.
Then we divide by the number of reviews before creating a variable that is the
number of stars but with only one decimal place.

```javascript
const totalStars = restaurant.reviews.reduce(
  (starRatingSum, review) => starRatingSum + review.stars,
  0
)

const averageStars = totalStars / restaurant.reviews.length

const averageStarsToOneDecimalPlace = averageStars.toFixed(1)
```

Then we update the display of stars:

```jsx
<span
  className="stars"
  style={{ '--rating': averageStarsToOneDecimalPlace }}
  aria-label={`Star rating of this location is ${averageStarsToOneDecimalPlace} out of 5.`}
></span>
```

However, if we visit a restaurant without any reviews we will notice that we
don't see any stars! This is because `restaurant.reviews.length` is `0` and thus
`averageStars` becomes `NaN`

We can solve this one of two ways.

The first is to realize that `NaN` is a _false-like_ value and thus we can
rewrite the line as:

```javascript
const averageStars = totalStars / restaurant.reviews.length || 0
```

The second way is to use a `ternary` operator:

```javascript
const averageStars =
  restaurant.reviews.length === 0 ? 0 : totalStars / restaurant.reviews.length
```

In this style we compare the length of the review array and if it is zero we set
the `averageStars` to `0`, otherwise setting it equal to the average.

We can do this same change in `Restaurants.jsx`, except our restaurant variable
here is `props.restaurant`

```javascript
const totalStars = props.restaurant.reviews.reduce(
  (starRatingSum, review) => starRatingSum + review.stars,
  0
)

const averageStars =
  props.restaurant.reviews.length === 0
    ? 0
    : totalStars / props.restaurant.reviews.length

const averageStarsToOneDecimalPlace = averageStars.toFixed(1)
```

# Extracting a component for reuse

Noting that this code is now duplicated we can consider _extracting a component_
for the stars!

The first thing we'll do is create the component in the `Restaurants.jsx` code.

```jsx
function Stars(props) {
  const totalStars = props.restaurant.reviews.reduce(
    (starRatingSum, review) => starRatingSum + review.stars,
    0
  )

  const averageStars =
    props.restaurant.reviews.length === 0
      ? 0
      : totalStars / props.restaurant.reviews.length

  const averageStarsToOneDecimalPlace = averageStars.toFixed(1)

  return (
    <span
      className="stars"
      style={{ '--rating': averageStarsToOneDecimalPlace }}
      aria-label={`Star rating of this location is ${averageStarsToOneDecimalPlace} out of 5.`}
    ></span>
  )
}
```

Then we can use this in place of the `<span>` for stars and get rid of the
computation of the variables.

```jsx
function SingleRestaurantFromList(props) {
  return (
    <li>
      <h2>
        <Link to={`/restaurants/${props.restaurant.id}`}>
          {props.restaurant.name}
        </Link>
      </h2>
      <p>
        <Stars restaurant={props.restaurant} />(
        {props.restaurant.reviews.length})
      </p>
      <address>{props.restaurant.address}</address>
    </li>
  )
}
```

We can then use Visual Studio Code's refactor to move the `Stars` to it's own
file. This will create the file in the `pages` folder. Since this component
doesn't represent a page we should move it to the `components` folder meant for
reusable components.

Now we can do a similar refactoring in the `Restaurant.jsx` file. First remove
the computation variables and then replace the `<span>` used for showing the
stars, importing the `stars` component.

```jsx
<Stars restaurant={restaurant} />
```

And now we have a reusable component showing the correct number of stars for any
restaurant.

<GithubCommitViewer repo="gstark/TacoTuesday" commit="83b7be85a324960ebcdb7df78a2f4ddd60198702" />
