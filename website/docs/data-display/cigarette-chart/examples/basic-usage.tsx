import React from 'react';
import { Chart } from '@semcore/d3-chart';

class Demo extends React.PureComponent {
  render() {
    return <Chart.Cigarette data={data} plotWidth={300} plotHeight={28} />;
  }
}

const data = {
  a: 3524,
  b: 1344,
  c: 6135,
  d: 1456,
  e: 1823,
};

export default Demo;
