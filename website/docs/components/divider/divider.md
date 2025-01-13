---
title: Divider
fileSource: divider
tabs: Design('divider'), A11y('divider-a11y'), API('divider-api'), Example('divider-code'), Changelog('divider-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import Divider from '@semcore/ui/divider';
import { Flex } from '@semcore/ui/flex-box';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const USE = ['primary', 'secondary'];
const THEMES = ['default', 'invert'];
const ORIENTATIONS = ['horizontal', 'vertical'];

const LayoutPreview = (props) => (
  <Flex justifyContent='center' alignItems='center' w={200} h={100} p={5}>
    {props.children}
  </Flex>
);

const App = PlaygroundGeneration(
  (createGroupWidgets) => {
    const { radio } = createGroupWidgets('Divider');

    const use = radio({
      key: 'use',
      defaultValue: 'primary',
      label: 'Use',
      options: USE,
    });

    const theme = radio({
      key: 'theme',
      defaultValue: 'default',
      label: 'Theme',
      options: THEMES,
    });

    const orientation = radio({
      key: 'orientation',
      defaultValue: 'horizontal',
      label: 'Orientation',
      options: ORIENTATIONS,
    });

    return (
      orientation === 'horizontal' ? 
        <Divider
          orientation={orientation}
          theme={theme}
          use={use}
          wMin={200}
        />
        : <Divider
          orientation={orientation}
          theme={theme}
          use={use}
          hMin={20}
        />
    )
  },
  { LayoutPreview },
);
</script>

:::

## Description

**Divider** is a component that visually and semantically separates content or components.

## Types

Divider has two types: `primary` and `secondary`. Secondary type helps to separate and show the connection between two parts of the content.

Table: Divider types

| Type       | Appearance              | Styles                                      |
| ---------- | ----------------------- | ------------------------------------------- |
| `primary`  | ![](static/solid.png)   | `border: 1px solid var(--border-primary)`   |
| `secondary`| ![](static/dashed.png)  | `border: 1px dashed var(--border-primary)`  |

## Orientation

Table: Divider orientation

| Orientation  | Example                         |
| ------------ | ------------------------------- |
| Horizontal   | ![](static/default-theme.png)   |
| Vertical     | ![](static/solid.png)           |

## Themes

The divider can be used either on a light or dark/colored background.

Table: Divider themes

| Theme   | Appearance                   | Styles                                            |
| ------- | ---------------------------- | ------------------------------------------------- |
| Default | ![](static/default-theme.png) | `border: 1px solid var(--border-primary)`        |
| Invert  | ![](static/invert-theme.png)   | `border: 1px solid var(--border-primary-invert)`|

## Usage in UX/UI

The divider separates content visually and semantically, whether it is different or similar in meaning.

Table: Divider usage

| Case    | Example                          |
| ------- | -------------------------------- |
| Contact information needs to be visually separated from the form.                                                        | ![](static/use-1.png) |
| Separate information about a report's data visually from the form, but maintain its connection to the form. | ![](static/use-2.png) |

