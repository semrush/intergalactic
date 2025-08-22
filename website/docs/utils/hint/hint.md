---
title: Hint
fileSource: hint
tabs: Design('hint'), A11y('hint-a11y'), API('hint-api'), Changelog('hint-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import { Hint } from '@semcore/base-components';
import Button from '@semcore/button';
import FileExportM from '@semcore/icon/FileExport/m';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const App = PlaygroundGeneration((preview) => {
  const { select } = preview();

  const trim = select({
    key: 'trim',
    defaultValue: 'end',
    label: 'Trimming type',
    options: ['end', 'middle'],
  });
    
  const ref = React.useRef();
 
  return (
    <>
      <Button ref={ref}>
          <Button.Addon><FileExportM /></Button.Addon>
      </Button>
      <Hint triggerRef={ref} placement="right">Export to PDF</Hint>
    </>
  );
});
</script>

:::

::: tip
`Hint` from `@semcore/base-components` is a new, more lightweight and performant implementation of `Hint` from `@semcore/tooltip`, with identical design and behavior.
:::

Use `Hint` to provide labels for elements without visible text or with truncated text.

`Hint` is triggered on mouse hover or keyboard focus.

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/hint/docs/examples/basic-usage.tsx';
</script>

:::

## Placement

You can set your own placement of the `Hint`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/hint/docs/examples/placement.tsx';
</script>

:::

## Timeout

You can customize timeouts for showing and hiding the `Hint`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/hint/docs/examples/timeout.tsx';
</script>

:::
