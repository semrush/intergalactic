import Settings from '@semcore/icon/Settings/m';
import { Flex } from '@semcore/ui/base-components';
import Button, { ButtonLink } from '@semcore/ui/button';
import type { DataTableProps } from '@semcore/ui/data-table';
import { DatePicker, DateRangeComparator, DateRangePicker } from '@semcore/ui/date-picker';
import DnD from '@semcore/ui/drag-and-drop';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import FeaturePopover from '@semcore/ui/feature-popover';
import TimePicker from '@semcore/ui/time-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type Props = {
  columns: DataTableProps<any, any, any>['columns'];
  selectedColumns: string[];
  setSelectedColumns: (selectedColumns: string[] | null) => void;
  onChangeColumns: ({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) => void;
};

export function BeforeTablesControls(props: Props) {
  const { columns, selectedColumns, setSelectedColumns } = props;
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(null);

  const handleDnD = React.useCallback(
    ({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) => {
      setHighlightedIndex(toIndex);
      props.onChangeColumns({ fromIndex, toIndex });
    },
    [],
  );

  const resetToDefault = React.useCallback(() => {
    setSelectedColumns(null);
  }, []);
  const toggleAll = React.useCallback(() => {
    const allSelected = selectedColumns.length === columns.length;
    const allColumns = columns.map((column) => column.name);
    if (allSelected) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns(allColumns);
    }
  }, [selectedColumns, columns]);

  const [fpVisible, setFpVisible] = React.useState(true);

  return (
    <Flex gap={3} my={4}>
      <DatePicker>
        <DatePicker.Trigger />
        <DatePicker.Popper />
      </DatePicker>

      <DateRangePicker>
        <DateRangePicker.Trigger />
        <DateRangePicker.Popper />
      </DateRangePicker>

      <DateRangeComparator />

      <TimePicker is12Hour id='primary-table-filters-time'>
        <TimePicker.Hours />
        <TimePicker.Separator />
        <TimePicker.Minutes />
        <TimePicker.Format />
      </TimePicker>

      <FeaturePopover
        visible={fpVisible}
        onVisibleChange={setFpVisible}
        disablePortal
        placement='bottom-end'
      >
        <FeaturePopover.Trigger>
          <DropdownMenu
            selectable
            multiselect
            highlightedIndex={highlightedIndex}
            onHighlightedIndexChange={setHighlightedIndex}
          >
            <DropdownMenu.Trigger tag={Button} addonLeft={Settings}>
              Manage columns
            </DropdownMenu.Trigger>
            <DropdownMenu.Popper aria-labelledby='popper_id'>
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
              <DropdownMenu.List hMax={500}>
                <DnD onDnD={handleDnD} aria-label='drag-and-drop container'>
                  {columns.map((column) => (
                    <DropdownMenu.Item
                      tag={DnD.Draggable}
                      isCustomFocus={true}
                      key={column.name}
                      selected={selectedColumns.includes(column.name)}
                      onClick={(e) => {
                        if (
                          e.target instanceof HTMLElement &&
                          e.target.getAttribute('role') === 'menuitemcheckbox'
                        ) {
                          if (!selectedColumns.includes(column.name)) {
                            setSelectedColumns([...selectedColumns, column.name]);
                          } else {
                            setSelectedColumns(selectedColumns.filter((i) => i !== column.name));
                          }
                        }
                      }}
                    >
                      {column.children}
                    </DropdownMenu.Item>
                  ))}
                </DnD>
              </DropdownMenu.List>
            </DropdownMenu.Popper>
          </DropdownMenu>
          {fpVisible && <FeaturePopover.Spot />}
        </FeaturePopover.Trigger>
        <FeaturePopover.Popper
          closeIcon
          autoFocus={false}
          wMax={320}
          aria-label='New feature: Export'
        >
          <FPContent />
        </FeaturePopover.Popper>
      </FeaturePopover>
    </Flex>
  );
}

const FPContent = () => (
  <Flex alignItems='start'>
    <div>
      <Text size={300} bold tag='h3' mb={1} mt={0}>
        Export your data
      </Text>
      <Text mb={4} size={200} tag='p'>
        With this new feature, you can now export your data to CSV or PDF files.
      </Text>
      <Flex gap={2} alignItems='center'>
        <Button
          theme='invert'
          use='primary'
        >
          Next
        </Button>
        <Button
          theme='muted'
          use='tertiary'
        >
          Remind me later
        </Button>
      </Flex>
    </div>
  </Flex>
);
