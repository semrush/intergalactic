import React from 'react';
import InputTags from '@semcore/input-tags';
import Check from '@semcore/icon/Check/m';

const Demo = () => {
  return (
    <InputTags size='m' state='normal'>
      <InputTags.Tag editable={false} tabIndex={0}>
        <InputTags.Tag.Addon>
          <Check />
        </InputTags.Tag.Addon>
        <InputTags.Tag.Text>Tag 1</InputTags.Tag.Text>
      </InputTags.Tag>
      <InputTags.Value readOnly={false} />
    </InputTags>
  );
};

export default Demo;
