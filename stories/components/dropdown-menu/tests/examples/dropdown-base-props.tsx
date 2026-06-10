import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Divider from '@semcore/ui/divider';
import type { StatusItemState } from '@semcore/ui/dropdown';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import type { DropdownMenuProps, DropdownMenuListProps } from '@semcore/ui/dropdown-menu';
import Select from '@semcore/ui/select';
import React from 'react';

type DropDownPropsExample = DropdownMenuProps & DropdownMenuListProps & {
  disabledAll?: boolean;
  disabledSave?: boolean;
  disabledRename?: boolean;
  disabledDownload?: boolean;
  disabledDelete?: boolean;
  selectedSave?: boolean;
  selectedRename?: boolean;
  selectedDownload?: boolean;
  selectedDelete?: boolean;

  // Search functionality (DropdownMenu.StatusItem demo)
  showSearch?: boolean;
  state?: StatusItemState;
  customChildren?: string;
};
const Demo = (props: DropDownPropsExample) => {
  const {
    size,
    visible,
    disablePortal,
    stretch,
    disabledAll,
    disabledSave,
    disabledRename,
    disabledDownload,
    disabledDelete,
    selectedSave,
    selectedRename,
    selectedDownload,
    selectedDelete,
    showSearch,
    state = 'default',
    customChildren,
  } = props;

  const [search, setSearch] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);

  const items = [
    { id: 'save', label: 'Save', selected: selectedSave, disabled: disabledAll || disabledSave },
    { id: 'rename', label: 'Rename', selected: selectedRename, disabled: disabledAll || disabledRename },
    { id: 'download', label: 'Download', selected: selectedDownload, disabled: disabledAll || disabledDownload },
    { id: 'delete', label: 'Delete', selected: selectedDelete, disabled: disabledAll || disabledDelete },
  ];
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  if (showSearch) {
    return (
      <DropdownMenu
        size={size}
        visible={visible}
        disablePortal={disablePortal}
        stretch={stretch}
        onVisibleChange={setIsVisible}
      >
        <DropdownMenu.Trigger tag={Button}>Trigger</DropdownMenu.Trigger>
        <DropdownMenu.Popper aria-label='Actions with search'>
          <Select.InputSearch
            autoFocus={isVisible}
            value={search}
            onChange={setSearch}
            aria-describedby={search ? 'search-result' : undefined}
          />
          <DropdownMenu.List>
            {state === 'default' &&
              filteredItems.map((item) => (
                <DropdownMenu.Item key={item.id} size={size} selected={item.selected} disabled={item.disabled}>
                  {item.label}
                </DropdownMenu.Item>
              ))}

            <DropdownMenu.StatusItem
              itemsCount={filteredItems.length}
              state={state}
              id='search-result'
            >
              {customChildren || undefined}
            </DropdownMenu.StatusItem>
          </DropdownMenu.List>
        </DropdownMenu.Popper>
      </DropdownMenu>
    );
  }

  return (
    <Flex gap={16} direction='row'>
      <DropdownMenu size={size} visible={visible} disablePortal={disablePortal} stretch={stretch}>
        <DropdownMenu.Trigger tag={Button}>Trigger</DropdownMenu.Trigger>
        <DropdownMenu.Menu data-testid='m-size'>
          <DropdownMenu.Item size={size} selected={selectedSave} disabled={disabledAll || disabledSave}>Save</DropdownMenu.Item>
          <DropdownMenu.Item size={size} selected={selectedRename} disabled={disabledAll || disabledRename}>Rename</DropdownMenu.Item>
          <DropdownMenu.Item size={size} selected={selectedDownload} disabled={disabledAll || disabledDownload}>Download</DropdownMenu.Item>
          <DropdownMenu.Item size={size} selected={selectedDelete} disabled={disabledAll || disabledDelete}>Delete</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>

      <DropdownMenu size={size} visible={visible} disablePortal={disablePortal} stretch={stretch}>
        <DropdownMenu.Trigger tag={Button}>Trigger</DropdownMenu.Trigger>
        <DropdownMenu.Menu data-testid='l-size'>
          <DropdownMenu.Item size={size} selected={selectedSave} disabled={disabledAll || disabledSave}>Save</DropdownMenu.Item>
          <Divider />
          <DropdownMenu.Item size={size} selected={selectedRename} disabled={disabledAll || disabledRename}>Rename</DropdownMenu.Item>
          <DropdownMenu.Item size={size} selected={selectedDownload} disabled={disabledAll || disabledDownload}>Download</DropdownMenu.Item>
          <DropdownMenu.Item size={size} selected={selectedDelete} disabled={disabledAll || disabledDelete}>Delete</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>

    </Flex>
  );
};

export const defaultDropDownPropsExample: DropDownPropsExample = {
  size: 'm',
  disabledAll: false,
  disabledSave: false,
  disabledRename: false,
  disabledDownload: false,
  disabledDelete: false,
  selectedSave: false,
  selectedRename: false,
  selectedDownload: false,
  selectedDelete: false,
  visible: undefined,
  stretch: undefined,
  disablePortal: undefined,
  showSearch: false,
  state: 'default',
  customChildren: '',
};

Demo.defaultProps = defaultDropDownPropsExample;

export default Demo;
