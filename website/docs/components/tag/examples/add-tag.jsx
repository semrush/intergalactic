import React from 'react';
import Tag from '@semcore/tag';
import MathPlusXS from '@semcore/icon/MathPlus/m';

function Demo() {
  return (
    <Tag interactive theme="additional">
      <Tag.Addon tag={MathPlusXS} />
      <Tag.Text>Add tag</Tag.Text>
    </Tag>
  );
}

export default Demo;
