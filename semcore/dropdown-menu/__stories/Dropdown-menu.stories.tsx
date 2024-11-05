import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import DropdownMenu from '@semcore/dropdown-menu';
import { Flex } from '@semcore/flex-box';
import TrashM from '@semcore/icon/Trash/m';
import PlusM from '@semcore/icon/MathPlus/m';
import Button from '@semcore/button';
import ChevronRightIcon from '@semcore/icon/ChevronRight/m';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown Menu',
  component: DropdownMenu,
};

type Story = StoryObj<typeof DropdownMenu>;

export const menuItemWithActions: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <DropdownMenu.Trigger tag={Button}>List item with actions</DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>

          <DropdownMenu.Item>
            <DropdownMenu inlineActions placement={'right'}>
              <Flex justifyContent='space-between'>
                <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                  Item 3
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
                Item 4
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
  },
};

export default meta;
