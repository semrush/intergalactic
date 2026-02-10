import EditM from '@semcore/icon/Edit/m';
import InlineEdit from '@semcore/ui/inline-edit';
import InlineInput from '@semcore/ui/inline-input';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Example = () => {
  const [text, setText] = React.useState('Martin Eden');
  const [confirmedText, setConfirmedText] = React.useState(text);
  const [editable, setEditable] = React.useState(false);

  return (
    <div>
      <Text mr={2} id='author-label'>
        Author:
      </Text>
      <InlineEdit editable={editable} onEditableChange={setEditable}>
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
    </div>
  );
};

const Demo = Example;

export default Demo;
