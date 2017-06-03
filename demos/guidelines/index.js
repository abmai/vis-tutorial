import React, {Component} from 'react';
import {XYPlot, VerticalBarSeries, LineSeries, YAxis, XAxis} from 'react-vis';

const data = [
  {
    "hour": 0,
    "pickups": 246,
    "dropoffs": 297,
    "fare": 3815,
    "tip": 464.35,
    "total": 4707.53
  },
  {
    "hour": 1,
    "pickups": 173,
    "dropoffs": 189,
    "fare": 2481.5,
    "tip": 348.01,
    "total": 3095.03
  },
  {
    "hour": 2,
    "pickups": 98,
    "dropoffs": 103,
    "fare": 1109,
    "tip": 130.99,
    "total": 1376.33
  },
  {
    "hour": 3,
    "pickups": 59,
    "dropoffs": 74,
    "fare": 1028.5,
    "tip": 102.99,
    "total": 1232.02
  },
  {
    "hour": 4,
    "pickups": 53,
    "dropoffs": 42,
    "fare": 604,
    "tip": 50.41,
    "total": 728.34
  },
  {
    "hour": 5,
    "pickups": 102,
    "dropoffs": 92,
    "fare": 1353.5,
    "tip": 167.04,
    "total": 1717.99
  },
  {
    "hour": 6,
    "pickups": 294,
    "dropoffs": 251,
    "fare": 2979,
    "tip": 423.07,
    "total": 3706.9
  },
  {
    "hour": 7,
    "pickups": 466,
    "dropoffs": 427,
    "fare": 4696.5,
    "tip": 648.11,
    "total": 5804.76
  },
  {
    "hour": 8,
    "pickups": 574,
    "dropoffs": 553,
    "fare": 6006.5,
    "tip": 843.3,
    "total": 7395.96
  },
  {
    "hour": 9,
    "pickups": 542,
    "dropoffs": 542,
    "fare": 6418,
    "tip": 919.51,
    "total": 7901.02
  },
  {
    "hour": 10,
    "pickups": 434,
    "dropoffs": 476,
    "fare": 5883.5,
    "tip": 843.46,
    "total": 7273.23
  },
  {
    "hour": 11,
    "pickups": 510,
    "dropoffs": 458,
    "fare": 5123,
    "tip": 645.59,
    "total": 6234.75
  },
  {
    "hour": 12,
    "pickups": 468,
    "dropoffs": 495,
    "fare": 6029,
    "tip": 783.06,
    "total": 7312.93
  },
  {
    "hour": 13,
    "pickups": 435,
    "dropoffs": 442,
    "fare": 5355.5,
    "tip": 679.71,
    "total": 6553.4
  },
  {
    "hour": 14,
    "pickups": 526,
    "dropoffs": 480,
    "fare": 6302,
    "tip": 806.23,
    "total": 7686.69
  },
  {
    "hour": 15,
    "pickups": 453,
    "dropoffs": 502,
    "fare": 6881.5,
    "tip": 944.8,
    "total": 8465.67
  },
  {
    "hour": 16,
    "pickups": 400,
    "dropoffs": 398,
    "fare": 5339.72,
    "tip": 678.53,
    "total": 6807.19
  },
  {
    "hour": 17,
    "pickups": 503,
    "dropoffs": 449,
    "fare": 5684,
    "tip": 844.01,
    "total": 7524.62
  },
  {
    "hour": 18,
    "pickups": 602,
    "dropoffs": 595,
    "fare": 7812.01,
    "tip": 1038.12,
    "total": 10143.54
  },
  {
    "hour": 19,
    "pickups": 645,
    "dropoffs": 678,
    "fare": 7822,
    "tip": 1172.88,
    "total": 10378.9
  },
  {
    "hour": 20,
    "pickups": 647,
    "dropoffs": 662,
    "fare": 8087,
    "tip": 1301.54,
    "total": 10513.01
  },
  {
    "hour": 21,
    "pickups": 662,
    "dropoffs": 653,
    "fare": 7804.5,
    "tip": 1166.3,
    "total": 9952.56
  },
  {
    "hour": 22,
    "pickups": 609,
    "dropoffs": 609,
    "fare": 7516.5,
    "tip": 1153.29,
    "total": 9623.72
  },
  {
    "hour": 23,
    "pickups": 498,
    "dropoffs": 532,
    "fare": 6779.5,
    "tip": 999.24,
    "total": 8595.7
  }
];

export function DontSimpleChart() {
  return (<div className="guideline-chart">
    <XYPlot width={600} height={300}>
      <VerticalBarSeries data={data.map(d => ({x: d.hour, y: d.pickups}))} />
    </XYPlot>
  </div>);
}
