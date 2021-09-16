import React from 'react';
import ComponentCard from '../../../../client/components/ComponentCard';
import { getImageName } from '../../../../client/pages/Home';
import styled from 'styled-components';

const group = {
  bar: {
    title: 'Bar chart',
    route: '/data-display/bar-chart',
    disabled: false,
    type: 'charts',
  },
  horizontalBar: {
    title: 'Horizontal bar chart',
    route: '/data-display/bar-horizontal',
    disabled: false,
    type: 'charts',
  },
  donut: {
    title: 'Donut Pie chart',
    route: '/data-display/donut-chart',
    disabled: false,
    type: 'charts',
  },
  bubble: {
    title: 'Bubble chart',
    route: '/data-display/bubble-chart',
    disabled: true,
    type: 'charts',
  },
  lollipop: {
    title: 'Lollipop chart',
    route: '/data-display/lollipop-chart',
    disabled: true,
    type: 'charts',
  },
  accordion: {
    title: 'Accordion',
    route: '/table-group/table-controls/#ac425f',
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
