import { Flex, Box } from '@semcore/base-components';
import Button from '@semcore/button';
import DropdownMenu from '@semcore/dropdown-menu';
import FeaturePopover from '@semcore/feature-popover';
import type { FeaturePopoverProps } from '@semcore/feature-popover';
import FileExport from '@semcore/icon/FileExport/m';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = (props: FeaturePopoverProps) => {
  const [visible, setVisible] = React.useState(true);
  const handleVisibleChange = (visible: boolean) => () => setVisible(visible);

  return (
    <Flex gap={2}>
      <FeaturePopover visible={visible} onVisibleChange={setVisible} disablePortal theme={props.theme}>
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
        <FeaturePopover.Popper closeIcon={props.closeIcon} wMax={400} aria-label='New feature: Export'>
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
                Export your data {props.theme}
              </Text>
              <Text mb={4} size={200} tag='p'>
                With this new feature, you can now export your data to CSV or PDF files.
              </Text>
              <Flex justifyContent='space-between'>
                <Button theme='invert' use='primary' onClick={handleVisibleChange(false)}>
                  Got it
                </Button>
                <Button theme={props.theme === 'accent' ? 'muted' : 'invert'} use='tertiary' ml={2} onClick={handleVisibleChange(false)}>
                  Remind me later
                </Button>
                <FeaturePopover.StepCounter currentStep={1} totalSteps={5} />
              </Flex>
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

export const defaultProps: FeaturePopoverProps = {
  closeIcon: true,
  theme: 'accent',
};

Demo.defaultProps = defaultProps;

export default Demo;
