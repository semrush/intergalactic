import { Box } from '@semcore/base-components';
import Input from '@semcore/input';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import React from 'react';

const options = Array(12)
  .fill(0)
  .map((_, i) => ({
    value: `${i}:00`.padStart(5, '0'),
    title: `${i}:00`.padStart(5, '0'),
  }));

const Demo = () => {
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(null);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    const exactValueIndex = options.findIndex((option) => option.value === value);

    if (exactValueIndex > -1) {
      setHighlightedIndex(exactValueIndex);
    }
  }, [value]);

  const handleHighlightedIndexChange = (index: number | null) => {
    setHighlightedIndex(index);
  };

  return (
    <>
      <Text tag='label' size={200} htmlFor='release-time-picker'>
        Release time
      </Text>
      <Box mt={2}>
        <Select
          interaction='focus'
          onChange={setValue}
          value={value}
          highlightedIndex={highlightedIndex}
          onHighlightedIndexChange={handleHighlightedIndexChange}
        >
          <Select.Trigger tag={Input} w={150}>
            {() => <Input.Value value={value} onChange={setValue} id='release-time-picker' />}
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
