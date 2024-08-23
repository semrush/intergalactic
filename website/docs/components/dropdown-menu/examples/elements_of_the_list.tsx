import React from 'react';
import DropdownMenu from 'intergalactic/dropdown-menu';
import { ButtonTrigger } from 'intergalactic/base-trigger';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import Tooltip from 'intergalactic/tooltip';

const TooltipContent = () => {
  const tooltipIndex = React.useContext(DropdownMenu.tooltipIndexContext);

  return <div>Some tooltip for ${tooltipIndex}</div>;
};

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='dropdown-menu-elements-of-the-list'>
        Elements of the list
      </Text>
      <DropdownMenu>
        <DropdownMenu.Trigger
          tag={ButtonTrigger}
          mt={2}
          mr='auto'
          id='dropdown-menu-elements-of-the-list'
        >
          I'll show u some options, buddy
        </DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <Tooltip timeout={[0, 0]} placement='right'>
            <DropdownMenu.Group title={"I'm title"} subTitle={"I'm subtitle"}>
              <DropdownMenu.Item tag={Tooltip.Trigger}>Item 1</DropdownMenu.Item>
              <DropdownMenu.Item tag={Tooltip.Trigger}>Item 2</DropdownMenu.Item>
              <DropdownMenu.Item tag={Tooltip.Trigger}>
                <DropdownMenu.Item.Content>Item 3</DropdownMenu.Item.Content>
                <DropdownMenu.Item.Hint>Hint for item 3</DropdownMenu.Item.Hint>
              </DropdownMenu.Item>
              <DropdownMenu.Item tag={Tooltip.Trigger}>
                <Flex justifyContent='space-between'>
                  <DropdownMenu.Item.Content>Item 4</DropdownMenu.Item.Content>
                  <DropdownMenu.Item.DeleteButton />
                </Flex>
              </DropdownMenu.Item>
              <DropdownMenu.Item tag={Tooltip.Trigger}>Item 5</DropdownMenu.Item>
            </DropdownMenu.Group>
            <Tooltip.Popper w={200}>
              <TooltipContent />
            </Tooltip.Popper>
          </Tooltip>
        </DropdownMenu.Menu>
      </DropdownMenu>
    </Flex>
  );
};

export default Demo;
