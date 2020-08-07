---
title: Adding Maps to your Rails application
---

## Adding the required gem

We will be using a gem named
[`geocoder`](https://github.com/alexreisner/geocoder) to translate addresses
into map locations.

To add this to the project we can run:

```shell
bundle add geocoder
```

This will add the gem to the `Gemfile` and automatically run `bundle install`

## Add needed columns to the models we will be placing on a map

Let's assume the model we are working with is `Restaurant` and we'll also assume
there is an `address` column.

We will be adding columns `latitude` and `longitude` as `floats` via:

```shell
rails generate migration AddFieldsToRestaurant latitude:float longitude:float
```

then we will migrate the database

```shell
rails db:migrate
```

## Add the ability to geolocate the model

Open the model file, in our case `restaurant.rb` and add this line

```ruby
class Restaurant < ApplicationRecord
  # Adding this line to tell geocoder to turn our `address` column into `latitude` and `longitude`
  geocoded_by :address

  # After running all the validations, attempt to geocode
  after_validation :geocode
end
```

## Now over to the react side

The remaining instructions are for our React app

## Adding React Map Library

We will be using the
[`React Map GL`](https://www.npmjs.com/package/react-map-gl) library for
mapping.

To add this to our project, run the following command in your react project
directory:

```javascript
npm install --save react-map-gl
```

## Add a `<MapGL>` to our component

- The state will keep track of our viewport, including the center point of the
  map (latitude and longitude), the zoom factor, bearing and pitch.

```javascript
import MapGL, { Marker, NavigationControl, Popup } from 'react-map-gl'

...

constructor(props) {
  super(props)

  this.state = {
    viewport: {
      latitude: 27.7700989,
      longitude: -82.6364093,
      zoom: 12.5,
      bearing: 0,
      pitch: 0
    }
  }
}

render() {
  const { viewport } = this.state

  return <div className='map'>
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapboxApiAccessToken="pk.eyJ1IjoiZ2F2aW5zdGFyayIsImEiOiIxZjVmODFhYWQ2NjIyZGY1MTQ5MzM3ZTE2MWNkMDkxMiJ9.HG1IbUfea4FfcJ0WrY7Pqg"
    />
  </div>
}
```

## Move the map when we drag around

- We will add an `_updateViewPort` method so that as we drag the map, or use the
  navigation control we can update the `viewport` within the `state`

```javascript

  this.navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
  }

  _updateViewport = viewport => {
    this.setState({ viewport })
  }

  render() {
    return <div className='map'>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapboxApiAccessToken="pk.eyJ1IjoiZ2F2aW5zdGFyayIsImEiOiIxZjVmODFhYWQ2NjIyZGY1MTQ5MzM3ZTE2MWNkMDkxMiJ9.HG1IbUfea4FfcJ0WrY7Pqg"
        onViewportChange={this._updateViewport}
      >
        <div className="nav" style={this.navStyle}>
          <NavigationControl onViewportChange={this._updateViewport}/>
        </div>
      </MapGL>
    </div>
  }
```

## Add a marker to the map

- Let's add a single marker to the map. Each marker will be represented by a
  pin.
- We will add a `<Marker>` component within the `<MapGL>` component to represent
  this marker.

```javascript
import pin from './pin.png'

render() {
  return <div className='map'>
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapboxApiAccessToken="pk.eyJ1IjoiZ2F2aW5zdGFyayIsImEiOiIxZjVmODFhYWQ2NjIyZGY1MTQ5MzM3ZTE2MWNkMDkxMiJ9.HG1IbUfea4FfcJ0WrY7Pqg"
      onViewportChange={this._updateViewport}
    >
      <Marker
        latitude={27.7712188}
        longitude={-82.6697279536116}
        offsetTop={-64}
        offsetLeft={-32}
      >
        <img width="64" height="64" src={pin}/>
      </Marker>

      <div className="nav" style={this.navStyle}>
        <NavigationControl onViewportChange={this._updateViewport}/>
      </div>
    </MapGL>
  </div>
}
```

## Iterate over many locations

- However, we typically are passed an array of things to map. So we can use the
  JavaScript `map` function on an array to iterate those locations and create
  markers for each.

```javascript
render() {
  return <div className='map'>
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapboxApiAccessToken="pk.eyJ1IjoiZ2F2aW5zdGFyayIsImEiOiIxZjVmODFhYWQ2NjIyZGY1MTQ5MzM3ZTE2MWNkMDkxMiJ9.HG1IbUfea4FfcJ0WrY7Pqg"
      onViewportChange={this._updateViewport}
    >

      {this.props.locations.map(location => {
        <Marker
          key={location.id}
          longitude={location.latitude}
          latitude={location.longitude}
          offsetTop={-64}
          offsetLeft={-32}
        >
          <img src={pin} />
        </Marker>
      })

      <div className="nav" style={this.navStyle}>
        <NavigationControl onViewportChange={this._updateViewport}/>
      </div>
    </MapGL>
  </div>
}
```

## Add a popup when clicking on a pin

- We can add a click to each pin. When each pin is clicked we record _which_
  location was clicked in the `popupInfo` state.
- Our render function will be updated to add a `<Popup>` if
  `this.state.popupInfo` is not null

```javascript
constructor(props) {
  super(props)
  this.state = {
    popupInfo: null,
    viewport: {
      latitude: 27.7700989,
      longitude: -82.6364093,
      zoom: 12.5,
      bearing: 0,
      pitch: 0
    }
  }
}

renderPopup = () => {
  const popupInfo = this.state.popupInfo

  if (!popupInfo) {
    return
  }

  return (
    <Popup
      tipSize={5}
      anchor="top"
      longitude={popupInfo.longitude}
      latitude={popupInfo.latitude}
      closeOnClick={false}
      onClose={() => {
        this.setState({ popupInfo: null })
      }}
    >
      <div>
        <p>{popupInfo.address}</p>
      </div>
    </Popup>
  )
}

render() {
  return <div className='map'>
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapboxApiAccessToken="pk.eyJ1IjoiZ2F2aW5zdGFyayIsImEiOiIxZjVmODFhYWQ2NjIyZGY1MTQ5MzM3ZTE2MWNkMDkxMiJ9.HG1IbUfea4FfcJ0WrY7Pqg"
      onViewportChange={this._updateViewport}
    >

      {this.renderPopup()}

      {this.props.locations.map(location => {
        <Marker
          key={location.id}
          longitude={location.latitude}
          latitude={location.longitude}
          offsetTop={-64}
          offsetLeft={-32}
        >
          <img
            onClick={() => {
              this.setState({ popupInfo: location })
            }}
            src={pin} />
        </Marker>
      })

      <div className="nav" style={this.navStyle}>
        <NavigationControl onViewportChange={this._updateViewport}/>
      </div>
    </MapGL>
  </div>
}
```
