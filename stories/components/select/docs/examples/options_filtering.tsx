import { Flex } from '@semcore/ui/base-components';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [filter, setFilter] = React.useState('');
  const options = React.useMemo(
    () =>
      data.filter((option) => {
        return option.value.toString().toLowerCase().includes(filter.toLowerCase());
      }),
    [filter],
  );

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='options-filtering-select'>
        Fruit
      </Text>
      <Select placeholder='Select a fruit'>
        <Select.Trigger id='options-filtering-select' mr='auto' mt={2} />
        <Select.Popper aria-label='Fruits with search'>
          <Select.InputSearch
            value={filter}
            onChange={setFilter}
          />
          {options.length > 0 && (
            <Select.List hMax='224px'>
              {options.map(({ value, label }) => (
                <Select.Option value={value} key={value}>
                  {label}
                </Select.Option>
              ))}
            </Select.List>
          )}
          {filter !== '' && <Select.StatusItem itemsCount={options.length} />}
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

export default Demo;
