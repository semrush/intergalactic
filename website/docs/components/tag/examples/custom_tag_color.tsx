import React from 'react';
import Tag from 'intergalactic/tag';
import SmileSadM from 'intergalactic/icon/SmileSad/m';

const Demo = () => {
  return (
    <>
      <Tag theme='primary' color='red-500'>
        <Tag.Addon>
          <SmileSadM />
        </Tag.Addon>
        <Tag.Text>Tag</Tag.Text>
      </Tag>
    </>
  );
};

export default Demo;
