import React from 'react';
import ComponentCard from '../../../../client/components/ComponentCard';
import { getImageName } from '../../../../client/pages/Home';
import styled from 'styled-components';

const group = {
  accordion: {
    title: 'Accordion',
    route: '/table-group/table-controls/#a4d5aa',
    disabled: false,
    type: 'table',
  },
  checkboxes: {
    title: 'Checkboxes',
    route: '/table-group/table-controls/#ac425f',
    disabled: false,
    type: 'table',
  },
  resizing: {
    title: 'Columns resizing',
    route: '/table-group/table-controls/#aaac27',
    disabled: false,
    type: 'table',
  },
  editing: {
    title: 'Editing and adding content',
    route: '/table-group/table-controls/#af4b38',
    disabled: false,
    type: 'table',
  },
  highlighting: {
    title: 'Highlighting content',
    route: '/table-group/table-controls/#a25eaa',
    disabled: false,
    type: 'table',
  },
  links: {
    title: 'Internal and external links',
    route: '/table-group/table-controls/#a5d124',
    disabled: false,
    type: 'table',
  },
  linksLong: {
    title: 'Long links and text',
    route: '/table-group/table-controls/#a5b913',
    disabled: false,
    type: 'table',
  },
  pagination: {
    title: 'Pagination',
    route: '/table-group/table-controls/#acbb81',
    disabled: false,
    type: 'table',
  },
  sorting: {
    title: 'Sorting',
    route: '/table-group/table-controls/#a2808a',
    disabled: false,
    type: 'table',
  },
  actionsRow: {
    title: 'Status and actions row',
    route: '/table-group/table-controls/#a02c09',
    disabled: false,
    type: 'table',
  },
  empty: {
    title: 'Empty table',
    route: '/table-group/table-states/#a2d2d0',
    disabled: false,
    type: 'table',
  },
  loading: {
    title: 'Loading',
    route: '/table-group/table-states/#a16bfb',
    disabled: false,
    type: 'table',
  },
  noData: {
    title: 'No data',
    route: '/table-group/table-states/#a42a7b',
    disabled: false,
    type: 'table',
  },
  nothingFound: {
    title: 'Nothing found',
    route: '/table-group/table-states/#a9076c',
    disabled: false,
    type: 'table',
  },
  skeleton: {
    title: 'Skeleton',
    route: '/table-group/table-states/#a6ab48',
    disabled: false,
    type: 'table',
  },
  error: {
    title: 'Something went wrong',
    route: '/table-group/table-states/#a6609d',
    disabled: false,
    type: 'table',
  },
};

const Cards = styled.div`
  display: grid;
  grid-template-rows: max-content;
  grid-template-columns: repeat(auto-fill, 176px);
  grid-gap: 12px 12px;
  width: 100%;
  margin: 0;
  margin-top: 12px;
  padding: 0;
`;

export default function(props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Cards>
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
    </Cards>
  );
}
