import React from 'react';
import Tag from '@semcore/ui/tag';
import MathPlusXS from '@semcore/ui/icon/MathPlus/m';

function Demo() {
  return (
    <Tag interactive theme="additional">
      <Tag.Addon>
        <MathPlusXS />
      </Tag.Addon>
      <Tag.Text>Add tag</Tag.Text>
    </Tag>
  );
}

export default Demo;
