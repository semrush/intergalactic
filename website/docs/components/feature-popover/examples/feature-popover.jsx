import React, { useState } from 'react';
import FeaturePopover from '@semcore/ui/feature-popover';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import { Flex, Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [visible, setVisible] = useState(true);
  const handleVisibleChange = (visible) => () => setVisible(visible);

  return (
    <FeaturePopover visible={visible} onVisibleChange={setVisible} disablePortal>
      <FeaturePopover.Trigger>
        <Button>Open Popover</Button>
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
            <Text size={300} bold tag="h3" mb={1}>
              Work with your team!
            </Text>
            <Text mb={4} size={200} tag="p">
              Well, if you like burgers give 'em a try sometime.
            </Text>
            <Button theme="invert" use="primary" onClick={handleVisibleChange(false)}>
              Got it
            </Button>
            <Button theme="muted" use="tertiary" ml={2} onClick={handleVisibleChange(false)}>
              Remind me later
            </Button>
          </div>
        </Flex>
      </FeaturePopover.Popper>
    </FeaturePopover>
  );
};

export default Demo;
