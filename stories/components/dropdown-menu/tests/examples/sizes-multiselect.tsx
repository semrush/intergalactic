import React from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';
import {Flex} from '@semcore/flex-box';
import Trash from '@semcore/icon/Trash/m';

const menuItems: null[] = new Array(10).fill(null);

const Demo = () => {
  const [selected, setSelected] = React.useState<number[]>([0, 1]);

  return (
    <Flex gap={18} direction='row'>
        <DropdownMenu selectable multiselect visible disablePortal>
      <DropdownMenu.Trigger tag={Button}>Explore menu items</DropdownMenu.Trigger>
      <DropdownMenu.Menu hMax={'180px'} data-testid ='l-size'>
        <DropdownMenu.Group title={'List heading'} subTitle={'Subtitle'}>
          {menuItems.map((_, index) => (
            <DropdownMenu.Item
              key={index}
              selected={selected.includes(index)}
              onClick={() => {
                if (!selected.includes(index)) {
                  setSelected([...selected, index]);
                } else {
                  setSelected(selected.filter((i) => i !== index));
                }
              }}
            >
              Menu item {index + 1}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Menu>
    </DropdownMenu>

    <DropdownMenu selectable multiselect visible disablePortal size ='l'>
      <DropdownMenu.Trigger tag={Button}>Explore menu items</DropdownMenu.Trigger>
      <DropdownMenu.Menu hMax={'180px'} data-testid ='l-size'>
        <DropdownMenu.Group title={'List heading'} subTitle={'Subtitle'}>
          {menuItems.map((_, index) => (
            <DropdownMenu.Item
              key={index}
              selected={selected.includes(index)}
              onClick={() => {
                if (!selected.includes(index)) {
                  setSelected([...selected, index]);
                } else {
                  setSelected(selected.filter((i) => i !== index));
                }
              }}
            >
              Menu item {index + 1}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Menu>
    </DropdownMenu>

    <DropdownMenu selectable multiselect visible disablePortal>
      <DropdownMenu.Trigger tag={Button}>Explore menu items</DropdownMenu.Trigger>
      <DropdownMenu.Menu hMax={'180px'} data-testid ='m-disabled'>
        <DropdownMenu.Group title={'List heading'} subTitle={'Subtitle'}>
          {menuItems.map((_, index) => (
            <DropdownMenu.Item
            disabled
              key={index}
              selected={selected.includes(index)}
              onClick={() => {
                if (!selected.includes(index)) {
                  setSelected([...selected, index]);
                } else {
                  setSelected(selected.filter((i) => i !== index));
                }
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
