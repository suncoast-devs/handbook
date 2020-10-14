---
title: Adding Images To Restaurants
order: 28
---

# Adding Images To Restaurants

It would be nice to add an image for the restaurant so we know what the place
looks like.

When storing user provided assets we can choose between hosting these assets
ourselves or using an external service to do so. Storing them ourselves gives us
more control over how these assets are stored. However, external services are
often more optimized for this process, provied lower cost storage options,
provide faster networking and more geographically distributed caching of these
assets making for a more efficient service for our users.

The following are some of the popular choices for asset storage.

- Amazon Web Services S3
- Azure
- Google Cloud
- Cloudinary

In this lesson we will be using Cloudinary since the integration is more
straightforward and does not require a paid plan to get started. If you are
interested in replacing Cloudinary with one of the other services you may
research existing dotnet libraries for those platforms.

## Adding Cloudinary

First we will sign up at Cloudinary for an API KEY. When you have your account
created you'll need three values:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

We will set all three in our secrets:

```shell
dotnet user-secrets set "CLOUDINARY_CLOUD_NAME" "REPLACE THIS"
dotnet user-secrets set "CLOUDINARY_API_KEY"    "REPLACE THIS"
dotnet user-secrets set "CLOUDINARY_API_SECRET" "REPLACE THIS"
```

After securing these values we will add the `Cloudinary` third party package to
our app:

```shell
dotnet add package CloudinaryDotNet
```

## Creating a controller for uploading files

As we will consider uploads as a resource we will create a `UploadsController`
with a single `POST` endpoint for creating uploads.

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace TacoTuesday.Controllers
{
    // All of these routes will be at the base URL:     /api/Uploads
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case RestaurantsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class UploadsController : ControllerBase
    {
        private readonly string CLOUDINARY_CLOUD_NAME;
        private readonly string CLOUDINARY_API_KEY;
        private readonly string CLOUDINARY_API_SECRET;

        // Constructor that receives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public UploadsController(IConfiguration config)
        {
            CLOUDINARY_CLOUD_NAME = config["CLOUDINARY_CLOUD_NAME"];
            CLOUDINARY_API_KEY = config["CLOUDINARY_API_KEY"];
            CLOUDINARY_API_SECRET = config["CLOUDINARY_API_SECRET"];
        }

        // POST: api/Uploads
        //
        // Creates a new uploaded file
        //
        // The `body` of the request is parsed and then made available to us as a User
        // variable named user. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our User POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [RequestSizeLimit(10_000_000)]
        public ActionResult Upload()
        {
            return Ok();
        }
    }
}
```

Here we have the shell of our controller. Notice we have not incorporated the
`DatabaseContext` since this controller will not be doing anything with the
database. It receives files from the user and uploads them to _Cloudinary_. Our
constructor takes in the configuration and saves the _Cloudinary_ configuration
values we will need.

We have protected the endpoint to only allow authorized users to upload content.

We also set an upload size maximum to avoid allowing large images (and to ensure
we can upload files at _least_ that size) -- Cloudinary has a limit of about
10MB for uploads.

## Changing the controller to accept a file upload

We will now update the controller definition to accept an upload, process it,
send it to _Cloudinary_, and return the Cloudinary URL of the newly uploaded
file.

The first thing we will do is update our endpoint to accept a file as input.

```csharp
public ActionResult Upload(IFormFile file)
```

Next we will ensure that we limit our uploads to supported images types.

To do so we'll make a class property to hold a _set_ of strings of the content
types allowed. We will use the `HashSet` collection type since it is efficient
for fast lookups, and does not allow for duplicates (unlike a `List`)

```csharp
private readonly HashSet<string> VALID_CONTENT_TYPES = new HashSet<string> {
    "image/jpg",
    "image/jpeg",
    "image/pjpeg",
    "image/gif",
    "image/x-png",
    "image/png",
};
```

Then we can add the following code at the beginning of our `Upload` method:

```csharp
// Check this content type against a set of allowed content types
var contentType = file.ContentType.ToLower();
if (!VALID_CONTENT_TYPES.Contains(contentType))
{
    // Return a 400 Bad Request when the content type is not allowed
    return BadRequest("Not Valid Image");
}
```

After validating the content type we can proceed to send the content to
_Cloudinary_

```csharp
// Create and configure a client object to be able to upload to Cloudinary
var cloudinaryClient = new Cloudinary(new Account(CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET));

// Create an object describing the upload we are going to process.
// We will provide the file name and the stream of the content itself.
var uploadParams = new ImageUploadParams()
{
    File = new FileDescription(file.FileName, file.OpenReadStream())
};

// Upload the file to the server
ImageUploadResult result = await cloudinaryClient.UploadLargeAsync(uploadParams);

// If the status code is a "OK" then the upload was accepted so we will return
// the URL to the client
if (result.StatusCode == HttpStatusCode.OK)
{
    var urlOfUploadedFile = result.SecureUrl.AbsoluteUri;

    return Ok(new { url = urlOfUploadedFile });
}
else
{
    // Otherwise there was some failure in uploading
    return BadRequest("Upload failed");
}
```

## Adding the photo URL to the model

Now we can update the `Restaurant.cs` model to store a URL to the uploaded
image.

```csharp
public string PhotoURL { get; set; }
```

```shell
dotnet ef migrations add AddPhotoURLToRestaurant
dotnet ef database update
```

## Updating the user interface to upload a photo when creating a restaurant

To allow a user to upload a file to our restaurant we'll use a fancy
drag-and-drop library to create an interface for the upload.

```shell
cd ClientApp
npm install --save react-dropzone
cd ..
```

This adds a react component library that has great support for dragging and
dropping files into our UI.

Then we will import this component on our `NewRestaurant.jsx` page:

```javascript
import { useDropzone } from 'react-dropzone'
```

The dropzone component is expecting a method to call when a file is dropped onto
a visible target in the UI. Lets add the method for that:

```javascript
function onDropFile(acceptedFiles) {
  // Do something with the files
  const fileToUpload = acceptedFiles[0]
  console.log(fileToUpload)
}
```

For now we will just have this log the details of the files dropped and get log
details of the first one. We are only going to allow single file drops for now.

Next we will get some configuration information from the dropzone library:

```javascript
const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop: onDropFile,
})
```

Replace the existing form input field for a photo with the following:

```jsx
<div className="file-drop-zone">
  <div {...getRootProps()}>
    <input {...getInputProps()} />
    {isDragActive
      ? 'Drop the files here ...'
      : 'Drag a picture of the restaurant here to upload!'}
  </div>
</div>
```

Try dragging and dropping a file on that part of the UI. When you drop a file
you will see the details of your dropped file logged by the `onDropFile` method.

Now we can update `onDropFile` to process the upload.

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
    // Use fetch to send an authorization header and
    // a body containing the form data with the file
    const response = await fetch('/api/Uploads', {
      method: 'POST',
      headers: {
        ...authHeader(),
      },
      body: formData,
    })

    // If we receive a 200 OK response, set the
    // URL of the photo in our state so that it is
    // sent along when creating the restaurant,
    // otherwise show an error
    if (response.status === 200) {
      const apiResponse = await response.json()

      const url = apiResponse.url

      setNewRestaurant({ ...newRestaurant, photoURL: url })
    } else {
      setErrorMessage('Unable to upload image')
    }
  } catch {
    // Catch any network errors and show the user we could not process their upload
    console.debug(error)
    setErrorMessage('Unable to upload image')
  }
}
```

## Show a message during the upload process

Uploading a file can be slow, so let's add some status to the process. First add
a new state to indicate we are actively uploading a file:

```javascript
const [isUploading, setIsUploading] = useState(false)
```

Then update our `onDropFile` to the the state to true when we start the upload
and back to false when complete.

```javascript
setIsUploading(true)

// The `fetch` code is here

setIsUploading(false)
```

Also add `setIsUploading(false)` to the catch block.

Then create a variable to hold the drop zone message:

```javascript
let dropZoneMessage = 'Drag a picture of the restaurant here to upload!'

if (isUploading) {
  dropZoneMessage = 'Uploading...'
}

if (isDragActive) {
  dropZoneMessage = 'Drop the files here ...'
}
```

Replace the drop zone message itself:

```jsx
<div className="file-drop-zone">
  <div {...getRootProps()}>
    <input {...getInputProps()} />
    {dropZoneMessage}
  </div>
</div>
```

## Add an image preview on the `NewRestaurant` page

Add a preview of the image to the `NewRestaurant` component so the user can see
the current upload.

Add this code just above the drop zone:

```jsx
{
  newRestaurant.photoURL && (
    <p>
      <img alt="Restaurant Photo" width={200} src={newRestaurant.photoURL} />
    </p>
  )
}
```

## Show the image on the `Restaurant` page

Update the `Restaurant` component to display the restaurant image, if present.

```jsx
{
  restaurant.photoURL && (
    <img alt="Restaurant Photo" width={200} src={restaurant.photoURL} />
  )
}
```
