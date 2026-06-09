import { Flex } from '@semcore/ui/base-components';
import type { StatusItemState } from '@semcore/ui/dropdown';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type OnChangeInputSearchProps = {
  state?: StatusItemState;
  customChildren?: string;
  itemsCount?: number;
  size?: 'm' | 'l';
};

const Demo = ({ state = 'default', customChildren, itemsCount, size = 'm' }: OnChangeInputSearchProps) => {
  const [filter, setFilter] = React.useState('');
  const options = React.useMemo(
    () =>
      data.filter((option) => {
        return option.value
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase());
      }),
    [filter],
  );

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} id='options-filtering-label' htmlFor='options-filtering-select'>
        Fruit
      </Text>
      <Select placeholder='Select a fruit' size={size}>
        <Select.Trigger
          id='options-filtering-select'
          aria-labelledby='options-filtering-label'
          mr='auto'
          mt={2}
        />
        <Select.Popper aria-label='Fruits with search'>
          <Select.InputSearch
            value={filter}
            onChange={setFilter}
            aria-describedby={filter ? 'search-result' : undefined}
          />
          <Select.List hMax='224px'>
            {options.map(({ value, label }) => (
              <Select.Option value={value} key={value}>
                {label}
              </Select.Option>
            ))}

            <Select.StatusItem itemsCount={itemsCount ?? options.length} state={state} id='search-result'>
              {customChildren || undefined}
            </Select.StatusItem>
          </Select.List>
        </Select.Popper>
      </Select>
    </Flex>
  );
};

const data = [
  'Apple',
  'Banana',
  'Blueberry',
  'Grape',
  'Kiwi',
  'Mango',
  'Melon',
  'Orange',
  'Peach',
  'Pear',
  'Pineapple',
  'Strawberry',
].map((item) => ({
  label: item,
  value: item,
}));

export const defaultProps: OnChangeInputSearchProps = {
  state: 'default',
  customChildren: '',
  itemsCount: undefined,
  size: 'm',
};

Demo.defaultProps = defaultProps;

export default Demo;
