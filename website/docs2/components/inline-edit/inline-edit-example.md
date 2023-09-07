---
title: Example
tabs: Design('inline-edit'), A11y('inline-edit-a11y'), API('inline-edit-api'), Example('inline-edit-example'), Changelog('inline-edit-changelog')
---

## Simple use

In most simplest situation `<InlineEdit />` could be used to make some primitive elements editable.

::: sandbox

<script lang="tsx">
import React from 'react';
import InlineInput from '@semcore/ui/inline-input';
import InlineEdit from '@semcore/ui/inline-edit';
import EditM from '@semcore/ui/icon/Edit/m';
import { Text } from '@semcore/ui/typography';

const Example = () => {
  const [text, setText] = React.useState('Martin Eden');
  const [confirmedText, setConfirmedText] = React.useState(text);
  const [editable, setEditable] = React.useState(false);

  return (
    <div>
      <Text tag='label' htmlFor='author-name' mr={2}>
        Author:
      </Text>
      <InlineEdit editable={editable} onEditableChange={setEditable}>
        <InlineEdit.View style={{ display: 'flex', gap: 10, alignItems: 'center' }} pr={2}>
          {text} <EditM />
        </InlineEdit.View>
        <InlineEdit.Edit>
          <InlineInput
            onConfirm={() => {
              setEditable(false);
              setConfirmedText(text);
            }}
            onCancel={() => {
              setText(confirmedText);
              setEditable(false);
            }}
            onBlurBehavior={'confirm'}
          >
            <InlineInput.Value autoFocus value={text} onChange={setText} id='author-name' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </InlineEdit.Edit>
      </InlineEdit>
    </div>
  );
};

const Demo = Example;
</script>

:::

## Editable tag

As far as `<InlineEdit />` is very flexible, it could be used with almost any children elements (out of example both in `<InlineEdit.View />` and `<InlineEdit.Edit />`).

::: sandbox

<script lang="tsx">
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
      <InlineEdit editable={editable} onEditableChange={setEditable}>
        <InlineEdit.View pr={2}>
          <Tag interactive>
            <Tag.Text>{value}</Tag.Text>
            <Tag.Close onClick={(e) => e.stopPropagation()} />
          </Tag>
        </InlineEdit.View>
        <InlineEdit.Edit>
          <InlineInput onConfirm={handleValue} onCancel={resetEditable}>
            <InlineInput.Value defaultValue={value} autoFocus />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </InlineEdit.Edit>
      </InlineEdit>
    </>
  );
};


</script>

:::

## Pseudo network interaction

Component stays simple to provide you a way to handle edited values in any needed way.

::: sandbox

<script lang="tsx">
//https://github.com/semrush/intergalactic/tree/master/website/docs/components/inline-edit/examples/header.tsx
import React from 'react';
import InlineInput from '@semcore/ui/inline-input';
import InlineEdit from '@semcore/ui/inline-edit';
import EditM from '@semcore/ui/icon/Edit/m';
import { Text } from '@semcore/ui/typography';

const Example = () => {
  const [title, setTitle] = React.useState('The Adventures of the Intergalactic Whale');
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
      <Text tag='h1' mb={2}>
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
      <Text size={300} mt={3}>
        Once upon a time in a distant galaxy far, far away, there existed a legendary creature known
        as the Intergalactic Whale. This magnificent space-faring mammal was no ordinary whale. It
        had the power to swim through the cosmic ocean, jumping from one star system to another with
        grace and finesse.
      </Text>
    </>
  );
};

const Demo = Example;
</script>

:::
