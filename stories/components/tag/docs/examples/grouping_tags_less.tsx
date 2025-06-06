import { Flex } from '@semcore/flex-box';
import Tag from '@semcore/tag';
import React from 'react';

const Demo = () => {
  return (
    <Flex role='group' aria-label='Social media' gap={1}>
      <Tag size='l'>Instagram</Tag>
      <Tag size='l'>Facebook</Tag>
      <Tag size='l'>LinkedIn</Tag>
    </Flex>
  );
};

export default Demo;
