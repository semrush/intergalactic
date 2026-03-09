import { FilterTrigger } from '@semcore/ui/base-trigger';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { InputSearch } from '@semcore/ui/select';
import React from 'react';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  const handleVisiblity = (next: any) => {
    if (next) {
      alert('boom');
    }

    setVisible(next);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={FilterTrigger}>
          Dropdown Trigger
        </DropdownMenu.Trigger>
        <DropdownMenu.Popper aria-label='Dropdown'>
          <InputSearch />
          <DropdownMenu.List>
            <DropdownMenu.Item>Menu item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Menu item 2</DropdownMenu.Item>
          </DropdownMenu.List>
        </DropdownMenu.Popper>
      </DropdownMenu>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
    </>
  );
};

export default Demo;
