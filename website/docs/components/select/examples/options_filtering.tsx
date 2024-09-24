import React from 'react';
import Select, { InputSearch } from 'intergalactic/select';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const data = Array(26)
  .fill(0)
  .map((_, index) => ({
    label: `Option ${String.fromCharCode('a'.charCodeAt(0) + index)}`,
    value: `Option ${String.fromCharCode('a'.charCodeAt(0) + index)}`,
  }));

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
        Options filtering
      </Text>
      <Select placeholder='Select value'>
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

export default Demo;
