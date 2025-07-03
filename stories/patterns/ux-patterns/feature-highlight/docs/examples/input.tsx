import { Flex, ScreenReaderOnly } from '@semcore/base-components';
import { InputFH, BadgeFH } from '@semcore/feature-highlight';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={4}>

    <InputFH w={200}>
      <InputFH.Addon />
      <InputFH.Value
        placeholder='Your domain'
        aria-label='Highlighted input'
        aria-describedby='input-aria-desc'
      />
    </InputFH>
    <ScreenReaderOnly id='input-aria-desc'>
      Powered by AI
    </ScreenReaderOnly>

    <InputFH w={300} size='l'>
      <InputFH.Addon />
      <InputFH.Value
        placeholder='Your domain'
        aria-label='Large highlighted input'
        aria-describedby='input-badge'
      />
      <InputFH.Addon>
        <BadgeFH id='input-badge'>AI powered</BadgeFH>
      </InputFH.Addon>
    </InputFH>

  </Flex>
);

export default Demo;
