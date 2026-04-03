import SettingsM from '@semcore/icon/Settings/m';
import { Flex } from '@semcore/ui/base-components';
import Button, { ButtonLink } from '@semcore/ui/button';
import Counter from '@semcore/ui/counter';
import DnD from '@semcore/ui/drag-and-drop';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React, { useState } from 'react';

const defeaultColumns = [
  { id: 'uniquePageviews', label: 'Unique Pageviews' },
  { id: 'uniqueVisitors', label: 'Unique Visitors' },
  { id: 'entranceSources', label: 'Entrance Sources' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'mobile', label: 'Mobile' },
];
const defaultSelectedColumns = ['uniquePageviews', 'entranceSources'];

const Demo = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(
    null,
  );
  const [columns, setColumns] = React.useState(defeaultColumns);
  const handleDnD = React.useCallback(
    ({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) => {
      setColumns((columns) => {
        const newColumns = [...columns];
        const shift = fromIndex < toIndex ? 1 : -1;
        for (let i = fromIndex; i !== toIndex; i += shift) {
          newColumns[i] = columns[i + shift];
        }
        newColumns[toIndex] = columns[fromIndex];
        return newColumns;
      });
      setHighlightedIndex(toIndex);
    },
    [],
  );
  const [selectedColumns, setSelectedColumns] = React.useState<string[]>(
    defaultSelectedColumns,
  );
  const resetToDefault = React.useCallback(() => {
    setSelectedColumns(defaultSelectedColumns);
  }, []);
  const toggleAll = React.useCallback(() => {
    const allSelected = selectedColumns.length === columns.length;
    const allColumns = columns.map((column) => column.id);
    if (allSelected) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns(allColumns);
    }
  }, [selectedColumns, columns]);

  return (
    <DropdownMenu
      selectable
      multiselect
      highlightedIndex={highlightedIndex}
      onHighlightedIndexChange={setHighlightedIndex}
      onVisibleChange={setIsVisible}
    >
      <DropdownMenu.Trigger
        mt={2}
        mr='auto'
        id='dropdown-menu-basic'
        tag={Button}
      >
        <Button.Addon>
          <SettingsM />
        </Button.Addon>
        <Button.Text>Manage columns</Button.Text>
        <Button.Addon>
          <Counter>
            {selectedColumns.length}
            /
            {columns.length}
          </Counter>
        </Button.Addon>
      </DropdownMenu.Trigger>
      <DropdownMenu.Popper hMax={800} aria-labelledby='popper_id'>
        <Select.InputSearch autoFocus={isVisible} />
        <Flex direction='column' alignItems='flex-start' p={2} gap={2}>
          <Text bold id='popper_id'>
            Show table columns
          </Text>
          <ButtonLink onClick={resetToDefault}>Reset to default</ButtonLink>
          <ButtonLink onClick={toggleAll}>
            {selectedColumns.length === columns.length ? 'Deselect' : 'Select'}
            {' '}
            all
          </ButtonLink>
        </Flex>
        <DropdownMenu.List hMax={800}>
          <DnD onDnD={handleDnD} aria-label='drag-and-drop container'>
            {columns.map((column, index) => (
              <DropdownMenu.Item
                tag={DnD.Draggable}
                isCustomFocus={true}
                key={column.id}
                selected={selectedColumns.includes(column.id)}
                onClick={(e) => {
                  if (
                    e.target instanceof HTMLElement &&
                    e.target.getAttribute('role') === 'menuitemcheckbox'
                  ) {
                    if (!selectedColumns.includes(column.id)) {
                      setSelectedColumns([...selectedColumns, column.id]);
                    } else {
                      setSelectedColumns(
                        selectedColumns.filter((i) => i !== column.id),
                      );
                    }
                  }
                }}
              >
                {column.label}
              </DropdownMenu.Item>
            ))}
          </DnD>
        </DropdownMenu.List>
      </DropdownMenu.Popper>
    </DropdownMenu>
  );
};

export default Demo;
