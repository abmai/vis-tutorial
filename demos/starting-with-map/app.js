/* global window */
import React, {Component} from 'react';
import MapGL from 'react-map-gl';

const MAPBOX_STYLE = 'mapbox://styles/uberdata/cive485h000192imn6c6cc8fc';
// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN; // eslint-disable-line

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 500,
        height: 500,
        longitude: -74,
        latitude: 40.7,
        zoom: 11,
        maxZoom: 16
      }
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
  }

  _onChangeViewport(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  _resize() {
    this._onChangeViewport({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  render() {
    const {viewport} = this.state;
    return (
      <div>
        <MapGL
          {...viewport}
          mapStyle={MAPBOX_STYLE}
          onChangeViewport={this._onChangeViewport.bind(this)}
          mapboxApiAccessToken={MAPBOX_TOKEN} />
      </div>
    );
  }
}
