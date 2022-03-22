import React from 'react';
import InlineInput from '@semcore/inline-input';
import InlineEdit from '@semcore/inline-edit';
import Tag from '@semcore/tag';

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
            <Tag.Close onClick={(e) => e.stopPropagation()} />
          </Tag>
        </InlineEdit.View>
        <InlineEdit.Edit>
          <InlineInput defaultValue={value} onConfirm={handleValue} onCancel={resetEditable} />
        </InlineEdit.Edit>
      </InlineEdit>
    </>
  );
};

export default Demo;
