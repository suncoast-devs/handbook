---
title: Adding Images To Users
order: 29
---

# Adding Images To Users

When adding a user account, we can allow the upload of an avatar/profile image.

## Remove the "Must be logged in" restriction in the UploadsController

Remove the line
`[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]`
from the `UploadsController`.

Of course, this means anyone who wishes to can upload content and store it on
our Cloudinary. For now, this is ok. However, before deploying this to the
public, we should increase the security of this code.

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

## Update our `types.ts`

Add `photoURL` to our types.

```typescript
export type NewUserType = {
  fullName: string
  email: string
  password: string
  photoURL: string
}

export type LoginUserType = {
  email: string
  password: string
  photoURL: string
}

export type LoginSuccess = {
  token: string
  user: {
    id: number
    fullName: string
    email: string
    photoURL: string
  }
}
```

Clean up any warnings/errors this causes.

## Updating the SignUp page

Then we will import this component on our `SignUp.tsx` page:

```javascript
import { useDropzone } from 'react-dropzone'
```

Add the use of dropzone:

```typescript
const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop: onDropFile,
})
```

We'll add a state to track if we are uploading:

```javascript
const [isUploading, setIsUploading] = useState(false)
```

Also, copy over the `uploadFile` code from `NewRestaurant.tsx` - Copying the
code is ok for now. We can clean this up later.

Also, add a mutation:

```typescript
const uploadFileMutation = useMutation(uploadFile, {
  onSuccess: function (apiResponse: UploadResponse) {
    const url = apiResponse.url

    setNewUser({ ...newUser, photoURL: url })
  },

  onError: function (error: string) {
    setErrorMessage(error)
  },

  onSettled: function () {
    setIsUploading(false)
  },
})
```

The dropzone component is expecting a method to call when a file is dropped onto
a visible target in the UI. Let's add the method for that:

```javascript
async function onDropFile(acceptedFiles: File[]) {
  // Do something with the files
  const fileToUpload = acceptedFiles[0]

  setIsUploading(true)
  uploadFileMutation.mutate(fileToUpload)
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
  newUser.photoURL ? (
    <p>
      <img alt="User Photo" width={200} src={newUser.photoURL} />
    </p>
  ) : null
}
```

## Update the avatar image in the `App`

Change the avatar code to this, and remove the static avatar import.

```jsx
{
  isLoggedIn() && user.photoURL ? (
    <li className="avatar">
      <img
        src={user.photoURL}
        alt={`${user.fullName}'s Avatar`}
        height="64"
        width="64"
      />
    </li>
  ) : null
}
```

<!-- Adds the ability to upload an avatar for a user -->
<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="6eeab0b8d0a20990b8358f8177a5f23295783e7f"/>
