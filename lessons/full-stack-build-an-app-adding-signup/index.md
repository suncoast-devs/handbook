---
title: Adding Sign Up
order: 18
---

# Adding the Sign-Up feature

Now we will update our static `SignUp.tsx` to become dynamic and add the
capability of submitting a user for sign up. The first step is to add state to
store the new user and an error message:

We'll add a type to the `types.ts` file

```typescript
export type NewUserType = {
  fullName: string
  email: string
  password: string
}
```

```typescript
const [errorMessage, setErrorMessage] = useState('')

const [newUser, setNewUser] = useState<NewUserType>({
  fullName: '',
  email: '',
  password: '',
})
```

We can add a `<p>` tag to show the error message:

```jsx
{
  errorMessage ? <p>{errorMessage}</p> : null
}
```

then add `useHistory` so we can redirect the user after signing up:

```javascript
const history = useHistory()
```

## Define handlers for the fields

then we will add a function to handle the user's input in the fields:

```javascript
function handleStringFieldChange(event) {
  const value = event.target.value
  const fieldName = event.target.name

  const updatedUser = { ...newUser, [fieldName]: value }

  setNewUser(updatedUser)
}
```

Now use our two handling functions for the various `<input>` fields and the
`<form>`

Update each `<input>` field to use this function as the `onChange` and add a
`value` property to equal the appropriate attribute from `newUser`

## Mutation

Add a function to submit the new user:

```javascript
async function submitNewUser(newUser: NewUserType) {
  const response = await fetch('/api/Users', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newUser),
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}
```

Define a mutation for creating the new user:

```typescript
const createUserMutation = useMutation(
  (newUser: NewUserType) => submitNewUser(newUser),
  {
    onSuccess: function () {
      history.push('/')
    },
    onError: function (error: APIError) {
      setErrorMessage(Object.values(error.errors).join('. '))
    },
  }
)
```

## Submit the form

Change the `<form>` element to use our new mutation:

```jsx
<form
  onSubmit={(event) => {
    event.preventDefault()

    createUserMutation.mutate(newUser)
  }}
>
```

We will also add a route in `App.jsx`

```jsx
<Route path="/signup">
  <SignUp />
</Route>
```

And we will also add a button to our main navigation.

```jsx
<Link to="/signup">Sign Up</Link>
```

And with this, we have the ability for users to sign up for our app!

<!-- Update the signup comonent to create a user -->

<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="e921d402b70701208882254964a9b14b3f5433cb"/>
