---
title: Example
tabs: Button('index'), A11y('button-a11y'), API('button-api'), Example('button-code'), Changelog('button-changelog')
---

## Addons

Addons can be installed either by passing the required `tag` to the `addonLeft`/`addonRight` property or by unrending `Button.Addon`/`Button.Text` into the component body. The examples below are the same.

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import CheckM from '@semcore/ui/icon/Check/m';
import ArrowRightM from '@semcore/ui/icon/ArrowRight/m';

const Demo = () => {
  return (
    <>
      <Button addonLeft={CheckM} addonRight={ArrowRightM}>
        Button
      </Button>
      <Button ml={2}>
        <Button.Addon>
          <CheckM />
        </Button.Addon>
        <Button.Text>Button</Button.Text>
        <Button.Addon>
          <ArrowRightM />
        </Button.Addon>
      </Button>
    </>
  );
}
</script>

:::

## Button with Icon

To use a button with a single icon, you need to wrap it in an `<Button.Addon/>`.

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import CheckM from '@semcore/ui/icon/Check/m';

const Demo = () => {
  return (
    <Button aria-label='Confirm'>
      <Button.Addon>
        <CheckM />
      </Button.Addon>
    </Button>
  );
}
</script>

:::

## Button accessibility

If there is no text in the button, it is necessary to add aria-label with a button description.

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import CheckM from '@semcore/ui/icon/Check/m';
import CloseM from '@semcore/ui/icon/Close/m';

const Demo = () => {
  return (
    <>
      <Button addonLeft={CloseM} aria-label='Close' />
      <Button ml={2} aria-label='Confirm'>
        <CheckM />
      </Button>
    </>
  );
}
</script>

:::