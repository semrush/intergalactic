import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FeaturePopover from '@semcore/feature-popover';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import { Flex, Box } from '@semcore/flex-box';

const meta: Meta<typeof FeaturePopover> = {
  title: 'Components/FeaturePopover',
  component: FeaturePopover,
};

export default meta;
type Story = StoryObj<typeof FeaturePopover>;

export const AnimationExample: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);
    const handleVisibleChange = (visible: boolean) => () => setVisible(visible);
    return (
      <FeaturePopover visible={visible} onVisibleChange={setVisible} disablePortal>
        <FeaturePopover.Trigger>
          <Button>Open Popover</Button>
          {visible && <FeaturePopover.Spot />}
        </FeaturePopover.Trigger>
        <FeaturePopover.Popper closeIcon wMax={350}>
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
  },
};