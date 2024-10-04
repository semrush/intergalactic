import React from 'react';
import { Flex } from 'intergalactic/flex-box';
import Select from 'intergalactic/select';
import { Text } from 'intergalactic/typography';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Option ${index}`,
    children: `Option ${index}`,
  }));

const { value: initialValue } = options[0];

const Demo = () => {
  const [value, setValue] = React.useState(initialValue);

  return (
    <Flex gap={2} flexWrap>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='controlled-mode-select'>
          Controlled mode
        </Text>
        <Select
          id='controlled-mode-select'
          mt={2}
          value={value}
          onChange={setValue}
          options={options}
          placeholder='Select option'
          m='auto'
          w='100%'
        />
      </Flex>

      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='uncontrolled-mode-select'>
          Uncontrolled mode
        </Text>
        <Select
          id='uncontrolled-mode-select'
          mt={2}
          defaultValue={initialValue}
          onChange={setValue}
          options={options}
          placeholder='Select option'
          m='auto'
          w='100%'
        />
      </Flex>
    </Flex>
  );
};

export default Demo;
