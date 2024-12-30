import React from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';

const menuItems: null[] = new Array(10).fill(null);

const Demo = () => {
  const [selected, setSelected] = React.useState<number[]>([0, 1]);

  return (
    <DropdownMenu selectable multiselect>
      <DropdownMenu.Trigger tag={Button}>Explore menu items</DropdownMenu.Trigger>
      <DropdownMenu.Menu hMax={'180px'}>
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
  );
};

export default Demo;
