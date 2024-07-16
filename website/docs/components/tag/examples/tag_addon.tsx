import React from 'react';
import Tag from 'intergalactic/tag';
import { Flex } from 'intergalactic/flex-box';
import SmileHappyM from 'intergalactic/icon/SmileHappy/m';
import SmileSadM from 'intergalactic/icon/SmileSad/m';

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
