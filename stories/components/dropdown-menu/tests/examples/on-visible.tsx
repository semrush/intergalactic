import FileExportM from '@semcore/icon/FileExport/m';
import Button from '@semcore/ui/button';
import Dropdown from '@semcore/ui/dropdown';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  const handleVisiblity = (next: any) => {
    if (next) {
      alert('boom');
    }

    setVisible(next);
  };

  return (
    <DropdownMenu onVisibleChange={handleVisiblity}>
      <DropdownMenu.Trigger tag='button' tabIndex={0} data-testid='dd-button-trigger'>
        Trigger
      </DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <DropdownMenu.Item>Item 1</DropdownMenu.Item>
        <DropdownMenu.Item>Item 2</DropdownMenu.Item>
        <DropdownMenu.Item>Item 3</DropdownMenu.Item>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default Demo;
