---
title: InputTags
fileSource: input-tags
tabs: Design('input-tags'), A11y('input-tags-a11y'), API('input-tags-api'), Example('input-tags-code'), Changelog('input-tags-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import InputTags from 'intergalactic/input-tags';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

import CheckM from 'intergalactic/icon/Check/m';

const SIZES = ['m', 'l'];
const STATES = ['normal', 'invalid', 'valid'];

const Preview = (preview) => {
  const { bool, select, radio } = preview('InputTags');
  const { bool: boolTag, text: textTag } = preview('InputTags.Tag');

  const size = radio({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: SIZES,
  });

  const state = select({
    key: 'state',
    defaultValue: 'normal',
    label: 'State',
    options: STATES.map((value) => ({
      name: value,
      value,
    })),
  });

  const readOnly = bool({
    key: 'readOnly',
    defaultValue: false,
    label: 'Read-only',
  });

  const tagText = textTag({
    key: 'tag',
    defaultValue: 'Tag 1',
    label: 'Text',
  });

  const circleTag = boolTag({
    key: 'circle',
    defaultValue: false,
    label: 'Circle',
  });

  const closeTag = boolTag({
    key: 'closable',
    defaultValue: false,
    label: 'Close',
  });

  const editableTag = boolTag({
    key: 'editable',
    defaultValue: false,
    label: 'Editable',
  });

  const beforeIconMap = {
    l: <CheckM />,
    m: <CheckM />,
  };

  const before = boolTag({
    key: 'before',
    defaultValue: false,
    label: 'Addon',
  });

  return (
    <InputTags size={size} state={state}>
      {tagText.length ? (
        <InputTags.Tag tabIndex={0} editable={editableTag}>
          {circleTag && <InputTags.Tag.Circle style={{ background: '#2595e4' }} />}
          {before && <InputTags.Tag.Addon>{beforeIconMap[size]}</InputTags.Tag.Addon>}
          <InputTags.Tag.Text>{tagText}</InputTags.Tag.Text>
          {closeTag && <InputTags.Tag.Close />}
        </InputTags.Tag>
      ) : null}
      <InputTags.Value readOnly={readOnly} />
    </InputTags>
  );
};

const App = PlaygroundGeneration(Preview);
</script>

:::

## Description

**InputTags** is an input field that wraps entered information into tags. It is commonly used alongside the [Combobox](/components/auto-suggest/auto-suggest).

This input field is useful for entering a large amount of similar information in a single field, such as keywords or employee emails.

## Appearance

When there are too many tags to fit within the input, the input field's height increases by one line of text.

Table: InputTags sizes

| Size     | Appearance      |                 | Margins        |
| -------- | --------------- | --------------- | -------------- |
| M input is used with the M tag | ![](static/m-size.png) | ![](static/m-size-2.png) | ![](static/m-paddings-2.png) |
| L input is used with the L tag | ![](static/l-size.png) | ![](static/l-size-2.png) | ![](static/l-paddings-2.png) |

## Tag colors

::: tip
To learn more about tags, refer to the [Tag](/components/tag/tag).
:::

In most cases, we recommend using tags with the `primary` type and the `muted` theme for entering homogeneous information in these inputs. It isn’t recommended to use the [Secondary tag](/components/tag/tag) inside the input as it adds unnecessary visual noise with its border.

![](static/default-tag.png)

When validating the input, inappropriate data can be highlighted in red. **Remember to provide clear error messages in tooltips.**

![](static/validation.png)

In some cases, you can use color tags to represent different categories, if applicable.

![](static/color-tag.png)

## Interaction

In an input field with tags, you can enter data either by selecting preset options from the combobox or by entering your own data (which will be wrapped in tags if they have punctuation separators). You can also combine both options.

Table: Interaction with InputTags

| Data from the combobox    | User-entered data   | Data from the combobox and user-entered data    |
| ------------------------- | ------------------- | ------------------------ |
| ![](static/input-tag1.png) | ![](static/input-tag2.png) | ![](static/input-tag3.png) |

When you focus on the input field, if there are preset options available (such as a database of minion addresses or previously entered keywords), a [Combobox](/components/auto-suggest/auto-suggest) will open. Clicking on a line in the combobox will insert the corresponding data into the input field and wrap it in a tag.

If the input field doesn't have preset options and allows users to enter any data, the entered data will be wrapped in a tag using punctuation separators, as described below.

## Wrapping text in tag

The text entered by the user is automatically converted into a tag inside InputTags in the following cases:

- When the input field loses focus (for example, by tabbing out).
- When the user presses the `Enter` key.
- When entering a punctuation separator ("," , ";" , "|").
- When there is a double space.
- When the user presses the Tab key to insert data.

::: tip
Leading and trailing spaces are trimmed when creating tags.
:::

## Text insertion

After inserting data, the text is split into tags based on punctuation separators like commas, semicolons, vertical bars ("|"), or pressing the `Tab` key.

## Deleting and editing a tag

If the text cursor is positioned in front of a tag, pressing the `Delete` key will convert the tag back into plain text, allowing for editing and deletion.

## Handling long text within a tag

::: tip
Note that this behavior isn’t recommended for full accessibility. Web page content should be responsive and adaptable to small viewport widths, text enlargement, and changes in text spacing.
:::

You can set a maximum width for tags, although it isn’t necessary in all cases. If the tag text exceeds the specified width, truncate it with an ellipsis. Hovering over the tag will display a tooltip with the full text of the tag.

![](static/ellipsis.png)

