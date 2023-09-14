---
title: InlineInput
tabs: Design('inline-input'), A11y('inline-input-a11y'), API('inline-input-api'), Example('inline-input-example'), Changelog('inline-input-changelog')
---

## Basic usage

::: sandbox

<script lang="tsx">
import React from 'react';
import InlineInput from '@semcore/ui/inline-input';

const Example = () => {
  return (
    <InlineInput
      onBlurBehavior='cancel'
      onCancel={console.log}
      onChange={console.log}
      onConfirm={console.log}
    >
      <InlineInput.Addon htmlFor='basic-example' tag='label'>
        user name:
      </InlineInput.Addon>
      <InlineInput.Value id='basic-example' defaultValue='Hello world' />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
  );
};

const Demo = Example;
</script>

:::

## Inheriting text size

Component vertical size is based on inherited text size. Horizontal size should be explicitly set, otherwise component takes the whole width.

::: sandbox

<script lang="tsx">
import React from 'react';
import InlineInput from '@semcore/ui/inline-input';
import InlineEdit from '@semcore/ui/inline-edit';
import EditM from '@semcore/ui/icon/Edit/m';
import { Text } from '@semcore/ui/typography';

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
      <Text tag='h1'>
        <InlineEdit editable={editingTitle} onEditableChange={setEditingTitle}>
          <InlineEdit.View pr={5}>
            {title} <EditM />
          </InlineEdit.View>
          <InlineEdit.Edit>
            <InlineInput onConfirm={handleTitle} onCancel={stopEditing} loading={savingTitle}>
              <InlineInput.Value autoFocus defaultValue={title} />
              <InlineInput.ConfirmControl />
              <InlineInput.CancelControl />
            </InlineInput>
          </InlineEdit.Edit>
        </InlineEdit>
      </Text>
      dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
      sunt in culpa qui officia deserunt mollit anim id est laborum.
    </>
  );
};

const Demo = Example;
</script>

:::

## Different states

::: sandbox

<script lang="tsx">
import React from 'react';
import InlineInput from '@semcore/ui/inline-input';

const Example = () => {
  return (
    <div>
      <InlineInput state='valid'>
        <InlineInput.Value />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>
      <br />
      <br />
      <InlineInput state='invalid'>
        <InlineInput.Value />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>
      <br />
      <br />
      <InlineInput disabled>
        <InlineInput.Value />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>
      <br />
      <br />
      <InlineInput loading>
        <InlineInput.Value />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>
    </div>
  );
};

const Demo = Example;
</script>

:::
