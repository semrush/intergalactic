---
title: Wrapping components
---

## The `tag` property

Intergalactic components are built with polymorphic typings, that means that you can provide `tag` property that will redefine allowed properties list.

```tsx
import Button from 'intergalactic/button';
<Button
  href="">
// Error: Property 'href' does not exist on type... // [!code error]
  Hello world
</Button>

```

```tsx
<Button
  tag="a" // [!code ++]
  href="">
  Hello world
</Button>
```

`tag` property also accepts React components and other Intergalactic components what allows you to easley combine logic of visual appearance of both components.

::: sandbox

<script lang="tsx">
  export Demo from './examples/the-`tag`-property.tsx';
</script>

:::

The `tag` property is not included in the component's props, so you can't make wrappers by simple using that.

```tsx
import Select, { SelectProps } from 'intergalactic/select'

const WrappedSelect = ({
  tag, // Property tag does not exist on type SelectProps. // [!code error]
  ...other
}: SelectProps) => (
  <Select {...other} />
)

```

## Making wrappers

Use the special utility `wrapIntergalacticComponent` to wrap components. It does nothing in runtime but ensures correct typings in TypeScript.

::: sandbox

<script lang="tsx">
  export Demo from './examples/making-wrappers.tsx';
</script>

:::

## Complex components wrappers

Some components props are generic, for example `Select` component has generic `value` and `DataTable` has generic `data`. For such components, special wrapping utilities are provided. 


It available for the following components:

1. `wrapDataTable`, `wrapDataTableRow`, `wrapDataTableCell` for [DataTable](/table-group/data-table/data-table).
2. `wrapAccordion` for [Accordion](/components/accordion/accordion).
3. `wrapPills` for [Pills](/components/pills/pills).
4. `wrapRadioGroup` for [Radio](/components/radio/radio).
5. `wrapSelect` for [Select](/components/select/select).
6. `wrapSlider` for [Slider](/components/slider/slider).
7. `wrapTabLine` for [TabLine](/components/tab-line/tab-line).
8. `wrapTabPanel` for [TabPanel](/components/tab-panel/tab-panel).
9. `wrapWizardStepper` for [Wizard](/components/wizard/wizard).

::: sandbox

<script lang="tsx">
  export Demo from './examples/complex-components-wrappers.tsx';
</script>

:::

