import React from 'react';
import InlineEdit from '@semcore/inline-edit';
import InlineInput from '@semcore/inline-input';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

import EditM from '@semcore/icon/Edit/m';
import { Flex } from '@semcore/flex-box';

const Preview = (preview) => {
  const { radio, text: textControl, onChange } = preview('InlineEdit');

  const text = textControl({
    key: 'text',
    defaultValue: 'Hello world',
    label: 'Text',
  });

  const editable = radio({
    key: 'editable',
    defaultValue: 'false',
    label: 'Editable',
    options: ['false', 'true'],
  });

  const setText = (text) => onChange('text', text);
  const setEditable = (editable) => onChange('editable', editable);
  const isEditable = editable === 'true';

  return (
    <InlineEdit
      editable={isEditable}
      onEditableChange={setEditable}
      w={100}
      onBlurBehavior={'confirm'}
    >
      <InlineEdit.View style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {text}
        <EditM onClick={() => setEditable('true')} />
      </InlineEdit.View>
      <InlineEdit.Edit>
        <InlineInput
          autoFocus
          value={text}
          onConfirm={() => setEditable('false')}
          onCancel={(prevText) => {
            setText(prevText);
            setEditable('false');
          }}
        />
      </InlineEdit.Edit>
    </InlineEdit>
  );
};

export default PlaygroundGeneration(Preview);
