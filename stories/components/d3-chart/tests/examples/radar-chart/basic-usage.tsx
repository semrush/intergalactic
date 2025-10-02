import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

type BaseExampleProps = {
  showLegend?: boolean;
};
const Demo = (props: BaseExampleProps) => {
  const { showLegend } = props;
  const onClickHandler = () => {
    console.log('Clicked radar chart');
  };
  return (
    <>
      {' '}
      { /* @ts-ignore: the value is not statically known, but it's valid at runtime */}

      <Chart.Radar
        data={data}
        showLegend={showLegend}
        groupKey='categories'
        plotWidth={400}
        plotHeight={400}
        aria-label='Radar chart'
        onClickRadar={onClickHandler}
      />
    </>
  );
};

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};

export const defaultProps: BaseExampleProps = {
  showLegend: undefined,

};

export default Demo;
