---
title: Table showcase
fileSource: data-table
tabName: Design
docs: true
---

Here you will find all quick links for our table and its specific use cases.

- [Primary table](/table-group/table-primary/table-primary)
- [Secondary table](/table-group/table-secondary/table-secondary)

## Controls

Here you’ll find all controls and recommendations which are important when working with our tables.

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
    route: '/intergalactic/table-group/table-controls/#a4d5aa',
    disabled: false,
    type: 'table',
  },
  checkboxes: {
    title: 'Checkboxes',
    route: '/intergalactic/table-group/table-controls/#ac425f',
    disabled: false,
    type: 'table',
  },
  resizing: {
    title: 'Columns resizing',
    route: '/intergalactic/table-group/table-controls/#aaac27',
    disabled: false,
    type: 'table',
  },
  editing: {
    title: 'Editing and adding content',
    route: '/intergalactic/table-group/table-controls/#af4b38',
    disabled: false,
    type: 'table',
  },
  highlighting: {
    title: 'Highlighting content',
    route: '/intergalactic/table-group/table-controls/#a25eaa',
    disabled: false,
    type: 'table',
  },
  links: {
    title: 'Internal and external links',
    route: '/intergalactic/table-group/table-controls/#a5d124',
    disabled: false,
    type: 'table',
  },
  linksLong: {
    title: 'Long links and text',
    route: '/intergalactic/table-group/table-controls/#a5b913',
    disabled: false,
    type: 'table',
  },
  pagination: {
    title: 'Pagination',
    route: '/intergalactic/table-group/table-controls/#acbb81',
    disabled: false,
    type: 'table',
  },
  sorting: {
    title: 'Sorting',
    route: '/intergalactic/table-group/table-controls/#a2808a',
    disabled: false,
    type: 'table',
  },
  actionsRow: {
    title: 'Status and actions row',
    route: '/intergalactic/table-group/table-controls/#a02c09',
    disabled: false,
    type: 'table',
  },
  empty: {
    title: 'Empty table',
    route: '/intergalactic/table-group/table-states/#a2d2d0',
    disabled: false,
    type: 'table',
  },
  loading: {
    title: 'Loading',
    route: '/intergalactic/table-group/table-states/#a16bfb',
    disabled: false,
    type: 'table',
  },
  noData: {
    title: 'No data',
    route: '/intergalactic/table-group/table-states/#a42a7b',
    disabled: false,
    type: 'table',
  },
  nothingFound: {
    title: 'Nothing found',
    route: '/intergalactic/table-group/table-states/#a9076c',
    disabled: false,
    type: 'table',
  },
  progressbar: {
    title: 'Progressbar',
    route: '/intergalactic/table-group/table-states/#a6ab48',
    disabled: false,
    type: 'table',
  },
  skeleton: {
    title: 'Skeleton',
    route: '/intergalactic/table-group/table-states/#a6ab48',
    disabled: false,
    type: 'table',
  },
  error: {
    title: 'Something went wrong',
    route: '/intergalactic/table-group/table-states/#a6609d',
    disabled: false,
    type: 'table',
  },
};

const styles = `
  .table-group-grid {
    display: grid;
    grid-template-rows: max-content;
    grid-template-columns: repeat(auto-fill, 176px);
    grid-gap: 12px 12px;
    width: 100%;
    margin: 0;
    margin-top: 12px;
    padding: 0;
  }
`;

const App = function (props) {
  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  const items = Object.keys(group).map((el) => group[el]);

  return (
    <div className='table-group-grid'>
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
    </div>
  );
}
</script>

:::

## Use cases

This section describes the most common table use cases.

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
    route: '/intergalactic/table-group/table-controls/#a4d5aa',
    disabled: false,
    type: 'table',
  },
  checkboxes: {
    title: 'Checkboxes',
    route: '/intergalactic/table-group/table-controls/#ac425f',
    disabled: false,
    type: 'table',
  },
  resizing: {
    title: 'Columns resizing',
    route: '/intergalactic/table-group/table-controls/#aaac27',
    disabled: false,
    type: 'table',
  },
  editing: {
    title: 'Editing and adding content',
    route: '/intergalactic/table-group/table-controls/#af4b38',
    disabled: false,
    type: 'table',
  },
  highlighting: {
    title: 'Highlighting content',
    route: '/intergalactic/table-group/table-controls/#a25eaa',
    disabled: false,
    type: 'table',
  },
  links: {
    title: 'Internal and external links',
    route: '/intergalactic/table-group/table-controls/#a5d124',
    disabled: false,
    type: 'table',
  },
  linksLong: {
    title: 'Long links and text',
    route: '/intergalactic/table-group/table-controls/#a5b913',
    disabled: false,
    type: 'table',
  },
  pagination: {
    title: 'Pagination',
    route: '/intergalactic/table-group/table-controls/#acbb81',
    disabled: false,
    type: 'table',
  },
  sorting: {
    title: 'Sorting',
    route: '/intergalactic/table-group/table-controls/#a2808a',
    disabled: false,
    type: 'table',
  },
  actionsRow: {
    title: 'Status and actions row',
    route: '/intergalactic/table-group/table-controls/#a02c09',
    disabled: false,
    type: 'table',
  },
  empty: {
    title: 'Empty table',
    route: '/intergalactic/table-group/table-states/#a2d2d0',
    disabled: false,
    type: 'table',
  },
  loading: {
    title: 'Loading',
    route: '/intergalactic/table-group/table-states/#a16bfb',
    disabled: false,
    type: 'table',
  },
  noData: {
    title: 'No data',
    route: '/intergalactic/table-group/table-states/#a42a7b',
    disabled: false,
    type: 'table',
  },
  nothingFound: {
    title: 'Nothing found',
    route: '/intergalactic/table-group/table-states/#a9076c',
    disabled: false,
    type: 'table',
  },
  progressbar: {
    title: 'Progressbar',
    route: '/intergalactic/table-group/table-states/#a6ab48',
    disabled: false,
    type: 'table',
  },
  skeleton: {
    title: 'Skeleton',
    route: '/intergalactic/table-group/table-states/#a6ab48',
    disabled: false,
    type: 'table',
  },
  error: {
    title: 'Something went wrong',
    route: '/intergalactic/table-group/table-states/#a6609d',
    disabled: false,
    type: 'table',
  },
};

const styles = `
  .table-group-grid {
    display: grid;
    grid-template-rows: max-content;
    grid-template-columns: repeat(auto-fill, 176px);
    grid-gap: 12px 12px;
    width: 100%;
    margin: 0;
    margin-top: 12px;
    padding: 0;
  }
`;

const App = function (props) {
  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  const items = Object.keys(group).map((el) => group[el]);

  return (
    <div className='table-group-grid'>
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
    </div>
  );
}
</script>

:::

## States

Here we have descriptions for all table states.

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
    route: '/intergalactic/table-group/table-controls/#a4d5aa',
    disabled: false,
    type: 'table',
  },
  checkboxes: {
    title: 'Checkboxes',
    route: '/intergalactic/table-group/table-controls/#ac425f',
    disabled: false,
    type: 'table',
  },
  resizing: {
    title: 'Columns resizing',
    route: '/intergalactic/table-group/table-controls/#aaac27',
    disabled: false,
    type: 'table',
  },
  editing: {
    title: 'Editing and adding content',
    route: '/intergalactic/table-group/table-controls/#af4b38',
    disabled: false,
    type: 'table',
  },
  highlighting: {
    title: 'Highlighting content',
    route: '/intergalactic/table-group/table-controls/#a25eaa',
    disabled: false,
    type: 'table',
  },
  links: {
    title: 'Internal and external links',
    route: '/intergalactic/table-group/table-controls/#a5d124',
    disabled: false,
    type: 'table',
  },
  linksLong: {
    title: 'Long links and text',
    route: '/intergalactic/table-group/table-controls/#a5b913',
    disabled: false,
    type: 'table',
  },
  pagination: {
    title: 'Pagination',
    route: '/intergalactic/table-group/table-controls/#acbb81',
    disabled: false,
    type: 'table',
  },
  sorting: {
    title: 'Sorting',
    route: '/intergalactic/table-group/table-controls/#a2808a',
    disabled: false,
    type: 'table',
  },
  actionsRow: {
    title: 'Status and actions row',
    route: '/intergalactic/table-group/table-controls/#a02c09',
    disabled: false,
    type: 'table',
  },
  empty: {
    title: 'Empty table',
    route: '/intergalactic/table-group/table-states/#a2d2d0',
    disabled: false,
    type: 'table',
  },
  loading: {
    title: 'Loading',
    route: '/intergalactic/table-group/table-states/#a16bfb',
    disabled: false,
    type: 'table',
  },
  noData: {
    title: 'No data',
    route: '/intergalactic/table-group/table-states/#a42a7b',
    disabled: false,
    type: 'table',
  },
  nothingFound: {
    title: 'Nothing found',
    route: '/intergalactic/table-group/table-states/#a9076c',
    disabled: false,
    type: 'table',
  },
  progressbar: {
    title: 'Progressbar',
    route: '/intergalactic/table-group/table-states/#a6ab48',
    disabled: false,
    type: 'table',
  },
  skeleton: {
    title: 'Skeleton',
    route: '/intergalactic/table-group/table-states/#a6ab48',
    disabled: false,
    type: 'table',
  },
  error: {
    title: 'Something went wrong',
    route: '/intergalactic/table-group/table-states/#a6609d',
    disabled: false,
    type: 'table',
  },
};

const styles = `
  .table-group-grid {
    display: grid;
    grid-template-rows: max-content;
    grid-template-columns: repeat(auto-fill, 176px);
    grid-gap: 12px 12px;
    width: 100%;
    margin: 0;
    margin-top: 12px;
    padding: 0;
  }
`;

const App = function (props) {
  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  const items = Object.keys(group).map((el) => group[el]);

  return (
    <div className='table-group-grid'>
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
    </div>
  );
}
</script>

:::
