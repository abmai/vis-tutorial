/* global window */
import React, {Component} from 'react';
import MapGL from 'react-map-gl';
import {csv as requestCsv} from 'd3-request';
import DeckGLOverlay from './deckgl-overlay';
import LayerControls from './layer-controls';
import Charts from './charts';
import Spinner from './spinner';
import {tooltipStyle} from './style';

const MAPBOX_STYLE = 'mapbox://styles/uberdata/cive485h000192imn6c6cc8fc';
// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiamNrciIsImEiOiJjaXJnbHVzMnkwMTZkZzZucmdhdWo5aGFlIn0.X5jPZV3EvmIB01r2bMBjsg';

const LAYER_CONTROLS = {
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

const chartInfo = {
  'BAR': {
    title: 'Pickups by hour',
    next: 'LINE'
  },
  'LINE': {
    title: 'Pickups and dropoffs',
    next: 'BAR'
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
      chartType: 'LINE',
      // hoverInfo
      x: 0,
      y: 0,
      hoveredObject: null,
      status: 'LOADING'
    };

    requestCsv('../data/taxi.csv', (error, response) => {
      if (!error) {
        this.setState({status: 'LOADED'});
        const data = response.reduce((accu, curr) => {

          const pickupTime = curr.tpep_pickup_datetime || "";
          const dropoffTime = curr.tpep_dropoff_datetime || "";

          const distance = curr.trip_distance;
          const amount = curr.total_amount;

          accu.points.push({
            position: [Number(curr.pickup_longitude), Number(curr.pickup_latitude)],
            pickup: true
          });

          accu.points.push({
            position: [Number(curr.dropoff_longitude), Number(curr.dropoff_latitude)],
            pickup: false
          });

          const pickupHour = pickupTime.slice(11, 13);
          const dropoffHour = dropoffTime.slice(11, 13);

          const prevPickups = accu.pickupObj[pickupHour] || 0;
          const prevDropoffs = accu.dropoffObj[dropoffHour] || 0;

          accu.pickupObj[pickupHour] = prevPickups + 1;
          accu.dropoffObj[dropoffHour] = prevDropoffs + 1;
          accu.scatterplot.push({x: distance, y: amount});

          return accu;
        }, {
          points: [],
          pickupObj: {},
          dropoffObj: {},
          scatterplot: []
        });

        data.pickups = Object.entries(data.pickupObj).map(d => ({x: Number(d[0]), y: d[1]})).sort((a, b) => a.x < b.x ? 1 : -1);
        data.dropoffs = Object.entries(data.dropoffObj).map(d => ({x: Number(d[0]), y: d[1]})).sort((a, b) => a.x < b.x ? 1 : -1);
        data.status = 'READY'
        this.setState(data);
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
  _cycleChart() {
    this.setState({chartType: chartInfo[this.state.chartType].next});
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
    const {chartType, viewport, dropoffs, pickups, points, scatterplot, settings, status} = this.state;
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
        <Charts
          chartType={chartType}
          onClick={this._cycleChart.bind(this)}
          dropoffs={dropoffs}
          pickups={pickups}
          scatter={scatterplot}
          title={chartInfo[chartType].title}
        />
        <Spinner status={status} />
      </div>
    );
  }
}
