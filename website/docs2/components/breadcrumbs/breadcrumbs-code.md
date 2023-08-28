---
title: Example
tabs: Breadcrumbs('breadcrumbs'), A11y('breadcrumbs-a11y'), API('breadcrumbs-api'), Example('breadcrumbs-code'), Changelog('breadcrumbs-changelog')
---

## Usage example

Try shrinking the page and see how the navigation shrinks. You can also wrap `<Breadcrumbs.Item />` to other components.

::: sandbox

<script lang="tsx">
import React from 'react';
import Breadcrumbs from '@semcore/ui/breadcrumbs';
import Tooltip from '@semcore/ui/tooltip';

export default () => (
  <Breadcrumbs tag='nav'>
    <Breadcrumbs.Item href='#'>Dashboard</Breadcrumbs.Item>
    <Breadcrumbs.Item href='#'>Projects</Breadcrumbs.Item>
    <Breadcrumbs.Item href='#'>semrush.com</Breadcrumbs.Item>
    <Tooltip
      tag={Breadcrumbs.Item}
      active={false}
      href='#'
      title="Very-very long title, you can't even imagine how long it is."
    >
      Very-very long title, you can't even imagine how long it is
    </Tooltip>
    <Breadcrumbs.Item active>Current page</Breadcrumbs.Item>
  </Breadcrumbs>
);
</script>

:::

## Redefining a tag

You can redefine the `<Breadcrumbs tag.Item />`. This is necessary, for example, to use `Link` from `react-router`.

::: sandbox

<script lang="tsx">
import React from 'react';
import Breadcrumbs from '@semcore/ui/breadcrumbs';
import Link from '@semcore/ui/link';

export default () => (
  <Breadcrumbs tag='nav'>
    <Breadcrumbs.Item tag='a' href='/'>
      main page
    </Breadcrumbs.Item>
    <Breadcrumbs.Item tag='a' href='/components/breadcrumbs'>
      breadcrumbs
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Link href='/whatever'>404</Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Link active href='#'>
        this example
      </Link>
    </Breadcrumbs.Item>
  </Breadcrumbs>
);
</script>

:::
