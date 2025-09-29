import { Flex } from '@semcore/ui/base-components';
import SmileHappyM from '@semcore/ui/icon/SmileHappy/m';
import SmileSadM from '@semcore/ui/icon/SmileSad/m';
import Tag from '@semcore/ui/tag';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={1}>
      <Tag size='l' addonLeft={SmileHappyM}>
        Positive
      </Tag>
      <Tag size='l'>
        <Tag.Addon>
          <SmileSadM />
        </Tag.Addon>
        <Tag.Text>Negative</Tag.Text>
      </Tag>
    </Flex>
  );
};

export default Demo;
