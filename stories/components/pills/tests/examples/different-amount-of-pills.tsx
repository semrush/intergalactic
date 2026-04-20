import { Flex } from '@semcore/ui/base-components';
import Pills from '@semcore/ui/pills';
import type { NSPills } from '@semcore/ui/pills';
import React from 'react';

type PillExampleProps = NSPills.Props & NSPills.Pill.Props;
const Demo = (props: PillExampleProps) => {
  const [choice, setChoice] = React.useState(null);

  return (
    <Flex direction='column' alignItems='flex-start'>

      <Pills value={choice} onChange={setChoice}>
        <Pills.Item value={1}>1</Pills.Item>
      </Pills>
      <Pills value={choice} onChange={setChoice}>
        <Pills.Item value={1} selected={props.selected}>1</Pills.Item>
        <Pills.Item value={2}>2</Pills.Item>
      </Pills>
      <Pills value={choice} onChange={setChoice}>
        <Pills.Item value={1} selected={props.selected}>1</Pills.Item>
        <Pills.Item value={2}>2</Pills.Item>
        <Pills.Item value={3}>3</Pills.Item>
      </Pills>
    </Flex>
  );
};

export const defaultProps: PillExampleProps = {
  selected: true,
};

Demo.defaultProps = defaultProps;

export default Demo;
