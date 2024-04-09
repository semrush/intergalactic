import React from 'react';
import { Chart } from '@semcore/d3-chart';

type KEY = string;

class Demo extends React.PureComponent {
  handleClick = (key: KEY, e: React.SyntheticEvent) => {
    // biome-ignore lint/suspicious/noConsoleLog:
    console.log('click', key);
  };

  render() {
    return (
      <Chart.Cigarette data={data} plotWidth={400} plotHeight={28} onClick={this.handleClick} />
    );
  }
}

const data: { [key: KEY]: number } = {
  Cats: 3524,
  Dogs: 1344,
  Capybaras: 6135,
  Hamsters: 1456,
  Birds: 1823,
};

export default Demo;
