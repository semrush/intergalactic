import React from 'react';
import Button from '@semcore/button';
import Counter from '@semcore/counter';
import SettingsM from '@semcore/icon/Settings/m';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import Link from '@semcore/link';
import { Flex } from '@semcore/flex-box';
import DnD from '@semcore/drag-and-drop';

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
    <Select multiselect value={selectedColumns} onChange={setSelectedColumns}>
      <Select.Trigger mt={2} mr='auto' id='dropdown-menu-basic' tag={Button}>
        <Button.Addon>
          <SettingsM />
        </Button.Addon>
        <Button.Text>Manage columns</Button.Text>
        <Button.Addon>
          <Counter>
            {selectedColumns.length}/{columns.length}
          </Counter>
        </Button.Addon>
      </Select.Trigger>
      <Select.Menu hMax={800}>
        {({ highlightedIndex }) => {
          return (
            <DnD
              onDnD={handleDnD}
              customFocus={highlightedIndex}
              aria-label={'drag-and-drop container'}
            >
              <Flex direction='column' alignItems='flex-start' p={2} gap={2}>
                <Text bold>Show table columns</Text>
                <Link tag='button' size={200} onClick={resetToDefault}>
                  Reset to default
                </Link>
                <Link tag='button' size={200} onClick={toggleAll}>
                  {selectedColumns.length === columns.length ? 'Deselect' : 'Select'} all
                </Link>
              </Flex>
              {columns.map((column) => (
                <DnD.Draggable
                  tag={Select.Option}
                  id={column.id}
                  selected={selectedColumns.includes(column.id)}
                  value={column.id}
                  key={column.id}
                  aria-label={column.label}
                >
                  <Select.Option.Checkbox />
                  {column.label}
                </DnD.Draggable>
              ))}
            </DnD>
          );
        }}
      </Select.Menu>
    </Select>
  );
};

export default Demo;
