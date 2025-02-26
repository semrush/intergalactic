---
title: NeighborLocation
fileSource: neighbor-location
tabs: Design('neighbor-location'), API('neighbor-location-api'), Changelog('neighbor-location-changelog')
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

- [Button](/components/button/button)
- [Input](/components/input/input)
- [Select](/components/select/select)

You may also need a `flex-box` to align the components. For more information, read [Flex-box and spacing system](/layout/box-system/box-system-spacing).

## Grouped buttons

Grouped buttons are divided with a 1px line, color of which depends on the button's `use`:

* for primary buttons: `border-primary-invert`
* for secondary buttons: `border-primary`

::: tip
Don’t group tertiary buttons this way.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/neighbor-location/docs/examples/grouped-buttons.tsx';
</script>

:::

## Grouped input and button

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/neighbor-location/docs/examples/grouped-input-and-button.tsx';
</script>

:::

## Grouped input and select

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/neighbor-location/docs/examples/grouped-input-and-select.tsx';
</script>

:::

## Grouped input, select, and button

You can group input, select, and button.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/neighbor-location/docs/examples/grouped-input,-select,-and-button.tsx';
</script>

:::

## Adding wrapper

By default, `<NeighborLocation/>` doesn't create an HTML wrapper, but you can pass the component tag you want.

::: tip
For the correct type mapping in the TC, you must also pass the interface.
`<NeighborLocation<FlexProps> tag={Flex} w={200}/>`
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/neighbor-location/docs/examples/adding-a-wrapper.tsx';
</script>

:::

## Using custom component

You can apply `<NeighborLocation/>` to your components. You will need to use the component `<NeighborLocation.Detect/>`
and
then the `neighborLocation` prop will come to your component.

::: tip
You can use the render function or the element will be cloned.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/neighbor-location/docs/examples/using-a-custom-component.tsx';
</script>

:::

