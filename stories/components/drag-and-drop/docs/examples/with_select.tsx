import React from 'react';
import Button, { ButtonLink } from '@semcore/button';
import Counter from '@semcore/counter';
import SettingsM from '@semcore/icon/Settings/m';
import DropdownMenu from '@semcore/dropdown-menu';
import { Text } from '@semcore/typography';
import Link from '@semcore/link';
import { Flex } from '@semcore/flex-box';
import DnD from '@semcore/drag-and-drop';
import PlusM from '@semcore/icon/MathPlus/m';
import KebabM from '@semcore/icon/Kebab/m';

const defeaultColumns = [
  { id: 'uniquePageviews', label: 'Unique Pageviews' },
  { id: 'uniqueVisitors', label: 'Unique Visitors' },
  { id: 'entranceSources', label: 'Entrance Sources' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'mobile', label: 'Mobile' },
];
const defaultSelectedColumns = ['uniquePageviews', 'entranceSources'];

const Demo = () => {
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
    },
    [],
  );
  const [selectedColumns, setSelectedColumns] = React.useState<string[]>(defaultSelectedColumns);

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
    <DropdownMenu selectable multiselect>
      <DropdownMenu.Trigger mt={2} mr='auto' id='dropdown-menu-basic' tag={Button}>
        <Button.Addon>
          <SettingsM />
        </Button.Addon>
        <Button.Text>Manage columns</Button.Text>
        <Button.Addon>
          <Counter>
            {selectedColumns.length}/{columns.length}
          </Counter>
        </Button.Addon>
      </DropdownMenu.Trigger>
      <DropdownMenu.Menu hMax={800}>
        {({ highlightedIndex, selectedIndex }) => {
          return (
            <DnD
              onDnD={handleDnD}
              customFocus={highlightedIndex}
              aria-label={'drag-and-drop container'}
            >
              <Flex direction='column' alignItems='flex-start' p={2} gap={2}>
                <Text bold>Show table columns</Text>
                <ButtonLink onClick={resetToDefault} role={'menuitem'}>
                  Reset to default
                </ButtonLink>
                <ButtonLink onClick={toggleAll} role={'menuitem'}>
                  {selectedColumns.length === columns.length ? 'Deselect' : 'Select'} all
                </ButtonLink>
              </Flex>
              {columns.map((column, index) => (
                <DropdownMenu.Item
                  tag={DnD.Draggable}
                  key={column.id}
                  // id={column.id}
                  selected={selectedColumns.includes(column.id)}
                  onClick={() => {
                    if (!selectedColumns.includes(column.id)) {
                      setSelectedColumns([...selectedColumns, column.id]);
                    } else {
                      setSelectedColumns(selectedColumns.filter((i) => i !== column.id));
                    }
                  }}
                >
                  <DropdownMenu inlineActions placement={'right'}>
                    <Flex justifyContent='space-between'>
                      <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                        {column.label}
                      </DropdownMenu.Item.Content>
                      {selectedIndex === index && (
                        <DropdownMenu.Actions>
                          <DropdownMenu.Item tag={Button} addonLeft={KebabM} title={'Move'} />
                        </DropdownMenu.Actions>
                      )}
                    </Flex>
                  </DropdownMenu>
                </DropdownMenu.Item>
              ))}
            </DnD>
          );
        }}
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default Demo;
