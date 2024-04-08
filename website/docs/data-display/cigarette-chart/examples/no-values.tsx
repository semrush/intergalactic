import React from 'react';
import { Chart, interpolateValue } from '@semcore/d3-chart';

class Demo extends React.PureComponent {
  render() {
    return <Chart.Cigarette data={data} plotWidth={300} showLegend={true} />;
  }
}

const data = {
  a: 3524,
  b: interpolateValue,
  c: 6135,
  d: null,
  e: 1823,
};

export default Demo;
