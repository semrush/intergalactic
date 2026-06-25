import InlineEdit from '@semcore/ui/inline-edit';
import InlineInput from '@semcore/ui/inline-input';
import Tag from '@semcore/ui/tag';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('Default tag');
  const [editable, setEditable] = React.useState(false);

  const handleValue = (value: string) => {
    setEditable(false);
    setValue(value);
  };
  const resetEditable = () => setEditable(false);

  return (
    <>
      <InlineEdit editable={editable} onEditableChange={setEditable}>
        <InlineEdit.View tag={Tag} interactive size='l'>
          <Tag.Text ellipsis:observeChildrenMutations>{value}</Tag.Text>
        </InlineEdit.View>
        <InlineEdit.Edit>
          <InlineInput onConfirm={handleValue} onCancel={resetEditable}>
            <InlineInput.Value defaultValue={value} autoFocus aria-label='Tag name' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </InlineEdit.Edit>
      </InlineEdit>
    </>
  );
};

export default Demo;
