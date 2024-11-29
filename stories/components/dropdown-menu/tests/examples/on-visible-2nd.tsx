import React from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';

const items = ['save', 'rename', 'delete'];
const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <DropdownMenu
      visible={visible}
      onVisibleChange={(value) => {
        setVisible(value);
      }}
    >
      <DropdownMenu.Trigger tag={Button}>Actions</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        {items.map((name) => (
          <DropdownMenu.Item
            key={name}
            onClick={() => {
              console.log('click on ddMenu.Item');

              setVisible(false);
            }}
          >
            {name}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default Demo;
