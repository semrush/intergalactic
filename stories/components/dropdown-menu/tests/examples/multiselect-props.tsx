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

  // Search functionality (DropdownMenu.StatusItem demo)
  showSearch?: boolean;
  state?: StatusItemState;
  customChildren?: string;
};
const Demo = (props: DropDownPropsExample) => {
  const [selected, setSelected] = React.useState<number[]>([0, 1]);
  const [search, setSearch] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);

  const filteredItems = menuItems
    .map((_, index) => ({ index, label: `Menu item ${index + 1}` }))
    .filter(({ label }) => label.toLowerCase().includes(search.toLowerCase()));

  if (props.showSearch) {
    return (
      <DropdownMenu
        selectable
        multiselect
        size={props.size}
        visible={props.visible}
        disablePortal={props.disablePortal}
        stretch={props.stretch}
        onVisibleChange={setIsVisible}
      >
        <DropdownMenu.Trigger tag={Button}>Multiselect</DropdownMenu.Trigger>
        <DropdownMenu.Popper aria-label='Multiselect with search'>
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
                    disabled={props.disabledAll || (index === 0 && props.disabledFirstItem)}
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

      <DropdownMenu selectable multiselect size={props.size} visible={props.visible} disablePortal={props.disablePortal} stretch={props.stretch}>
        <DropdownMenu.Trigger tag={Button}>Multiselect</DropdownMenu.Trigger>
        <DropdownMenu.Menu hMax='180px' data-testid='l-size'>
          <DropdownMenu.Group title='List heading' subTitle='Subtitle'>
            {menuItems.map((_, index) => (
              <DropdownMenu.Item
                size={props.size}
                disabled={props.disabledAll || (index === 0 && props.disabledFirstItem)}
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
  disabledAll: false,
  disabledFirstItem: false,
  visible: undefined,
  stretch: undefined,
  disablePortal: undefined,
  showSearch: false,
  state: 'default',
  customChildren: '',
};

Demo.defaultProps = defaultDropDownMultiselectPropsExample;

export default Demo;
