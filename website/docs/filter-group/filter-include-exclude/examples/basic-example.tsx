import React from 'react';
import Dropdown from 'intergalactic/dropdown';
import { Flex } from 'intergalactic/flex-box';
import Button from 'intergalactic/button';
import { FilterTrigger } from 'intergalactic/base-trigger';
import { Text } from 'intergalactic/typography';
import Radio, { RadioGroup } from 'intergalactic/radio';
import Textarea from 'intergalactic/textarea';

const Demo = () => {
  const [filters, setFilters] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [displayValue, setDisplayValue] = React.useState('');
  const clearAll = () => setFilters(false);
  const applyFilters = () => {
    const countLine = value.match(/\n/g) || [];
    setDisplayValue(String(countLine.length || (value && 1)));
    setFilters(Boolean(countLine || value));
  };

  return (
    <Dropdown visible={visible} onVisibleChange={setVisible}>
      <Dropdown.Trigger
        placeholder='Exclude keywords'
        empty={!filters}
        onClear={clearAll}
        tag={FilterTrigger}
      >
        {`Exclude: ${displayValue} keywords`}
      </Dropdown.Trigger>
      <Dropdown.Popper
        w={325}
        p='8px 8px 16px'
        role='dialog'
        aria-label='List of excluded keywords'
        aria-modal='false'
      >
        <Text tag='label' htmlFor='textarea' size={200} color='text-primary'>
          Enter keywords separated by commas or one per line. For exact matches, enter your keyword
          with square brackets around it.
        </Text>
        <RadioGroup my={4} defaultValue='1' direction='row'>
          <Radio>
            <Radio.Value value='1' />
            <Radio.Text>All keywords</Radio.Text>
          </Radio>
          <Radio ml={6}>
            <Radio.Value value='2' />
            <Radio.Text>Any keywords</Radio.Text>
          </Radio>
        </RadioGroup>
        <Textarea value={value} onChange={setValue} h={132} id='textarea' />
        <Flex mt={5}>
          <Button use='primary' theme='info' onClick={applyFilters}>
            Apply
          </Button>
          <Button ml={2} onClick={clearAll}>
            Clear all
          </Button>
        </Flex>
      </Dropdown.Popper>
    </Dropdown>
  );
};

export default Demo;
