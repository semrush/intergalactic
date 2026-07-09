import Trash from '@semcore/icon/Trash/m';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { StatusItemState } from '@semcore/ui/dropdown';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import type { DropdownMenuProps, DropdownMenuListProps } from '@semcore/ui/dropdown-menu';
import Select from '@semcore/ui/select';
import React from 'react';

const menuItems: null[] = new Array(10).fill(null);

type DropDownPropsExample = DropdownMenuProps & DropdownMenuListProps & {
  disabledAll?: boolean;
  disabledFirstItem?: boolean;
  disabledSecondItem?: boolean;
  disabledLastItem?: boolean;

  // Search functionality (DropdownMenu.StatusItem demo)
  showSearch?: boolean;
  state?: StatusItemState;
  customChildren?: string;
};
const Demo = (props: DropDownPropsExample) => {
  const [selected, setSelected] = React.useState<number>(0);
  const [search, setSearch] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);

  const isItemDisabled = (index: number) =>
    props.disabledAll ||
    (index === 0 && props.disabledFirstItem) ||
    (index === 1 && props.disabledSecondItem) ||
    (index === menuItems.length - 1 && props.disabledLastItem);

  const filteredItems = menuItems
    .map((_, index) => ({ index, label: `Menu item ${index + 1}` }))
    .filter(({ label }) => label.toLowerCase().includes(search.toLowerCase()));

  if (props.showSearch) {
    return (
      <DropdownMenu
        selectable
        size={props.size}
        visible={props.visible}
        disablePortal={props.disablePortal}
        stretch={props.stretch}
        onVisibleChange={setIsVisible}
      >
        <DropdownMenu.Trigger tag={Button}>Selectable</DropdownMenu.Trigger>
        <DropdownMenu.Popper aria-label='Selectable with search'>
          <Select.InputSearch
            autoFocus={isVisible}
            value={search}
            onChange={setSearch}
          />
          <DropdownMenu.List hMax='180px'>
            {props.state !== 'loading' && props.state !== 'error' && (
              <DropdownMenu.Group title='List heading' subTitle='Subtitle'>
                {filteredItems.map(({ index, label }) => (
                  <DropdownMenu.Item
                    size={props.size}
                    disabled={isItemDisabled(index)}
                    key={index}
                    selected={index === selected}
                    onClick={() => {
                      setSelected(index);
                    }}
                  >
                    {label}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Group>
            )}

            <DropdownMenu.StatusItem
              itemsCount={filteredItems.length}
              state={props.state}
            >
              {props.customChildren || undefined}
            </DropdownMenu.StatusItem>
          </DropdownMenu.List>
        </DropdownMenu.Popper>
      </DropdownMenu>
    );
  }

  return (
    <Flex gap={16} direction='row'>

      <DropdownMenu selectable size={props.size} visible={props.visible} disablePortal={props.disablePortal} stretch={props.stretch}>
        <DropdownMenu.Trigger tag={Button}>Selectable</DropdownMenu.Trigger>
        <DropdownMenu.Menu hMax='180px' data-testid='m-size'>
          <DropdownMenu.Group title='List heading' subTitle='Subtitle'>
            {menuItems.map((_, index) => (
              <DropdownMenu.Item
                size={props.size}
                disabled={isItemDisabled(index)}
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
  disabledLastItem: false,
  visible: undefined,
  stretch: undefined,
  disablePortal: undefined,
  showSearch: false,
  state: 'default',
  customChildren: '',
};

Demo.defaultProps = defaultDropDownSelectablePropsExample;

export default Demo;
