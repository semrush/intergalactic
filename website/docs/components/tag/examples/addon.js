import React from 'react';
import Tag from '@semcore/tag';
import EditXS from '@semcore/icon/lib/Edit/m';

export default function() {
  return (
    <>
      <Tag addonLeft={EditXS} mb={2}>
        Tag
      </Tag>
      <br />
      <Tag>
        <Tag.Addon tag={EditXS} />
        <Tag.Text>Tag</Tag.Text>
      </Tag>
    </>
  );
}
