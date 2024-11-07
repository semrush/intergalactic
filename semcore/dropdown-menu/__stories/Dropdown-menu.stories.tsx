import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import DropdownMenu from '../src';
import { Flex } from '../../flex-box/src';
import TrashM from '../../icon/src';
import PlusM from  '../../icon/src';
import Button from '../../button/src';
import ChevronRightIcon from '@semcore/icon/ChevronRight/m';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown Menu',
  component: DropdownMenu,
};

type Story = StoryObj<typeof DropdownMenu>;

export const MenuItemWithActions: Story = {
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

export const NestedMenus: Story = {
  render: () => {
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
  },
};

export default meta;
