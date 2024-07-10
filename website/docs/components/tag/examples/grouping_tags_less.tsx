import React from 'react';
import Tag from 'intergalactic/tag';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex aria-label={'Social media'} gap={1}>
      <Tag size={'l'} color={'blue-500'}>
        Instagram
      </Tag>
      <Tag size={'l'} color={'blue-500'}>
        Facebook
      </Tag>
      <Tag size={'l'} color={'blue-500'}>
        LinkedIn
      </Tag>
    </Flex>
  );
};

export default Demo;
