/* global window */
import React, {Component} from 'react';
import MapGL from 'react-map-gl';
import {csv as requestCsv} from 'd3-request';
import DeckGLOverlay from './deckgl-overlay';
import LayerControls from './layer-controls';
import {tooltipStyle} from './style';

const MAPBOX_STYLE = 'mapbox://styles/uberdata/cive485h000192imn6c6cc8fc';

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN; // eslint-disable-line

const LAYER_CONTROLS = {
  showPoint: {
    displayName: 'Show Scatterplot',
    type: 'boolean',
    value: true
  },
  showHexagon: {
    displayName: 'Show Hexagon',
    type: 'boolean',
    value: false
  },
  radius: {
    displayName: 'Radius',
    type: 'range',
    value: 250,
    step: 50,
    min: 50,
    max: 1000
  },
  coverage: {
    displayName: 'Coverage',
    type: 'range',
    value: 0.7,
    step: 0.1,
    min: 0,
    max: 1
  },

  upperPercentile: {
    displayName: 'Upper Percentile',
    type: 'range',
    value: 100,
    step: 0.1,
    min: 80,
    max: 100
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500
      },
      points: [],
      settings: Object.keys(LAYER_CONTROLS).reduce((accu, key) => ({
        ...accu,
        [key]: LAYER_CONTROLS[key].value
      }), {}),

      // hoverInfo
      x: 0,
      y: 0,
      hoveredObject: null
    };

    requestCsv('./data/taxi.csv', (error, response) => {
      if (!error) {

        const points = response.reduce((accu, curr) => {
          if (!isNaN(Number(curr.pickup_longitude)) && !isNaN(Number(curr.pickup_latitude))) {
            accu.push({
              position: [Number(curr.pickup_longitude), Number(curr.pickup_latitude)],
              pickup: true
            });
          }

          if (!isNaN(Number(curr.dropoff_longitude)) && !isNaN(Number(curr.dropoff_latitude))) {
            accu.push({
              position: [Number(curr.dropoff_longitude), Number(curr.dropoff_latitude)],
              pickup: false
            });
          }
          return accu;
        }, []);

        this.setState({
          points
        });
      }
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
  }

  updateLayerSettings(settings) {
    this.setState({settings});
  }

  _onHover({x, y, object}) {
    this.setState({x, y, hoveredObject: object});
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

  _renderTooltip() {
    const {x, y, hoveredObject} = this.state;

    if (!hoveredObject) {
      return null;
    }

    return (
      <div style={{...tooltipStyle, left: x, top: y}}>
        <div>{hoveredObject.id}</div>
      </div>
    );
  }

  render() {
    const {viewport, points, settings} = this.state;

    return (
      <div>
        {this._renderTooltip()}
        <LayerControls
          settings={settings}
          propTypes={LAYER_CONTROLS}
          onChange={this.updateLayerSettings.bind(this)}/>
        <MapGL
          {...viewport}
          mapStyle={MAPBOX_STYLE}
          perspectiveEnabled={true}
          onChangeViewport={this._onChangeViewport.bind(this)}
          mapboxApiAccessToken={MAPBOX_TOKEN}>
          <DeckGLOverlay
            viewport={viewport}
            data={points}
            onHover={this._onHover.bind(this)}
            settings={settings}/>
        </MapGL>
      </div>
    );
  }
}
