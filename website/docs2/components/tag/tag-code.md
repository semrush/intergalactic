---
title: Example
fileSource: tag
tabs: Design('tag'), A11y('tag-a11y'), API('tag-api'), Example('tag-code'), Changelog('tag-changelog')
---

## Tag addon

You can add addons to the Tag component in two ways: by passing the desired tag to the `addonLeft` or `addonRight` property, or by directly rendering `Tag.Addon` or `Tag.Text` within the component.

::: sandbox

<script lang="tsx">
import React from 'react';
import Tag from '@semcore/ui/tag';
import SmileHappyM from '@semcore/ui/icon/SmileHappy/m';

const Demo = () => {
  return (
    <>
      <Tag addonLeft={SmileHappyM} mb={2}>
        Tag
      </Tag>
      <br />
      <Tag>
        <Tag.Addon>
          <SmileHappyM />
        </Tag.Addon>
        <Tag.Text>Tag</Tag.Text>
      </Tag>
    </>
  );
}
</script>

:::

## Custom tag color

You can set custom tag colors.

::: sandbox

<script lang="tsx">
import React from 'react';
import Tag from '@semcore/ui/tag';
import SmileSadM from '@semcore/ui/icon/SmileSad/m';

const Demo = () => {
  return (
    <>
      <Tag theme='primary' color='red-500'>
        <Tag.Addon>
          <SmileSadM />
        </Tag.Addon>
        <Tag.Text>Tag</Tag.Text>
      </Tag>
    </>
  );
}
</script>

:::

## Adding tag

::: sandbox

<script lang="tsx">
import React from 'react';
import Tag from '@semcore/ui/tag';
import MathPlusM from '@semcore/ui/icon/MathPlus/m';

const Demo = () => {
  return (
    <Tag interactive theme='additional'>
      <Tag.Addon>
        <MathPlusM />
      </Tag.Addon>
      <Tag.Text>Add tag</Tag.Text>
    </Tag>
  );
};


</script>

:::

## Editing tag

Use [InlineEdit](/components/inline-edit/) for this case.

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


</script>

:::

## Removing tag

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Tag from '@semcore/ui/tag';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [tags, setTags] = useState(['vk', 'fk', 'twitter', 'instagram']);

  const handleEditTag = (e) => {
    const { dataset } = e.currentTarget.parentElement;
    const allTags = [...tags];
    setTags(allTags.filter((tag, ind) => ind !== Number(dataset.id)));

    return false;
  };

  return (
    <Box>
      {tags.map((tag, idx) => (
        <Tag theme='primary' interactive data-id={idx} key={idx} mr={1}>
          <Tag.Text>{tag}</Tag.Text>
          <Tag.Close onClick={handleEditTag} />
        </Tag>
      ))}
    </Box>
  );
};


</script>

:::
