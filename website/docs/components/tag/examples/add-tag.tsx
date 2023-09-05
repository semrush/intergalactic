import React from 'react';
import Tag from '@semcore/ui/tag';
import MathPlusM from '@semcore/ui/icon/MathPlus/m';

const Demo = () => {
  return (
    <Tag interactive theme='additional'>
      <Tag.Addon>
        <MathPlusM />
      </Tag.Addon>
      <Tag.Text>Add tag</Tag.Text>
    </Tag>
  );
};
