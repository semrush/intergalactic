import EditM from '@semcore/icon/Edit/m';
import InlineEdit from '@semcore/ui/inline-edit';
import InlineInput from '@semcore/ui/inline-input';
import React from 'react';

export function EditableName() {
  const [text, setText] = React.useState('Domain.com');
  const [confirmedText, setConfirmedText] = React.useState(text);
  const [editable, setEditable] = React.useState(false);

  return (
    <InlineEdit editable={editable} onEditableChange={setEditable} wMin='300px'>
      <InlineEdit.View style={{ display: 'flex', gap: 8, alignItems: 'center' }} pr={2}>
        {text}
        {' '}
        <EditM color='icon-secondary-neutral' />
      </InlineEdit.View>
      <InlineEdit.Edit>
        <InlineInput
          onConfirm={() => {
            setEditable(false);
            setConfirmedText(text);
          }}
          onCancel={() => {
            setText(confirmedText);
            setEditable(false);
          }}
          onBlurBehavior='confirm'
        >
          <InlineInput.Value
            autoFocus
            value={text}
            onChange={setText}
            aria-labelledby='author-label'
          />
          <InlineInput.ConfirmControl />
          <InlineInput.CancelControl />
        </InlineInput>
      </InlineEdit.Edit>
    </InlineEdit>
  );
}
