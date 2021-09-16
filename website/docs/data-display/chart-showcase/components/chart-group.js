import React from 'react';
import ComponentCard from '../../../../client/components/ComponentCard';
import { getImageName } from '../../../../client/pages/Home';
import styled from 'styled-components';

const group = {
  bar: {
    title: 'Bar chart',
    route: '/data-display/bar-chart',
    disabled: false,
  },
  horizontalBar: {
    title: 'Horizontal bar chart',
    route: '/data-display/bar-horizontal',
    disabled: false,
  },
  donut: {
    title: 'Donut Pie chart',
    route: '/data-display/donut-chart',
    disabled: false,
  },
  bubble: {
    title: 'Bubble chart',
    route: '/data-display/bubble-chart',
    disabled: true,
  },
  lollipop: {
    title: 'Lollipop chart',
    route: '/data-display/lollipop-chart',
    disabled: true,
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
  const charts = props.group.map((chart) => group[chart]);

  return (
    <Cards>
      {charts.map((chart) => (
        <ComponentCard
          key={chart.title}
          image={getImageName(chart.title)}
          text={chart.title}
          disabled={chart.disabled}
          href={chart.route}
          type="charts"
        />
      ))}
    </Cards>
  );
}
