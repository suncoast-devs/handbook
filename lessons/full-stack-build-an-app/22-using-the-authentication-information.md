---
title: Using the Authentication Information
order: 22
---

## Using the Authentication Information

# Navigation Buttons

Let's update the sign in and sign up buttons/links to only display if the user
is **not logged in**

```jsx
{
  isLoggedIn() || (
    <Link className="btn btn-success mr-2" to="/signin">
      Sign in
    </Link>
  )
}
{
  isLoggedIn() || (
    <Link className="btn btn-success mr-2" to="/signup">
      Sign up
    </Link>
  )
}
```

Here we test if the user is logged in, and if they are **not** then we show the
`<Link>`. This works since `isLoggedIn()` returns either `true` or `false` -- If
the value is `false` then JavaScript will interpret, and return the second part
of the boolean logic, which is the `<Link>` -- If the value is `true` then
JavaScript just renders that, and React renders a value of `true` as nothing.
The second part of the logic doesn't need to be considered. This effectively
only shows the links if the user is **not** logged in.

Next we can add a `Sign out` button after the form:

```jsx
{
  isLoggedIn() && (
    <span className="link" onClick={handleLogout}>
      Sign out
    </span>
  )
}
```

This only shows the logout button if the user **is logged in**.

We will also add a method to handle the logout:

```jsx
function handleLogout() {
  logout()

  window.location.assign('/')
}
```

Now let's only show the avatar, welcome message, and create new restaurant if
the user is logged in.

To determine the user we'll add a call to `getUser` from `auth.js`

```javascript
const user = getUser()
```

and then we can use that in place of the user's name hard coded name:

```jsx
{
  isLoggedIn() && <p>Welcome back, {user.fullName}!</p>
}
```

We haven't added an avatar image upload for the user, so we'll leave this hard
coded for the moment.

```jsx
{
  isLoggedIn() && (
    <li className="avatar">
      <img src={avatar} alt="Steve's Avatar" height="64" width="64" />
    </li>
  )
}
```

And to update the add new restaurant button:

```jsx
{
  isLoggedIn() && (
    <Link to="/new">
      <i className="fa fa-plus"></i> Restaurant
    </Link>
  )
}
```

# Hide the "New Review" form unless logged in

We will wrap the `<h3>` and the `<form>` in a fragment tag so that we can place
them in a group. We then prefix that with the `isLoggedIn() &&` that will show
that JSX for logged in users.

```jsx
{
  isLoggedIn() && (
    <>
      <h3>Enter your own review</h3>
      <form onSubmit={handleNewReviewSubmit}>
        {/* all the form contents not shown here */}
      </form>
    </>
  )
}
```

<GithubCommitViewer repo="gstark/TacoTuesday" commit="ef91cc599fc48885569ed3add347673dce21b6d0"/>
