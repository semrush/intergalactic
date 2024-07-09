import React from 'react';
import Tag from 'intergalactic/tag';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex direction='column'>
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
      <Flex tag={'ul'} aria-label={'Search engines'} gap={1}>
        <Tag tag={'li'} size={'l'}>
          Google
        </Tag>
        <Tag tag={'li'} size={'l'}>
          Yahoo
        </Tag>
        <Tag tag={'li'} size={'l'}>
          Bing
        </Tag>
        <Tag tag={'li'} size={'l'}>
          Ask.com
        </Tag>
        <Tag tag={'li'} size={'l'}>
          WolframAlpha
        </Tag>
      </Flex>
    </Flex>
  );
};

export default Demo;
