---
title: Adding Images To Users
order: 29
---

# Adding Images To Users

When adding a user account we can allow the upload of an avatar/profile image.

## Remove the "Must be logged in" restriction in the UploadsController

Remove the line
`[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]`
from the `UploadsController`.

Of course this means that anyone who wishes to can upload content and store it
on our Cloudinary. For now this is ok, but a more secure option should be
determined before deploying this to the public.

## Adding the photo URL to the User model

Now we can update the `User.cs` model to store a URL to the uploaded image.

```csharp
public string PhotoURL { get; set; }
```

```shell
dotnet ef migrations add AddPhotoURLToUser
```

```shell
dotnet ef database update
```

## Updating the SignUp page

Then we will import this component on our `SignUp.jsx` page:

```javascript
import { useDropzone } from 'react-dropzone'
```

We'll add a state to track if we are uploading:

```javascript
const [isUploading, setIsUploading] = useState(false)
```

The dropzone component is expecting a method to call when a file is dropped onto
a visible target in the UI. Lets add the method for that:

```javascript
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
    // sent along when creating the user,
    // otherwise show an error
    if (response.status === 200) {
      const apiResponse = await response.json()

      const url = apiResponse.url

      setNewUser({ ...newUser, photoURL: url })
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
```

Then create a variable to hold the drop zone message:

```javascript
let dropZoneMessage = 'Drag a picture of the user here to upload!'

if (isUploading) {
  dropZoneMessage = 'Uploading...'
}

if (isDragActive) {
  dropZoneMessage = 'Drop the files here ...'
}
```

Then we can add an interface for showing a drop target for the photo upload.

```jsx
<div className="file-drop-zone">
  <div {...getRootProps()}>
    <input {...getInputProps()} />
    {dropZoneMessage}
  </div>
</div>
```

## Add an image preview

Add a preview of the image so the user can see the current upload.

Add this code just above the drop zone:

```jsx
{
  newUser.photoURL && (
    <p>
      <img alt="User Photo" width={200} src={newUser.photoURL} />
    </p>
  )
}
```

## Update the avatar image in the `App`

Change the avatar code to this, and remove the static avatar import.

```jsx
{
  isLoggedIn() && user.photoURL && (
    <li className="avatar">
      <img
        src={user.photoURL}
        alt={`${user.fullName}'s Avatar`}
        height="64"
        width="64"
      />
    </li>
  )
}
```
