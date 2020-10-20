---
title: Restaurant Edit
order: 33
---

# Restaurant Edit

The setup for a restaurant edit will be very similar to creating a new
restaurant. In fact most of the JSX will be the same except we will first load
the information about a restaurant into state before showing the form itself.

We will begin by creating the basic structure of the restaurant edit in
`EditRestaurant.jsx`

## Creating `EditRestuarant.jsx`

```jsx
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'

import { authHeader } from '../auth'

export function EditRestaurant() {
  const history = useHistory()

  const [isUploading, setIsUploading] = useState(false)

  const [errorMessage, setErrorMessage] = useState()

  const [restaurant, setRestaurant] = useState({
    name: '',
    description: '',
    address: '',
    telephone: '',
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedRestaurant = { ...restaurant, [fieldName]: value }

    setRestaurant(updatedRestaurant)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/Restaurants', {
      method: 'PUT',
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(restaurant),
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

  async function onDropFile(acceptedFiles) {
    // Do something with the files
    const fileToUpload = acceptedFiles[0]
    console.log(fileToUpload)

    // Create a formData object so we can send this
    // to the API that is expecting som form data.
    const formData = new FormData()

    // Append a field that is the form upload itself
    formData.append('file', fileToUpload)

    try {
      setIsUploading(true)

      // Use fetch to send an authorization header and
      // a body containing the form data with the file
      const response = await fetch('/api/Uploads', {
        method: 'POST',
        headers: {
          ...authHeader(),
        },
        body: formData,
      })

      setIsUploading(false)

      // If we receive a 200 OK response, set the
      // URL of the photo in our state so that it is
      // sent along when creating the restaurant,
      // otherwise show an error
      if (response.status === 200) {
        const apiResponse = await response.json()

        const url = apiResponse.url

        setRestaurant({ ...restaurant, photoURL: url })
      } else {
        setErrorMessage('Unable to upload image')
      }
    } catch (error) {
      // Catch any network errors and show the user we could not process their upload
      console.debug(error)
      setErrorMessage('Unable to upload image')
      setIsUploading(false)
    }
  }

  let dropZoneMessage = 'Drag a picture of the restaurant here to upload!'

  if (isUploading) {
    dropZoneMessage = 'Uploading...'
  }

  if (isDragActive) {
    dropZoneMessage = 'Drop the files here ...'
  }

  return (
    <main className="page">
      <nav>
        <Link to="/">
          <i className="fa fa-home"></i>
        </Link>
        <h2>Add a Restaurant</h2>
      </nav>
      <form onSubmit={handleFormSubmit}>
        {errorMessage && <p>{errorMessage}</p>}
        <p className="form-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={restaurant.name}
            onChange={handleStringFieldChange}
          />
        </p>
        <p className="form-input">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={restaurant.description}
            onChange={handleStringFieldChange}
          ></textarea>
          <span className="note">
            Enter a brief description of the restaurant.
          </span>
        </p>
        <p className="form-input">
          <label htmlFor="name">Address</label>
          <textarea
            name="address"
            value={restaurant.address}
            onChange={handleStringFieldChange}
          ></textarea>
        </p>
        <p className="form-input">
          <label htmlFor="name">Telephone</label>
          <input
            type="tel"
            name="telephone"
            value={restaurant.telephone}
            onChange={handleStringFieldChange}
          />
        </p>

        {restaurant.photoURL && (
          <p>
            <img alt="Restaurant Photo" width={200} src={restaurant.photoURL} />
          </p>
        )}

        <div className="file-drop-zone">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {dropZoneMessage}
          </div>
        </div>

        <p>
          <input type="submit" value="Submit" />
        </p>
      </form>
    </main>
  )
}
```

This is essentially a duplication of the `NewRestaurant` with a few variables
changed. For example `newRestaurant` becomes `restaurant`. We also change the
API's use of `POST` to `PUT` so we are no longer creating a restaurant but
_updating_ the existing one. We also change the URL to `/api/Restaurants/${id}`

To fetch the editing restaurant we'll add this code at the top of the component:

```javascript
const params = useParams()
const id = params.id
```

This will get the `id` from the route parameters. Even though we haven't written
the `<Route>` we know it will have a `:id` in the paramters.

Next we add a `useEffect` to find and load this restaurant. This implementation
is in `Restaurant.jsx` so we can essentially copy it from there

```javascript
useEffect(() => {
  fetchRestaurant()
}, [id])

const fetchRestaurant = async () => {
  const response = await fetch(`/api/Restaurants/${id}`)
  const apiData = await response.json()

  setRestaurant(apiData)
}
```

Just before the `return` of the main page, we can add a check to only show the
form once the restaurant is fetched:

```jsx
// If we don't have any restaurant ID, return an empty component
if (!restaurant.id) {
  return <></>
}
```

## Update our routes in `App.jsx`

We'll add the following route to allow a path to the `EditRestuarant` component

```jsx
<Route exact path="/restaurants/:id/edit">
  <EditRestaurant />
</Route>
```

## Using the route from `Restaurant.jsx`

Next we will add an `Edit` button on the `Restaurant.jsx` page to send us to the
`/restaurants/:id/edit` URL. We only show this link if the user is logged in and
the user id for this restaurant is the same as the logged in user.

```jsx
{
  isLoggedIn() && restaurant.userId === user.id && (
    <p>
      <Link className="button" to={`/restaurants/${id}/edit`}>
        Edit
      </Link>
    </p>
  )
}
```

## Protecting the controller

We should also make a similar change to the controller. The controller should
ensure the user is logged in and the current user is the same as the user that
created the restaurant itself.

First add
`[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]` to
the `PutRestaurant` method.

Before all the other logic in the method we will add this code to find the
restaurant in the database and check it's user id. If these do not match we'll
return a custom unauthorized message.

```csharp
// Find this restaurant by looking for the specific id
var restaurantBelongsToUser = await _context.Restaurants.AnyAsync(restaurant => restaurant.Id == id && restaurant.UserId == GetCurrentUserId());
if (!restaurantBelongsToUser)
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
```

With this we guarantee that the controller only allows authorized users to edit
a restaurant.
