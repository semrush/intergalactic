import React from 'react';
import DropdownMenu from 'intergalactic/dropdown-menu';
import { Flex } from 'intergalactic/flex-box';
import TrashM from 'intergalactic/icon/Trash/m';
import PlusM from 'intergalactic/icon/MathPlus/m';
import Button from 'intergalactic/button';
import ChevronRightIcon from '@semcore/icon/ChevronRight/m';

const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={Button}>Explore menu items with actions</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <DropdownMenu.Item>Menu item 1</DropdownMenu.Item>
        <DropdownMenu.Item>Menu item 2</DropdownMenu.Item>

        <DropdownMenu.Item>
          <DropdownMenu inlineActions placement={'right'}>
            <Flex justifyContent='space-between'>
              <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
              Menu item 3
              </DropdownMenu.Item.Content>
              <DropdownMenu.Actions gap={1}>
                <DropdownMenu.Item tag={Button} addonLeft={PlusM} aria-label={'Add new'} />
                <DropdownMenu.Item tag={Button} addonLeft={TrashM} aria-label={'Delete'} />
              </DropdownMenu.Actions>
            </Flex>
          </DropdownMenu>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <DropdownMenu
            placement={'right-start'}
            interaction={'hover'}
            timeout={[0, 300]}
            offset={[-11, 12]}
          >
            <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
            Menu item 4
              <ChevronRightIcon color='icon-secondary-neutral' />
            </DropdownMenu.Item.Content>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>Add</DropdownMenu.Item>
              <DropdownMenu.Item>Delete</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
        </DropdownMenu.Item>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default Demo;
