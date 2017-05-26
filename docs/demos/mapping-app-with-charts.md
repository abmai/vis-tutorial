<!-- INJECT:"MappingAppWithCharts" -->

# Adding charts with React-Vis

[React-Vis](http://uber.github.io/react-vis) is the Uber library for rendering charts with React. 

In React Vis, creating a chart has a nice React-y feeling of assembling components one into another. 

First, we are going to create a simple bar chart of dropoffs by hour.

To do this, we prepare an array of data of the form: {x, y}. x is going to be the hour, and y is going to be the number of dropoffs we want to plot.

Then, we are going to create our barchart using the following React-Vis components: XYPlot, XAxis, YAxis, VerticalBarSeries.

```js

    <XYPlot
      height={140}
      width={280}
    >
      <XAxis />
      <YAxis />
      <VerticalBarSeries data={pickups} />
    </XYPlot> 

```

In just 8 lines of code we have a bar chart with axes. 
XYPlot is the wrapper of React-Vis component. It must be given a height and a width, although React-Vis provides a way to make responsive charts as well. 

Inside our XYPlot component, we just add the components that we need in the order that we want: 

XAxis is our horizontal axis, YAxis is our vertical axis, and VerticalBarSeries is the series of data proper.

## Now iterate:

XYPlot has a property, margin, which defines the interior spacing. Its default values are set for larger charts. So let's change this: 

```js
<XYPlot
  margin={{left: 40, right: 0, top: 0, bottom: 20}}
  height={140}
  width={280}
>
```

Also, our bar chart values are cut at by the axes. That's because the *x-domain* of the chart, which is what is going to be shown by the chart, is defined by the data. 
Let's be clever and adjust it: 

```js
<VerticalBarSeries data={pickups}
    xDomain={[-0.5, 23.5]}
    />
```

Our Y-Axis values are not super legible. So let's format them: 

```js
<YAxis 
  tickFormat={(t) => Math.round(t / 1000) + 'k'}
/>
```

The tickFormat property is a function that will transform the value for a given Y tick into a more legible label.

Finally, the X-Axis values are a bit too far from the axis. Let's change that:

```js
<XAxis tickPadding={2}/>
```

Final code:
```js
<XYPlot
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
</XYPlot>
```