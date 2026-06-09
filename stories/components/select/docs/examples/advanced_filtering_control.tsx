import { Flex } from '@semcore/ui/base-components';
import Select, { InputSearch } from '@semcore/ui/select';
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
      <Text tag='label' size={200} htmlFor='options-filtering-advanced'>
        Fruit
      </Text>
      <Select placeholder='Select a fruit'>
        <Select.Trigger id='options-filtering-advanced' mr='auto' mt={2} />
        <Select.Popper aria-label='Fruit options with search'>
          <InputSearch value={filter} onChange={setFilter}>
            <InputSearch.SearchIcon />
            <InputSearch.Value aria-describedby={filter ? 'search-result' : undefined} />
            <InputSearch.Clear
              onClick={() => {
                alert('Clicked on the Clear button');
                return false;
              }}
            />
          </InputSearch>
          <Select.List hMax='224px'>
            {options.map(({ value, label }) => (
              <Select.Option value={value} key={value}>
                {label}
              </Select.Option>
            ))}
            <Select.StatusItem itemsCount={options.length} id='search-result' />
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

export default Demo;
