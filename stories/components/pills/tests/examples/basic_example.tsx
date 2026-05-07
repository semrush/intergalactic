import Globe from '@semcore/icon/Globe/m';
import ThumbDownM from '@semcore/icon/ThumbDown/m';
import ThumbUpM from '@semcore/icon/ThumbUp/m';
import Badge from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/flex-box';
import Pills from '@semcore/ui/pills';
import type { NSPills } from '@semcore/ui/pills';
import Spin from '@semcore/ui/spin';
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
          <Pills.Item.Addon tag={ThumbUpM} />
        </Pills.Item>
        <Pills.Item value={null}>Don't care</Pills.Item>
        <Pills.Item value='dislike' addonLeft={ThumbDownM}>
          <Pills.Item.Text>Dislike</Pills.Item.Text>
        </Pills.Item>
        <Pills.Item value={1}>
          <Pills.Item.Addon tag={Globe} />
        </Pills.Item>
        <Pills.Item value={1}>
          <Pills.Item.Addon>
            <Pills.Item.Text>Badge</Pills.Item.Text>
            <Badge type='admin' />
          </Pills.Item.Addon>
        </Pills.Item>
        <Pills.Item value={2} addonRight={Globe}>
        </Pills.Item>
        <Pills.Item value={1} disabled>
          <Pills.Item.Addon>
            <Pills.Item.Text>Spin</Pills.Item.Text>
            <Spin size='s' />
          </Pills.Item.Addon>
        </Pills.Item>
      </Pills>
    </Flex>
  );
};

export const defaultProps: PillExampleProps = {
  size: 'm',
  disabled: undefined,
  behavior: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
