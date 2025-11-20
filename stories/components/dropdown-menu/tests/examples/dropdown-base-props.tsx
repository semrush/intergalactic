import Button from '@semcore/ui/button';
import Divider from '@semcore/ui/divider';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import type { DropdownMenuProps, DropdownMenuListProps, DropdownMenuItemProps, DropdownMenuItemHintProps } from '@semcore/ui/dropdown-menu';
import { Flex } from '@semcore/ui/flex-box';
import React from 'react';

type DropDownPropsExample = DropdownMenuProps & DropdownMenuListProps & DropdownMenuItemProps & DropdownMenuItemHintProps;
const Demo = (props: DropDownPropsExample) => {
  return (
    <Flex gap={16} direction='row'>
      <DropdownMenu size={props.size} visible={props.visible} disablePortal={props.disablePortal} stretch={props.stretch}>
        <DropdownMenu.Trigger tag={Button}>Trigger</DropdownMenu.Trigger>
        <DropdownMenu.Menu data-testid='m-size'>
          <DropdownMenu.Item size={props.size} selected={props.selected} disabled={props.disabled}>Save disadled</DropdownMenu.Item>
          <DropdownMenu.Item size={props.size} disabled={props.disabled}>Rename</DropdownMenu.Item>
          <DropdownMenu.Item size={props.size} disabled={props.disabled}>Download</DropdownMenu.Item>
          <DropdownMenu.Item size={props.size} disabled={props.disabled}>Delete</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>

      <DropdownMenu size={props.size} visible={props.visible} disablePortal={props.disablePortal} stretch={props.stretch}>
        <DropdownMenu.Trigger tag={Button}>Trigger</DropdownMenu.Trigger>
        <DropdownMenu.Menu data-testid='l-size'>
          <DropdownMenu.Item size={props.size} selected={props.selected} disabled={props.disabled}>Save disabled</DropdownMenu.Item>
          <Divider />
          <DropdownMenu.Item size={props.size} disabled={props.disabled}>Rename</DropdownMenu.Item>
          <DropdownMenu.Item size={props.size} disabled={props.disabled}>Download</DropdownMenu.Item>
          <DropdownMenu.Item size={props.size} disabled={props.disabled}>Delete</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>

    </Flex>
  );
};

export const defaultDropDownPropsExample: DropDownPropsExample = {
  size: 'm',
  disabled: false,
  selected: undefined,
  visible: undefined,
  stretch: undefined,
  disablePortal: undefined,
};

Demo.defaultProps = defaultDropDownPropsExample;

export default Demo;
