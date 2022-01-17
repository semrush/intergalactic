import React from 'react';
import Tag from '@semcore/tag';
import MathPlusXS from '@semcore/icon/MathPlus/m';

function Demo() {
  return (
    <Tag interactive style={{ borderStyle: 'dashed' }}>
      <Tag.Addon tag={MathPlusXS} />
      <Tag.Text>Add tag</Tag.Text>
    </Tag>
  );
}

export default Demo;
