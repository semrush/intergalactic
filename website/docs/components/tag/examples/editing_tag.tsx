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
      <InlineEdit w={150} editable={editable} onEditableChange={setEditable}>
        <InlineEdit.View>
          <Tag interactive size='l'>
            <Tag.Text>{value}</Tag.Text>
          </Tag>
        </InlineEdit.View>
        <InlineEdit.Edit>
          <InlineInput onConfirm={handleValue} onCancel={resetEditable}>
            <InlineInput.Value defaultValue={value} />
          </InlineInput>
        </InlineEdit.Edit>
      </InlineEdit>
    </>
  );
};

export default Demo;
