import React from 'react';
import InlineInput from '@semcore/inline-input';
import InlineEdit from '@semcore/inline-edit';
import EditM from '@semcore/icon/Edit/m';
import { Text } from '@semcore/typography';

const Example = () => {
  const [title, setTitle] = React.useState('The Adventures of Intergalactic Whale');
  const [editingTitle, setEditingTitle] = React.useState(false);
  const [savingTitle, setSavingTitle] = React.useState(false);
  const stopEditing = () => setEditingTitle(false);
  const handleTitle = (title) => {
    setSavingTitle(true);
    /** Here we are doing some network activities */
    setTimeout(() => {
      setTitle(title);
      setSavingTitle(false);
      setEditingTitle(false);
    }, 3000);
  };

  return (
    <>
      <Text tag='h3' mb={2}>
        <InlineEdit editable={editingTitle} onEditableChange={setEditingTitle}>
          <InlineEdit.View pr={5}>
            {title} <EditM color='icon-secondary-neutral' />
          </InlineEdit.View>
          <InlineEdit.Edit>
            <InlineInput onConfirm={handleTitle} onCancel={stopEditing} loading={savingTitle}>
              <InlineInput.Value autoFocus defaultValue={title} aria-label='Article name' />
              <InlineInput.ConfirmControl />
              <InlineInput.CancelControl />
            </InlineInput>
          </InlineEdit.Edit>
        </InlineEdit>
      </Text>
      Once upon a time in a distant galaxy far, far away, there existed a legendary creature known
      as the Intergalactic Whale. This magnificent space-faring mammal was no ordinary whale. It had
      the power to swim through the cosmic ocean, jumping from one star system to another with grace
      and finesse.
    </>
  );
};

const Demo = Example;

export default Demo;
