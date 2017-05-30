<!-- INJECT:"ScatterplotOverlay" -->

# Add a Scatterplot Overlay with Deck.GL

As cool as having a map is, an empty map is not that useful. Let's see if we
can add a `Scatterplot` overlay with the Taxi data set.

[Deck.GL](http://uber.github.io/deck.gl) is a WebGL overlay suite for React,
providing a set of highly performant data visualization overlays.

`Deck.GL` comes with several prepackaged layers that we can use, in conjunction
with our map, to show display geospatial data. The simplest one is the `ScatterplotLayer`,
which we will use.

A simplified code snippet that renders the `ScatterplotLayer` above is shown below:

```js
import DeckGL from 'deck.gl';
// ...

class App {
  render() {
    return (
      <MapGL ...>
        <DeckGL

          layers={[scatterplotLayer]}

          width={500}
          height={500}
          longitude={-74}
          latitude={40.7}
          zoom={11} />
      </MapGL>
    );
  }
}
```

So `Deck.GL` takes an array of `layers` as a property. But what are those layers?
You have to initialize the layers manually, like so:

```js
import {ScatterplotLayer} from 'deck.gl';
...
const scatterplotLayer = new ScatterplotLayer({
  id: 'scatterplot',
  // data is our taxi data set
  data,
  getPosition: (d) => d.position,
  getColor: (d) => d.pickup ? PICKUP_COLOR : DROPOFF_COLOR,
  getRadius: (d) => 1,
  opacity: 0.5,
  pickable: true,
  onHover,
  radiusScale: 30,
  radiusMinPixels: 0.25,
  radiusMaxPixels: 30
});
```

You'll notice that the `Deck.GL` component also shares a lot of the same viewport
props as `ReactMapGL`. This is because `Deck.GL` is independent of `ReactMapGL`.
Check out the `Deck.GL` docs for advanced usages if you're curious.

## Properties

Let's go over just some properties of the `ScatterplotLayer` above:

##### `data` {Array}
Data for the layer. In this case, it's our Taxi data set.

##### `getPosition` {Function}
Function that gets called for each data point, should return an array of [longitude, latitude].

##### `getColor, getRadius` {Function}
Also get called for each data point, and return the color and radius, respectively,
for each point.

##### `pickable` {Bool}
Indicates whether this layer would be interactive.
