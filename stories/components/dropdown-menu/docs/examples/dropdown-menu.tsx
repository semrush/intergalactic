import React from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';
import Link from '@semcore/link';
import { Text } from '@semcore/typography';
import Notice from '@semcore/notice';
import SpinContainer from '@semcore/spin-container';
import FileExportM from '@semcore/icon/FileExport/m';

const Demo = () => {
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={Button}>
        <Button.Addon>
          <FileExportM />
        </Button.Addon>
        <Button.Text>Export</Button.Text>
      </DropdownMenu.Trigger>
      <DropdownMenu.Popper wMax='256px' aria-label={'Export options'}>
        <SpinContainer loading={loading}>
          <DropdownMenu.List>
            <DropdownMenu.Item onClick={handleClick}>Excel</DropdownMenu.Item>
            <DropdownMenu.Item onClick={handleClick}>CSV</DropdownMenu.Item>
            <DropdownMenu.Item onClick={handleClick}>CSV Semicolon</DropdownMenu.Item>
          </DropdownMenu.List>
          <Notice
            theme='warning'
            style={{
              padding: 'var(--intergalactic-spacing-3x) var(--intergalactic-spacing-2x)',
              borderWidth: 0,
              borderTopWidth: '1px',
              borderRadius:
                '0 0 var(--intergalactic-rounded-medium) var(--intergalactic-rounded-medium)',
            }}
          >
            <Notice.Content>
              <Text tag='strong' mb={1} style={{ display: 'block' }}>
                Export failed
              </Text>
              <Text>
                If the problem persists, please contact us at{' '}
                <Link inline href='mailto:feedback@semrush.com'>
                  feedback@semrush.com
                </Link>
              </Text>
            </Notice.Content>
          </Notice>
        </SpinContainer>
      </DropdownMenu.Popper>
    </DropdownMenu>
  );
};

export default Demo;
