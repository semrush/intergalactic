import React from 'react';
import InlineInput from '@semcore/inline-input';
import InlineEdit from '@semcore/inline-edit';
import EditM from '@semcore/icon/Edit/m';

const Example = () => {
  const [title, setTitle] = React.useState('Lorem ipsum');
  const [editingTitle, setEditingTitle] = React.useState(false);
  const [savingTitle, setSavingTitle] = React.useState(false);
  const stopEditing = () => setEditingTitle(false);
  const handleTitle = (title) => {
    setSavingTitle(true);
    /** Here we doing some network activities */
    setTimeout(() => {
      setTitle(title);
      setSavingTitle(false);
      setEditingTitle(false);
    }, 3000);
  };

  return (
    <>
      <InlineEdit tag="h1" editable={editingTitle} onEditableChange={setEditingTitle}>
        <InlineEdit.View>
          {title} <EditM />
        </InlineEdit.View>
        <InlineEdit.Edit>
          <InlineInput
            w={200}
            autoFocus
            defaultValue={title}
            onConfirm={handleTitle}
            onCancel={stopEditing}
            loading={savingTitle}
          />
        </InlineEdit.Edit>
      </InlineEdit>
      dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
      sunt in culpa qui officia deserunt mollit anim id est laborum.
    </>
  );
};

export default Example;
