import React from 'react';
import InlineEdit from '@semcore/ui/inline-edit';
import InlineInput from '@semcore/ui/inline-input';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

import EditM from '@semcore/ui/icon/Edit/m';
import { Flex } from '@semcore/ui/flex-box';

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
      <InlineEdit.View style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#000' }}>
        {text}
        <EditM onClick={() => setEditable('true')} />
      </InlineEdit.View>
      <InlineEdit.Edit>
        <InlineInput
          onConfirm={() => setEditable('false')}
          onCancel={(prevText) => {
            setText(prevText);
            setEditable('false');
          }}
        >
          <InlineInput.Value autoFocus value={text} />
        </InlineInput>
      </InlineEdit.Edit>
    </InlineEdit>
  );
};

export default PlaygroundGeneration(Preview);
