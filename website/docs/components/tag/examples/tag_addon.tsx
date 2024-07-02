import React from 'react';
import Tag from 'intergalactic/tag';
import SmileHappyM from 'intergalactic/icon/SmileHappy/m';
import SmileSadM from 'intergalactic/icon/SmileSad/m';

const Demo = () => {
  return (
    <>
      <Tag size='l' addonLeft={SmileHappyM} mb={2}>
        Tag
      </Tag>
      <br />
      <Tag size='l'>
        <Tag.Addon>
          <SmileSadM />
        </Tag.Addon>
        <Tag.Text>Tag</Tag.Text>
      </Tag>
    </>
  );
};

export default Demo;
