import React from 'react';
import {charts} from './style';

import {XYPlot, VerticalBarSeries, XAxis, YAxis
} from 'react-vis';

export default function Charts({pickups}) {
  if (!pickups) {
    return (<div style={charts}/>);
  }
  return (<div style={charts}>
    <h2>Pickups by hour</h2>
    <XYPlot
      margin={{left: 40, right: 0, top: 0, bottom: 20}}
      height={140}
      width={280}
    >
    <YAxis 
      tickFormat={(t) => Math.round(t / 1000) + 'k'}
    />
    <VerticalBarSeries data={pickups} 
        xDomain={[0, 24]}
    xDistace={10}
    />
    <XAxis tickPadding={2}/>
    </XYPlot>  
  </div>);
}
