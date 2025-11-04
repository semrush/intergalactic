import { Flex } from '@semcore/ui/base-components';
import Checkbox from '@semcore/ui/checkbox';
import React from 'react';

const Demo = () => {
  const [checked, setChecked] = React.useState([false, false, false]);
  const handleGroupChange = React.useCallback(
    (value: boolean) => {
      setChecked((checked) => checked.map(() => value));
    },
    [setChecked],
  );
  const handleItemChange = React.useCallback(
    (index: number) => (value: boolean) => {
      setChecked((checked) => checked.map((item, i) => (i === index ? value : item)));
    },
    [setChecked],
  );

  return (
    <>
      <Flex>
        <Checkbox
          mb={3}
          label='Group of options'
          onChange={handleGroupChange}
          indeterminate={checked.includes(false) && checked.includes(true)}
          checked={!checked.includes(false)}
        />
      </Flex>
      {checked.map((value, index) => (
        <Flex key={index} ml={6}>
          <Checkbox
            mb={3}
            key={index}
            checked={value}
            onChange={handleItemChange(index)}
            label={`Option ${index + 1}`}
          />
        </Flex>
      ))}
    </>
  );
};

export default Demo;
