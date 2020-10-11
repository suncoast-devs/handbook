---
title: Create Reviews
order: 13
---

# Create a review

The page that shows an individual restaurant has a form to create a new review.
In this step we will use a state variable to track the values in the form and
then POST them to the API. These steps are like those for the form to create a
new restaurant.

## Create a controller

First, we must create a controller for the reviews. We will use the code
generator again to make this controller.

```shell
dotnet aspnet-codegenerator controller --model Review -name ReviewsController --useAsyncActions -api --dataContext DatabaseContext --relativeFolderPath Controllers
```

This will create _Controllers/ReviewsController.cs_ with code to create, read,
update, and delete reviews.

Looking at this controller and our user interface we see that we do not need to
get a listing of all reviews, nor do we need to access a single review, nor do
we need to update or delete reviews. Thus we should only keep the one endpoint,
the `POST /api/Reviews` to create a new review. Remove all the methods other
than `PostReview`

## Update the user interface

In `Restaurant.jsx` we will add a state to track the fields of the review.

```javascript
const [newReview, setNewReview] = useState({
  body: '',
  summary: '',
  restaurantId: id,
})
```

Notice that we include, by default, the related restaurant id. This will be
required by the API to associate the review to the correct restaurant.

We will also have to change `const id = params.id` to
`const id = Number(params.id)` to ensure that the `id` value is an integer since
the backend API will demand this.

Then we will create a method to track the changes of the text input fields:

```javascript
function handleNewReviewTextFieldChange(event) {
  const name = event.target.name
  const value = event.target.value

  setNewReview({ ...newReview, [name]: value })
}
```

Update the `input` and `textArea` fields with the values from `newReview`, the
`onChange` event, and a correct `name` attribute.

```jsx
<input
  type="text"
  className="form-control"
  id="summary"
  aria-describedby="summaryHelp"
  value={newReview.summary}
  onChange={handleNewReviewTextFieldChange}
/>
```

and

```jsx
<textarea
  className="form-control"
  id="body"
  value={newReview.body}
  onChange={handleNewReviewTextFieldChange}
/>
```

## Handling the star rating

We implment the star rating as a series of radio buttons. To use these radio
buttons to update the `star` property of the `newReview` state remove the
`value` attribute and introduce a `checked` attribute. Do this to each of the
radio buttons:

```jsx
<input
  id="star-rating-1"
  type="radio"
  name="stars"
  checked={newReview.stars === 1}
/>
```

Then we will define a method to handle clicking on the radio button:

```javascript
function handleStarRadioButton(newStars) {
  setNewReview({ ...newReview, stars: newStars })
}
```

Now update the radio inputs to call this function when clicked. Do this for each
star rating input.j

```jsx
<input
  id="star-rating-4"
  type="radio"
  name="stars"
  checked={newReview.stars === 4}
  onChange={() => handleStarRadioButton(4)}
/>
```

## Check out the interface with React Developer Tools

We can check the form in react developer tools to make sure that our internal
state variable follows the data we are inputting in the form.

## Handle submitting the form

Create a method to handle the form submit

```javascript
async function handleNewReviewSubmit(event) {
  event.preventDefault()

  const response = await fetch(`/api/Reviews`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newReview),
  })
}
```

and

```jsx
<form onSubmit={handleNewReviewSubmit}>
```

If you use the app at this point you can put in a new review and submit it.
Doing so will submit the review but you'll have to manually refresh the page to
see the change.

Then we will move `fetchRestaurant` from outside of the `useEffect` method so
both the `useEffect` and `handleNewReviewSubmit` can access it.

We also clear out the new restaurant fields. We'll add one more
`setNewRestaurant` after the `fetchNewRestaurant` in `handleNewReviewSubmit`

```javascript
async function handleNewReviewSubmit(event) {
  event.preventDefault()

  const response = await fetch(`/api/Reviews`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newReview),
  })

  setNewReview({
    ...newReview,
    body: '',
    summary: '',
    stars: 0,
  })
  fetchRestaurant()
}
```

<GithubCommitViewer repo="gstark/TacoTuesday" commit="7d2f8791605038ebf0ffdd37d5994d3d2641306c" />
