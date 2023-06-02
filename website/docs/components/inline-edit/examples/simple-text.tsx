import React from 'react';
import InlineInput from '@semcore/ui/inline-input';
import InlineEdit from '@semcore/ui/inline-edit';
import EditM from '@semcore/ui/icon/Edit/m';
import { Text } from '@semcore/ui/typography';

const Example = () => {
  const [text, setText] = React.useState('Martin Eden');
  const [confirmedText, setConfirmedText] = React.useState(text);
  const [editable, setEditable] = React.useState(false);

  return (
    <div>
      <Text tag="label" htmlFor="author-name" mr={2}>
        Author:
      </Text>
      <InlineEdit editable={editable} onEditableChange={setEditable} onBlurBehavior={'confirm'}>
        <InlineEdit.View style={{ display: 'flex', gap: 10, alignItems: 'center' }} pr={2}>
          {text} <EditM />
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
          >
            <InlineInput.Value autoFocus value={text} onChange={setText} id="author-name" />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </InlineEdit.Edit>
      </InlineEdit>
    </div>
  );
};

export default Example;
