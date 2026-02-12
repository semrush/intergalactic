import Globe from '@semcore/icon/Globe/m';
import ThumbDownM from '@semcore/icon/ThumbDown/m';
import ThumbUpM from '@semcore/icon/ThumbUp/m';
import Badge from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/base-components';
import Pills from '@semcore/ui/pills';
import type { PillsProps, PillProps } from '@semcore/ui/pills';
import Spin from '@semcore/ui/spin';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type PillExampleProps = PillsProps & PillProps;
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
