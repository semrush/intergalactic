import React from 'react';
// @ts-ignore
import Select from '@semcore/select';
// @ts-ignore
import Input from '@semcore/input';
// @ts-ignore
import { Text } from '@semcore/typography';
// @ts-ignore
import { Box } from '@semcore/flex-box';

const options = Array(5)
  .fill(0)
  .map((_, i) => ({
    value: `Option ${i}`,
    title: `Option ${i}`,
  }));

const Demo = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <Text tag='label' size={200} htmlFor='release-time-picker'>
        Select release time
      </Text>
      <Box mt={2}>
        <input data-position='before' />
        <Select interaction='focus' onChange={setValue} value={value}>
          <Select.Trigger tag={Input}>
            {() => (
              <>
                <Input.Value value={value} onChange={setValue} id='release-time-picker' />
                <Input.Addon tabIndex={0}>Addon</Input.Addon>
                <Input.Addon tabIndex={0}>Addon</Input.Addon>
              </>
            )}
          </Select.Trigger>
          <Select.Menu>
            {options.map((option) => (
              <Select.Option value={option.value} key={option.value}>
                {option.title}
              </Select.Option>
            ))}
          </Select.Menu>
        </Select>
        <input data-position='after' />
      </Box>
    </>
  );
};

export default Demo;
