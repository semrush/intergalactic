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
To learn more about tags, refer to [Tag](/components/tag/tag).
:::

In most cases, we recommend using tags with the `primary` theme and the `gray-500` color for entering homogeneous information in these inputs. It isn’t recommended to use tags with the `secondary` theme inside inputs as the border adds unnecessary visual noise.

![](static/default-tag.png)

When validating the input, highlight tags with invalid values with the `red-500` color. **Remember to provide clear error messages in tooltips.**

![](static/validation.png)

You can use colored tags to represent different categories, if needed.

![](static/color-tag.png)

## Interaction

In an input field with tags, you can enter data either by selecting preset options from the combobox or by entering your own data (which will be wrapped in tags if they have punctuation separators). You can also combine both options.

Table: Interaction with InputTags

| Data from the combobox    | User-entered data   | Data from the combobox and user-entered data    |
| ------------------------- | ------------------- | ------------------------ |
| ![](static/input-tag1.png) | ![](static/input-tag2.png) | ![](static/input-tag3.png) |

When you focus on the input field, if there are preset options available (such as a database of minion addresses or previously entered keywords), a [Combobox](/components/auto-suggest/auto-suggest) will open. Pressing `Enter` or clicking on a list item will insert its value into the input field and wrap it in a tag.

If the input field doesn't have preset options and allows users to enter any data, the entered data will be wrapped in a tag using punctuation separators, as described below.

## Turning text into tags

Text entered by the user is automatically converted into a tag inside InputTags in the following cases:

- the input loses focus (for example, by pressing `Tab` or clicking on another element)
- user presses `Enter`, `Tab` or `Shift + Tab`
- a punctuation separator is entered (`,`, `;`, `|`)
- user enters `Space` twice

::: tip
Leading and trailing spaces are trimmed when creating tags.
:::

## Pasting text

After pasting copied data, the text is split into tags based on punctuation separators like commas, semicolons and vertical bars ("|").

## Editing and deleting tags

There are several ways to edit a tag:

- press `Enter` or `Space` on a focused tag
- press `Backspace` in the input without any text to edit the last tag

Deleting a tag can be done with the tag's **Delete** button, or by clearing all text while editing the tag.

## Long text in tag

::: tip
Note that this behavior isn’t recommended due to poor accessibility. Web page content should be responsive and adaptable to small viewport widths, increased text size, and changes in text spacing.
:::

You can set a maximum width for tags, although it isn’t necessary in all cases. If the tag text exceeds the specified width, truncate it with an [Ellipsis](../ellipsis/ellipsis.md). Hovering over the tag will display a `Hint` with the full text of the tag.

![](static/ellipsis.png)

