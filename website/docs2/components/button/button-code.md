---
title: Example
---

## Addons

Addons can be installed either by passing the required `tag` to the `addonLeft`/`addonRight` property or by unrending `Button.Addon`/`Button.Text` into the component body. The examples below are the same.

::: my-sandbox {entry=/App.tsx, template=vite-react-ts}

```tsx /App.tsx [active]
import React from 'react';
import Button from '@semcore/ui/button';
import CheckM from '@semcore/ui/icon/Check/m';
import ArrowRightM from '@semcore/ui/icon/ArrowRight/m';

export default function () {
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
```

:::

## Button with Icon

To use a button with a single icon, you need to wrap it in an `<Button.Addon/>`.

::: my-sandbox {entry=/App.tsx, template=vite-react-ts}

```tsx /App.tsx [active]
import React from 'react';
import Button from '@semcore/ui/button';
import CheckM from '@semcore/ui/icon/Check/m';

export default function () {
  return (
    <Button aria-label='Confirm'>
      <Button.Addon>
        <CheckM />
      </Button.Addon>
    </Button>
  );
}
```

:::

## Button accessibility

If there is no text in the button, it is necessary to add aria-label with a button description.

::: my-sandbox {entry=/App.tsx, template=vite-react-ts}

```tsx /App.tsx [active]
import React from 'react';
import Button from '@semcore/ui/button';
import CheckM from '@semcore/ui/icon/Check/m';
import CloseM from '@semcore/ui/icon/Close/m';

export default function () {
  return (
    <>
      <Button addonLeft={CloseM} aria-label='Close' />
      <Button ml={2} aria-label='Confirm'>
        <CheckM />
      </Button>
    </>
  );
}
```

:::
