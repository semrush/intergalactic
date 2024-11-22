import React from 'react';
import DropdownMenu from 'intergalactic/dropdown-menu';
import Button from 'intergalactic/button';
import ChevronRightIcon from '@semcore/icon/ChevronRight/m';

const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={Button}>Nested menus</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <DropdownMenu.Item>Item 1</DropdownMenu.Item>
        <DropdownMenu.Item>Item 2</DropdownMenu.Item>
        <DropdownMenu.Item>Item 3</DropdownMenu.Item>
        <DropdownMenu.Item>
          <DropdownMenu
            placement='right-start'
            interaction='hover'
            timeout={[0, 300]}
            offset={[-11, 12]}
          >
            <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
              Item 4
              <DropdownMenu.Item.Addon tag={ChevronRightIcon} color='icon-secondary-neutral' />
            </DropdownMenu.Item.Content>
            <DropdownMenu.Menu w={120}>
              <DropdownMenu.Item>
                <DropdownMenu
                  placement='right-start'
                  interaction='hover'
                  timeout={[0, 300]}
                  offset={[-11, 12]}
                >
                  <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                    Item 4.1
                    <DropdownMenu.Item.Addon
                      tag={ChevronRightIcon}
                      color='icon-secondary-neutral'
                    />
                  </DropdownMenu.Item.Content>
                  <DropdownMenu.Menu w={120}>
                    <DropdownMenu.Item>Item 4.1.1</DropdownMenu.Item>
                    <DropdownMenu.Item>Item 4.1.2</DropdownMenu.Item>
                    <DropdownMenu.Item>Item 4.1.3</DropdownMenu.Item>
                  </DropdownMenu.Menu>
                </DropdownMenu>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <DropdownMenu
                  placement='right-start'
                  interaction='hover'
                  timeout={[0, 300]}
                  offset={[-11, 12]}
                >
                  <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                    Item 4.2
                    <DropdownMenu.Item.Addon
                      tag={ChevronRightIcon}
                      color='icon-secondary-neutral'
                    />
                  </DropdownMenu.Item.Content>
                  <DropdownMenu.Menu w={120}>
                    <DropdownMenu.Item>
                      <DropdownMenu
                        placement='right-start'
                        interaction='hover'
                        timeout={[0, 300]}
                        offset={[-11, 12]}
                      >
                        <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                          Item 4.2.1
                          <DropdownMenu.Item.Addon
                            tag={ChevronRightIcon}
                            color='icon-secondary-neutral'
                          />
                        </DropdownMenu.Item.Content>
                        <DropdownMenu.Menu w={120}>
                          <DropdownMenu.Item>Item 4.2.1.1</DropdownMenu.Item>
                          <DropdownMenu.Item>Item 4.2.1.2</DropdownMenu.Item>
                          <DropdownMenu.Item>Item 4.2.1.3</DropdownMenu.Item>
                        </DropdownMenu.Menu>
                      </DropdownMenu>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>Item 4.2.2</DropdownMenu.Item>
                    <DropdownMenu.Item>Item 4.2.3</DropdownMenu.Item>
                  </DropdownMenu.Menu>
                </DropdownMenu>
              </DropdownMenu.Item>
              <DropdownMenu.Item>Item 4.3</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
        </DropdownMenu.Item>
        <DropdownMenu.Item>Item 5</DropdownMenu.Item>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default Demo;
