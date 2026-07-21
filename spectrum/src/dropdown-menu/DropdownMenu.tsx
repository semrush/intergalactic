import UIDropdownMenu from '@semcore/dropdown-menu';
import React from 'react';

function DropdownMenu(props: any) {
  return <UIDropdownMenu {...props} />;
}

DropdownMenu.Trigger = UIDropdownMenu.Trigger;
DropdownMenu.Menu = UIDropdownMenu.Menu;
DropdownMenu.Group = UIDropdownMenu.Group;
DropdownMenu.Item = UIDropdownMenu.Item;

export default DropdownMenu;
