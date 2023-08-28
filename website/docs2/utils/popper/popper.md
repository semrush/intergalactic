---
title: Popper
fileSource: popper
tabName: Design
tabs: Popper('popper'), API('popper-api'), Changelog('popper-changelog')
---

The component is our `React`-wrapper over the popular [popper.js](https://popper.js.org/) library.

We use it in all pop-ups: [dropdown](/components/dropdown/), [tooltip](/components/tooltip/), [select](/components/select), etc.

## Show/hide

The component can function in both `uncontrolled` and `controlled` modes.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Popper from '@semcore/ui/popper';
import { Flex } from '@semcore/ui/flex-box';

const style = { background: '#FFF', border: '1px solid black', padding: '10px' };

export default () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <Flex justifyContent='space-between'>
      <Popper visible={visible} onVisibleChange={toggleVisible}>
        <Popper.Trigger style={style}>Controlled</Popper.Trigger>
        <Popper.Popper style={style}>Attached content</Popper.Popper>
      </Popper>

      <Popper>
        <Popper.Trigger style={style} ml='auto'>
          Uncontrolled
        </Popper.Trigger>
        <Popper.Popper style={style}>Attached content</Popper.Popper>
      </Popper>
    </Flex>
  );
};
</script>

:::

## Events trigger

Using the `interaction` prop, you can specify trigger events which are to be subscribed to in order to show and hide the popper.

When these events are activated, the `onVisibleChange` handler is called with the changed visibility value.

::: sandbox

<script lang="tsx">
import React from 'react';
import Popper from '@semcore/ui/popper';

const style = { background: '#FFF', border: '1px solid black', padding: '20px' };

export default () => (
  <Popper interaction='hover'>
    <Popper.Trigger style={style}>Hover me pls</Popper.Trigger>
    <Popper.Popper style={style}>Attached content</Popper.Popper>
  </Popper>
);
</script>

:::

## Click outside

You can subscribe to the `onOutsideClick` event. It will be called when a clicked is made on any element other than `Trigger` and `Popper`.

::: tip
`excludeRefs` prop is also provided. An array of nodes which must be excluded to trigger a click can be passed to it. The `Trigger` and `Popper` nodes will be passed thereto by default.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import Popper from '@semcore/ui/popper';

const style = { background: '#FFF', border: '1px solid black', padding: '20px' };

export default () => (
  <Popper
    onOutsideClick={() => {
      // cancel hide popper
      return false;
    }}
  >
    <Popper.Trigger style={style}>Click me pls</Popper.Trigger>
    <Popper.Popper style={style}>Attached content</Popper.Popper>
  </Popper>
);
</script>

:::

## Placement

Since we are using [popper.js](https://popper.js.org/), the placement prop comes from there.

Placement may be `'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start'`

::: sandbox

<script lang="tsx">
import React from 'react';
import { Box } from '@semcore/ui/flex-box';
import Popper from '@semcore/ui/popper';
import Button from '@semcore/ui/button';

const style = { background: '#FFF', border: '1px solid black', padding: '20px' };

const styleBox = {
  display: 'grid',
  gridTemplateRows: '1fr 1fr 1fr',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridGap: '2vw',
  padding: '60px',
};

export default () => (
  <Box style={styleBox}>
    <Popper placement='top-start' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        TOP START
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
    <Popper placement='top' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        TOP
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
    <Popper placement='top-end' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        TOP END
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>

    <Popper placement='left-start' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        LEFT START
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
    <div />
    <Popper placement='right-start' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        RIGHT START
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>

    <Popper placement='left' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        LEFT
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
    <div />
    <Popper placement='right' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        RIGHT
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>

    <Popper placement='left-end' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        LEFT END
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
    <div />
    <Popper placement='right-end' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        RIGHT END
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>

    <Popper placement='bottom-start' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        BOTTOM START
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
    <Popper placement='bottom' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        BOTTOM
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
    <Popper placement='bottom-end' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        BOTTOM END
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
  </Box>
);
</script>

:::

## Custom tag

`tag` is the name of the HTML tag for the displayed element. The trigger and popper support changing this prop.

You can pass either another component or a string to the `tag`. For example, `tag="a"` or `tag={Button}`.

::: tip
The `tag` for `Trigger` and `Popper` is a `Box` by default, so all props from the trigger go to the `Box`.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import Popper from '@semcore/ui/popper';
import Button from '@semcore/ui/button';
import HamburgerM from '@semcore/ui/icon/Hamburger/m';

const style = { background: '#FFF', border: '1px solid black', padding: '20px' };

export default () => (
  <Popper>
    <Popper.Trigger tag={Button}>
      <Button.Addon>
        <HamburgerM />
      </Button.Addon>
    </Popper.Trigger>
    <Popper.Popper style={style}>Attached content</Popper.Popper>
  </Popper>
);
</script>

:::

## Render-functions

You can change the trigger by passing a function instead of the `Popper` body.

Inside the function, the first argument provides the component props and the `getTriggerProps` functions for the trigger and `getPopperProps` for the popper, respectively. By calling them, you get the props that you need to put on the required elements.

**Important!** You can pass custom props required for the component in `getTriggerProps`, `getPopperProps`. In this case, these props will merge with the props required from `Popper`.

**For example**, `getPopperProps()` will return style and ref, if we do `<input {...getPopperProps()} ref={myRef}/>`, this will not work since we will overwrite `ref`. And if we pass `ref` inside the function, `<input {... getPopperProps ({ref: myRef})} />`, then we call two functions one after another, and everything will function.

::: sandbox

<script lang="tsx">
import React from 'react';
import Popper from '@semcore/ui/popper';

const style = { background: '#FFF', border: '1px solid black', padding: '20px' };

export default () => (
  <Popper interaction='focus'>
    {({ getTriggerProps }) => (
      <>
        <input {...getTriggerProps({ placeholder: 'My custom trigger' })} />
        <Popper.Popper style={style}>Attached content</Popper.Popper>
      </>
    )}
  </Popper>
);
</script>

:::

::: tip
The second argument of the render-function will provide `handlers`, functions for changing the internal state of the component.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import Popper from '@semcore/ui/popper';

const style = { background: '#FFF', border: '1px solid black', padding: '20px' };

export default () => (
  <Popper>
    {(props, handlers) => {
      // function for managing the visibility state of Popper.Popper
      const { visible } = handlers;

      return (
        <>
          <Button onClick={() => visible(true)} mr={4}>
            Open popper
          </Button>
          <Popper.Trigger style={style}>Attach trigger</Popper.Trigger>
          <Popper.Popper style={style}>
            <p>Attached content</p>
            <Button onClick={() => visible(false)}>Close popper</Button>
          </Popper.Popper>
        </>
      );
    }}
  </Popper>
);
</script>

:::

## Disabled portal

The popper is rendered in the end of the `body` and absolutely positioned. In order to render the `Popper` next to the `Trigger`, you need to specify `disablePortal`.

This is usually needed to optimize position recalculation when the `Trigger` is located in a block that scrolls separately from the page.

::: tip
Where the `Popper` are located, see in dev-inspector.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import Popper from '@semcore/ui/popper';
import Button from '@semcore/ui/button';

const style = { background: '#FFF', border: '1px solid black', padding: '20px' };

export default () => (
  <>
    <Popper disablePortal>
      <Popper.Trigger tag={Button} mr={8}>
        disablePortal=true
      </Popper.Trigger>
      <Popper.Popper style={style}>disablePortal=true</Popper.Popper>
    </Popper>
    <Popper>
      <Popper.Trigger tag={Button}>disablePortal=false</Popper.Trigger>
      <Popper.Popper style={style}>disablePortal=false</Popper.Popper>
    </Popper>
  </>
);
</script>

:::

## Fixed position

The Popper is positioned absolutely, but this behavior can be changed to fixed position `(display: fixed)`.

This is usually needed to optimize the recalculation of the Popper's position relative to the `Trigger` when the `Trigger` is located in a block that has `display: fixed` 🤯

By specifying `strategy=fixed`, you can generally get rid of recalculations when scrolling the page.

```jsx
<Popper strategy="fixed">
  <Popper.Trigger />
  <Popper.Popper />
</Popper>
```

