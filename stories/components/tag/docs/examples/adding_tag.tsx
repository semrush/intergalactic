import React from 'react';
import Tag from '@semcore/tag';
import MathPlusM from '@semcore/icon/MathPlus/m';

const Demo = () => {
  return (
    <Tag interactive size='l' theme='additional' onClick={console.log}>
      <Tag.Addon>
        <MathPlusM />
      </Tag.Addon>
      <Tag.Text>Add tag</Tag.Text>
    </Tag>
  );
};

export default Demo;
