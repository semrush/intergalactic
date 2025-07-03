import { Flex, ScreenReaderOnly } from '@semcore/base-components';
import { SelectFH, BadgeFH } from '@semcore/feature-highlight';
import Select from '@semcore/select';
import React from 'react';

const Demo = () => {
  const [selectValue, setSelectValue] = React.useState('');
  const [selectValueL, setSelectValueL] = React.useState('');

  return (
    <Flex direction='column' gap={4} alignItems='start'>

      <SelectFH onChange={setSelectValue}>
        <SelectFH.Trigger
          aria-label='Highlighted select'
          aria-describedby='select-aria-desc'
        >
          <SelectFH.Trigger.Addon />
          <SelectFH.Trigger.Text>{selectValue}</SelectFH.Trigger.Text>
        </SelectFH.Trigger>
        <SelectFH.Menu>
          <SelectFH.Option value='One'>One</SelectFH.Option>
          <SelectFH.Option value='Two'>Two</SelectFH.Option>
          <SelectFH.Option value='Three'>Three</SelectFH.Option>
        </SelectFH.Menu>
      </SelectFH>
      <ScreenReaderOnly id='select-aria-desc'>
        Powered by AI
      </ScreenReaderOnly>

      <SelectFH onChange={setSelectValueL} size='l'>
        <SelectFH.Trigger aria-label='Large highlighted select'>
          <SelectFH.Trigger.Addon />
          <SelectFH.Trigger.Text>{selectValueL}</SelectFH.Trigger.Text>
          <Select.Trigger.Addon ml={2}>
            <BadgeFH>AI-powered</BadgeFH>
          </Select.Trigger.Addon>
        </SelectFH.Trigger>
        <SelectFH.Menu>
          <SelectFH.Option value='One'>One</SelectFH.Option>
          <SelectFH.Option value='Two'>Two</SelectFH.Option>
          <SelectFH.Option value='Three'>Three</SelectFH.Option>
        </SelectFH.Menu>
      </SelectFH>

    </Flex>
  );
};

export default Demo;
