import React from 'react';
import Tag from '@semcore/ui/tag';
import SmileHappyM from '@semcore/ui/icon/SmileHappy/m';

const Demo = () => {
  return (
    <>
      <Tag addonLeft={SmileHappyM} mb={2}>
        Tag
      </Tag>
      <br />
      <Tag>
        <Tag.Addon>
          <SmileHappyM />
        </Tag.Addon>
        <Tag.Text>Tag</Tag.Text>
      </Tag>
    </>
  );
}