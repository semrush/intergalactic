import React from 'react';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';
import Textarea from 'intergalactic/textarea';
import Counter from 'intergalactic/counter';
import { ScreenReaderOnly } from 'intergalactic/utils/lib/ScreenReaderOnly';

const maxSymbols = 150;

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [theme, setTheme] = React.useState<string>('');
  const handleChange = React.useCallback((value: string) => {
    setValue(value);
    if (value.length >= 140) {
      if (value.length <= maxSymbols) {
        setTheme('warning');
      } else {
        setTheme('danger');
      }
    } else {
      setTheme('');
    }
  }, []);

  return (
    <Flex direction='column' w={350}>
      <Flex mb={2} justifyContent='space-between'>
        <Text size={200} tag='label' htmlFor='limited-text-field' id={'label-for-textarea'}>
          Project description
          <Counter ml={1} theme={theme}>
            {value.length}
            <span aria-hidden='true'>/</span>
            <ScreenReaderOnly>of</ScreenReaderOnly>
            {maxSymbols}
            <ScreenReaderOnly>allowed characters</ScreenReaderOnly>
            {theme === 'warning' && <ScreenReaderOnly>Limit is almost reached</ScreenReaderOnly>}
            {theme === 'danger' && <ScreenReaderOnly>Limit is exceeded</ScreenReaderOnly>}
          </Counter>
        </Text>
        <Text size={200} color='text-secondary'>
          optional
        </Text>
      </Flex>
      <Textarea
        placeholder='The goal of your project, required resources, and so on'
        id='limited-text-field'
        aria-describedby='label-for-textarea'
        onChange={handleChange}
      />
    </Flex>
  );
};

export default Demo;
