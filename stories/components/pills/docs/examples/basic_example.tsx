import ThumbDownM from '@semcore/icon/ThumbDown/m';
import ThumbUpM from '@semcore/icon/ThumbUp/m';
import { Flex } from '@semcore/ui/base-components';
import Pills from '@semcore/ui/pills';
import type { NSPills } from '@semcore/ui/pills';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type PillExampleProps = NSPills.Props & NSPills.Pill.Props;
const Demo = (props: PillExampleProps) => {
  const [choice, setChoice] = React.useState(null);

  return (
    <Flex direction='column' alignItems='flex-start'>
      <Text size={200} id='pills-basic-usage'>
        Your opinion
      </Text>
      <Pills mt={2} value={choice} onChange={setChoice} aria-labelledby='pills-basic-usage' size={props.size} disabled={props.disabled} behavior={props.behavior}>
        <Pills.Item value='like'>
          <Pills.Item.Addon tag={ThumbUpM} />
          <Pills.Item.Text>Like</Pills.Item.Text>
        </Pills.Item>
        <Pills.Item value={null}>Don't care</Pills.Item>
        <Pills.Item value='dislike'>
          <Pills.Item.Addon tag={ThumbDownM} />
          <Pills.Item.Text>Dislike</Pills.Item.Text>
        </Pills.Item>
      </Pills>
    </Flex>
  );
};

export const defaultProps: PillExampleProps = {
  size: 'm',
  disabled: undefined,
  behavior: 'auto',
};

Demo.defaultProps = defaultProps;

export default Demo;
