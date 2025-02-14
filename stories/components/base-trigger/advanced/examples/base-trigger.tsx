import React from 'react';
import Select from '@semcore/select';
import Dropdown from '@semcore/dropdown';
import BaseTrigger, {FilterTrigger, LinkTrigger, ButtonTrigger} from '@semcore/base-trigger';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Spin from '@semcore/ui/spin';
import Radio from '@semcore/radio';
import Divider from '@semcore/divider';
import Button from '@semcore/button';
import ChevronDownM from '@semcore/icon/ChevronDown/m';

const Demo = () => (
<Box>
    <BaseTrigger>base base trigger</BaseTrigger>

    <FilterTrigger>Filter</FilterTrigger>
    <LinkTrigger>Link</LinkTrigger>
    <ButtonTrigger>Button</ButtonTrigger>
    <br/>
    <br/>
  <Flex gap={2} >
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
      <BaseTrigger.Text>
        Button
      </BaseTrigger.Text>
      <BaseTrigger.Addon tag={Spin} size="xs" />
    </BaseTrigger>

    <Dropdown>
      <Dropdown.Trigger>
        <BaseTrigger aria-label='base trigger with dropdown' >
          <BaseTrigger.Text>
            Text
          </BaseTrigger.Text>
          <BaseTrigger.Addon>
            <ChevronDownM />
          </BaseTrigger.Addon>
        </BaseTrigger>
      </Dropdown.Trigger>

      <Dropdown.Popper aria-labelledby='base trigger dropdown'>
        <Radio>
          <Radio.Value />
          <Radio.Text >Radio 1</Radio.Text>
        </Radio>
        <Divider />
        <Radio>
          <Radio.Value />
          <Radio.Text >Radio 2</Radio.Text>
        </Radio>
        <Divider />
        <Button
          use="primary">
          Apply
        </Button>
      </Dropdown.Popper>
    </Dropdown>

  </Flex>
</Box>
);

const devices = ['Desktop', 'Mobile', 'Tablet'].map((item) => ({
  value: item,
  children: item,
}));

const periods = ['Last week', 'Last month', 'Last 6 months'].map((item) => ({
  value: item,
  children: item,
}));

export default Demo;
