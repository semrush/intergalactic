import React from 'react';
import Tag from 'intergalactic/tag';
import SmileHappyM from 'intergalactic/icon/SmileHappy/m';

const Demo = () => {
  return (
    <>
      <Tag size='l' theme='primary' color='violet-500'>
        <Tag.Addon>
          <SmileHappyM />
        </Tag.Addon>
        <Tag.Text>Tag</Tag.Text>
      </Tag>
    </>
  );
};

export default Demo;
