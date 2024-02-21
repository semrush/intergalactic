import React from 'react';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import ChevronRightIcon from '@semcore/ui/icon/ChevronRight/m';

const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={ButtonTrigger}>Click me</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <DropdownMenu.Item>Item 1</DropdownMenu.Item>
        <DropdownMenu.Item>Item 2</DropdownMenu.Item>
        <DropdownMenu.Item>Item 3</DropdownMenu.Item>
        <DropdownMenu.Nesting>
          <DropdownMenu placement='right' interaction='hover' timeout={[0, 300]}>
            <DropdownMenu.Trigger tag={DropdownMenu.Nesting.Trigger}>
              Item 4
              <DropdownMenu.Nesting.Addon tag={ChevronRightIcon} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Menu w={120}>
              <DropdownMenu.Nesting>
                <DropdownMenu placement='right' interaction='hover' timeout={[0, 300]}>
                  <DropdownMenu.Trigger tag={DropdownMenu.Nesting.Trigger}>
                    Item 4.1
                    <DropdownMenu.Nesting.Addon tag={ChevronRightIcon} />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Menu w={120}>
                    <DropdownMenu.Item>Item 4.1.1</DropdownMenu.Item>
                    <DropdownMenu.Item>Item 4.1.2</DropdownMenu.Item>
                    <DropdownMenu.Item>Item 4.1.3</DropdownMenu.Item>
                  </DropdownMenu.Menu>
                </DropdownMenu>
              </DropdownMenu.Nesting>
              <DropdownMenu.Nesting>
                <DropdownMenu placement='right' interaction='hover' timeout={[0, 300]}>
                  <DropdownMenu.Trigger tag={DropdownMenu.Nesting.Trigger}>
                    Item 4.2
                    <DropdownMenu.Nesting.Addon tag={ChevronRightIcon} />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Menu w={120}>
                    <DropdownMenu.Nesting>
                      <DropdownMenu placement='right' interaction='hover' timeout={[0, 300]}>
                        <DropdownMenu.Trigger tag={DropdownMenu.Nesting.Trigger}>
                          Item 4.2.1
                          <DropdownMenu.Nesting.Addon tag={ChevronRightIcon} />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Menu w={120}>
                          <DropdownMenu.Item>Item 4.2.1.1</DropdownMenu.Item>
                          <DropdownMenu.Item>Item 4.2.1.2</DropdownMenu.Item>
                          <DropdownMenu.Item>Item 4.2.1.3</DropdownMenu.Item>
                        </DropdownMenu.Menu>
                      </DropdownMenu>
                    </DropdownMenu.Nesting>
                    <DropdownMenu.Item>Item 4.2.2</DropdownMenu.Item>
                    <DropdownMenu.Item>Item 4.2.3</DropdownMenu.Item>
                  </DropdownMenu.Menu>
                </DropdownMenu>
              </DropdownMenu.Nesting>
              <DropdownMenu.Item>Item 4.3</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
        </DropdownMenu.Nesting>
        <DropdownMenu.Item>Item 5</DropdownMenu.Item>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default Demo;
