import React, { useState } from 'react';
import FeaturePopover from '@semcore/feature-popover';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import { Flex, Box } from '@semcore/flex-box';

const Demo = () => {
  const [visible, updateVisible] = useState(true);
  const changeVisible = (visible) => () => updateVisible(visible);

  return (
    <FeaturePopover visible={visible} onVisibleChange={updateVisible}>
      <FeaturePopover.Trigger tag={Button}>
        Open Popover
        {visible && <FeaturePopover.Spot />}
      </FeaturePopover.Trigger>
      <FeaturePopover.Popper closeIcon wMax={350}>
        <Flex alignItems="start">
          <Box
            w={40}
            h={40}
            mr={4}
            flex="0 0 auto"
            style={{
              borderRadius: '50%',
              background: 'orange',
            }}
          />
          <div>
            <Text size={300} bold tag="p" mb={1}>
              Work with your team!
            </Text>
            <Text mb={4} size={200} tag="p">
              Well, if you like burgers give 'em a try sometime.
            </Text>
            <Button theme="invert" use="primary" onClick={changeVisible(false)}>
              Got it
            </Button>
            <Button theme="muted" use="tertiary" ml={2} onClick={changeVisible(false)}>
              Remind me later
            </Button>
          </div>
        </Flex>
      </FeaturePopover.Popper>
    </FeaturePopover>
  );
};

export default Demo;
