import React from 'react';
import Select, { InputSearch } from 'intergalactic/select';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

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
        <Select.Popper>
          <InputSearch value={filter} onChange={setFilter} placeholder='Search' />
          <Select.List hMax={'224px'}>
            {options.map(({ value, label }) => (
              <Select.Option value={value} key={value}>
                {label}
              </Select.Option>
            ))}
            {!options.length && <Select.OptionHint key='Nothing'>Nothing found</Select.OptionHint>}
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
