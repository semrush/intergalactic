import { Box } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

type BaseExampleProps = {
  showLegend?: boolean;
};
const Demo = (props: BaseExampleProps) => {
  const { showLegend } = props;
  const onClickHandler = () => {
    console.log('Clicked bubble chart');
  };
  return (
    <Box w={500} h={200}>
      { /* @ts-ignore: the value is not statically known, but it's valid at runtime */}
      <Chart.Bubble
        data={data}
        onClickBubble={onClickHandler}
        aria-label='Bubble chart'
        showLegend={showLegend}
      />
    </Box>
  );
};

const data = [
  { x: 2, y: 3, value: 5040, label: 'label 1' },
  { x: 1, y: 9, value: 40, label: 'label 2' },
  { x: 6, y: 2, value: 45634, label: 'label 3' },
  { x: 4, y: 7, value: 245, label: 'label 4' },
  { x: 9, y: 5, value: 7462, label: 'label 5' },
];

export const defaultProps: BaseExampleProps = {
  showLegend: false,
};

export default Demo;
