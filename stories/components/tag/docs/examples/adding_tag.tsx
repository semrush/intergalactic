import MathPlusM from '@semcore/icon/MathPlus/m';
import Tag from '@semcore/ui/tag';
import React from 'react';

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
