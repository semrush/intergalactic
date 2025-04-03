import React from 'react';
import {ButtonTrigger} from '@semcore/base-trigger';
import { Flex, Box } from '@semcore/flex-box';


const Demo = () => (
  <Flex direction='column' gap={3}>
    <Flex gap={2} justifyContent='flex-start'>
      <ButtonTrigger loading active data-test-id='active-trigger'>Active</ButtonTrigger>
      <ButtonTrigger loading disabled data-test-id='disabled-trigger'>Disabled</ButtonTrigger>
    </Flex>
    <Flex gap={2} justifyContent='flex-start'>
      <ButtonTrigger  loading state='normal' data-test-id='normal-state-trigger'>Normal state</ButtonTrigger>
      <ButtonTrigger loading state='valid' data-test-id='valid-state-trigger'>Valid state</ButtonTrigger>
      <ButtonTrigger loading state='invalid' data-test-id='invalid-state-trigger'>Invalid state</ButtonTrigger>
    </Flex>
    <Flex gap={2} justifyContent='flex-start'>
      <ButtonTrigger empty loading size='m' data-test-id='empty-trigger'>ButtonM</ButtonTrigger>
      <ButtonTrigger loading size='l' data-test-id='l-size-trigger'>ButtonL</ButtonTrigger>
      <ButtonTrigger loading empty placeholder='Placeholder' data-test-id='placeholder-trigger-disabled'>Button with placeholder</ButtonTrigger>
    </Flex>
  </Flex>
);



export default Demo;
