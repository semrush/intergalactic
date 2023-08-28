---
title: Example
tabs: Design('button'), A11y('button-a11y'), API('button-api'), Example('button-code'), Changelog('button-changelog') 
---

## Addons

Addons can be installed either by passing the required `tag` to the `addonLeft`/`addonRight` property or by unrending `Button.Addon`/`Button.Text` into the component body. The examples below are the same.

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';

const Demo = () => {
  return (
    <>
      <Button>
        Button
      </Button>
    </>
  );
}
</script>

:::


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
