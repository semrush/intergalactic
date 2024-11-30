import React, { useState, useEffect } from 'react';
import Dropdown from 'intergalactic/dropdown';
import { Flex } from 'intergalactic/flex-box';
import Button from 'intergalactic/button';
import { FilterTrigger } from 'intergalactic/base-trigger';
import { Text } from 'intergalactic/typography';
import Radio, { RadioGroup } from 'intergalactic/radio';
import Textarea from 'intergalactic/textarea';
import { ScreenReaderOnly } from '@semcore/ui/flex-box';

const Demo = () => {
  const [keywords, setKeywords] = useState(0);
  const [visible, setVisible] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [message, setMessage] = useState('');

  const clearAll = () => {
    setKeywords(0);
    setTextValue('');
    setVisible(false);
  };

  const applyFilters = () => {
    const countLine = textValue.split(/[\n,;]/g).filter((item) => item !== '' && item);
    setKeywords(countLine.length);
    setVisible(false);
  };

  const clearKeywords = () => {
    setTextValue('');
    setMessage('Keywords cleared');
  };

  useEffect(() => {
    const timer = setTimeout(() => setMessage(''), 500);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <Dropdown visible={visible} onVisibleChange={setVisible}>
      <Dropdown.Trigger
        aria-label='Include keywords'
        placeholder='Include keywords'
        empty={keywords === 0}
        onClear={clearAll}
        tag={FilterTrigger}
      >
        <span aria-hidden>Include:</span> {`${keywords} keyword${keywords > 1 ? 's' : ''}`}
      </Dropdown.Trigger>
      <Dropdown.Popper w={325} p={4} aria-label='Include keywords'>
        <ScreenReaderOnly role='status' aria-live='polite'>
          {message}
        </ScreenReaderOnly>
        <Text id='textarea-description' size={200}>
          Enter keywords separated by commas or one per line. For exact matches, enter your keyword
          with square brackets around it.
        </Text>
        <RadioGroup name='operator' my={4} defaultValue='and' direction='row' gap={6}>
          <Radio value='and' label='All keywords' />
          <Radio value='any' label='Any keywords' />
        </RadioGroup>
        <Textarea
          value={textValue}
          onChange={setTextValue}
          minRows={7}
          maxRows={7}
          aria-label='Keywords'
          aria-describedby='textarea-description'
          autoFocus
        />
        <Flex mt={4}>
          <Button use='primary' theme='info' onClick={applyFilters}>
            Apply
          </Button>
          <Button ml={2} onClick={clearKeywords}>
            Clear all
          </Button>
        </Flex>
      </Dropdown.Popper>
    </Dropdown>
  );
};

export default Demo;
