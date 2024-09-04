import React from 'react';
import DropdownMenu from 'intergalactic/dropdown-menu';
import { ButtonTrigger } from 'intergalactic/base-trigger';
import { Text } from 'intergalactic/typography';
import { Flex, Box } from 'intergalactic/flex-box';
import Tooltip from 'intergalactic/tooltip';
import TrashM from 'intergalactic/icon/Trash/m';
import PlusM from 'intergalactic/icon/MathPlus/m';
import Button from 'intergalactic/button';
import ChevronRightIcon from '@semcore/icon/ChevronRight/m';

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='dropdown-menu-with-menu'>
        List item with actions
      </Text>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={ButtonTrigger} mt={2} mr='auto' id='dropdown-menu-with-menu'>
          Check the options
        </DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>

          <DropdownMenu.Item>
            <DropdownMenu visible={true} inlineActions placement={'right'}>
              {({ getListProps, getTriggerProps }) => {
                const listProps = getListProps();
                const triggerProps = getTriggerProps();

                return (
                  <Flex justifyContent='space-between'>
                    <DropdownMenu.Item.Content {...triggerProps}>Item 3</DropdownMenu.Item.Content>
                    <Flex gap={1} {...listProps}>
                      <DropdownMenu.Item tag={Button} addonLeft={PlusM} aria-label={'Add new'} />
                      <DropdownMenu.Item tag={Button} addonLeft={TrashM} aria-label={'Delete'} />
                    </Flex>
                  </Flex>
                );
              }}
            </DropdownMenu>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <DropdownMenu placement={'right'} interaction={'hover'} timeout={[0, 300]}>
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
    </Flex>
  );
};

export default Demo;
