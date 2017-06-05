import React, {Component} from 'react';
import {
  XYPlot,
  VerticalBarSeries,
  AreaSeries,
  Crosshair,
  DiscreteColorLegend,
  Hint,
  LineSeries,
  MarkSeries,
  LineMarkSeries,
  VerticalGridLines,
  YAxis,
  XAxis
} from 'react-vis';

const data = [
  {hour: 0, pickups: 246, dropoffs: 297, fare: 3815, tip: 464.35, total: 4707.53, avgDistance: 3.41, avgDuration: 1241.39}, 
  {hour: 1, pickups: 173, dropoffs: 189, fare: 2481.5, tip: 348.01, total: 3095.03, avgDistance: 3.59, avgDuration: 680.83}, 
  {hour: 2, pickups: 98, dropoffs: 103, fare: 1109, tip: 130.99, total: 1376.33, avgDistance: 2.82, avgDuration: 564.54}, 
  {hour: 3, pickups: 59, dropoffs: 74, fare: 1028.5, tip: 102.99, total: 1232.02, avgDistance: 3.95, avgDuration: 739.12}, 
  {hour: 4, pickups: 53, dropoffs: 42, fare: 604, tip: 50.41, total: 728.34, avgDistance: 4.11, avgDuration: 685.29}, 
  {hour: 5, pickups: 102, dropoffs: 92, fare: 1353.5, tip: 167.04, total: 1717.99, avgDistance: 4.25, avgDuration: 627.84}, 
  {hour: 6, pickups: 294, dropoffs: 251, fare: 2979, tip: 423.07, total: 3706.9, avgDistance: 3.25, avgDuration: 915.3}, 
  {hour: 7, pickups: 466, dropoffs: 427, fare: 4696.5, tip: 648.11, total: 5804.76, avgDistance: 2.67, avgDuration: 654.51}, 
  {hour: 8, pickups: 574, dropoffs: 553, fare: 6006.5, tip: 843.3, total: 7395.96, avgDistance: 2.31, avgDuration: 740.33}, 
  {hour: 9, pickups: 542, dropoffs: 542, fare: 6418, tip: 919.51, total: 7901.02, avgDistance: 2.34, avgDuration: 843.92}, 
  {hour: 10, pickups: 434, dropoffs: 476, fare: 5883.5, tip: 843.46, total: 7273.23, avgDistance: 2.57, avgDuration: 883.62}, 
  {hour: 11, pickups: 510, dropoffs: 458, fare: 5123, tip: 645.59, total: 6234.75, avgDistance: 2.2, avgDuration: 790.96}, 
  {hour: 12, pickups: 468, dropoffs: 495, fare: 6029, tip: 783.06, total: 7312.93, avgDistance: 2.53, avgDuration: 849.84}, 
  {hour: 13, pickups: 435, dropoffs: 442, fare: 5355.5, tip: 679.71, total: 6553.4, avgDistance: 2.59, avgDuration: 818.49}, 
  {hour: 14, pickups: 526, dropoffs: 480, fare: 6302, tip: 806.23, total: 7686.69, avgDistance: 2.86, avgDuration: 887.62}, 
  {hour: 15, pickups: 453, dropoffs: 502, fare: 6881.5, tip: 944.8, total: 8465.67, avgDistance: 3.05, avgDuration: 994.37}, 
  {hour: 16, pickups: 400, dropoffs: 398, fare: 5339.72, tip: 678.53, total: 6807.19, avgDistance: 2.93, avgDuration: 947.21}, 
  {hour: 17, pickups: 503, dropoffs: 449, fare: 5684, tip: 844.01, total: 7524.62, avgDistance: 2.93, avgDuration: 909.31}, 
  {hour: 18, pickups: 602, dropoffs: 595, fare: 7812.01, tip: 1038.12, total: 10143.54, avgDistance: 3, avgDuration: 943.7}, 
  {hour: 19, pickups: 645, dropoffs: 678, fare: 7822, tip: 1172.88, total: 10378.9, avgDistance: 2.62, avgDuration: 779.28}, 
  {hour: 20, pickups: 647, dropoffs: 662, fare: 8087, tip: 1301.54, total: 10513.01, avgDistance: 2.93, avgDuration: 757.38}, 
  {hour: 21, pickups: 662, dropoffs: 653, fare: 7804.5, tip: 1166.3, total: 9952.56, avgDistance: 2.93, avgDuration: 864.04}, 
  {hour: 22, pickups: 609, dropoffs: 609, fare: 7516.5, tip: 1153.29, total: 9623.72, avgDistance: 3.15, avgDuration: 861.44}, 
  {hour: 23, pickups: 498, dropoffs: 532, fare: 6779.5, tip: 999.24, total: 8595.7, avgDistance: 3.32, avgDuration: 718.95}
];

export function DontSimpleChart() {
  return (<div className="guideline-chart">
    <XYPlot width={600} height={300}>
      <VerticalBarSeries data={data.map(d => ({x: d.hour, y: d.pickups}))} />
    </XYPlot>
  </div>);
}

export function LessSimpleChart() {
  return (<div className="guideline-chart">
    <XYPlot width={600} height={300} xDomain={[0, 24]}>
      <XAxis 
      tickValues={[...data.map((d, i) => i), 24]} />
      <YAxis/>
      <VerticalBarSeries 
        data={data.map(d => ({x: d.hour + 0.5, y: d.pickups}))} 
      />
    </XYPlot>
  </div>);
}

export function ChartWithContext() {
  return (<div className="guideline-chart">
    <h1 style={{fontSize: '2em', borderBottom: "none"}}>Distribution of pickups over time</h1>
    <p>As a percentage of all trips that day</p>
    <XYPlot width={600} height={300} xDomain={[0, 24]}>
      <XAxis 
        tickValues={[...data.map((d, i) => i), 24]} />
      <YAxis/>
      <VerticalBarSeries
        data={data.map(d => ({x: d.hour + 0.5, y: d.pickups / 100}))} 
      />
    </XYPlot>
    <p style={{textAlign: 'end'}}><i>Source: NYC Taxi and Limousine Commission (sample of trips on Oct 15th, 2015)</i></p>
  </div>);
}

function SmallChart({variable, label, pct = false}) {
  const yMax = Math.max(...data.map(d => d[variable] / (pct ? 100 : 1)));
  return (<div style={{display: 'inline-block', padding: 10}}>
    <p style={{marginLeft: 50, fontWeight: 500}}>{label}</p>
    <XYPlot xDomain={[0, 24]} yDomain={[0, yMax]} width={309} height={120} margin={{top: 10, left: 50, bottom: 30, right: 10}}>
      <LineSeries
        data={data.map(d => ({x: d.hour + 0.5, y: d[variable] / (pct ? 100 : 1)}))} 
      />
      <XAxis tickValues={[0, 6, 12, 18, 24]} style={{fill: '#A6A5A5'}}
      />
      <YAxis style={{fill: '#A6A5A5'}}
      />
    </XYPlot>
  </div>);
}

function TinyChart({variable, label, pct = false}) {
  const yMax = Math.max(...data.map(d => d[variable] / (pct ? 100 : 1)));
  const seriesProps = {
    data: data.map(d => ({x: d.hour + 0.5, y: d[variable] / (pct ? 100 : 1)})) 
  };

  return (<div style={{}}>
    <p style={{fontSize: 11, marginLeft: 10, fontWeight: 400}}>{label}</p>
    <XYPlot xDomain={[0, 24]} yDomain={[0, yMax]} width={194} height={60} margin={{top: 1, left: 10, bottom: 22, right: 10}}>
      <XAxis tickValues={[0, 6, 12, 18, 24]} style={{fontSize: 10, fill: '#A6A5A5'}}/>
      <AreaSeries {...seriesProps} color="#caf2f4"/>
      <LineSeries {...seriesProps} width={2}/>
      <VerticalGridLines style={{stroke: "#11939A", opacity: 0.5, strokeDasharray: '2 2'}} tickValues={[0, 6, 12, 18, 24]} />
    </XYPlot></div>);
}

function MediumChart({variable, label, pct = false}) {
  const yMax = Math.max(...data.map(d => d[variable] / (pct ? 100 : 1)));
  return (<div style={{borderBottom: '1px solid #e5e5e4', paddingBottom: 16}}>
    <h2 style={{marginLeft: 0, marginTop: 4, paddingLeft: 50}}>{label}</h2>
    <XYPlot xDomain={[0, 24]} yDomain={[0, yMax]} width={659} height={120} margin={{top: 10, left: 50, bottom: 30, right: 10}}>
      <LineMarkSeries
       
        size={3}
        style={{fill: 'white', strokeWidth: 2}}
        data={data.map(d => ({x: d.hour + 0.5, y: d[variable] / (pct ? 100 : 1)}))} 
      />
      <XAxis tickValues={[0, 3, 6, 9, 12, 15, 18, 21, 24]} style={{fill: '#A6A5A5'}}
      />
      <YAxis style={{fill: '#A6A5A5'}}
      />
    </XYPlot>
  </div>);
}

export function SameFourCharts() {
  return (<div className="guideline-chart">
      {[
        {variable: 'total', label: 'Revenue per hour'},
        {variable: 'dropoffs', label: 'Trips per hour', pct: true},
        {variable: 'avgDistance', label: 'Avg distance'},
        {variable: 'avgDuration', label: 'Avg duration'}
      ].map(d => <SmallChart key={d.label} {...d} />)}
    </div>);
}

export function HasHierarchy() {
  return (<div className="guideline-chart">
        <MediumChart variable="total" label="Revenue per hour" />
        <div style={{marginLeft: 40, marginTop: 16, display: 'flex', justifyContent: 'space-between'}}>
          <TinyChart variable="dropoffs" label="Trips per hour" />
          <TinyChart variable="avgDistance" label="Avg distance" />
          <TinyChart variable="avgDuration" label="Avg duration" />
        </div>
    </div>);
}

export function DontDualAxes() {
  const yMaxTotal = Math.max(...data.map(d => d.total));
  const yMaxPerTrip = Math.max(...data.map(d => d.total / d.dropoffs));

  return (<div className="guideline-chart">
    <h2 style={{marginTop: 4}}>Revenue per hour</h2>
    <DiscreteColorLegend width={659} orientation="horizontal" items={['Total revenue', 'Revenue per trip']} />
    <XYPlot 
      xDomain={[0, 24]}
      width={659} height={300} margin={{top: 10, bottom: 30, left: 50, right: 50}}>
    <LineSeries 
      data={data.map(d => ({x: d.hour + 0.5, y: d.total}))}
      yDomain={[0, yMaxTotal]}
    />
    <LineSeries 
      data={data.map(d => ({x: d.hour + 0.5, y: d.total / d.dropoffs}))}
      yDomain={[0, yMaxPerTrip]}
    />
    <YAxis yDomain={[0, yMaxTotal]} />
    <YAxis yDomain={[0, yMaxPerTrip]} orientation='right'/>
    <XAxis />
    </XYPlot>
  </div>)
}

export function DoTwoCharts() {
  const yMaxTotal = Math.max(...data.map(d => d.total));
  return (<div className="guideline-chart">
    <h2 style={{marginTop: 4}}>Revenue per hour</h2>
    <p style={{marginLeft: 50, fontWeight: 500}}>Total Revenue</p>
    <XYPlot width={659} height={200} margin={{top: 10, bottom: 30, left: 50, right: 10}}>
      <LineSeries 
        xDomain={[0, 24]}
        yDomain={[0, yMaxTotal]}
        data={data.map(d => ({x: d.hour + 0.5, y: d.total}))}
      />
      <YAxis yDomain={[0, yMaxTotal]} />
      <XAxis xDomain={[0, 24]} />
    </XYPlot>
    <p style={{margin: '10px 0 6px 0', fontSize: 11}}>Revenue per trip - Average $15.47</p>
    <XYPlot 
      xDomain={[0, 24]}
      yDomain={[10, 20]}
      width={659} height={80} margin={{top: 10, bottom: 22, left: 50, right: 10}}>
      <LineSeries 
        data={data.map(d => ({x: d.hour + 0.5, y: d.total / d.dropoffs}))}
      />
      <LineSeries
        data={[{x: 0.5, y: 15.47}, {x: 23.5, y: 15.47}]} style={{strokeDasharray: '2 2', strokeWidth: 1}}
      />
      <YAxis tickValues={[10, 12.5, 15, 17.5, 20]} tickFormat={String} style={{fontSize: 10}}/>
      <XAxis style={{fontSize: 10}}/>
    </XYPlot>
  </div>);
}

export class TwoCharts extends Component {
  constructor(props) {
    super(props);
    this.state={index: -1};
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onNearestX = this._onNearestX.bind(this);
  }

  _onNearestX(value, {index}) {
    this.setState({index});
  }

  _onMouseLeave() {
    this.setState({index: -1});
  }

  render() {
    const yMaxTotal = Math.max(...data.map(d => d.total));
    const {index} = this.state;
      return (<div className="guideline-chart">
        <h2 style={{marginTop: 4}}>Revenue per hour</h2>
        <p style={{marginLeft: 50, fontWeight: 500}}>Total Revenue</p>
        <XYPlot 
          onMouseLeave={this._onMouseLeave}
          xDomain={[0, 24]}
          width={659} height={200} margin={{top: 10, bottom: 30, left: 50, right: 10}}>
          <LineSeries
            onNearestX={this._onNearestX}
            yDomain={[0, yMaxTotal]}
            data={data.map(d => ({x: d.hour + 0.5, y: d.total}))}
          />
          <YAxis yDomain={[0, yMaxTotal]} />
          <XAxis  />
          {index > -1 ?
            <Hint value={{x: index + 0.5, y: data[index].total}} style={{background: '#494949', opacity: 0.8, padding: 10, margin: 10, fontSize: 10}}>
            <p style={{fontWeight: 500, margin: 0, color: 'white'}}>{`${index}:00 - ${index + 1}:00`}</p>
            <p style={{margin: 0, color: 'white', textAlign: 'end'}}>{`$${data[index].total.toLocaleString()}`}</p>
            </Hint> :
          null}
          {index > -1 ? <LineSeries
            color='#494949'
            opacity={0.5}
            strokeWidth={1}
            data={[{x: index + 0.5, y: 0}, {x: index + 0.5, y: yMaxTotal}]}
          />  : null}
          {index > -1 ? <MarkSeries
            size={5}
            fill="#12939A"
            stroke="white"
            data={[{x: index + 0.5, y: data[index].total}]}
          /> : null}
        </XYPlot>
        <p style={{margin: '10px 0 6px 0', fontSize: 11}}>
          Revenue per trip -{
            index > -1 ? ` ${index}:00 - ${index + 1}:00: ${(data[index].total / data[index].dropoffs).toFixed(2)}` : ' Average $15.47'
          }
        </p>
        <XYPlot
          onMouseLeave={this._onMouseLeave}
          xDomain={[0, 24]}
          yDomain={[10, 20]}
          width={659} height={80} margin={{top: 10, bottom: 22, left: 50, right: 10}}>
          <LineSeries
            onNearestX={this._onNearestX}
            
            data={data.map(d => ({x: d.hour + 0.5, y: d.total / d.dropoffs}))}
          />
          <LineSeries
            data={[{x: 0.5, y: 15.47}, {x: 23.5, y: 15.47}]} style={{strokeDasharray: '2 2', strokeWidth: 1}}
          />
          {index > -1 ? <LineSeries
            color='#494949'
            opacity={0.5}
            strokeWidth={1}
            data={[{x: index + 0.5, y: 10}, {x: index + 0.5, y: 20}]}
          />  : null}
          <YAxis tickValues={[10, 12.5, 15, 17.5, 20]} tickFormat={String} style={{fontSize: 10}}/>
          <XAxis style={{fontSize: 10}}/>
          <Crosshair values={this.state.crosshairValues} />
        </XYPlot>
      </div>);
  }
}
