---
title: Badge
fileSource: badge
tabs: Design('badge'), A11y('badge-a11y'), API('badge-api'), Example('badge-code'), Changelog('badge-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import Badge from '@semcore/ui/badge';

const Preview = (preview) => {
  const { select, radio, text } = preview('Badge');

  const color = radio({
    key: 'color',
    defaultValue: 'white',
    label: 'Color',
    options: ['white', 'gray-800'],
  });

  const bg = select({
    key: 'bg',
    defaultValue: 'gray-400',
    label: 'Background',
    options: ['gray-400', 'blue-400', 'red-400', 'orange-400', 'green-400', 'white'],
  });

  const child = text({
    key: 'children',
    defaultValue: 'soon',
    label: 'Text',
  });

  return (
    <Badge bg={bg} color={color}>
      {child}
    </Badge>
  );
};

const App = PlaygroundGeneration(Preview);
</script>

:::

## Description

**Badge** is a visual component used to indicate the status of a feature or product.

_For example, you added a new tab to the report. In this case, you can highlight a new feature in your product with a `new` badge._

**Main features of the component:**

- Badge cannot be deleted or added by a user. Badge is added to the elements by the system according to the rules described below in the table.
- Badge isn’t clickable.
- Don’t use badge for filtering the data.

## Appearance

Component has one size.

### Badge types

Use the following badges in the products depending on the status of the feature or product:

Table: Badge types

| Badge                      | Background     | When used                                                                                                                                                                                                                                                                                 |
| -------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![](static/admin.png) | `--blue-400`   | Use it with features that are only available for users with admin rights. The functionality with `admin` badge isn’t visible to the other users.                                                                                                                                         |
| ![](static/alpha.png) | `--red-400`    | Use it with features which are available only to admins and a limited number of users who have been granted access as `alpha` users. The functionality under this badge should be used without any guarantees, it is unstable, and may be changed significantly over time or be disabled. |
| ![](static/beta.png)   | `--orange-400` | Use only for unstable functionality of a feature or product. A product/feature with this badge was released to test the product hypothesis, and it can have major changes in the future.                                                                                                  |
| ![](static/new.png)     | `--green-400`  | Use with products and features that are out of beta, and with new features that are available to all users. Use it to attract attention to a new product or feature.                                                                                                                      |
| ![](static/soon.png)   | `--gray-400`   | It can be set on “placeholders” for collecting feedback.                                                                                                                                                                                                                                  |

### Usage on dark/colored background

Every badge can be inverted like this:

![](static/inverted.png)

Use `--gray-white` color for the background and `--gray-800` for the text color.

## Feature status

The feature status can be shown inside most of the components and controls.

### Button

![](static/button_primary.png)

![](static/button_secondary.png)

### Pill

![](static/pills.png)

### Feature status in the notification

![](static/notice.png)

### Badge vs. Tag

Don’t confuse [Tag](/components/tag/tag) and Badge components. Tag is used for thematic grouping and labeling data, while the Badge indicates the status of a feature or product.

![](static/table-yes-no.png)

## Location

Badge is usually placed to the right of the element. As an exception, in the [Notice](/components/notice/notice) component, badge is positioned to the left relative to the text. Badge's margins are always multiples of 4.

## Usage in UX/UI

Table: Badge usage examples

| Component/block     | Appearance example                        |
| ------------------- | ----------------------------------------- |
| Product header      | ![](static/product-head.png) |
| Landing page header | ![](static/landing-header.png) |
| Widget              | ![](static/widget.png)              |

