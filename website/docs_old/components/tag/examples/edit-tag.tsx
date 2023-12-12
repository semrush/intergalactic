import React from 'react';
import InlineInput from '@semcore/ui/inline-input';
import InlineEdit from '@semcore/ui/inline-edit';
import Tag from '@semcore/ui/tag';

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
          <Tag interactive>
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
