---
title: Dropdown
fileSource: dropdown
tabs: Design('dropdown'), A11y('dropdown-a11y'), API('dropdown-api'), Example('dropdown-code'), Changelog('dropdown-changelog')
---

::: warning
:warning: If you need to customize your work with a dropdown window, refer to the documentation [@semcore/ui/popper](/utils/popper/popper)
:::

The component is a wrap over [@semcore/ui/popper](/utils/popper/popper) with styles for a dropdown window.

## Basic usage

The component API is completely identical to [@semcore/ui/popper](/utils/popper/popper)

::: sandbox

<script lang="tsx">
import React from 'react';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import Dropdown from '@semcore/ui/dropdown';

const Demo = () => (
  <Dropdown>
    <Dropdown.Trigger tag={ButtonTrigger}>Trigger</Dropdown.Trigger>
    <Dropdown.Popper p={4}>Content</Dropdown.Popper>
  </Dropdown>
);
</script>

:::

## Focus interaction

::: sandbox

<script lang="tsx">
import React from 'react';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import Dropdown from '@semcore/ui/dropdown';

const Demo = () => (
  <Dropdown interaction={'focus'}>
    <Dropdown.Trigger tag={ButtonTrigger}>Trigger</Dropdown.Trigger>
    <Dropdown.Popper p={4}>Content</Dropdown.Popper>
  </Dropdown>
);
</script>

:::
