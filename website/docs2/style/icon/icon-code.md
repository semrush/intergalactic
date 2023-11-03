---
title: Icon
tabs: Design('icon'), A11y('icon-a11y'), API('icon-api'), Example('icon-code'), Changelog('icon-changelog')
---

## Interactive

If you need interactive icons that change their properties on hover (color, cursor), give the desired color to the icon using `color` property and add `interactive` property. And voila! You don't need to specify an additional color for the icon in a hover or in an active state.

::: sandbox

<script lang="tsx">
import React from 'react';
import LinkExternalM from '@semcore/ui/icon/LinkExternal/m';

const Demo = () => (
  <LinkExternalM
    interactive
    aria-label='Go to our awesome article'
    color='icon-secondary-neutral'
  />
);


</script>

:::
