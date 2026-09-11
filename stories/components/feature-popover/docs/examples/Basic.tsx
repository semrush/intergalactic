import FileExport from '@semcore/icon/FileExport/m';
import { Flex, Box, ScreenReaderOnly } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import FeaturePopover from '@semcore/ui/feature-popover';
import type { NSFeaturePopover } from '@semcore/ui/feature-popover';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export const defaultProps: FeaturePopoverExampleProps = {
  closeIcon: true,
  theme: 'accent',
};

const Demo = (props: FeaturePopoverExampleProps) => {
  const [visible, setVisible] = React.useState(true);
  const handleVisibleChange = (visible: boolean) => () => setVisible(visible);

  return (
    <Flex gap={2}>
      <FeaturePopover
        visible={visible}
        onVisibleChange={setVisible}
        disablePortal
        theme={props.theme}
      >
        <FeaturePopover.Trigger>
          <DropdownMenu
            onVisibleChange={handleVisibleChange(false)}
          >
            <DropdownMenu.Trigger
              tag={Button}
              addonLeft={FileExport}
            >
              Export
            </DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>To CSV</DropdownMenu.Item>
              <DropdownMenu.Item>To PDF</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
          {visible && <FeaturePopover.Spot />}
        </FeaturePopover.Trigger>
        <FeaturePopover.Popper
          closeIcon={props.closeIcon}
          wMax={400}
          aria-label='New feature: Export'
        >
          <Flex alignItems='start'>
            <Box
              w={40}
              h={40}
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
              <Flex gap={2} alignItems='center'>
                <Button
                  theme='invert'
                  use='primary'
                  onClick={handleVisibleChange(false)}
                >
                  Next
                </Button>
                <Button
                  theme={
                    props.theme === 'accent' ? 'muted' : 'invert'
                  }
                  use='tertiary'
                  onClick={handleVisibleChange(false)}
                >
                  Remind me later
                </Button>

                <Text size={200} aria-live='polite' ml='auto'>
                  Step 1
                  <span aria-hidden='true'>/</span>
                  <ScreenReaderOnly>of</ScreenReaderOnly>
                  5
                </Text>
              </Flex>
            </div>
          </Flex>
        </FeaturePopover.Popper>
      </FeaturePopover>
      <Button
        use='tertiary'
        onClick={() => window.location.reload()}
      >
        Reload page
      </Button>
    </Flex>
  );
};

Demo.defaultProps = defaultProps;

export type FeaturePopoverExampleProps = {
  closeIcon: boolean;
  theme: NSFeaturePopover.Props['theme'];
};

export default Demo;
