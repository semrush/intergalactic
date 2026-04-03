import ChevronDownM from '@semcore/icon/ChevronDown/m';
import { Flex } from '@semcore/ui/base-components';
import BaseTrigger from '@semcore/ui/base-trigger';
import Button from '@semcore/ui/button';
import Divider from '@semcore/ui/divider';
import Dropdown from '@semcore/ui/dropdown';
import Radio from '@semcore/ui/radio';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <Flex gap={2}>
    <Text size={200} tag='label' htmlFor='device-button-select'>
      Device:
    </Text>
    <Select tag={BaseTrigger} options={devices} id='device-button-select' />

    <Select
      tag={BaseTrigger}
      options={periods}
      aria-label='Period'
      placeholder='Select period'
      ml={4}
    />

    <BaseTrigger aria-label='base trigger'>
      <BaseTrigger.Text>Button</BaseTrigger.Text>
      <BaseTrigger.Addon tag={ChevronDownM} />
    </BaseTrigger>

    <Dropdown>
      <Dropdown.Trigger>
        <BaseTrigger aria-label='base trigger with dropdown'>
          <BaseTrigger.Text>Text</BaseTrigger.Text>
          <BaseTrigger.Addon>
            <ChevronDownM />
          </BaseTrigger.Addon>
        </BaseTrigger>
      </Dropdown.Trigger>

      <Dropdown.Popper aria-labelledby='base trigger dropdown'>
        <Radio>
          <Radio.Value />
          <Radio.Text>Radio 1</Radio.Text>
        </Radio>
        <Divider />
        <Radio>
          <Radio.Value />
          <Radio.Text>Radio 2</Radio.Text>
        </Radio>
        <Divider />
        <Button use='primary'>Apply</Button>
      </Dropdown.Popper>
    </Dropdown>
  </Flex>
);

const devices = ['One', 'Desktop', 'Mobile', 'Tablet'].map((item) => ({
  value: item,
  children: item,
}));

const periods = ['Last week', 'Last month', 'Last 6 months'].map((item) => ({
  value: item,
  children: item,
}));

export default Demo;
