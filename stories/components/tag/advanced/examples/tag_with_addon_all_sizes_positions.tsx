import React from 'react';
import Tag from '@semcore/tag';
import { Flex } from '@semcore/flex-box';
import SmileHappyM from '@semcore/icon/SmileHappy/m';
import SmileHappyL from '@semcore/icon/SmileHappy/l';
import SmileSadM from '@semcore/icon/SmileSad/m';
import SmileSadL from '@semcore/icon/SmileSad/l';

const Demo = () => {
  return (
    <Flex direction='column' gap={3}>

      <Flex gap={1}>
        <Tag size='m' addonLeft={SmileHappyM} addonRight={SmileHappyM}>
          Tag
        </Tag>
        <Tag size='l' addonLeft={SmileHappyM} addonRight={SmileHappyM}>
          Tag
        </Tag>
        <Tag size='xl' addonLeft={SmileHappyL} addonRight={SmileHappyL}>
          Tag
        </Tag>
        <Tag size='m'>
          <Tag.Addon>
            <SmileSadM />
          </Tag.Addon>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Addon>
            <SmileSadM />
          </Tag.Addon>
        </Tag>
        <Tag size='l'>
          <Tag.Addon>
            <SmileSadM />
          </Tag.Addon>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Addon>
            <SmileSadM />
          </Tag.Addon>
        </Tag>
        <Tag size='xl'>
          <Tag.Addon>
            <SmileSadL />
          </Tag.Addon>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Addon>
            <SmileSadL />
          </Tag.Addon>
        </Tag>
      </Flex>

      <Flex gap={1}>
        <Tag size='m' addonLeft={SmileHappyM}>
          Tag
        </Tag>
        <Tag size='l' addonLeft={SmileHappyM}>
          Tag
        </Tag>
        <Tag size='xl' addonLeft={SmileHappyL}>
          Tag
        </Tag>
        <Tag size='m'>
          <Tag.Addon>
            <SmileSadM />
          </Tag.Addon>
          <Tag.Text>Tag</Tag.Text>
        </Tag>
        <Tag size='l'>
          <Tag.Addon>
            <SmileSadM />
          </Tag.Addon>
          <Tag.Text>Tag</Tag.Text>
        </Tag>
        <Tag size='xl'>
          <Tag.Addon>
            <SmileSadL />
          </Tag.Addon>
          <Tag.Text>Tag</Tag.Text>
        </Tag>
      </Flex>
      
      <Flex gap={1}>
        <Tag size='m' addonRight={SmileHappyM}>
          Tag
        </Tag>
        <Tag size='l' addonRight={SmileHappyM}>
          Tag
        </Tag>
        <Tag size='xl' addonRight={SmileHappyL}>
          Tag
        </Tag>
        <Tag size='m'>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Addon>
            <SmileSadM />
          </Tag.Addon>
        </Tag>
        <Tag size='l'>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Addon>
            <SmileSadM />
          </Tag.Addon>
        </Tag>
        <Tag size='xl'>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Addon>
            <SmileSadL />
          </Tag.Addon>
        </Tag>
      </Flex>

      <Flex gap={1}>
        <Tag size='m'>
          <Tag.Text>Tag</Tag.Text>
        </Tag>
        <Tag size='l'>
          <Tag.Text>Tag</Tag.Text>
        </Tag>
        <Tag size='xl'>
          <Tag.Text>Tag</Tag.Text>
        </Tag>
        
      </Flex>

    </Flex>

  );
};

export default Demo;
