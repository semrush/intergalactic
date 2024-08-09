import React from 'react';
import InlineInput from 'intergalactic/inline-input';
import InlineEdit from 'intergalactic/inline-edit';
import EditM from 'intergalactic/icon/Edit/m';
import { Text } from 'intergalactic/typography';

const Example = () => {
  const [text, setText] = React.useState('Martin Eden');
  const [confirmedText, setConfirmedText] = React.useState(text);
  const [editable, setEditable] = React.useState(false);

  return (
    <div>
      <Text mr={2}>Author:</Text>
      <InlineEdit editable={editable} onEditableChange={setEditable}>
        <InlineEdit.View
          style={{ display: 'flex', gap: 8, alignItems: 'center' }}
          pr={2}
        >
          {text} <EditM color='icon-secondary-neutral' />
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
            onBlurBehavior={'confirm'}
          >
            <InlineInput.Value autoFocus value={text} onChange={setText} aria-label='Author name' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </InlineEdit.Edit>
      </InlineEdit>
    </div>
  );
};

const Demo = Example;

export default Demo;
