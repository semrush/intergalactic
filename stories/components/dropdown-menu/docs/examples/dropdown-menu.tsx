import FileExportM from '@semcore/icon/FileExport/m';
import Button from '@semcore/ui/button';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Link from '@semcore/ui/link';
import SpinContainer from '@semcore/ui/spin-container';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      triggerRef.current?.focus();
    }, 1000);
  };

  return (
    <DropdownMenu visible={visible} onVisibleChange={setVisible}>
      <DropdownMenu.Trigger tag={Button} ref={triggerRef}>
        <Button.Addon>
          <FileExportM />
        </Button.Addon>
        <Button.Text>Export</Button.Text>
      </DropdownMenu.Trigger>
      <DropdownMenu.Popper wMax='256px' aria-label='Export options'>
        <SpinContainer loading={loading}>
          <DropdownMenu.List>
            <DropdownMenu.Item onClick={handleClick}>Excel</DropdownMenu.Item>
            <DropdownMenu.Item onClick={handleClick}>CSV</DropdownMenu.Item>
            <DropdownMenu.Item onClick={handleClick}>CSV Semicolon</DropdownMenu.Item>
          </DropdownMenu.List>
          <DropdownMenu.Notice
            aria-labelledby='export-notice-title'
            theme='warning'
            px={3}
          >
            <DropdownMenu.Notice.Content>
              <Text tag='strong' mb={1} style={{ display: 'block' }} id='export-notice-title'>
                Export failed
              </Text>
              <Text>
                If the problem persists, please contact us at
                {' '}
                <Link href='mailto:feedback@semrush.com'>
                  feedback@semrush.com
                </Link>
              </Text>
            </DropdownMenu.Notice.Content>
          </DropdownMenu.Notice>
        </SpinContainer>
      </DropdownMenu.Popper>
    </DropdownMenu>
  );
};

export default Demo;
