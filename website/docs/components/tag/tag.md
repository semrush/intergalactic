---
title: Tag
fileSource: tag
tabs: Design('tag'), A11y('tag-a11y'), API('tag-api'), Example('tag-code'), Changelog('tag-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import { TagContainer } from '@semcore/ui/tag';
import EditM from '@semcore/ui/icon/Edit/m';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const App = PlaygroundGeneration((createGroupWidgets) => {
  const { bool, radio, text, select } = createGroupWidgets('Tag');

  const size = radio({
    key: 'size',
    defaultValue: 'l',
    label: 'Size',
    options: ['m', 'l', 'xl'],
  });

  const COLORS = [
    'gray-500',
    'blue-500',
    'green-500',
    'salad-500',
    'orange-500',
    'yellow-500',
    'red-500',
    'pink-500',
    'violet-500',
    'white',
  ];

  const color = select({
    key: 'color',
    defaultValue: 'gray-500',
    label: 'Color',
    options: COLORS.map((value) => ({
      name: value,
      value,
    })),
  });

  const theme = select({
    key: 'theme',
    defaultValue: 'primary',
    label: 'Theme',
    options: ['primary', 'secondary', 'additional'].map((value) => ({
      name: value,
      value,
    })),
  });

  const beforeIcon = bool({
    key: 'before Icon',
    defaultValue: false,
    label: 'Addon',
  });

  const imageIcon = bool({
    key: 'image Icon',
    defaultValue: false,
    label: 'Circle Addon',
  });

  const closeIcon = bool({
    key: 'close Icon',
    defaultValue: false,
    label: 'Close Button',
  });

  const interactive = bool({
    key: 'interactive',
    defaultValue: false,
    label: 'Interactive',
  });

  const active = bool({
    key: 'active',
    defaultValue: false,
    label: 'Active',
  });

  const disabled = bool({
    key: 'disabled',
    defaultValue: false,
    label: 'Disabled',
  });

  return (
    <TagContainer
      interactive={interactive}
      theme={theme}
      color={color}
      size={size}
      disabled={disabled}
    >
      <TagContainer.Tag active={active}>
        {imageIcon && (
          <TagContainer.Tag.Circle>
            <img src='https://picsum.photos/id/1025/28/28' />
          </TagContainer.Tag.Circle>
        )}

        {beforeIcon && (
          <TagContainer.Tag.Addon>
            <EditM />
          </TagContainer.Tag.Addon>
        )}

        <TagContainer.Tag.Text>Tag text</TagContainer.Tag.Text>
      </TagContainer.Tag>
      {closeIcon && <TagContainer.Close />}
    </TagContainer>
  );
});
</script>

:::

## Description

**Tag** is a component used to thematically group information in the interface, commonly found in tables, filters, cards, and other components.

Tags are typically set either by the system or by the user.

## Component composition

![](static/tag-composition.png)

Component consists of the following:

- `Tag.Text`
- `Tag.Addon` — an icon or some other small element before the text
- `Tag.Close` — a button that removes the tag
- `Tag.Circle` — a round addon, usually an image.

## Appearance

### Sizes

Table: Tag sizes

| Size (height in px) | Appearance example                             |
| ------------------- | ---------------------------------------------- |
| M (20px)            | ![](static/tag-M.png) ![](static/tag2-M.png)   |
| L (28px)            | ![](static/tag-L.png) ![](static/tag2-L.png)   |
| XL (40px)           | ![](static/tag-XL.png) ![](static/tag2-XL.png) |

### Themes

The component offers several themes for tags.

Table: Tag themes

| Tag theme                         | Appearance example                | Description                                                                                                               |
| --------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `primary`                         | ![](static/primary.png)           | The `primary` theme of tag suitable for use on a light background. The default color is `--gray-500`.                     |
| `primary` with `color:"white"`    | ![](static/primary-invert.png)    | An inversion of the `primary` tag is used on the dark or colored backgrounds.                                             |
| `secondary`                       | ![](static/secondary.png)         | The `secondary` tag theme, useful on a light background when contrast between the primary and secondary tags is required. |
| `secondary` with `color:"white"`  | ![](static/secondary-invert.png)  | An inversion of the `secondary` tag suitable for dark or colored backgrounds.                                             |
| `additional`                      | ![](static/additional.png)        | Ideal for special tags that are added to other tags.                                                                      |
| `additional` with `color:"white"` | ![](static/additional-invert.png) | An inversion of the `additional` theme used for special tags that are added to other tags.                                |

#### Tag colors

To change tag color, use colors with 500 tone from [our palette tokens](/style/design-tokens/design-tokens#base-tokens-palette), since they are selected with the 60Lc contrast (according to APCA) between the text and background. Refer to [Custom color example](/components/tag/tag-code#custom-color).

In the case where you use other colors to color the tag, make sure to [check the contrast of the tag text against the background](/core-principles/a11y/a11y-design#color-and-contrast).

## Additional theme

Use Tag with `additional` theme and `interactive` property, to create such an element.

| State  | Appearance example     | Styles                                                                                                                      |
| ------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Normal | ![](static/normal.png) | `color: var(--text-secondary)`, `background-color: var(--tag-secondary-normal)`, `border: 1px dotted var(--border-primary)` |
| Hover  | ![](static/hover.png)  | `background-color: var(--tag-secondary-hover-active)`                                                                       |
| Active | ![](static/active.png) | `background-color: var(--tag-secondary-hover-active)`                                                                       |

This tag opens [InlineInput](/components/inline-input/inline-input).

![](static/add-input-L.png)

Upon clicking the `Check` icon or pressing `Enter`, the input value is saved and transformed into a tag.

![](static/add-loading-L.png)

If space for tag placement is limited, the text should be truncated with an `ellipsis`. Hovering over a tag with an `ellipsis` should display a tooltip with the full tag label.

## Grouped tags

Table: Grouped tags

| Size (height in px) | Margins                        |
| ------------------- | ------------------------------ |
| M (20px)            | ![](static/tag-margins-M.png)  |
| L (28px)            | ![](static/tag-margins-L.png)  |
| XL (40px)           | ![](static/tag-margins-XL.png) |

## Editing tag

For editable tags, use the [InlineInput](/components/inline-input/inline-input) component. Refer to the [live example](/components/tag/tag-code#editing-tag).

## Long text

You can set a maximum width for the tag. If the text of a tag exceeds this limit, it will be collapsed with an `ellipsis`, and hovering over the tag will show a tooltip with the full tag label.

![](static/ellipsis.png)

<!-- @## Minimizing number of tags

In case you have a huge number of tags and don’t need to show them all at once, minimize them to a tag with three dots. When you click on it, all hidden tags will be opened.

::: tip
Unfortunately, this solution can be found in several places so far.
:::

![more tags example](static/more-tags.png) -->

## Usage in UX/UI

Use tags for visual marking and grouping of information and objects.

### Usage in card example

![](static/tag-card.png)

### Usage in table example

![](static/tag-table-pic.png)
