---
title: Table showcase
fileSource: data-table
tabName: Design
docs: true
---

Here, you can find quick links related to our table and its specific use cases.

For the details about the main component for tables, refer to [DataTable](/table-group/data-table/data-table).

## Table types

- [Primary table](/table-group/table-primary/table-primary): This is the fundamental table type designed for presenting extensive data volumes and complex functionality.
- [Secondary table](/table-group/table-secondary/table-secondary): A table type for displaying a small amount of data in a compact format, without complex functionality within widgets and cards.

## Controls

In this section, you'll find all the essential recommendations for table controls.

::: react-view

<script lang="tsx">
import React from 'react'; 
import ComponentCard from '@components/../components/ComponentCard'; 
const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, ''); 
  return name.charAt(0).toLowerCase() + name.slice(1); 
}; 

const group = {
  accordion: {

    title: 'Accordion',
    route: '/intergalactic/table-group/table-controls/table-controls#accordion',
    disabled: false,
    type: 'table',

  }, 
  checkboxes: {

    title: 'Checkboxes',
    route: '/intergalactic/table-group/table-controls/table-controls#checkboxes',
    disabled: false,
    type: 'table',

  }, 
  resizing: {

    title: 'Column resizing',
    route: '/intergalactic/table-group/table-controls/table-controls#column-resizing',
    disabled: false,
    type: 'table',

  }, 
  pagination: {

    title: 'Pagination',
    route: '/intergalactic/table-group/table-controls/table-controls#pagination',
    disabled: false,
    type: 'table',

  }, 
  sorting: {

    title: 'Sorting',
    route: '/intergalactic/table-group/table-controls/table-controls#sorting',
    disabled: false,
    type: 'table',

  }, 
  actionsRow: {

    title: 'Status and actions',
    route: '/intergalactic/table-group/table-controls/table-controls#status-and-actions',
    disabled: false,
    type: 'table',

  },
    tableSettings: {

    title: 'Table settings',
    route: '/intergalactic/table-group/table-controls/table-controls#table-settings-and-column-manager',
    disabled: false,
    type: 'table',

  },
    columnsManager: {

    title: 'Column manager',
    route: '/intergalactic/table-group/table-controls/table-controls#table-settings-and-column-manager',
    disabled: false,
    type: 'table',

  },
}; 

const styles = `
  .table-group-grid {

    display: grid;
    grid-template-rows: max-content;
    grid-template-columns: repeat(auto-fill, 160px);
    grid-gap: 12px 12px;
    width: 100%;
    margin: 0;
    margin-top: 12px;
    padding: 0;
    padding-left: 0 !important;
    list-style: none;

  }

  ._card {
    gap: 8px;
  }
`; 

const App = function () {
  React.useEffect(() => {

    const styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();

  }, []); 

  const items = Object.keys(group).map((el) => group[el]); 

  return (

    <ul className='table-group-grid'>
      {items.map((item) => (
        <ComponentCard
          key={item.title}
          image={getImageName(item.title)}
          text={item.title}
          disabled={item.disabled}
          href={item.route}
          type={item.type}
        />
      ))}
    </ul>

  ); 
}
</script>

:::

## Use cases

This section outlines the most common scenarios for using our tables.

::: react-view

<script lang="tsx">
import React from 'react'; 
import ComponentCard from '@components/../components/ComponentCard'; 
const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, ''); 
  return name.charAt(0).toLowerCase() + name.slice(1); 
}; 

const group = {
  editing: {

    title: 'Editing and adding content',
    route: '/intergalactic/table-group/table-controls/table-controls#editing-and-adding-content',
    disabled: false,
    type: 'table',

  }, 
  highlighting: {

    title: 'Highlighting content',
    route: '/intergalactic/table-group/table-controls/table-controls#highlighting-content',
    disabled: false,
    type: 'table',

  }, 
  links: {

    title: 'Internal and external links',
    route: '/intergalactic/table-group/table-controls/table-controls#internal-and-external-links',
    disabled: false,
    type: 'table',

  }, 
  linksLong: {

    title: 'Long links and text',
    route: '/intergalactic/table-group/table-controls/table-controls#long-links-and-text',
    disabled: false,
    type: 'table',

  },
}; 

const styles = `
  .table-group-grid {

    display: grid;
    grid-template-rows: max-content;
    grid-template-columns: repeat(auto-fill, 160px);
    grid-gap: 12px 12px;
    width: 100%;
    margin: 0;
    margin-top: 12px;
    padding: 0;
    padding-left: 0 !important;

  }
`; 

const App = function () {
  React.useEffect(() => {

    const styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();

  }, []); 

  const items = Object.keys(group).map((el) => group[el]); 

  return (

    <ul className='table-group-grid'>
      {items.map((item) => (
        <ComponentCard
          key={item.title}
          image={getImageName(item.title)}
          text={item.title}
          disabled={item.disabled}
          href={item.route}
          type={item.type}
        />
      ))}
    </ul>

  ); 
}
</script>

:::

## States

Here, you'll find descriptions of all the different states that our tables can have.

::: react-view

<script lang="tsx">
import React from 'react'; 
import ComponentCard from '@components/../components/ComponentCard'; 
const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, ''); 
  return name.charAt(0).toLowerCase() + name.slice(1); 
}; 

const group = {
  empty: {

    title: 'Empty table',
    route: '/intergalactic/table-group/table-states/table-states#empty-table',
    disabled: false,
    type: 'table',

  }, 
  loading: {

    title: 'Loading',
    route: '/intergalactic/table-group/table-states/table-states#loading',
    disabled: false,
    type: 'table',

  }, 
  noData: {

    title: 'No data',
    route: '/intergalactic/table-group/table-states/table-states#no-data',
    disabled: false,
    type: 'table',

  }, 
  nothingFound: {

    title: 'Nothing found',
    route: '/intergalactic/table-group/table-states/table-states#nothing-found',
    disabled: false,
    type: 'table',

  }, 
  progressbar: {

    title: 'Progressbar',
    route: '/intergalactic/table-group/table-states/table-states#progressbar',
    disabled: false,
    type: 'table',

  }, 
  skeleton: {

    title: 'Skeleton',
    route: '/intergalactic/table-group/table-states/table-states#skeleton',
    disabled: false,
    type: 'table',

  }, 
  error: {

    title: 'Something went wrong',
    route: '/intergalactic/table-group/table-states/table-states#something-went-wrong',
    disabled: false,
    type: 'table',

  }, 
}; 

const styles = `
  .table-group-grid {

    display: grid;
    grid-template-rows: max-content;
    grid-template-columns: repeat(auto-fill, 160px);
    grid-gap: 12px 12px;
    width: 100%;
    margin: 0;
    margin-top: 12px;
    padding: 0;
    padding-left: 0 !important;

  }
`; 

const App = function () {
  React.useEffect(() => {

    const styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();

  }, []); 

  const items = Object.keys(group).map((el) => group[el]); 

  return (

    <ul className='table-group-grid'>
      {items.map((item) => (
        <ComponentCard
          key={item.title}
          image={getImageName(item.title)}
          text={item.title}
          disabled={item.disabled}
          href={item.route}
          type={item.type}
        />
      ))}
    </ul>

  ); 
}
</script>

:::
