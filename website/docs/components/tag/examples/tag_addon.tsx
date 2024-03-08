import React from 'react';
import Tag from 'intergalactic/tag';
import SmileHappyM from 'intergalactic/icon/SmileHappy/m';

const Demo = () => {
  return (
    <>
      <Tag addonLeft={SmileHappyM} mb={2}>
        Tag
      </Tag>
      <br />
      <Tag>
        <Tag.Addon>
          <SmileHappyM />
        </Tag.Addon>
        <Tag.Text>Tag</Tag.Text>
      </Tag>
    </>
  );
};

export default Demo;
