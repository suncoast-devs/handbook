---
title: Adding Maps to the Front End
order: 27
---

# Add Maps to the Front End

To render a map within our front end, we will be using another third-party
library, `react-map-gl`.

```shell
cd ClientApp
npm install --save react-map-gl
cd ..
```

## Getting another license key for our front-end code.

We will be using `mapbox` as our mapping information provider. We will visit
[their website](https://www.mapbox.com/) and register for an API key.

We will create a file `.env.development.local` in the `ClientApp` directory in
the same location as our `package.json` to store our API key in development.
This file defines `environment variables` for our application. An
[environment variable](https://en.wikipedia.org/wiki/Environment_variable) is a
set of string-based keys and text values associated with the execution of our
application. Environment variables control many aspects of our command prompt as
well as our running applications. Since these are a per-app configuration, they
also serve as a location for values such as API keys.

> NOTE: This is a different approach than dotnet takes for its local
> configuration data. Both are good solutions, each with its issues and
> benefits. We are using an environment variable since this is the approach that
> our front-end app setup prefers.

```text
VITE_APP_MAPBOX_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> NOTE: Replace xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx with your token assigned to your
> mapbox.com account.

> NOTE: After changing this file, you should stop and restart your
> `dotnet watch run`.

Once we have installed the library, signed up for a key, and set our API key in
configuration, we will update our `Restaurants.tsx` component to show a map.

## Adding the map to the UI

First, we will import `ReactMapGL` from our library:

```javascript
import ReactMapGL from 'react-map-gl'
```

Then, set a state variable to store information about the map's zoom level,
size, and coordinates of the center of the map. Here we will use the coordinates
of the SDG campus as our map center.

```javascript
const [viewport, setViewport] = useState({
  latitude: 27.77101804911986,
  longitude: -82.66090611749074,
  zoom: 9.8,
})
```

With this state, we can replace the static map image with our dynamic map.
Inside the `ReactMapGL`, we include a `NavigationalControl` component, also from
mapbox-gl, that shows a small zoom control interface. We also set the map's
style to be absolutely positioned to work with our CSS.

```jsx
<section className="map">
  <ReactMapGL
    {...viewport}
    style={{ position: 'absolute' }}
    width="100%"
    height="100%"
    mapboxApiAccessToken={import.meta.env.VITE_APP_MAPBOX_TOKEN as string}
  >
    <div style={{ position: 'absolute', left: 10 }}>
      <NavigationControl />
    </div>
  </ReactMapGL>
</section>
```

Remove the `import` of our example map image.

You will notice that we are taking all the attributes of our `viewport` state
and **spreading** them into the `ReactMapGL`. We carefully chose the name of
this state variable's properties to correspond to the various properties of the
map we wish to control. Also, notice that we provide the `mapboxApiAccessToken`
here as well. To access the value we placed in the `.env.development.local`
file, we use `process.env`, which is an object containing all the environment
variables configured for the current process (app).

## Moving around the map

You may notice that we cannot adjust the map by dragging while we can render a
map and see a particular area. Using mouse dragging is a standard interface, so
we will add that feature. Luckily, again, our `viewport` state is set up
correctly to allow us to handle this.

The `ReactMapGL` expects a property for `onViewportChange` that is a method that
takes new values for a viewport change. And since our `setViewport` is exactly
such a function, we can use it by adding this to `ReactMapGL`.

```jsx
onViewportChange = { setViewport }
```

Try dragging, pinching, and zooming the map!

## Adding pins to the map

If we wish to add pins to the map, we must render an array of `<Marker>`
components inside our `ReactMapGL` component. A `<Marker>` is another map-gl
component. It requires a `latitude` and `longitude` property. Luckily for us,
our `restaurants` state now has that information from our API!

We can use our old friend the JavaScript `map()` function to generate these
markers.

When generating the array of `<Marker>` elements, we specify the `latitude` and
`longitude` from the specific restaurant. We then render each marker's visual as
anything we like; here, we just use the existing emoji character. We could use
text, an image, or any other react component as the marker representation.

```jsx
<section className="map">
  <ReactMapGL
    {...viewport}
    style={{ position: 'absolute' }}
    width="100%"
    height="100%"
    onViewportChange={setViewport}
    mapboxApiAccessToken={import.meta.env.VITE_APP_MAPBOX_TOKEN as string}
  >
    <div style={{ position: 'absolute', left: 10 }}>
      <NavigationControl />
    </div>
    {restaurants.map((restaurant) => (
      <Marker
        key={restaurant.id}
        latitude={restaurant.latitude}
        longitude={restaurant.longitude}
      >
        <span role="img" aria-label="taco">
          🌮
        </span>
      </Marker>
    ))}
  </ReactMapGL>
</section>
```

## Extend the `RestaurantType` to include a latitude and longitude

```typescript
export type RestaurantType = {
  id: string | undefined
  name: string
  description: string
  address: string
  telephone: string
  latitude: number
  longitude: number
  reviews: ReviewType[]
}
```

Update other components that now use this type and give a default value for the
latitude and longitude.

## Adding interaction to the map

Next, we will show details of a restaurant when the user clicks its marker.

To do that, we will add another state variable to track the
`selectedMapRestaurant` and initially set that value to `null`. When this
variable is `null`, no restaurant is selected on the map. When this variable is
**not** null, the value is the restaurant we want to show.

```typescript
const [selectedMapRestaurant, setSelectedMapRestaurant] =
  useState<RestaurantType | null>(null)
```

Then just before we render our array of `<Marker>`, we will add this code:

```jsx
{
  selectedMapRestaurant ? (
    <Popup
      latitude={selectedMapRestaurant.latitude}
      longitude={selectedMapRestaurant.longitude}
      closeButton={true}
      closeOnClick={false}
      onClose={() => setSelectedMapRestaurant(null)}
      offsetTop={-5}
    >
      <div>
        <p>{selectedMapRestaurant.name}</p>
        <p>{selectedMapRestaurant.description}</p>
      </div>
    </Popup>
  ) : null
}
```

If there is a selectedMapRestaurant, a `map-gl` based `Popup` component is
rendered at the coordinates of the selected restaurant. We also define an
`onClose`, which the popup will use to dismiss itself. For that, we simply set
the `selectedMapRestaurant` to `null`. Inside the popup, we will render a few
details of the restaurant.

Lastly, we need to add an `onClick` for our `<Marker>`, so we can set the value
of `selectedMapRestaurant`.

```jsx
<span
  role="img"
  aria-label="taco"
  onClick={() => setSelectedMapRestaurant(restaurant)}
>
  🌮
</span>
```

When clicking on markers, you may notice that the popup appears _behind_ other
markers on the page. To resolve this, add the following CSS to your project:

```css
.mapboxgl-popup {
  z-index: 1;
}
```

Now we have a zoomable, draggable, and clickable map that represents data pulled
from our API.

> NOTE: If you are going to deploy this with Heroku, you'll need to run
> `heroku config:set VITE_APP_MAPBOX_TOKEN="xxxx"` with your specific key in
> place of `xxxx` at least once before you deploy.

<!-- Adds maps to user interface -->
<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="999fc9a23964684316c468b6c9d17519c66ead59" />
