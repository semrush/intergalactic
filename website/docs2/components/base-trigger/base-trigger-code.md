---
title: BaseTrigger
fileSource: select
tabs: Design('base-trigger'), A11y('base-trigger-a11y'), API('base-trigger-api'), Example('base-trigger-code'), Changelog('base-trigger-changelog')
---

## ButtonTrigger

::: sandbox

<script lang="tsx">
import React from 'react';
import Select from '@semcore/ui/select';
import { ButtonTrigger } from '@semcore/ui/base-trigger';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

const Demo = () => (
  <Select tag={ButtonTrigger} options={options} placeholder='Select an option' m='auto' />
);
</script>

:::

## FilterTrigger

Check examples in the [FilterTrigger documentation](/components/filter-trigger/filter-trigger-code).

## LinkTrigger

::: sandbox

<script lang="tsx">
import React from 'react';
import Select from '@semcore/ui/select';
import { LinkTrigger } from '@semcore/ui/base-trigger';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

const Demo = () => (
  <Select tag={LinkTrigger} options={options} placeholder='Select an option' m='auto' />
);
</script>

:::
