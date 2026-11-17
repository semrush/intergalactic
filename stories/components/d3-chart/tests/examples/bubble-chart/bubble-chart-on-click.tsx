import { Flex } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type BaseExampleProps = {
  showLegend?: boolean;
};
const Demo = (props: BaseExampleProps) => {
  const { showLegend } = props;
  const [clicked, setClicked] = React.useState<number | null>(null);

  // `onClickBubble` should return the index in `data` as passed by the consumer,
  // so the label printed below must match the label of the clicked bubble.
  const onClickHandler = (index: number) => {
    console.log('Clicked bubble chart', index, data[index]?.label);
    setClicked(index);
  };

  return (
    <Flex direction='column' gap={2}>
      { /* @ts-ignore: the value is not statically known, but it's valid at runtime */}
      <Chart.Bubble
        data={data}
        plotWidth={500}
        plotHeight={200}
        onClickBubble={onClickHandler}
        aria-label='Bubble chart'
        showLegend={showLegend}
      />
      <Text data-testid='clicked-bubble'>
        {clicked === null
          ? 'Click a bubble'
          : `onClickBubble index: ${clicked}, data[index].label: ${data[clicked]?.label}`}
      </Text>
    </Flex>
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
