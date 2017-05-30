<!-- INJECT:"LineCharts" -->

# Line Charts

Line charts, in react-vis, are not so different from bar charts.

This time, we want to plot pickups and dropoffs over time.
We prepare two series as arrays of the form {x, y}: where x is the hour, and y is the value (either pickup of dropoffs).

The only difference with our bar chart is that we are going to replace VerticalBarSeries by two LineSeries components:

```js
<XYPlot
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
</XYPlot>
```
