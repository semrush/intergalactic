import { Flex } from '@semcore/base-components';
import { SelectFH } from '@semcore/feature-highlight';
import React from 'react';

const Demo = () => {
  const [selectValue, setSelectValue] = React.useState('');
  const [selectValueL, setSelectValueL] = React.useState('');

  return (
    <Flex direction='column' gap={4}>

      <SelectFH onChange={setSelectValue}>
        <SelectFH.Trigger aria-label='Highlighted select' wMax={160} wMin={160}>
          <SelectFH.Trigger.Addon />
          <SelectFH.Trigger.Text>{selectValue}</SelectFH.Trigger.Text>
        </SelectFH.Trigger>
        <SelectFH.Menu>
          <SelectFH.Option value='One'>One</SelectFH.Option>
          <SelectFH.Option value='Two'>Two</SelectFH.Option>
          <SelectFH.Option value='Three'>Three</SelectFH.Option>
        </SelectFH.Menu>
      </SelectFH>

      <SelectFH onChange={setSelectValueL} size='l'>
        <SelectFH.Trigger aria-label='Large highlighted select' wMax={180} wMin={180}>
          <SelectFH.Trigger.Addon />
          <SelectFH.Trigger.Text>{selectValueL}</SelectFH.Trigger.Text>
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
