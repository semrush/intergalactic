import React from 'react';
import { Flex, ScreenReaderOnly } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Textarea from '@semcore/textarea';
import Counter from '@semcore/counter';

const maxSymbols = 150;

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [valueLength, setValueLength] = React.useState(0);
  const [theme, setTheme] = React.useState<string>('');
  const handleChange = React.useCallback((value: string) => {
    setValue(value);
  }, []);

  const valueTimer = React.useRef<number>();

  React.useEffect(() => {
    if (valueTimer.current) {
      window.clearTimeout(valueTimer.current);
    }

    valueTimer.current = window.setTimeout(() => {
      setValueLength(value.length);
    }, 1000);
  }, [value]);

  React.useEffect(() => {
    if (value.length >= 140) {
      if (value.length <= maxSymbols) {
        setTheme('warning');
      } else {
        setTheme('danger');
      }
    } else {
      setTheme('');
    }
  }, [value]);

  return (
    <Flex direction='column' w={350}>
      <Flex mb={2} justifyContent='space-between'>
        <Flex alignItems={'center'}>
          <Text size={200} tag='label' htmlFor='limited-text-field'>
            Project description
          </Text>
          <Counter ml={1} theme={theme} id={'counter-for-textarea'}>
            {value.length}
            <span aria-hidden='true'>/</span>
            <ScreenReaderOnly>of</ScreenReaderOnly>
            {maxSymbols}
            <ScreenReaderOnly>allowed characters</ScreenReaderOnly>
            {theme === 'warning' && <ScreenReaderOnly>Limit is almost reached</ScreenReaderOnly>}
            {theme === 'danger' && <ScreenReaderOnly>Limit is exceeded</ScreenReaderOnly>}
          </Counter>
        </Flex>
        <Text size={200} color='text-secondary' id={'optional-for-textarea'}>
          optional
        </Text>
      </Flex>
      <Textarea
        placeholder='The goal of your project, required resources, and so on'
        id='limited-text-field'
        aria-describedby='optional-for-textarea counter-for-textarea'
        onChange={handleChange}
      />
      <ScreenReaderOnly aria-live={'polite'} aria-atomic={true}>
        {valueLength} of {maxSymbols} allowed characters
        {valueLength >= 140 && valueLength <= 150 && (
          <ScreenReaderOnly>Limit is almost reached</ScreenReaderOnly>
        )}
        {valueLength > 150 && <ScreenReaderOnly>Limit is exceeded</ScreenReaderOnly>}
      </ScreenReaderOnly>
    </Flex>
  );
};

export default Demo;
