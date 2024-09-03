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

const TooltipContent = () => {
  const tooltipIndex = React.useContext(DropdownMenu.selectedIndexContext);

  return <div>Some tooltip for {tooltipIndex + 1}</div>;
};

const Demo = () => {
  return (
    <Box>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='dropdown-menu-elements-of-the-list-2'>
          List item types
        </Text>
        <DropdownMenu>
          <DropdownMenu.Trigger
            tag={ButtonTrigger}
            mt={2}
            mr='auto'
            id='dropdown-menu-elements-of-the-list-2'
          >
            Check the options
          </DropdownMenu.Trigger>
          <DropdownMenu.Menu>
            <Tooltip placement={'right'} timeout={[0, 50]}>
              <DropdownMenu.Group title={'Title'} subTitle={'Subtitle'}>
                <DropdownMenu.Item tag={Tooltip.Trigger}>
                  <DropdownMenu.Item.Content>Item 1</DropdownMenu.Item.Content>
                </DropdownMenu.Item>
                <DropdownMenu.Item tag={Tooltip.Trigger}>
                  <DropdownMenu.Item.Content>Item 2</DropdownMenu.Item.Content>
                  <DropdownMenu.Item.Hint>Hint for item 2</DropdownMenu.Item.Hint>
                </DropdownMenu.Item>
                <DropdownMenu.Item tag={Tooltip.Trigger}>
                  <DropdownMenu.Item.Content>Item 3</DropdownMenu.Item.Content>
                  <DropdownMenu.Item.Hint>Hint for item 3</DropdownMenu.Item.Hint>
                </DropdownMenu.Item>
                <DropdownMenu.Item tag={Tooltip.Trigger}>
                  <DropdownMenu.Item.Content>Item 4</DropdownMenu.Item.Content>
                </DropdownMenu.Item>
              </DropdownMenu.Group>
              <Tooltip.Popper w={200} aria-hidden={true}>
                <TooltipContent />
              </Tooltip.Popper>
            </Tooltip>
          </DropdownMenu.Menu>
        </DropdownMenu>
      </Flex>
    </Box>
  );
};

export default Demo;
