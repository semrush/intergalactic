import React from 'react';
import InputTags from '@semcore/input-tags';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

import CheckM from '@semcore/icon/Check/m';
import CheckL from '@semcore/icon/Check/l';

const SIZES = ['m', 'l', 'xl'];
const STATES = ['normal', 'invalid', 'valid'];

const Preview = (preview) => {
  const { bool, select, radio } = preview('InputTags');
  const { bool: boolTag, text: textTag } = preview('InputTags.Tag');

  const size = radio({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: SIZES,
  });

  const state = select({
    key: 'state',
    defaultValue: 'normal',
    label: 'State',
    options: STATES.map((value) => ({
      name: value,
      value,
    })),
  });

  const disabled = bool({
    key: 'disabled',
    defaultValue: false,
    label: 'Disabled',
  });

  const readOnly = bool({
    key: 'readOnly',
    defaultValue: false,
    label: 'Read-only',
  });

  const tagText = textTag({
    key: 'tag',
    defaultValue: 'Tag 1',
    label: 'Text',
  });

  const circleTag = boolTag({
    key: 'circle',
    defaultValue: false,
    label: 'Circle',
  });

  const closeTag = boolTag({
    key: 'closable',
    defaultValue: false,
    label: 'Close',
  });

  const editableTag = boolTag({
    key: 'editable',
    defaultValue: false,
    label: 'Editable',
  });

  const beforeIconMap = {
    xl: <CheckL />,
    l: <CheckM />,
    m: <CheckM />,
  };

  const before = boolTag({
    key: 'before',
    defaultValue: false,
    label: 'Addon',
  });

  return (
    <InputTags size={size} state={state}>
      {tagText.length ? (
        <InputTags.Tag editable={editableTag}>
          {circleTag && <InputTags.Tag.Circle style={{ background: '#2595e4' }} />}
          {before && <InputTags.Tag.Addon>{beforeIconMap[size]}</InputTags.Tag.Addon>}
          <InputTags.Tag.Text>{tagText}</InputTags.Tag.Text>
          {closeTag && <InputTags.Tag.Close />}
        </InputTags.Tag>
      ) : null}
      <InputTags.Value disabled={disabled} readOnly={readOnly} />
    </InputTags>
  );
};

export default PlaygroundGeneration(Preview);
