import React from 'react';
import Tag from '@semcore/ui/tag';
import SmileSadM from '@semcore/ui/icon/SmileSad/m';

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
