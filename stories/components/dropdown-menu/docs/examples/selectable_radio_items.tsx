import React from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const menuItems: null[] = new Array(10).fill(null);

const Demo = () => {
  const [selected, setSelected] = React.useState<number>(0);

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='dropdown-menu-children-items'>
        Your action
      </Text>
      <DropdownMenu selectable>
        <DropdownMenu.Trigger tag={Button} mt={2} mr='auto' id='dropdown-menu-children-items'>
          Explore menu items
        </DropdownMenu.Trigger>
        <DropdownMenu.Menu hMax={'180px'}>
          <DropdownMenu.Group title={'List heading'} subTitle={'Subtitle'}>
            {menuItems.map((_, index) => (
              <DropdownMenu.Item
                key={index}
                selected={index === selected}
                onClick={() => {
                  setSelected(index);
                }}
              >
                Menu item {index + 1}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Menu>
      </DropdownMenu>
    </Flex>
  );
};

export default Demo;
