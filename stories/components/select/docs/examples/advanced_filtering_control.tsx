import React from 'react';
import Select, { InputSearch } from '@semcore/select';
import { ScreenReaderOnly } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

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
        <Select.Popper aria-label={'Fruit options with search'}>
          <InputSearch value={filter} onChange={setFilter}>
            <InputSearch.SearchIcon />
            <InputSearch.Value
              aria-describedby={filter ? 'search-result-advanced' : undefined}
            />
            <InputSearch.Clear
              onClick={() => {
                return false;
              }}
            />
          </InputSearch>
          <Select.List hMax={'224px'}>
            {options.map(({ value, label }) => (
              <Select.Option value={value} key={value}>
                {label}
              </Select.Option>
            ))}
            {options.length ? (
              <ScreenReaderOnly id='search-result-advanced' aria-hidden={'true'}>
                {options.length} result{options.length > 1 && 's'} found
              </ScreenReaderOnly>
            ) : (
              <Select.OptionHint id='search-result-advanced' key='Nothing'>
                Nothing found
              </Select.OptionHint>
            )}
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
