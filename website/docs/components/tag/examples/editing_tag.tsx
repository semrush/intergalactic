import React from 'react';
import InlineInput from 'intergalactic/inline-input';
import InlineEdit from 'intergalactic/inline-edit';
import Tag from 'intergalactic/tag';

const Demo = () => {
  const [value, setValue] = React.useState('Default tag');
  const [editable, setEditable] = React.useState(false);

  const handleValue = (value) => {
    setEditable(false);
    setValue(value);
  };
  const resetEditable = () => setEditable(false);

  return (
    <>
      <InlineEdit editable={editable} onEditableChange={setEditable}>
        <InlineEdit.View pr={2} tag={Tag} interactive size='l'>
          <Tag.Text>{value}</Tag.Text>
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
