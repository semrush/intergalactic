import React from 'react';
import Tag from '@semcore/tag';
import EditXS from '@semcore/icon/Edit/m';

export default function () {
  return (
    <>
      <Tag theme="primary" color="red-500">
        <Tag.Addon>
          <EditXS />
        </Tag.Addon>
        <Tag.Text>Tag</Tag.Text>
      </Tag>
    </>
  );
}
