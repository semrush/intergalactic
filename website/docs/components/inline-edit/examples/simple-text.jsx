import React from 'react';
import InlineInput from '@semcore/ui/inline-input';
import InlineEdit from '@semcore/ui/inline-edit';
import EditM from '@semcore/ui/icon/Edit/m';

const Example = () => {
  const [text, setText] = React.useState('Martin Eden');
  const [editable, setEditable] = React.useState(false);

  return (
    <div>
      <InlineEdit editable={editable} onEditableChange={setEditable} onBlurBehavior={'confirm'}>
        <InlineEdit.View style={{ display: 'flex', gap: 10, alignItems: 'center' }} pr={2}>
          {text} <EditM />
        </InlineEdit.View>
        <InlineEdit.Edit>
          <InlineInput
            onConfirm={() => setEditable(false)}
            onCancel={(prevText) => {
              setText(prevText);
              setEditable(false);
            }}
          >
            <InlineInput.Value autoFocus value={text} onChange={setText} />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </InlineEdit.Edit>
      </InlineEdit>
    </div>
  );
};

export default Example;
