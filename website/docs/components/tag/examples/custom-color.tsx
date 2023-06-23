import React from 'react';
import Tag from '@semcore/ui/tag';
import EditXS from '@semcore/ui/icon/Edit/m';

export default function () {
  return (
    <>
      <Tag theme='primary' color='red-500'>
        <Tag.Addon>
          <EditXS />
        </Tag.Addon>
        <Tag.Text>Tag</Tag.Text>
      </Tag>
    </>
  );
}
