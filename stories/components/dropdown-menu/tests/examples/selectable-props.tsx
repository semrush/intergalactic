import Trash from '@semcore/icon/Trash/m';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import type { DropdownMenuProps, DropdownMenuListProps } from '@semcore/ui/dropdown-menu';
import React from 'react';

const menuItems: null[] = new Array(10).fill(null);

type DropDownPropsExample = DropdownMenuProps & DropdownMenuListProps & {
  disabledAll?: boolean;
  disabledFirstItem?: boolean;
  disabledSecondItem?: boolean;
};
const Demo = (props: DropDownPropsExample) => {
  const [selected, setSelected] = React.useState<number>(0);

  return (
    <Flex gap={16} direction='row'>

      <DropdownMenu selectable size={props.size} visible={props.visible} disablePortal={props.disablePortal} stretch={props.stretch}>
        <DropdownMenu.Trigger tag={Button}>Selectable</DropdownMenu.Trigger>
        <DropdownMenu.Menu hMax='180px' data-testid='m-size'>
          <DropdownMenu.Group title='List heading' subTitle='Subtitle'>
            {menuItems.map((_, index) => (
              <DropdownMenu.Item
                size={props.size}
                disabled={
                  props.disabledAll ||
                  (index === 0 && props.disabledFirstItem) ||
                  (index === 1 && props.disabledSecondItem)
                }
                key={index}
                selected={index === selected}
                onClick={() => {
                  setSelected(index);
                }}
              >
                <DropdownMenu inlineActions placement='right'>
                  <Flex justifyContent='space-between'>
                    <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                      Menu item
                      {' '}
                      {index + 1}
                    </DropdownMenu.Item.Content>
                    <DropdownMenu.Actions>
                      <DropdownMenu.Item
                        tag={Button}
                        addonLeft={Trash}
                        title='Delete item'
                        hintPlacement='right'
                        onClick={(e: any) => e.stopPropagation()}
                      />
                    </DropdownMenu.Actions>
                  </Flex>
                </DropdownMenu>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Menu>
      </DropdownMenu>
    </Flex>
  );
};

export const defaultDropDownSelectablePropsExample: DropDownPropsExample = {
  size: 'm',
  disabledAll: false,
  disabledFirstItem: false,
  disabledSecondItem: false,
  visible: undefined,
  stretch: undefined,
  disablePortal: undefined,
};

Demo.defaultProps = defaultDropDownSelectablePropsExample;

export default Demo;
