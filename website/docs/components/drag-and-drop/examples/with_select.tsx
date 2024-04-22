import React from 'react';
import Button from 'intergalactic/button';
import Counter from 'intergalactic/counter';
import SettingsM from 'intergalactic/icon/Settings/m';
import Select from 'intergalactic/select';
import { Text } from 'intergalactic/typography';
import Link from 'intergalactic/link';
import { Flex } from 'intergalactic/flex-box';
import DnD from 'intergalactic/drag-and-drop';

const defaultColumnsSetup = [
  { id: 'uniquePageviews', label: 'Unique Pageviews' },
  { id: 'uniqueVisitors', label: 'Unique Visitors' },
  {
    id: 'entranceSources',
    label: 'Entrance Sources',
    children: [
      { id: 'total', label: 'Total' },
      { id: 'direct', label: 'Direct' },
      { id: 'paid', label: 'Paid' },
      { id: 'referral', label: 'Referral' },
      { id: 'search', label: 'Search' },
      { id: 'social', label: 'Social' },
    ],
  },
  { id: 'desktop', label: 'Desktop' },
  { id: 'mobile', label: 'Mobile' },
];
const defaultSelectedColumns = ['uniquePageviews', 'entranceSources', 'total'];

type ColumnsSetup = typeof defaultColumnsSetup;
type Column = ColumnsSetup[number] & {
  selected?: boolean;
  indeterminate?: boolean;
  children?: Column[];
};

const Demo = () => {
  const [columnsSetup, setColumnsSetup] = React.useState<ColumnsSetup>(defaultColumnsSetup);
  const handleDnD = React.useCallback(
    ({ fromId, toId }: { fromId: string; toId: string }) => {
      const newColumnsSetup = structuredClone(columnsSetup);
      let fromParent = newColumnsSetup;
      let fromIndex = -1;
      let toParent = newColumnsSetup;
      let toIndex = -1;
      const traverseColumnsSetup = (columnsSetup: ColumnsSetup) => {
        if (columnsSetup.some((column) => column.id === fromId)) {
          fromIndex = columnsSetup.findIndex((column) => column.id === fromId);
          fromParent = columnsSetup;
        }
        if (columnsSetup.some((column) => column.id === toId)) {
          toIndex = columnsSetup.findIndex((column) => column.id === toId);
          toParent = columnsSetup;
        }
        for (const column of columnsSetup) {
          if ('children' in column) {
            traverseColumnsSetup(column.children!);
          }
        }
      };
      traverseColumnsSetup(newColumnsSetup);
      if (fromIndex === -1 || toIndex === -1) {
        return;
      }
      const swap = fromParent[fromIndex];
      fromParent[fromIndex] = toParent[toIndex];
      toParent[toIndex] = swap;
      setColumnsSetup(newColumnsSetup);
    },
    [columnsSetup],
  );
  const [selectedColumns, setSelectedColumns] = React.useState<string[]>(defaultSelectedColumns);
  const totalColumns = React.useMemo(
    () =>
      columnsSetup.reduce((acc, column) => {
        if ('children' in column) {
          return acc + column.children!.length + 1;
        }
        return acc + 1;
      }, 0),
    [columnsSetup],
  );
  const columns = React.useMemo(() => {
    const columns = structuredClone(columnsSetup) as any as Column[];
    const traverseColumns = (columns: Column[], parents: Column[] = []) => {
      for (const column of columns) {
        if ('children' in column) {
          traverseColumns(column.children!, [...parents, column]);
        }
        column.selected = selectedColumns.includes(column.id);

        if (column.selected) {
          for (const parent of parents) {
            parent.indeterminate = columns.some((column) => !column.selected);
          }
        } else {
          column.indeterminate = false;
        }
      }
    };
    traverseColumns(columns);
    return columns;
  }, [selectedColumns, columnsSetup]);
  const renderColumns = React.useCallback(
    (columns: Column[], depth = 0) =>
      columns.map((column) => (
        <React.Fragment key={column.id}>
          <DnD.Draggable
            tag={Select.Option}
            id={column.id}
            selected={column.selected}
            value={column.id}
          >
            <Select.Option.Checkbox ml={depth * 6} indeterminate={column.indeterminate} />
            {column.label}
          </DnD.Draggable>
          {column.children && column.selected && renderColumns(column.children, depth + 1)}
        </React.Fragment>
      )),
    [],
  );
  const resetToDefault = React.useCallback(() => {
    setSelectedColumns(defaultSelectedColumns);
    setColumnsSetup(defaultColumnsSetup);
  }, []);
  const toggleAll = React.useCallback(() => {
    const allSelected = selectedColumns.length === totalColumns;
    const allColumns = columnsSetup.reduce((acc, column) => {
      if ('children' in column) {
        return [...acc, column.id, ...column.children!.map((child) => child.id)];
      }
      return [...acc, column.id];
    }, [] as string[]);
    if (allSelected) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns(allColumns);
    }
  }, [selectedColumns, totalColumns]);

  return (
    <Select multiselect value={selectedColumns} onChange={setSelectedColumns}>
      <Select.Trigger mt={2} mr='auto' id='dropdown-menu-basic' tag={Button}>
        <Button.Addon>
          <SettingsM />
        </Button.Addon>
        <Button.Text>Manage columns</Button.Text>
        <Button.Addon>
          <Counter>
            {selectedColumns.length}/{totalColumns}
          </Counter>
        </Button.Addon>
      </Select.Trigger>
      <Select.Menu hMax={800}>
        {({ highlightedIndex }) => {
          return (
            <DnD onDnD={handleDnD} customFocus={highlightedIndex}>
              <Flex direction='column' alignItems='flex-start' p={2} gap={2}>
                <Text bold>Show table columns</Text>
                <Link tag='button' size={200} onClick={resetToDefault}>
                  Reset to default
                </Link>
                <Link tag='button' size={200} onClick={toggleAll}>
                  {selectedColumns.length === totalColumns ? 'Deselect' : 'Select'} all
                </Link>
              </Flex>
              {renderColumns(columns)}
            </DnD>
          );
        }}
      </Select.Menu>
    </Select>
  );
};

export default Demo;
