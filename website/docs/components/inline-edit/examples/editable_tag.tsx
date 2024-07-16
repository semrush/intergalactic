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
          <Tag.Close onClick={(e) => e.stopPropagation()} />
        </InlineEdit.View>
        <InlineEdit.Edit>
          <InlineInput onConfirm={handleValue} onCancel={resetEditable}>
            <InlineInput.Value defaultValue={value} autoFocus aria-label='editable tag' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </InlineEdit.Edit>
      </InlineEdit>
    </>
  );
};

export default Demo;
