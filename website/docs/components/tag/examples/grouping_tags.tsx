import React from 'react';
import Tag from 'intergalactic/tag';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex tag={'ul'} gap={2} aria-label={'List of tags'}>
      <Tag tag={'li'} interactive>
        <Tag.Text>Google</Tag.Text>
      </Tag>
      <Tag tag={'li'} interactive>
        <Tag.Text>Yahoo</Tag.Text>
      </Tag>
      <Tag tag={'li'} interactive>
        <Tag.Text>Meta</Tag.Text>
      </Tag>
    </Flex>
  );
};

export default Demo;
