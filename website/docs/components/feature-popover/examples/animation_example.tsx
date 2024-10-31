import React from 'react';
import FeaturePopover from 'intergalactic/feature-popover';
import Button from 'intergalactic/button';
import { Text } from 'intergalactic/typography';
import { Flex, Box } from 'intergalactic/flex-box';

const Demo = () => {
  const [visible, setVisible] = React.useState(true);
  const handleVisibleChange = (visible) => () => setVisible(visible);

  return (
    <FeaturePopover visible={visible} onVisibleChange={setVisible}>
      <FeaturePopover.Trigger>
        <Button>Open Popover</Button>
        {visible && <FeaturePopover.Spot />}
      </FeaturePopover.Trigger>
      <FeaturePopover.Popper closeIcon wMax={350} aria-label={'New feature description'}>
        <Flex alignItems='start'>
          <Box
            w={40}
            h={40}
            mr={4}
            flex='0 0 auto'
            style={{
              borderRadius: '50%',
              background: 'orange',
            }}
          />
          <div>
            <Text size={300} bold tag='h3' mb={1} mt={0}>
              Look! We got a new feature!
            </Text>
            <Text mb={4} size={200} tag='p'>
              With this new feature, users can now enjoy improved user experience, or expanded
              capabilities.
            </Text>
            <Button theme='invert' use='primary' onClick={handleVisibleChange(false)}>
              Got it
            </Button>
            <Button theme='muted' use='tertiary' ml={2} onClick={handleVisibleChange(false)}>
              Remind me later
            </Button>
          </div>
        </Flex>
      </FeaturePopover.Popper>
    </FeaturePopover>
  );
};

export default Demo;
