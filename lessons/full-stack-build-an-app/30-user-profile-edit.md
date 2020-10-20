---
title: User Profile Edit
order: 30
---

# User Profile Edit

Lets add a page and feature to allow the user to update their profile.

The first thing we will do is to create the component for editing a user. This
will look a lot like the `SignUp.jsx` component

Here are some notable differences:

1. We add the `id` and the `photoURL` to the initial `useState`
1. We use `PUT` and a URL that includes the user's id
1. When we get a positive API response we call a method in `auth.js` named
   `updateUserAuth` that updates the local storage.
1. When we get a positive API response we use `window.location` to force a full
   page refresh so we fetch fresh auth information to display (name and avatar)

## `EditUser.jsx`

```jsx
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'

import { authHeader, getUser, updateUserAuth } from '../auth'

export function EditUser() {
  const history = useHistory()
  const user = getUser()

  const [errorMessage, setErrorMessage] = useState()

  const [updatedUser, setUpdatedUser] = useState({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    password: '',
    photoURL: user.photoURL,
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

  const [isUploading, setIsUploading] = useState(false)

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const newUpdatedUser = { ...updatedUser, [fieldName]: value }

    setUpdatedUser(newUpdatedUser)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch(`/api/Users/${user.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(updatedUser),
    })

    const apiResponse = await response.json()

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      updateUserAuth(apiResponse)
      window.location.assign('/')
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

        setUpdatedUser({ ...updatedUser, photoURL: url })
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

  let dropZoneMessage = 'Drag a picture of yourself here!'

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
        <h2>Edit Profile</h2>
      </nav>

      <form onSubmit={handleFormSubmit}>
        {errorMessage && <p>{errorMessage}</p>}
        <p className="form-input">
          <label htmlFor="fullName">Name</label>
          <input
            type="text"
            name="fullName"
            value={updatedUser.fullName}
            onChange={handleStringFieldChange}
          />
        </p>
        <p className="form-input">
          <label htmlFor="name">Email</label>
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleStringFieldChange}
          />
        </p>
        <p className="form-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={updatedUser.password}
            onChange={handleStringFieldChange}
          />
        </p>
        {updatedUser.photoURL && (
          <p>
            <img alt="User Photo" width={200} src={updatedUser.photoURL} />
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

## App.jsx changes

We'll add a profile link in the navigation

```jsx
{
  isLoggedIn() && <Link to="/profile">Profile</Link>
}
```

and a route

```jsx
<Route exact path="/profile">
  <EditUser />
</Route>
```

## UsersController changes

We add back in a `Put` method. The first difference in this version of a `PUT`
is that we make sure to make this an authorized endpoint. Next we ensure the
user id is equal to the current user's id. This prevents someone from editing a
profile that is not theirs.

```csharp
// PUT: api/Users/5
//
// Update an individual User with the requested id. The id is specified in the URL
// In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
// to grab the id from the URL. It is then made available to us as the `id` argument to the method.
//
// In addition the `body` of the request is parsed and then made available to us as a User
// variable named User. The controller matches the keys of the JSON object the client
// supplies to the names of the attributes of our User POCO class. This represents the
// new values for the record.
//
[HttpPut("{id}")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public async Task<IActionResult> PutUser(int id, User User)
{
    // If the ID in the URL does not match the ID in the supplied request body, return a bad request
    if (id != User.Id)
    {
        return BadRequest();
    }

    if (id != GetCurrentUserId())
    {
        return BadRequest();
    }

    // Tell the database to consider everything in User to be _updated_ values. When
    // the save happens the database will _replace_ the values in the database with the ones from User
    _context.Entry(User).State = EntityState.Modified;

    try
    {
        // Try to save these changes.
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        // Ooops, looks like there was an error, so check to see if the record we were
        // updating no longer exists.
        if (!UserExists(id))
        {
            // If the record we tried to update was already deleted by someone else,
            // return a `404` not found
            return NotFound();
        }
        else
        {
            // Otherwise throw the error back, which will cause the request to fail
            // and generate an error to the client.
            throw;
        }
    }

    // return NoContent to indicate the update was done. Alternatively you can use the
    // following to send back a copy of the updated data.
    //
    return Ok(User);
}

// Private helper method that looks up an existing User by the supplied id
private bool UserExists(int id)
{
    return _context.Users.Any(User => User.Id == id);
}

// Private helper method to get the JWT claim related to the user ID
private int GetCurrentUserId()
{
    // Get the User Id from the claim and then parse it as an integer.
    return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
}
```

## Future improvement

We allow the user to update their password without confirming their existing
password. This is a security risk if someone leaves their computer alone. Anyone
who has access can change the password without confirmation. We also allow the
email address to change without any confirmation.

Both of these should have checks in place to make sure someone doesn't hijack
our accounts.

<GithubCommitViewer repo="gstark/TacoTuesday" commit="7fbeb6cc2e11fbea96a4d7c77265b3809b35b4df" />
