import { SelectAF } from '@semcore/accent-feature';
import { Flex } from '@semcore/base-components';
import React from 'react';

const Demo = () => {
  const [selectValue, setSelectValue] = React.useState('');
  const [selectValueL, setSelectValueL] = React.useState('');

  return (
    <Flex direction='column' gap={4}>

      <SelectAF onChange={setSelectValue}>
        <SelectAF.Trigger aria-label='Highlighted select' wMax={160} wMin={160}>
          <SelectAF.Trigger.Addon />
          <SelectAF.Trigger.Text>{selectValue}</SelectAF.Trigger.Text>
        </SelectAF.Trigger>
        <SelectAF.Menu>
          <SelectAF.Option value='One'>One</SelectAF.Option>
          <SelectAF.Option value='Two'>Two</SelectAF.Option>
          <SelectAF.Option value='Three'>Three</SelectAF.Option>
        </SelectAF.Menu>
      </SelectAF>

      <SelectAF onChange={setSelectValueL} size='l'>
        <SelectAF.Trigger aria-label='Large highlighted select' wMax={180} wMin={180}>
          <SelectAF.Trigger.Addon />
          <SelectAF.Trigger.Text>{selectValueL}</SelectAF.Trigger.Text>
        </SelectAF.Trigger>
        <SelectAF.Menu>
          <SelectAF.Option value='One'>One</SelectAF.Option>
          <SelectAF.Option value='Two'>Two</SelectAF.Option>
          <SelectAF.Option value='Three'>Three</SelectAF.Option>
        </SelectAF.Menu>
      </SelectAF>

    </Flex>
  );
};

export default Demo;
