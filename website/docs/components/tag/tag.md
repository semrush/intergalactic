---
title: Tag
fileSource: tag
tabs: Design('tag'), A11y('tag-a11y'), API('tag-api'), Example('tag-code'), Changelog('tag-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import Tag from 'intergalactic/tag';
import EditM from 'intergalactic/icon/Edit/m';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const App = PlaygroundGeneration((createGroupWidgets) => {
  const { bool, radio, text, select } = createGroupWidgets('Tag');

  const size = radio({
    key: 'size',
    defaultValue: 'm',
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
    label: 'AddonLeft',
  });

  const imageIcon = bool({
    key: 'image Icon',
    defaultValue: false,
    label: 'Image Addon',
  });

  const closeIcon = bool({
    key: 'close Icon',
    defaultValue: false,
    label: 'Close Icon',
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
    <Tag
      interactive={interactive}
      active={active}
      theme={theme}
      color={color}
      size={size}
      disabled={disabled}
    >
      {beforeIcon && (
        <Tag.Addon>
          <EditM />
        </Tag.Addon>
      )}

      {imageIcon && (
        <Tag.Circle>
          <img src='https://picsum.photos/id/1025/28/28' alt='tag circle' />
        </Tag.Circle>
      )}
      <Tag.Text>Tag text</Tag.Text>
      {closeIcon && <Tag.Close />}
    </Tag>
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
- `Tag.Addon`: icon or any other small element before the text
- `Tag.Close`
- `Tag.Circle`: a circle image

## Sizes and paddings

Table: Tag sizes and paddings

Size (height in px) | Paddings                                       |
| ----------------- | ---------------------------------------------- |
| M (20px)          | ![](static/tag-M.png) ![](static/tag2-M.png)   |
| L (28px)          | ![](static/tag-L.png) ![](static/tag2-L.png)   |
| XL (40px)         | ![](static/tag-XL.png) ![](static/tag2-XL.png) |

## Themes

The component offers several themes for tags.

| Tag theme     | Appearance example            | Description     |
| ------------- | ----------------------------- | --------------- |
| `primary`                         | ![](static/primary.png)                   | The `primary` theme of tag suitable for use on a light background. Any color from [color palette](/style/design-tokens/design-tokens#base_tokens_palette) can be set as a tag color, with the default color being `--gray-500` (background color for all states and color for icon inside the tag is calculated with CSS filter). |
| `primary` with `color:"white"`    | ![](static/primary-invert.png)     | An inversion of the `primary` tag meant for dark or colored backgrounds.|
| `secondary`                       | ![](static/secondary.png)               | The `secondary` tag theme, useful on a light background when contrast between the primary and secondary tags is required. Border color and color for icon inside the tag is calculated with CSS filter. |
| `secondary` with `color:"white"`  | ![](static/secondary-invert.png) | An inversion of the `secondary` tag suitable for dark or colored backgrounds.|
| `additional`                      | ![](static/additional.png)             | Ideal for special tags that are added to other tags. Border color and color for icon inside the tag is calculated with CSS filter. |
| `additional` with `color:"white"` | ![](static/additional-invert.png)      | An inversion of the `additional` theme used for special tags that are added to other tags. |

## Interaction

Table: Tag states

| Tag theme                        | States                                                                |
| -------------------------------- | --------------------------------------------------------------------- |
| `primary`                        | ![](static/default-color-example.png)            |
| `primary` with `color:"white"`   | ![](static/invert-states.png)             |
| `secondary`                      | ![](static/secondary-states.png)               |
| `secondary` with `color:"white"` | ![](static/secondary-invert-states.png) |

## Tag for adding other tags

Users can create tags using tags with the `additional` theme.

| State  | Appearance example                  | Styles    |
| ------ | ----------------------------------- | --------- |
| Normal | ![](static/normal.png) | `color: var(--text-secondary)`, `background-color: var(--tag-secondary-normal)`, `border: 1px dotted var(--border-primary)` |
| Hover  | ![](static/hover.png)  | `background-color: var(--tag-secondary-hover-active)`                                                                         |
| Active | ![](static/active.png) | `background-color: var(--tag-secondary-hover-active)`                                                                         |

This tag opens [InlineInput](/components/inline-input/inline-input), and you can add a [mask label](/components/input-mask/input-mask) to guide the user on what to type into the input.

![](static/add-input-L.png)

Upon clicking the `Check` icon or pressing `Enter`, the input value is saved and transformed into a tag.

![](static/add-loading-L.png)

If space for tag placement is limited, the text should be truncated with an `ellipsis`. Hovering over a tag with an `ellipsis` displays a tooltip with the full tag label.

## Editing tag

For editable tags, use the [InlineInput](/components/inline-input/inline-input) component, similar to adding a tag. Refer to the [live example](/components/tag/tag-code#editing_tag).

## Long text

You can set a maximum width for the tag. If the text of a tag exceeds this limit, it will be collapsed with an `ellipsis`, and hovering over the tag will show a tooltip with the full tag label.

![](static/ellipsis.png)

<!-- @## Minimizing number of tags

In case you have a huge number of tags and don’t need to show them all at once, minimize them to a tag with three dots. When you click on it, all hidden tags will be opened.

::: tip
Unfortunately, this solution can be found in several places so far.
:::

![more tags example](static/more-tags.png) -->

## Margins between tags

Table: Margins between tags

Size (height in px) | Margins                 |
| --------- | ------------------------------- |
| M (20px)  | ![](static/tag-margins-M.png)   |
| L (28px)  | ![](static/tag-margins-L.png)   |
| XL (40px) | ![](static/tag-margins-XL.png)  |

<!-- @## Tag and other components

Recommendations on positioning of tags in relation to other components:

- In most cases, place tag to the right of the component.
- In the card, place tag at the bottom. -->

## Usage in UX/UI

Use tags for visual marking of objects, fast recognition and navigation.

### Example of usage in card

![](static/tag-card.png)

### Example of usage in table

![](static/tag-table-pic.png)

