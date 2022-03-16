import React from 'react';

import EditM from '@semcore/icon/Edit/m';

const Example = () => {
  const [text, setText] = React.useState('sex');
  const [editable, setEditable] = React.useState(false);

  return (
    <div>
      Before
      <InlineEdit
        editable={editable}
        onEditableChange={setEditable}
        w={100}
        onBlurBehavior={'confirm'}
      >
        <InlineEdit.View style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {text} <EditM />
        </InlineEdit.View>
        <InlineEdit.Edit>
          <InlineInput
            autoFocus
            value={text}
            onChange={setText}
            onConfirm={() => setEditable(false)}
            onCancel={(prevText) => {
              setText(prevText);
              setEditable(false);
            }}
          />
        </InlineEdit.Edit>
      </InlineEdit>
    </div>
  );
};

export default Example;
