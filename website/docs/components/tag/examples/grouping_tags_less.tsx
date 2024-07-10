import React from 'react';
import Tag from 'intergalactic/tag';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex role={'group'} aria-label={'Social media'} gap={1}>
      <Tag size={'l'}>
        Instagram
      </Tag>
      <Tag size={'l'}>
        Facebook
      </Tag>
      <Tag size={'l'}>
        LinkedIn
      </Tag>
    </Flex>
  );
};

export default Demo;
