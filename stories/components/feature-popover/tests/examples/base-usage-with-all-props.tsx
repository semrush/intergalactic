import { Flex, Box } from '@semcore/base-components';
import Button from '@semcore/button';
import DropdownMenu from '@semcore/dropdown-menu';
import FeaturePopover from '@semcore/feature-popover';
import type { FeaturePopoverPopperProps } from '@semcore/feature-popover';
import FileExport from '@semcore/icon/FileExport/m';
import type { PopperProps, PopperTriggerProps, PopperPopperProps } from '@semcore/popper';
import { Text } from '@semcore/typography';
import React from 'react';

type ExampleProps = FeaturePopoverPopperProps & PopperProps & PopperTriggerProps & PopperPopperProps;
const Demo = (props: ExampleProps) => {
  const [visible, setVisible] = React.useState(true);
  const handleVisibleChange = (visible: boolean) => () => setVisible(visible);

  return (
    <Flex gap={2} pt={100} pl={100}>
      <FeaturePopover
        onVisibleChange={setVisible}
        visible={visible}
        disablePortal={props.disablePortal}
        placement={props.placement}
        timeout={props.timeout}
        explicitTriggerSet={props.explicitTriggerSet}
        cursorAnchoring={props.cursorAnchoring}
        popperMargin={props.popperMargin}
        closeIcon={props.closeIcon}
        duration={props.duration}
      >
        <FeaturePopover.Trigger>
          <DropdownMenu>
            <DropdownMenu.Trigger tag={Button} addonLeft={FileExport} disableEnforceFocus={props.disableEnforceFocus}>
              Export
            </DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>To CSV</DropdownMenu.Item>
              <DropdownMenu.Item>To PDF</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
          {visible && <FeaturePopover.Spot />}
        </FeaturePopover.Trigger>
        <FeaturePopover.Popper closeIcon={props.closeIcon} duration={props.duration} wMax={350} aria-label='New feature: Export' disableEnforceFocus={props.disableEnforceFocus} autoFocus={props.autoFocus}>
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
  placement: undefined,
  timeout: undefined,
  disablePortal: true,
  explicitTriggerSet: false,
  cursorAnchoring: false,
  popperMargin: undefined,
  closeIcon: true,
  duration: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
