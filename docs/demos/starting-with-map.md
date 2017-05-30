<!-- INJECT:"StartingWithMap" -->

# Starting With a Map

[ReactMapGL](https://github.com/uber/react-map-gl) is a `React` wrapper around
the powerful `MapboxGL` mapping library. `ReactMapGL` makes it super easy to
drop a mapping component into your application.

A simplified snippet of the `jsx` that renders the above map is shown below:

```js
import MapGL from 'react-map-gl';
// ...
class App {
  render() {
    return (
      <MapGL
        width={500}
        height={500}
        longitude={-74}
        latitude={40.7}
        zoom={11}
        mapStyle={MAPBOX_STYLE}
        onChangeViewport={this._onChangeViewport.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN} />
    );
  }
}
```

That's all you need to render a map and make it interactive!
Let's dig a bit into what each one of those properties does.

## Properties

##### `width, height, longitude, latitude, zoom` {Number} (required)
These are the `viewport` properties and indicate the starting point of
your map.

##### `mapStyle` {String | Object | Immutable.Map}
This is the map style, either as a URL string or a full style object.

#### `onChangeViewport` {Function}
Callback that will be called whenever the map updates (i.e. during interaction).
Due to the stateless nature of `ReactMapGL`, you **must** implement this and
update the component with the new `viewport` properties.

#### `mapboxApiAccessToken` {String}
The `MapboxGL` token required if you're trying to load a `mapStyle` that uses
mapbox data - which is any of their default styles.
[More Info](https://www.mapbox.com/help/create-api-access-token/)

For more detail information about `ReactMapGL`,
[visit its Github](https://github.com/uber/react-map-gl).
