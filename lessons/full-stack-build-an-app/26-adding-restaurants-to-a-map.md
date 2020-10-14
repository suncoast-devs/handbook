---
title: Adding Restaurants to a Map
order: 26
---

# Adding Restaurants to a Map

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
```

```shell
dotnet ef database update
```

## Adding a package to help us geocode

In order to turn the restaurants address into a latitude and longitude we will
use a third party library.

```shell
dotnet add package Geocoding.Core
```

```shell
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

To accsss the key from the controller:

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

Let's also update our `seeds.sql` to add geocoded locations for our example
restaurants

```sql
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone", "Latitude", "Longitude") VALUES ('Thoughtbeat', 'Inverse zero administration benchmark', '07 Meadow Vale Drive', '314-651-9791', 27.7970127, -82.6403897);
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone", "Latitude", "Longitude") VALUES ('Dabtype', 'Organized stable firmware', '7 Miller Park', '523-760-6681', 27.7970543, -82.6557106);
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone", "Latitude", "Longitude") VALUES ('Topdrive', 'Object-based interactive application', '65 Eliot Lane', '650-993-7074', 27.7833108, -82.7159637 );
INSERT INTO "Restaurants" ("Name", "Description", "Address", "Telephone", "Latitude", "Longitude") VALUES ('Avaveo', 'Persistent zero defect process improvement', '2 Clarendon Junction', '715-663-5265', 27.7717197, -82.6522627);
```

<GithubCommitViewer repo="gstark/TacoTuesday" commit="ea5e45ae003e9a0656a2e4315ba4724a4b081212" />
