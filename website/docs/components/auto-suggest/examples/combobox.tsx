import React from 'react';
import Select from '@semcore/ui/select';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const options = Array(12)
  .fill()
  .map((_, i) => ({
    value: `${i}:00`.padStart(5, '0'),
    title: `${i}:00`.padStart(5, '0'),
  }));

const Demo = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <Text tag="label" size="200" htmlFor="release-time-picker">
        Select release time
      </Text>
      <Box mt={2}>
        <Select id="release-time-picker" interaction="focus" onChange={setValue} value={value}>
          <Select.Trigger tag={Input}>
            {() => <Input.Value role="combobox" value={value} onChange={setValue} />}
          </Select.Trigger>
          <Select.Menu>
            {options.map((option) => (
              <Select.Option value={option.value} key={option.value}>
                {option.title}
              </Select.Option>
            ))}
          </Select.Menu>
        </Select>
      </Box>
    </>
  );
};

export default Demo;
