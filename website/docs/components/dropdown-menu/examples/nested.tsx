import React from 'react';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import ChevronRight from '@semcore/ui/icon/ChevronRight/m';

const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={ButtonTrigger}>Click me</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <DropdownMenu.Item>Item 1</DropdownMenu.Item>
        <DropdownMenu placement='right' interaction='hover' timeout={[0, 300]}>
          <DropdownMenu.Trigger tag={DropdownMenu.Item}>
            Item 2 <ChevronRight ml='auto' color='icon-primary-neutral' />
          </DropdownMenu.Trigger>
          <DropdownMenu.Menu w={120}>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu placement='right' interaction='hover' timeout={[0, 300]}>
              <DropdownMenu.Trigger tag={DropdownMenu.Item}>
                Item 3 <ChevronRight ml='auto' color='icon-primary-neutral' />
              </DropdownMenu.Trigger>
              <DropdownMenu.Menu w={120}>
                <DropdownMenu.Item>Item 1</DropdownMenu.Item>
                <DropdownMenu.Item>Item 2</DropdownMenu.Item>
                <DropdownMenu.Item>Item 3</DropdownMenu.Item>
              </DropdownMenu.Menu>
            </DropdownMenu>
          </DropdownMenu.Menu>
        </DropdownMenu>
        <DropdownMenu.Item>Item 3</DropdownMenu.Item>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default Demo;
