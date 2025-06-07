import Button from '@semcore/button';
import DropdownMenu from '@semcore/dropdown-menu';
import { Flex } from '@semcore/flex-box';
import Trash from '@semcore/icon/Trash/m';
import React from 'react';

const menuItems: null[] = new Array(10).fill(null);

const Demo = () => {
  const [selected, setSelected] = React.useState<number>(0);

  return (
    <Flex gap={18} direction='row'>
      <DropdownMenu selectable visible disablePortal>
        <DropdownMenu.Trigger tag={Button}>M size</DropdownMenu.Trigger>
        <DropdownMenu.Menu hMax='180px' data-testid='m-size'>
          <DropdownMenu.Group title='List heading' subTitle='Subtitle'>
            {menuItems.map((_, index) => (
              <DropdownMenu.Item
                key={index}
                selected={index === selected}
                onClick={() => {
                  setSelected(index);
                }}
              >
                <DropdownMenu inlineActions placement='right'>
                  <Flex justifyContent='space-between'>
                    <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                      Menu item
                      {' '}
                      {index + 1}
                    </DropdownMenu.Item.Content>
                    <DropdownMenu.Actions>
                      <DropdownMenu.Item
                        tag={Button}
                        addonLeft={Trash}
                        title='Delete item'
                        hintPlacement='right'
                        onClick={(e) => e.stopPropagation()}
                      />
                    </DropdownMenu.Actions>
                  </Flex>
                </DropdownMenu>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Menu>
      </DropdownMenu>

      <DropdownMenu selectable visible disablePortal>
        <DropdownMenu.Trigger tag={Button}>Explore menu items</DropdownMenu.Trigger>
        <DropdownMenu.Menu hMax='180px' data-testid='m-disabled'>
          <DropdownMenu.Group title='List heading' subTitle='Subtitle'>
            {menuItems.map((_, index) => (
              <DropdownMenu.Item
                disabled
                key={index}
                selected={index === selected}
                onClick={() => {
                  setSelected(index);
                }}
              >
                <DropdownMenu inlineActions placement='right'>
                  <Flex justifyContent='space-between'>
                    <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                      Menu item
                      {' '}
                      {index + 1}
                    </DropdownMenu.Item.Content>
                    <DropdownMenu.Actions>
                      <DropdownMenu.Item
                        tag={Button}
                        addonLeft={Trash}
                        title='Delete item'
                        hintPlacement='right'
                        onClick={(e) => e.stopPropagation()}
                      />
                    </DropdownMenu.Actions>
                  </Flex>
                </DropdownMenu>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Menu>
      </DropdownMenu>

      <DropdownMenu size='l' selectable visible disablePortal>
        <DropdownMenu.Trigger tag={Button}>Explore menu items</DropdownMenu.Trigger>
        <DropdownMenu.Menu hMax='180px' data-testid='l-size'>
          <DropdownMenu.Group title='List heading' subTitle='Subtitle'>
            {menuItems.map((_, index) => (
              <DropdownMenu.Item
                key={index}
                selected={index === selected}
                onClick={() => {
                  setSelected(index);
                }}
              >
                <DropdownMenu inlineActions placement='right'>
                  <Flex justifyContent='space-between'>
                    <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                      Menu item
                      {' '}
                      {index + 1}
                    </DropdownMenu.Item.Content>
                    <DropdownMenu.Actions>
                      <DropdownMenu.Item
                        tag={Button}
                        addonLeft={Trash}
                        title='Delete item'
                        hintPlacement='right'
                        onClick={(e) => e.stopPropagation()}
                      />
                    </DropdownMenu.Actions>
                  </Flex>
                </DropdownMenu>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Menu>
      </DropdownMenu>
    </Flex>
  );
};

export default Demo;
