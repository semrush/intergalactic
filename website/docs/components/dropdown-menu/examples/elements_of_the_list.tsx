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
          <DropdownMenu.Group title={"I'm title"} subTitle={"I'm subtitle"}>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item subTitle={'Hint for item 3'}>Item 3</DropdownMenu.Item>
            <DropdownMenu.Item2>
              <DropdownMenu.Item2.Content>Item 4</DropdownMenu.Item2.Content>
              <DropdownMenu.Item2.DeleteButton />
            </DropdownMenu.Item2>
            <DropdownMenu.Item>Item 5</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Menu>
      </DropdownMenu>
    </Flex>
  );
};

export default Demo;
