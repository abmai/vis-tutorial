<!-- INJECT:"HexagonOverlay" -->

# Add a Hexagon Overlay with Deck.GL
[View code](https://github.com/abmai/vis-tutorial/tree/master/demos/hexagon-overlay)

`Scatterplot` can plot raw points, but to visualize distribution of these points, we need a layer that
can aggregate points into a geo grid. `HexagonLayer` and `GridLayer` are both aggregation layers that
can visualize a distribution heatmap from raw points.

A simplified code snippet that renders the `HexagonLayer` above is shown below:

```js
import DeckGL, {HexagonLayer} from 'deck.gl';

export default class DeckGLOverlay extends Component {
  // ...
  _initialize(gl) {
    // enable gl.DEPTH_TEST to render a 3d map
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  }
  
  render() {
    const {viewport, data, onHover} = this.props;

    const hexagonOverlay = new HexagonLayer({
      id: 'heatmap',
      colorRange: HEATMAP_COLORS,
      coverage: 1,
      /*
       * data is an array of points
       * format as [{position: [lng, lat]}, {position: [lng, lat]}]
       * */
      data,
      elevationRange,
      elevationScale: 10,
      extruded: true,
      getPosition: d => d.position,
      lightSettings: LIGHT_SETTINGS,
      onHover,
      opacity: 1,
      pickable: true,
      // hexagon cell radius in meter
      radius: 500,
      upperPercentile: settings.upperPercentile
    });
    
    return (
      <DeckGL {...viewport} layers={ [hexagonOverlay] } onWebGLInitialized={this._initialize} />
    );
  }
}
```
Deck.gl performances shallow compares on layer props to decide how to update attribute buffer.
To avoid unnecesary re-calculation, passing constant params by defining them 
outside the rendering function. 

## Properties
[Deck.gl documentation of Hexagon Layer](https://uber.github.io/deck.gl/#/documentation/layer-catalog/hexagon-layer)

Let's go over just some properties of the `HexagonLayer` above:

##### `data` {Array}
Array of points for the layer. In this case, it's our Taxi data set. 
format as `[{position: [lng, lat]}, {position: [lng, lat]}]`

##### `getPosition` {Function}
Function that gets called for each data point, should return an array of [longitude, latitude].

##### `extruded` {Bool}
Whether to enable hexagon elevation

#### `radius` {Number}
Hexagon layer cell radius in meter

#### `upperPercentile` {Number}
- Default: `100`
Hexagon cells with value larger than upperPercentile will be hidden

##### `pickable` {Bool}
Indicates whether this layer would be interactive.

