---
title: The Rest
order: 99
---

# Storing the user that created a restaurant and review

If we want to store the user that created a restaurant or a review, we need to
add some details to the models. Specifically, we will need to store the `UserId`
value in both of these models.

Add the following to both `Restaurant` and `Review`

```csharp
public int UserId { get; set; }
```

Once added we can run a single migration that will update both of these tables.

```shell
dotnet ef migrations add AddUserIdToRestaurantAndReview
```

and run the migrations

```shell
dotnet ef database update
```

## Storing the related user

We _could_ have the client send their `Id` along with the request to create a
restaurant and review. However, the current user id is not data we want to trust
to the API. Since anyone could change that value when sending a request we want
the **server** to be in control of associating that data. Thus we want to
provide the two controllers with a way to determine the id of the current user.

The first thing we need to do is modify `Startup.cs` slightly.

To the end of `ConfigureServices` add this code:

```csharp
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["JWT_KEY"]))
    };
});
```

Then, also in `Startup.cs` add this line of code just after `app.UseRouting()`:

```csharp
app.UseAuthorization();
```

Now we can a helper method to our controller just after the last method of the
controller in `RestaurantsController.cs`

```csharp
// Private helper method to get the JWT claim related to the user ID
private int GetCurrentUserId()
{
    // Get the User Id from the claim and then parse it as an integer.
    return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
}
```

We can then use this in our PostRestaurant method to help ensure we have user
IDs assigned.

To require a user to be logged in (have a valid JWT) add this line before the
`PostRestaurant` method:

```csharp
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
```

To assign a user to the restaurant, we will add this code to the _beginning_ of
the `PostRestaurant` implementation:

```csharp
// Set the UserID to the current user id, this overrides anything the user specifies.
restaurant.UserId = GetCurrentUserId();
```

Finally, lets send our authorization header token when making the request in
`AddRestuarant.jsx`:

```javascript
headers: { 'content-type': 'application/json', ...authHeader() },
```

And update our logic to handle `401` not authorized

```javascript
fetch('/api/Restaurants', {
  method: 'POST',
  headers: { 'content-type': 'application/json', ...authHeader() },
  body: JSON.stringify(newRestaurant),
})
  .then(response => {
    if (response.status === 401) {
      return { status: 401, errors: { login: 'Not Authorized ' } }
    } else {
      return response.json()
    }
  })
  .then(apiResponse => {
    if (apiResponse.status != 201) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      history.push('/')
    }
  })
```

Then we will make similar updates in the `ReviewsControler` and
`ShowRestaurant.jsx`

## Files Updated

- [ClientApp/src/pages/AddRestaurant.jsx}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/ClientApp/src/pages/AddRestaurant.jsx)
- [ClientApp/src/pages/ShowRestaurant.jsx}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/ClientApp/src/pages/ShowRestaurant.jsx)
- [Controllers/RestaurantsController.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Controllers/RestaurantsController.cs)
- [Controllers/ReviewsController.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Controllers/ReviewsController.cs)
- [Migrations/20200708205257_AddUserIdToRestaurantAndReview.Designer.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Migrations/20200708205257_AddUserIdToRestaurantAndReview.Designer.cs)
- [Migrations/20200708205257_AddUserIdToRestaurantAndReview.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Migrations/20200708205257_AddUserIdToRestaurantAndReview.cs)
- [Migrations/DatabaseContextModelSnapshot.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Migrations/DatabaseContextModelSnapshot.cs)
- [Models/Restaurant.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Models/Restaurant.cs)
- [Models/Review.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Models/Review.cs)
- [Startup.cs}(https://raw.githubusercontent.com/gstark/TacoTuesday/6eeef088d15fce1d6a61dd8a380915f989053b88/Startup.cs)

# Restrict Upvote and Downvote

Let's add tracking of who performed up and downvoting. This will allow us to
only allow a user to record a single vote.

First, we will add a model for `RestaurantVote` which will now create a real
database entity for the _resource_ we made earlier.

```csharp
namespace TacoTuesday.Models
{
    public class RestaurantVote
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RestaurantId { get; set; }
        public string UpOrDown { get; set; }
    }
}
```

Add the `RestaurantVotes` to the `DatabaseContext.cs`:

```csharp
// Tell the context about the RestaurantVotes collection/table
public DbSet<RestaurantVote> RestaurantVotes { get; set; }
```

Then generate a migration and update the database:

```shell
dotnet ef migrations add AddRestaurantVotes
dotnet ef database update
```

Then we can update the `RestaurantVotes` controller to:

- Ensure we are an authenticated user
- Check to see if we have already registered a vote
- Create the voting record
- Increment the restaurant vote totals

Add this code just after the `HttpPost` method in
`RestaurantVotesController.cs`:

```csharp
// Private helper method to get the JWT claim related to the user ID
private int GetCurrentUserId()
{
    // Get the User Id from the claim and then parse it as an integer.
    return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
}
```

Add this above the method definition:

```csharp
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
```

Add this to the beginning of the method implementation. The `AnyAsync` query
will attempt to detect an existing vote for this restaurant belonging to the
user that is making the request. If one is found, a `400` Bad Request is
returned and we do not complete the rest of the method.

```csharp
// If there is already an existing vote, return a bad request
var existingVote = await _context.RestaurantVotes.AnyAsync(restaurantVote => restaurantVote.UserId == GetCurrentUserId() && restaurantVote.RestaurantId == id);
if (existingVote)
{
    return BadRequest();
}

// Add the restaurant vote to the table
var restaurantVote = new RestaurantVote
{
    RestaurantId = id,
    UserId = GetCurrentUserId(),
    UpOrDown = upOrDown
};
await _context.RestaurantVotes.AddAsync(restaurantVote);
```

In `Restaurants.jsx` add the authentication header:

```javascript
headers: { 'content-type': 'application/json', ...authHeader() },
```

and hide the voting buttons unless the user is logged in

```jsx
{
  isLoggedIn() && (
    <small className="mr-3">
      <button
        className="btn btn-success btn-sm"
        onClick={event => {
          event.preventDefault()
          props.handleVote(restaurant.id, 'upvote')
        }}
      >
        <span className="mr-2" role="img" aria-label="upvote">
          👍🏻
        </span>
        {restaurant.upvoteCount}
      </button>
    </small>
  )
}
{
  isLoggedIn() && (
    <small className="mr-3">
      <button
        className="btn btn-danger btn-sm"
        onClick={event => {
          event.preventDefault()
          props.handleVote(restaurant.id, 'downvote')
        }}
      >
        <span className="mr-2" role="img" aria-label="downvote">
          👎🏻
        </span>{' '}
        {restaurant.downvoteCount}
      </button>
    </small>
  )
}
```

Now the user will only allow one vote per restaurant and we only allow
authenticated users to vote.

## Files Updated

- [ClientApp/src/pages/Restaurants.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/ClientApp/src/pages/Restaurants.jsx)
- [Controllers/RestaurantVotesController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Controllers/RestaurantVotesController.cs)
- [Migrations/20200709004514_AddRestaurantVotes.Designer.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Migrations/20200709004514_AddRestaurantVotes.Designer.cs)
- [Migrations/20200709004514_AddRestaurantVotes.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Migrations/20200709004514_AddRestaurantVotes.cs)
- [Migrations/DatabaseContextModelSnapshot.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Migrations/20200709004514_AddRestaurantVotes.cs)
- [Models/DatabaseContext.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Models/DatabaseContext.cs)
- [Models/RestaurantVote.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/4d2bc47a491e08d5156199cf59c39858697a2d7a/Models/RestaurantVote.cs)

---

# Adding the restaurants to a map

Another nice feature would be to show the list of restaurants on a map. In order
to map these restaurants we need to know exactly where the restaurants are. The
process of turning an address into a position, as well as turning a position
into an address, is known as
[`Geocoding`](https://en.wikipedia.org/wiki/Geocoding)

When _geocoding_ an address we are often turning the text of the address, it's
street number and name along with the city, state, and zip/postal code, into a
pair of numbers. These decimal numbers,
[`latitutde` and `longitude`](https://www.timeanddate.com/geography/longitude-latitude.html)
describe a single position on the surface of the planet.

## Adding columns to store a coordinate

Let's get ready for our geocoding practice by adding columns to our
`Restaurants` table to store these values.

```csharp
public double Latitude { get; set; }

public double Longitude { get; set; }
```

Then we will generate a migration for these columns and update the database

```shell
dotnet ef migrations add AddLatitudeAndLongitudeToRestaurant
dotnet ef database update
```

## Adding a package to help us geocode

In order to turn the restaurants address into a latitude and longitude we will
use a third party library.

```shell
dotnet add package Geocoding.Core
dotnet add package Geocoding.Microsoft
```

The `Geocoding` package comes with support for other services other than
Microsoft, but this is the one we will use in this lesson. Each of the geocoding
systems requires an account and an API key. Microsoft's signup process is one of
the easiest and we'll choose that to proceed. To sign up for a key, follow
[these procedures](https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key)

Similar to our `JWT_KEY` we will have to add a secret for this API. We'll call
the sercret `BING_MAPS_KEY` and access it in our `RestaurantsController`:

To save the key in secrets:

```csharp
dotnet user-secrets set "BING_MAPS_KEY" "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

Where `"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"` is the key
you generated at Microsoft.

> NOTE: If you are going to deploy this with Heroku, you'll need to run
> `heroku config:set BING_MAPS_KEY="xxxx"` with your specific key in place of
> `xxxx` at least once before you deploy.

To acecss the key from the controller:

```csharp
private readonly string BING_MAPS_KEY;

// Constructor that recives a reference to your database context
// and stores it in _context for you to use in your API methods
public RestaurantsController(DatabaseContext context, IConfiguration config)
{
    _context = context;
    BING_MAPS_KEY = config["BING_MAPS_KEY"];
}
```

Now that we have added this library and setup an API key, lets add some code to
`PostRestaurant` just before `restaurant.UserId = GetCurrentUserId();`

```csharp
// Create a new geocoder
var geocoder = new BingMapsGeocoder(BING_MAPS_KEY);

// Request this address to be geocoded.
var geocodedAddresses = await geocoder.GeocodeAsync(restaurant.Address);

// ... and pick out the best address sorted by the confidence level
var bestGeocodedAddress = geocodedAddresses.OrderBy(address => address.Confidence).LastOrDefault();

// If we have a best geocoded address, use the latitude and longitude from that result
if (bestGeocodedAddress != null)
{
    restaurant.Latitude = bestGeocodedAddress.Coordinates.Latitude;
    restaurant.Longitude = bestGeocodedAddress.Coordinates.Longitude;
}
```

Let's add some restaurants to our database and see what results we get for
geocoded addresses. Enter some restaurants with addresses you know and then
check, using `pgcli` that there are values for `latitude` and `longitude`

## Files Updated

- [Controllers/RestaurantsController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/Controllers/RestaurantsController.cs)
- [Migrations/20200712144700_AddLatitudeAndLongitudeToRestaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/Migrations/20200712144700_AddLatitudeAndLongitudeToRestaurant.cs)
- [Migrations/20200712144700_AddLatitudeAndLongitudeToRestaurant.Designer.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/Migrations/20200712144700_AddLatitudeAndLongitudeToRestaurant.Designer.cs)
- [Migrations/DatabaseContextModelSnapshot.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/Migrations/DatabaseContextModelSnapshot.cs)
- [Models/Restaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/Models/Restaurant.cs)
- [TacoTuesday.csproj](https://raw.githubusercontent.com/gstark/TacoTuesday/1728b4fff56fb5716a84185b4f3d8c432db72fb9/TacoTuesday.csproj)

---

# Add maps to our front end

To render a map within our front end we will be using another third party
library, `react-map-0gl`.

```shell
cd ClientApp
npm install --save react-map-gl
cd ..
```

## Getting another license key for our front end code.

We will be using `mapbox` as our mapping information provider. We will visit
[their website](https://www.mapbox.com/) and register for an API key.

We will create a file `.env.development.local` in the same location as our
`package.json` to store our API key in develoment. This defines
`environment variables` for our application. An
[environment variable](https://en.wikipedia.org/wiki/Environment_variable) is a
set of string-based keys and text values that are associated with the execution
of our application. Environment variables control many aspects of our command
prompt as well as our running applications. Since these are a per-app
configuration they also serve as a location for values such as API keys.

> NOTE: This is a different approach then dotnet takes for it's local
> configuration data. Both are good solutions each with their own issues and
> benefits. We are using an environment variable since this is the approach that
> our front end app setup prefers.

```text
REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoiZ2F2aW4tc3RhcmsiLCJhIjoiY2s5NXN0NmdhMHBwbjNtb203N280dHpjdyJ9.xxxxxxxxxxj21vXN8cEi26A
```

> NOTE: After changing this file you should stop and restart your
> `dotnet watch run`

Once we have installed the library, signed up for a key, and set our API key in
configuration, we will update our `Restaurants.jsx` component to show a map.

## Adding the map to the UI

First we will import `ReactMapGL` from our library:

```javascript
import ReactMapGL from 'react-map-gl'
```

And then set a state variable to store information about the map's zoom level,
size, and the coordinates of the center of the map. Here we will use the
coordinates of the SDG campus as our map center.

```javascript
const [viewport, setViewport] = useState({
  width: 500,
  height: 500,
  latitude: 27.77101804911986,
  longitude: -82.66090611749074,
  zoom: 8,
})
```

With this state we can add a map to the user interface:

```jsx
<div className="my-3 d-flex justify-content-center">
  <ReactMapGL
    {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
  ></ReactMapGL>
</div>
```

You will notice that we are taking all the attributes of our `viewport` state
and **spreading** them into the `ReactMapGL`. We carefully chose the name of the
properties of this state variable to correspond to the various properties of the
map we wish to control. Also notice that we provide the `mapboxApiAccessToken`
here as well. To access the value we placed in the `.env.development.local`
file, we use `process.env` which is an object containing all the environment
variables configured for the current process (app).

## Moving around the map

You may notice that while we can render a map and see a particular area we
cannot adjust the map by dragging. This is a common map interface so lets add
that feature. Luckily, again, our `viewport` state is setup perfectly to allow
us to handle this.

The `ReactMapGL` expects a property for `onViewportChange` that is a method that
takes new values for a viewport change. And since our `setViewport` is exactly
such a function we can use it by adding this to `ReactMapGL`

```jsx
<ReactMapGL
  {...viewport}
  onViewportChange={setViewport}
  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
></ReactMapGL>
```

Try dragging, pinching, and zooming the map!

## Adding pins to the map

If we wish to add pins to the map we must render an array of `<Marker>`
components inside our `ReactMapGL` component. A `<Marker>` is another map-gl
component. It requires a `latitude` and `longitude` property. Luckily for us,
our `restaurants` state now has that information from our api!

We can use our old friend the JavaScript `map()` function to generate these
markers.

When generating the array of `<Marker>` elements we specify the `latitude` and
`longitude` from the specific restaurant. We then render each marker's visual as
anything we like; here we just use the existing emoji character. We could use
text, an image, or any other react component as the marker representation.

```jsx
<ReactMapGL
  {...viewport}
  onViewportChange={setViewport}
  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
>
  {restaurants.map(restaurant => (
    <Marker latitude={restaurant.latitude} longitude={restaurant.longitude}>
      <span role="img" aria-label="taco">
        🌮
      </span>
    </Marker>
  ))}
</ReactMapGL>
```

## Adding interaction to the map

Next lets make it so we can click on a specific map and see some details of the
restaurant itself.

To do that we will add another state variable to track the
`selectedMapRestaurant` and initially set that value to `null`. When this
variable is `null` we mean that no restaurant is selected in the map. When this
variable is **not** null it means the value of the variable is the restaurant we
want to show.

```javascript
const [selectedMapRestaurant, setSelectedMapRestaurant] = useState(null)
```

Then just before we render our array of `<Marker>` we will add this code:

```jsx
{
  selectedMapRestaurant && (
    <Popup
      latitude={selectedMapRestaurant.latitude}
      longitude={selectedMapRestaurant.longitude}
      closeButton={true}
      closeOnClick={false}
      onClose={() => setSelectedMapRestaurant(null)}
      offsetTop={-5}
    >
      <div className="card my-3">
        <div className="card-header">{selectedMapRestaurant.name}</div>
        <div className="card-body"></div>
        {selectedMapRestaurant.description}
      </div>
    </Popup>
  )
}
```

This will render, if there is a selectedMapRestaurant, a `map-gl` based `Popup`
component at the coordinates of the selected restaurant. We also define an
`onClose` which the popup will use to dismiss the popup. For that we simply set
the `selectedMapRestaurant` to `null`. Inside the popup we will render a few
details of the restaurant.

Lastly, we need to add an `onClick` for our `<Marker>` so we can set the value
of `selectedMapRestaurant`

```jsx
<span
  role="img"
  aria-label="taco"
  onClick={() => setSelectedMapRestaurant(restaurant)}
>
  🌮
</span>
```

When clicking on markers you may notice that the popup appears _behind_ other
markers on the page. To resolve this, add the following CSS to your project:

```css
.mapboxgl-popup {
  z-index: 1;
}
```

Now we have a zoomable, draggable, and clickable map that represents data pulled
from our API.

> NOTE: If you are going to deploy this with Heroku, you'll need to run
> `heroku config:set REACT_APP_MAPBOX_TOKEN="xxxx"` with your specific key in
> place of `xxxx` at least once before you deploy.

## Files Updated

- [ClientApp/src/pages/Restaurants.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/385b003aa796ff38c8635c833a2d63bf3045107e/ClientApp/src/pages/Restaurants.jsx)
- [ClientApp/src/custom.scss](https://raw.githubusercontent.com/gstark/TacoTuesday/385b003aa796ff38c8635c833a2d63bf3045107e/ClientApp/src/custom.scss)
- [ClientApp/package.json](https://raw.githubusercontent.com/gstark/TacoTuesday/385b003aa796ff38c8635c833a2d63bf3045107e/ClientApp/package.json)
- [ClientApp/package-lock.json](https://raw.githubusercontent.com/gstark/TacoTuesday/385b003aa796ff38c8635c833a2d63bf3045107e/ClientApp/package-lock.json)

---

# Add an image to the Restaurant

It would be nice to add a profile image for the restaurant so we know what the
place looks like.

When storing user provided assets we can choose between hosting these assets
ourselves or using an external service to do so. Storing them ourselves gives us
more control over how these assets are stored. However, external services are
often more optimized for this process, provied lower cost storage options,
provide faster networking and more geographically distributed caching of these
assets making for a more efficient service for our users.

There are a number of providers for asset storage:

- Amazon Web Services S3
- Azure
- Google Cloud
- Cloudinary

In this lesson we will be using Cloudinary as the integration is more
straightforward and it does not require a paid plan to get started. If you are
interested in replacing Cloudinary with one of the other services there are
existing dotnet libraries to use.

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

Again thinking of uploads as a resource itself we will create a
`UploadsController` with only a single `POST` endpoint for creating uploads.

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

        // Constructor that recives a reference to your database context
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
        public ActionResult Upload()
        {
            return Ok();
        }
    }
}
```

Here we have just the shell of our controller. Notice we have not incorporated
the `DatabaseContext` since this controller will not be doing anything with the
database, but simply receiving files from the user and uploading them to
_Cloudinary_. Thus our constructor only takes in the configuration and saves off
the various _Cloudinary_ configration values we will need.k

Also we have protected the endpoint to only allow authorized users to upload
content. j

## Changing the controller to accept a file upload

We will now update the controller definition to accept a file upload, process
it, upload it to _Cloudinary_ and return to the user a URL to where the newly
uploaded file was stored. The front end will send us a file and once done will
use the uploaded file location when creating/updating the model.

The first thing we will do is update our endpoint to accept a file as input.

```csharp
public ActionResult Upload(IFormFile file)
```

Next we will ensure that we only accept images and content of a type that will
be supported.

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

Then we can add this code at the beginning of our `Upload` method:

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

Then we will import this component on our `AddRestaurant.jsx` page:

```javascript
import { useDropzone } from 'react-dropzone'
```

The dropzone component is expecting a method to call when a file is dropped onto
a visible target in the UI. Lets add the method for that:

```javascript
const onDropFile = acceptedFiles => {
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

Now lets add some user interface to show the user where to drop their files:

```jsx
<div className="alert alert-primary">
  <div {...getRootProps()}>
    <input {...getInputProps()} />
    {isDragActive
      ? 'Drop the files here ...'
      : 'Drag a new file here to upload!'}
  </div>
</div>
```

Try dragging and dropping a file on that part of the UI. When you drop a file
you will see the details of your dropped file logged by the `onDropFile` method.

Now we can update `onDropFile` to process the upload.

```javascript
const onDropFile = async acceptedFiles => {
  // Do something with the files
  const fileToUpload = acceptedFiles[0]
  console.log(fileToUpload)

  // Create a formData object so we can send this
  // to the API that is expecting som form data.
  const formData = new FormData()

  // Append a field that is the form upload itself
  formData.append('file', fileToUpload)

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
}
```

Finally we will update the `ShowRestaurant` component to display the restaurant
image, if present, in place of the taco emoji.

```jsx
{
  restaurant.photoURL ? (
    <img
      alt="Restaurant Photo"
      width={200}
      className="pr-3"
      src={restaurant.photoURL}
    />
  ) : (
    <span className="pr-3 display-2" role="img" aria-label="taco">
      🌮
    </span>
  )
}
```

## Files Updated

- [ClientApp/package.json](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/ClientApp/package.json)
- [ClientApp/package-lock.json](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/ClientApp/package-lock.json)
- [TacoTuesday.csproj](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/TacoTuesday.csproj)
- [Models/Restaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/Models/Restaurant.cs)
- [Migrations/20200712195424_AddPhotoURLToRestaurant.Designer.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/Migrations/20200712195424_AddPhotoURLToRestaurant.Designer.cs)
- [Migrations/20200712195424_AddPhotoURLToRestaurant.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/Migrations/20200712195424_AddPhotoURLToRestaurant.cs)
- [Migrations/DatabaseContextModelSnapshot.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/Migrations/DatabaseContextModelSnapshot.cs)
- [Controllers/UploadsController.cs](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/Controllers/UploadsController.cs)
- [ClientApp/src/pages/AddRestaurant.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/ClientApp/src/pages/AddRestaurant.jsx)
- [ClientApp/src/pages/ShowRestaurant.jsx](https://raw.githubusercontent.com/gstark/TacoTuesday/a803847fad53b96d2e2db34d31035d5b486b5fab/ClientApp/src/pages/ShowRestaurant.jsx)

<!-- Whats next

  Use Axios instead of `fetch` to show it being easier

 -->
