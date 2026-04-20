import ChevronRightIcon from '@semcore/icon/ChevronRight/m';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import type { DropdownMenuProps, DropdownMenuListProps } from '@semcore/ui/dropdown-menu';
import React from 'react';

type NestedMenuPropsExample = DropdownMenuProps & DropdownMenuListProps & {
  disabledNestedAdd?: boolean;
  disabledNestedDelete?: boolean;
};

const Demo = (props: NestedMenuPropsExample) => {
  const { size, visible, disablePortal, stretch, disabledNestedAdd, disabledNestedDelete } = props;

  return (
    <DropdownMenu size={size} visible={visible} disablePortal={disablePortal} stretch={stretch}>
      <DropdownMenu.Trigger tag={Button}>Nested menu</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <DropdownMenu.Item size={size}>Menu item 1</DropdownMenu.Item>
        <DropdownMenu.Item size={size}>Menu item 2</DropdownMenu.Item>
        <DropdownMenu.Item size={size}>
          <DropdownMenu
            placement='right-start'
            interaction={DropdownMenu.nestedMenuInteraction}
            timeout={[0, 300]}
            offset={[-11, 12]}
          >
            <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
              Menu item 3
              <ChevronRightIcon color='icon-secondary-neutral' />
            </DropdownMenu.Item.Content>
            <DropdownMenu.Menu>
              <DropdownMenu.Item size={size} disabled={disabledNestedAdd}>Add</DropdownMenu.Item>
              <DropdownMenu.Item size={size} disabled={disabledNestedDelete}>Delete</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
        </DropdownMenu.Item>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export const defaultNestedMenuPropsExample: NestedMenuPropsExample = {
  size: 'm',
  visible: undefined,
  stretch: undefined,
  disablePortal: undefined,
  disabledNestedAdd: false,
  disabledNestedDelete: false,
};

Demo.defaultProps = defaultNestedMenuPropsExample;

export default Demo;
