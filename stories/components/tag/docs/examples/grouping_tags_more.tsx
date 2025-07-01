import { Flex } from '@semcore/base-components';
import Tag from '@semcore/tag';
import React from 'react';

const Demo = () => {
  return (
    <Flex tag='ul' aria-label='Search engines' gap={1}>
      <Tag tag='li' size='l'>
        Google
      </Tag>
      <Tag tag='li' size='l'>
        Yahoo
      </Tag>
      <Tag tag='li' size='l'>
        Bing
      </Tag>
      <Tag tag='li' size='l'>
        Ask.com
      </Tag>
      <Tag tag='li' size='l'>
        WolframAlpha
      </Tag>
    </Flex>
  );
};

export default Demo;
