---
title: NeighborLocation
fileSource: neighbor-location
tabName: Design
tabs: NeighborLocation('neighbor-location'), API('neighbor-location-api'), Changelog('neighbor-location-changelog')
---

::: warning
:rotating_light: `NeighborLocation` component is deprecated and will be removed in the next releases.

:::
::: tip
Use property `neighborLocation` specification on components.

We did this because of the unreliability of the API and the unpredictability of neighbor detection, especially in
React 18's parallel render.
:::

## Description

**NeighborLocation** is a component for grouping components. It indicates where the component is in relation to its
neighbors.

For example, you can group together:

- [Button](/components/button/)
- [Input](/components/input/)
- [Select](/components/select)

You may also need a `flex-box` to align the components. For more information, see
the [Flex-box and indent system](/layout/box-system/).

## Grouped buttons

Buttons can be grouped.

If you group primary buttons, the right one will have a 1px white border.

![](static/primary-buttons-group.png)

If you group secondary buttons, the left one will hide it's right border.

![](static/secondary-buttons-group.png)

::: tip
Don’t group tertiary buttons this way.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import Divider from '@semcore/ui/divider';
import { Flex } from '@semcore/ui/flex-box';
import NeighborLocation from '@semcore/ui/neighbor-location';

const Demo = () => {
  return (
    <>
      <Flex>
        <Button neighborLocation='right'>left</Button>
        <Button neighborLocation='both'>center</Button>
        <Button neighborLocation='left'>right</Button>
      </Flex>
      <Divider my={4} />
      {/* NeighborLocation is DEPRECATED */}
      <NeighborLocation>
        <Button>left</Button>
        <Button>center</Button>
        <Button>right</Button>
      </NeighborLocation>
    </>
  );
};


</script>

:::

## Grouped input and button

::: sandbox

<script lang="tsx">
//https://github.com/semrush/intergalactic/tree/master/website/docs/utils/neighbor-location/examples/neighbor-location-input.tsx
import React from 'react';
import Input from '@semcore/ui/input';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <>
      <Flex mb={4}>
        <Input neighborLocation='right' w={200}>
          <Input.Value placeholder='Placeholder' />
        </Input>
        <Button neighborLocation='left'>Button</Button>
      </Flex>
      <Flex mb={4}>
        <Input neighborLocation='right' w={200}>
          <Input.Value placeholder='Placeholder' />
        </Input>
        <Button neighborLocation='left' use='primary'>
          Button
        </Button>
      </Flex>
      <Flex>
        <Input neighborLocation='right' w={200}>
          <Input.Value placeholder='Placeholder' />
        </Input>
        <Button neighborLocation='left' use='primary' theme='success'>
          Button
        </Button>
      </Flex>
    </>
  );
};


</script>

:::

## Grouped input and select

::: sandbox

<script lang="tsx">
import React from 'react';
import Input from '@semcore/ui/input';
import Select from '@semcore/ui/select';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <Flex>
      <Input neighborLocation='right' w={200}>
        <Input.Value placeholder='Placeholder' />
      </Input>
      <Select
        neighborLocation='left'
        options={[
          { value: 'Option 1', children: 'Option 1' },
          { value: 'Option 2', children: 'Option 2' },
        ]}
      />
    </Flex>
  );
};


</script>

:::

## Grouped input, select, and button

You can group input, select, and button.

![](static/combo.png)

::: sandbox

<script lang="tsx">
import React from 'react';
import Input from '@semcore/ui/input';
import Select from '@semcore/ui/select';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <Flex>
      <Input neighborLocation='right' w={200}>
        <Input.Value placeholder='Placeholder' />
      </Input>
      <Select
        neighborLocation='both'
        options={[
          { value: 'Option 1', children: 'Option 1' },
          { value: 'Option 2', children: 'Option 2' },
        ]}
      />
      <Button neighborLocation='left' use='primary'>
        Button
      </Button>
    </Flex>
  );
};


</script>

:::

## Adding a wrapper

By default, `<NeighborLocation/>` doesn't create an HTML wrapper, but you can pass the component tag you want.

::: tip
For the correct type mapping in the TC, you must also pass the interface.
`<NeighborLocation<FlexProps> tag={Flex} w={200}/>`
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
import NeighborLocation from '@semcore/ui/neighbor-location';

const Demo = () => {
  return (
    <>
      <NeighborLocation tag={Flex} mb={4}>
        <Button use='primary'>left</Button>
        <Button use='primary'>center</Button>
        <Button use='primary'>right</Button>
      </NeighborLocation>
      <NeighborLocation tag={Flex}>
        <Button>left</Button>
        <Button>center</Button>
        <Button>right</Button>
      </NeighborLocation>
    </>
  );
};


</script>

:::

## Using a custom component

You can apply `<NeighborLocation/>` to your components. You will need to use the component `<NeighborLocation.Detect/>`
and
then the `neighborLocation` prop will come to your component.

::: tip
You can use the render function or the element will be cloned.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import NeighborLocation from '@semcore/ui/neighbor-location';

const CustomComponent: React.FC<{ neighborLocation?: string }> = ({ neighborLocation }) => {
  return <span>{neighborLocation}</span>;
};

const Demo = () => {
  return (
    <NeighborLocation>
      <NeighborLocation.Detect>
        {(neighborLocation) => <span>{neighborLocation}</span>}
      </NeighborLocation.Detect>
      <NeighborLocation.Detect>
        {(neighborLocation) => <span> | {neighborLocation} | </span>}
      </NeighborLocation.Detect>
      <NeighborLocation.Detect>
        <CustomComponent />
      </NeighborLocation.Detect>
    </NeighborLocation>
  );
};


</script>

:::

