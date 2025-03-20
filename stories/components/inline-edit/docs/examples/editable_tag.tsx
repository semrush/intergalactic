import React from 'react';
import InlineInput from '@semcore/inline-input';
import InlineEdit from '@semcore/inline-edit';
import {TagContainer} from '@semcore/tag';

const Demo = () => {
  const [value, setValue] = React.useState('Default tag');
  const [editable, setEditable] = React.useState(false);
  const tagRef = React.useRef<HTMLDivElement | null>(null);

  const handleValue = (value: string) => {
    setEditable(false);
    setValue(value);
  };
  const resetEditable = () => setEditable(false);

  const handleTagContainerFocus = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      tagRef.current?.focus();
    }
  };

  return (
    <>
      <InlineEdit editable={editable} onEditableChange={setEditable}>
        <InlineEdit.View pr={2} tag={TagContainer} interactive size='l' role={''} tabIndex={-1} onFocus={handleTagContainerFocus}>
          <TagContainer.Tag ref={tagRef}>{value}</TagContainer.Tag>
          <TagContainer.Close onClick={(e: React.SyntheticEvent) => e.stopPropagation()} />
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
