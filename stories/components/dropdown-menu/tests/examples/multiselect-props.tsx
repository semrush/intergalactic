import Button from '@semcore/ui/button';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import type { DropdownMenuProps, DropdownMenuListProps, DropdownMenuItemProps, DropdownMenuItemHintProps } from '@semcore/ui/dropdown-menu';
import { Flex } from '@semcore/ui/flex-box';
import React from 'react';
const menuItems: null[] = new Array(10).fill(null);

type DropDownPropsExample = DropdownMenuProps & DropdownMenuListProps & DropdownMenuItemProps & DropdownMenuItemHintProps;
const Demo = (props: DropDownPropsExample) => {
  const [selected, setSelected] = React.useState<number[]>([0, 1]);

  return (
    <Flex gap={16} direction='row'>

      <DropdownMenu selectable multiselect size={props.size} visible={props.visible} disablePortal={props.disablePortal} stretch={props.stretch}>
        <DropdownMenu.Trigger tag={Button}>Explore menu items</DropdownMenu.Trigger>
        <DropdownMenu.Menu hMax='180px' data-testid='l-size'>
          <DropdownMenu.Group title='List heading' subTitle='Subtitle'>
            {menuItems.map((_, index) => (
              <DropdownMenu.Item
                size={props.size}
                disabled={props.disabled}
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
    </Flex>
  );
};

export const defaultDropDownMultiselectPropsExample: DropDownPropsExample = {
  size: 'm',
  disabled: false,
  selected: undefined,
  visible: undefined,
  stretch: undefined,
  disablePortal: undefined,
};

Demo.defaultProps = defaultDropDownMultiselectPropsExample;

export default Demo;
