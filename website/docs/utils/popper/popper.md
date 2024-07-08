---
title: Popper
fileSource: popper
tabs: Design('popper'), API('popper-api'), Changelog('popper-changelog')
---

The component is our `React`-wrapper over the popular [popper.js](https://popper.js.org/) library.

We use it in all pop-ups: [dropdown](/components/dropdown/dropdown), [tooltip](/components/tooltip/tooltip), [select](/components/select/select), etc.

## Show/hide

The component can function in both `uncontrolled` and `controlled` modes.

::: sandbox

<script lang="tsx">
  export Demo from './examples/show-hide.tsx';
</script>

:::

## Events trigger

Using the `interaction` prop, you can specify trigger events which are to be subscribed to to show and hide the popper.

When these events are activated, the `onVisibleChange` handler is called with the changed visibility value.

::: sandbox

<script lang="tsx">
  export Demo from './examples/events-trigger.tsx';
</script>

:::

## Click outside

You can subscribe to the `onOutsideClick` event. It will be called when a clicked is made on any element other than `Trigger` and `Popper`.

::: tip
`excludeRefs` prop is also provided. An array of nodes which must be excluded to trigger a click can be passed to it. The `Trigger` and `Popper` nodes will be passed thereto by default.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/click-outside.tsx';
</script>

:::

## Placement

Since we are using [popper.js](https://popper.js.org/), the placement prop comes from there.

Placement may be `'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start'`

::: sandbox

<script lang="tsx">
  export Demo from './examples/placement.tsx';
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
  export Demo from './examples/custom-tag.tsx';
</script>

:::

## Render-functions

You can change the trigger by passing a function instead of the `Popper` body.

Inside the function, the first argument provides the component props and the `getTriggerProps` functions for the trigger and `getPopperProps` for the popper, respectively. By calling them, you get the props that you need to put on the required elements.

**Important!** You can pass custom props required for the component in `getTriggerProps`, `getPopperProps`. In this case, these props will merge with the props required from `Popper`.

**For example**, `getPopperProps()` will return style and ref, if we do `<input {...getPopperProps()} ref={myRef}/>`, this will not work since we will overwrite `ref`. And if we pass `ref` inside the function, `<input {... getPopperProps ({ref: myRef})} />`, then we call two functions one after another, and everything will function.

::: sandbox

<script lang="tsx">
  export Demo from './examples/render-functions.tsx';
</script>

:::

::: tip
The second argument of the render-function will provide `handlers`, functions for changing the internal state of the component.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/render-functions.tsx';
</script>

:::

## Disabled portal

The popper is rendered in the end of the `body` and absolutely positioned. to render the `Popper` next to the `Trigger`, you need to specify `disablePortal`.

This is usually needed to optimize position recalculation when the `Trigger` is located in a block that scrolls separately from the page.

::: tip
Where the `Popper` are located, see in dev-inspector.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/disabled-portal.tsx';
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

