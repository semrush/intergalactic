import React from 'react';
import Radio, { RadioGroup } from '@semcore/radio';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Flex direction='column' gap={2}>
      <Radio>
        <Radio.Value />
        <Radio.Text color='text-critical'>color='text-critical'</Radio.Text>
      </Radio>
      <Radio disabled>
        <Radio.Value checked />
        <Radio.Text >checked disabled</Radio.Text>
      </Radio>
      <Radio state='invalid'>
        <Radio.Value checked />
        <Radio.Text >invalid focused checked </Radio.Text>
      </Radio>
      <Radio state='invalid' disabled>
        <Radio.Value checked />
        <Radio.Text >invalid focused checked disabled</Radio.Text>
      </Radio>

      <Radio state='invalid'>
        <Radio.Value checked />
        <Radio.Text >invalid checked </Radio.Text>
      </Radio>

      <Radio theme='yellow-400'>
        <Radio.Value checked />
        <Radio.Text >theme checked </Radio.Text>
      </Radio>
      <Radio theme='yellow-400' size='l'>
        <Radio.Value checked />
        <Radio.Text >theme checked L</Radio.Text>
      </Radio>
    </Flex>
  );
};

export default Demo;
