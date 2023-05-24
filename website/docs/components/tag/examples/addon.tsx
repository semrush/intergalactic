import React from 'react';
import Tag from '@semcore/ui/tag';
import EditXS from '@semcore/ui/icon/Edit/m';

export default function () {
  return (
    <>
      <Tag addonLeft={EditXS} mb={2}>
        Tag
      </Tag>
      <br />
      <Tag>
        <Tag.Addon>
          <EditXS />
        </Tag.Addon>
        <Tag.Text>Tag</Tag.Text>
      </Tag>
    </>
  );
}
