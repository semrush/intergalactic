import React from 'react';
import Tag from '@semcore/tag';
import EditXS from '@semcore/icon/Edit/m';

export default function () {
  return (
    <>
      <Tag theme="#8649E1" color="#EDD9FF">
        <Tag.Addon tag={EditXS} />
        <Tag.Text>Tag</Tag.Text>
      </Tag>
    </>
  );
}
