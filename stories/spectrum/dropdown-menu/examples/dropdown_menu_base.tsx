import { FilterTrigger } from '@semcore/spectrum/base-trigger';
import DropdownMenu from '@semcore/spectrum/dropdown-menu';
import React from 'react';

const menuItems: null[] = new Array(10).fill(null);

const Demo = () => {
  const [selected, setSelected] = React.useState<number[]>([]);

  return (
    <DropdownMenu selectable multiselect>
      <DropdownMenu.Trigger tag={FilterTrigger} empty={selected.length === 0} placeholder='Explore menu items'>
        {selected.join(', ')}
      </DropdownMenu.Trigger>
      <DropdownMenu.Menu hMax='180px'>
        <DropdownMenu.Group title='List heading' subTitle='Subtitle'>
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
              Menu item
              {' '}
              {index + 1}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default Demo;
