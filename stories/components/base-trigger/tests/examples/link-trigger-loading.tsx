import { LinkTrigger } from '@semcore/base-trigger';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={3}>
    <Flex gap={2}>
      <LinkTrigger active loading data-test-id='link-trigger-active'>Active</LinkTrigger>
      <LinkTrigger empty loading placeholder='Placeholder' active data-test-id='link-trigger-active-placeholder'>Active with Placeholder</LinkTrigger>
      <LinkTrigger disabled loading data-test-id='link-trigger-disabled'>Disabled</LinkTrigger>
    </Flex>

    <Flex gap={2}>
      <LinkTrigger color='red' data-test-id='link-trigger-normal-state'>Red state</LinkTrigger>
      <LinkTrigger loading color='text-success' data-test-id='link-trigger-valid-state-loading'>Success state</LinkTrigger>
      <LinkTrigger loading color='blue' data-test-id='link-trigger-loading-blue'></LinkTrigger>

      <LinkTrigger w={150} loading color='red' data-test-id='link-trigger-normal-state'>
        {' '}
        <LinkTrigger.Text tag={Text} ellipsis={true}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
          commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
          tempore voluptas. Aliquam eos expedita illo quasi unde!
        </LinkTrigger.Text>
      </LinkTrigger>
    </Flex>

  </Flex>
);

export default Demo;
