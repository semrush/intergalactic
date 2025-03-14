import React from 'react';
import FeaturePopover from '@semcore/feature-popover';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import { Flex, Box } from '@semcore/flex-box';
import DropdownMenu from '@semcore/dropdown-menu';
import FileExport from '@semcore/icon/FileExport/m';

const Demo = () => {
  const [visible, setVisible] = React.useState(true);
  const handleVisibleChange = (visible: boolean) => () => setVisible(visible);

  return (
    <Flex gap={2}>
      <FeaturePopover visible={visible} onVisibleChange={setVisible} disablePortal>
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
        <FeaturePopover.Popper
          closeIcon
          wMax={350}
          aria-label='New feature: Export'
          duration={1000}
        >
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

export default Demo;
