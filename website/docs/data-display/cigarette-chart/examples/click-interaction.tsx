import React from 'react';
import { Chart } from '@semcore/d3-chart';

type KEY = string;

class Demo extends React.PureComponent {
  handleClick = (key: KEY, e: React.SyntheticEvent) => {
    // biome-ignore lint/suspicious/noConsoleLog:
    console.log('click', key);
  };

  render() {
    return <Chart.Cigarette data={data} plotWidth={300} onClick={this.handleClick} />;
  }
}

const data: { [key: KEY]: number } = {
  a: 3524,
  b: 1344,
  c: 6135,
  d: 1456,
  e: 1823,
};

export default Demo;
