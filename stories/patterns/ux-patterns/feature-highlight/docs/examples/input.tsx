import { Flex } from '@semcore/base-components';
import { InputFH, BadgeFH } from '@semcore/feature-highlight';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={4}>

    <InputFH w={250}>
      <InputFH.Addon />
      <InputFH.Value placeholder='Your domain' aria-label='Highlighted input' />
      <InputFH.Addon><BadgeFH>AI powered</BadgeFH></InputFH.Addon>
    </InputFH>

    <InputFH w={300} size='l'>
      <InputFH.Addon />
      <InputFH.Value placeholder='Your domain' aria-label='Large highlighted input' />
      <InputFH.Addon><BadgeFH>AI powered</BadgeFH></InputFH.Addon>
    </InputFH>

  </Flex>
);

export default Demo;
