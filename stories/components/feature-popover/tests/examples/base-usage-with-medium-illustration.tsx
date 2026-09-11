import FileExport from '@semcore/icon/FileExport/m';
import { Flex, Box } from '@semcore/ui/base-components';
import type { NSPopper } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import FeaturePopover from '@semcore/ui/feature-popover';
import type { NSFeaturePopover } from '@semcore/ui/feature-popover';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = NSFeaturePopover.Popper.Props & NSPopper.Props & NSPopper.Trigger.Props & NSPopper.Popper.Props;

const Demo: ((props: ExampleProps) => React.ReactElement) & { defaultProps: ExampleProps } = (props) => {
  const [visible, setVisible] = React.useState(true);
  const handleVisibleChange = (visible: boolean) => () => setVisible(visible);

  return (
    <Flex gap={2} pt={100} pl={100}>
      <FeaturePopover
        onVisibleChange={setVisible}
        disablePortal
        placement={props.placement}
        timeout={props.timeout}
        explicitTriggerSet={props.explicitTriggerSet}
        popperMargin={props.popperMargin}
        visible={props.visible}
      >
        <FeaturePopover.Trigger>
          <DropdownMenu onVisibleChange={handleVisibleChange(false)}>
            <DropdownMenu.Trigger tag={Button} addonLeft={FileExport}>
              Export
            </DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>To CSV</DropdownMenu.Item>
              <DropdownMenu.Item>To PDF</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
          {visible && <FeaturePopover.Spot />}
        </FeaturePopover.Trigger>
        <FeaturePopover.Popper closeIcon={props.closeIcon} duration={props.duration} wMax={550} aria-label='New feature: Export'>
          <Flex alignItems='start'>
            <Box
              w={80}
              h={80}
              mr={4}
              flex='0 0 auto'
              style={{
                borderRadius: '50%',
                background: 'var(--intergalactic-illustration-violet)',
              }}
            />
            <div>
              <Text size={300} bold tag='h3' mb={1} mt={0}>
                Export your data
              </Text>
              <Text mb={4} size={200} tag='p'>
                With this new feature, you can now export your data to CSV or PDF files.
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
      <Button use='tertiary' onClick={() => window.location.reload()}>
        Reload page
      </Button>
    </Flex>
  );
};

export const defaultProps: ExampleProps = {
  'placement': undefined,
  'visible': true,
  'timeout': undefined,
  'explicitTriggerSet': false,
  'popperMargin': undefined,
  'closeIcon': true,
  'duration': undefined,
  'aria-label': 'label',
};

Demo.defaultProps = defaultProps;

export default Demo;
