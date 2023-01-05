import React, { useState } from 'react';
import Dropdown from '@semcore/ui/dropdown';
import { Flex } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import { Text } from '@semcore/ui/typography';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import Textarea from '@semcore/ui/textarea';

export default () => {
  const [filters, setFilters] = useState(false);
  const [visible, updateVisible] = useState(false);
  const [value, changeValue] = useState('');
  const [displayValue, changeDisplayValue] = useState('');
  const clearAll = () => setFilters(false);
  const applyFilters = () => {
    const countLine = value.match(/\n/g) || [];
    changeDisplayValue(String(countLine.length || (value && 1)));
    setFilters(Boolean(countLine || value));
  };

  return (
    <Dropdown visible={visible} onVisibleChange={updateVisible}>
      <Dropdown.Trigger
        placeholder="Exclude keywords"
        empty={!filters}
        onClear={clearAll}
        tag={FilterTrigger}
      >
        {`Exclude: ${displayValue} keywords`}
      </Dropdown.Trigger>
      <Dropdown.Popper w={325} p="8px 8px 16px">
        <Text tag="p" size={100} color="gray20">
          Enter keywords separated by commas or one per line. For exact matches, enter your keyword
          with square brackets around it.
        </Text>
        <Flex my={4}>
          <RadioGroup defaultValue="1">
            <Radio>
              <Radio.Value value="1" />
              <Radio.Text>All keywords</Radio.Text>
            </Radio>
            <Radio ml={6}>
              <Radio.Value value="2" />
              <Radio.Text>Any keywords</Radio.Text>
            </Radio>
          </RadioGroup>
        </Flex>
        <Textarea value={value} onChange={changeValue} h={132} />
        <Flex mt={5}>
          <Button use="primary" theme="info" onClick={applyFilters}>
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
