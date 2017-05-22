import React from 'react';
import {charts} from './style';

import {XYPlot, LineSeries, MarkSeriesCanvas, VerticalBarSeries, XAxis, YAxis
} from 'react-vis';

export default function Charts(props) {
  const {chartType, title, onClick, pickups, dropoffs} = props;
  if (!pickups) {
    return (<div style={charts}/>);
  }
  return (<div style={charts} onClick={onClick}>
    <h2>{title}</h2>
    {chartType === 'BAR' ? <BarChart {...props} /> : null}
    {chartType === 'LINE' ? <LineChart {...props} /> : null}
    {chartType === 'SCATTERPLOT' ? <Scatterplot {...props} /> : null}
    Click to cycle through available charts
  </div>);
}

function BarChart({pickups}) {
  return (<XYPlot
      margin={{left: 40, right: 0, top: 0, bottom: 20}}
      height={140}
      width={280}
    >
    <YAxis 
      tickFormat={(t) => Math.round(t / 1000) + 'k'}
    />
    <VerticalBarSeries data={pickups} 
    xDomain={[-0.5, 23.5]}
    />
    <XAxis tickPadding={2}/>
    </XYPlot>);
}

function LineChart({dropoffs, pickups}) {
    return (<XYPlot
      margin={{left: 40, right: 0, top: 0, bottom: 20}}
      height={140}
      width={280}
    >
    <YAxis 
      tickFormat={(t) => Math.round(t / 1000) + 'k'}
    />
    <LineSeries data={pickups} />
    <LineSeries data={dropoffs} />
    <XAxis tickPadding={2}/>
    </XYPlot>);
}

function Scatterplot({scatterplot}) {
  return (<XYPlot
      margin={{left: 40, right: 0, top: 0, bottom: 20}}
      height={140}
      width={280}
    >
    <MarkSeriesCanvas data={scatterplot} size={2} opacity={0.2}/>
    <YAxis title="dollars" style={{title: {textAnchor: 'end'}}}/>
    <XAxis title="miles"  style={{title: {textAnchor: 'end'}}}/>
    </XYPlot>);
}