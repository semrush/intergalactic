import React, { useState } from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/base-trigger';
import Link from '@semcore/link';
import { Text } from '@semcore/typography';
import Notice from '@semcore/notice';
import SpinContainer from '@semcore/spin-container';
import FileExportXS from '@semcore/icon/FileExport/m';

export default function() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={Button}>
        <Button.Addon tag={FileExportXS} />
        <Button.Text>Export</Button.Text>
      </DropdownMenu.Trigger>
      <DropdownMenu.Popper wMax="257px">
        <SpinContainer loading={loading}>
          <DropdownMenu.List>
            <DropdownMenu.Item onClick={handleClick}>Excel</DropdownMenu.Item>
            <DropdownMenu.Item onClick={handleClick}>CSV</DropdownMenu.Item>
            <DropdownMenu.Item onClick={handleClick}>CSV Semicolon</DropdownMenu.Item>
          </DropdownMenu.List>
          <Notice
            theme="warning"
            style={{
              padding: '12px 8px',
              borderWidth: 0,
              borderTopWidth: '1px',
              borderRadius: '0 0 6px 6px',
            }}
          >
            <Notice.Content>
              <Text tag="strong" mb={1} style={{ display: 'block' }}>
                Export failed
              </Text>
              <Text lineHeight="18px">
                If the problem persists, please contact us at{' '}
                <Link inline href="mailto:feedback@semrush.com">
                  feedback@semrush.com
                </Link>
              </Text>
            </Notice.Content>
          </Notice>
        </SpinContainer>
      </DropdownMenu.Popper>
    </DropdownMenu>
  );
}
