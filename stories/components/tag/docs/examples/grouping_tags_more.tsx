import React from 'react';
import Tag from '@semcore/tag';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
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
  );
};

export default Demo;
