import React from 'react';
import Tag from '@semcore/tag';
import { Flex } from '@semcore/flex-box';
import SmileHappyM from '@semcore/icon/SmileHappy/m';
import SmileSadM from '@semcore/icon/SmileSad/m';

const Demo = () => {
  return (
    <Flex gap={1}>
      <Tag size='l' addonLeft={SmileHappyM}>
        Tag
      </Tag>
      <Tag size='l'>
        <Tag.Addon>
          <SmileSadM />
        </Tag.Addon>
        <Tag.Text>Tag</Tag.Text>
      </Tag>
    </Flex>
  );
};

export default Demo;
