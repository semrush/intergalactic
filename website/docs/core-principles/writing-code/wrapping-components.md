---
title: Wrapping components
---

## The `tag` property

Intergalactic components are built with polymorphic typings, that means that you can provide `tag` property that will redefine allowed properties list.

```tsx
import Button from '@semcore/ui/button';
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
import React from 'react'; 
import Select from '@semcore/ui/select'; 
import { LinkTrigger } from '@semcore/ui/base-trigger'; 

const options = Array(6)
  .fill('')
  .map((_, index) => ({ value: index, children: `Label ${index}` })); 

const Demo = () => (
  <Select tag={LinkTrigger} options={options} placeholder='Select' />
); 

</script>

:::

The `tag` property is not included in the component's props, so you can't make wrappers by simple using that.

```tsx
import Select, { SelectProps } from '@semcore/ui/select'

const WrappedSelect = ({
  tag, // Property tag does not exist on type SelectProps. // [!code error]
  ...other
}: SelectProps) => (
  <Select {...other} />
)

```

## Making wrappers

Use the special utility `makeWrapper` to wrap components. It does nothing in runtime but ensures correct typings in Typescript.

::: sandbox

<script lang="tsx">
import React from 'react'; 
import { wrapIntergalacticComponent } from '@semcore/ui/core'; 
import Button from '@semcore/ui/button'; 

const AlertButton = wrapIntergalacticComponent<typeof Button, {
  handle: ['click', 'hover'];
  message: string;
}>(({ handle, message, ...restProps }) => {
  const handleClick = () => {
    if (handle.includes('click')) {
      alert(message);
    }
  };
  const handleMouseOver = () => {
    if (handle.includes('hover')) {
      alert(message);
    }
  };

  return <Button {...restProps} onClick={handleClick} onMouseOver={handleMouseOver} />;
});

const Demo = () => (
  <AlertButton handle={['click']} message='Hello world'>Click me</AlertButton>
); 

</script>

:::

## Complex components wrappers

Some components props are generic, for example `Select` component has generic `value` and `DataTable` has generic `data`. For such components, special wrapping utilities are provided. 


It available for the following components:

1. `wrapDataTable`, `wrapDataTableRow`, `wrapDataTableCell` for [DataTable](/components/data-table/data-table).
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
import React from 'react';
import DataTable, { wrapDataTable } from '@semcore/ui/data-table';
import Card from '@semcore/ui/card';

const CardDataTable = wrapDataTable<{ title: string }>(({ title, ...restProps }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          {title}
        </Card.Title>
      </Card.Header>
      <Card.Body px={0}>
        <DataTable {...restProps} />
      </Card.Body>
    </Card>
  );
})

const Demo = () => {
  return (
    <CardDataTable data={data} title="A table combined with card">
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body />
    </CardDataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
];

</script>

:::

