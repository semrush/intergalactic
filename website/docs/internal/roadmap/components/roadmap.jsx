import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Tabs from '@semcore/ui/tab-panel';

import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { css } from '@semcore/ui/core';
import './roadmap-page.css';

const styles = css`
  STabPanelItem {
    &:active,
    &[active] {
      color: var(--intergalactic-control-primary-brand);
    }
  }
`;

const LinkComponent = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Oval = styled.span`
  display: inline-block;
  margin-right: var(--intergalactic-spacing-2x);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const Legenda = styled.ul`
  display: flex;
  padding: 0;
  margin: 0 0 var(--intergalactic-spacing-4x) !important;
  list-style: none;

  li {
    display: flex;
    align-items: flex-start;
  }

  li:first-child {
    span {
      background: var(--intergalactic-chart-palette-order-14);
    }
  }

  li:nth-child(2) {
    margin-left: var(--intergalactic-spacing-6x);
    span {
      background: var(--intergalactic-chart-palette-order-6);
    }
  }
`;

const Row_Column = styled.div`
  grid-template-columns: ${({ size }) => `repeat(${size}, calc(100% / ${size}));`};
`;

const Row_Bar = styled.ul`
  grid-template-columns: ${({ size }) => `repeat(${size}, 1fr);`};
`;

dayjs.locale('ru');
// 1month = 2sprints
// 1q = 3months
function generateSprint(startDay, finishDay) {
  const dateSprint = [startDay];
  let lastDay = startDay;
  while (lastDay < finishDay) {
    const next = lastDay.add(14, 'day');
    lastDay = next;
    dateSprint.push(next);
  }
  return dateSprint;
}

const year2020 = generateSprint(dayjs('2020-01-06'), dayjs('2020-12-27'));
const year2021 = [
  ...generateSprint(dayjs('2021-01-18'), dayjs('2021-04-25')),
  ...generateSprint(dayjs('2021-05-17'), dayjs('2021-12-30')),
];
const year2022 = [
  ...generateSprint(dayjs('2022-01-10'), dayjs('2022-03-04')),
  ...generateSprint(dayjs('2022-03-14'), dayjs('2022-12-30')),
];
const year2023 = [
  ...generateSprint(dayjs('2023-01-09'), dayjs('2023-03-03')),
  ...generateSprint(dayjs('2023-03-20'), dayjs('2023-12-30')),
];

const dateSprint = [...year2020, ...year2021, ...year2022, ...year2023];
const components = {
  'Q1 2021': [
    { text: 'Wake up sprint ⏰', size: { kit: '1/3' } },
    { text: 'Mobile first guides', size: { ui: '3/9' } },
    { text: 'Mobile first components', size: { kit: '3/11' } },
    { text: 'D3 Charts: Line, Bar', size: { kit: '3/7' } },
    { text: 'GlobalNotice', size: { ui: '7/11', kit: '9/13' } },
    { text: 'Slider', size: { ui: '9/13', kit: '11/13' } },
    { text: 'Themes enchancement', size: { kit: '7/13' } },
    { text: 'D3 Charts: Donut', size: { kit: '9/13' } },
    { text: 'D3 Charts: Area', size: { kit: '11/13' } },
  ],
  'Q2 2021': [
    { text: 'Slider', size: { kit: '1/3' } },
    { text: 'D3 Charts: Donut', size: { kit: '1/5' } },
    { text: 'InputNumber improvements', size: { kit: '5/7' } },
    { text: 'PanelSummary', size: { ui: '5/9', kit: '11/15' } },
    { text: 'D3 Charts: Venn', size: { kit: '7/11' } },
    { text: 'Filter examples', size: { kit: '9/13' } },
    { text: 'D3 Charts: ScatterPlot', size: { kit: '11/15' } },
    { text: 'Themes & styles enchancement', size: { kit: '1/9' } },
  ],
  'Q3 2021': [
    { text: 'Technical sprint', size: { kit: '1/3' } },
    { text: 'Filter forms examples', size: { kit: '3/7' } },
    { text: 'Product emails library', size: { kit: '3/13' } },
    {
      text: 'Data visualization section restyling',
      size: { ui: '3/9', kit: '9/15' },
    },
    { text: 'Components restyling', size: { ui: '1/15' } },
  ],
  'Q4 2021': [
    { text: 'Technical sprint', size: { kit: '1/5' } },
    { text: 'Restyling', size: { ui: '1/4', kit: '4/9' } },
    { text: 'Scatterplot chart', size: { ui: '3/7', kit: '7/11' } },
    { text: 'Bubble chart', size: { ui: '5/7', kit: '7/11' } },
    { text: 'Sandbox', size: { kit: '7/11' } },
    { text: 'Mind Map chart', size: { ui: '9/13' } },
    { text: 'Technical sprint', size: { kit: '11/13' } },
  ],
  'Q1 2022': [
    { text: 'Scatterplot chart', size: { ui: '1/3', kit: '1/5' } },
    { text: 'New icons', size: { kit: '1/5' } },
    { text: 'Bubble chart', size: { kit: '3/7' } },
    { text: 'InlineInput', size: { ui: '5/9', kit: '9/13' } },
    { text: 'RadialTree chart', size: { ui: '7/13', kit: '11/15' } },
    { text: 'Wizard', size: { ui: '9/15', kit: '13/15' } },
    { text: 'Card', size: { ui: '9/15' } },
    { text: 'Guides renewal', size: { ui: '1/15' } },
  ],
  'Q2 2022': [
    { text: 'Wizard', size: { ui: '1/3', kit: '5/9' } },
    { text: 'Card', size: { ui: '1/7' } },
    { text: 'ColorPicker', size: { ui: '9/11', kit: '11/13' } },
    { text: 'Lollipop chart', size: { ui: '9/11', kit: '11/13' } },
    { text: 'Limit message', size: { ui: '11/13' } },
    { text: 'Guides renewal', size: { ui: '1/13' } },
  ],
  'Q3 2022': [
    { text: 'Illustration', size: { ui: '1/3' } },
    { text: 'ColorPicker', size: { kit: '1/9' } },
    { text: 'Ellipsis', size: { ui: '3/9', kit: '9/13' } },
    { text: 'A11y components enhancement', size: { ui: '1/13', kit: '1/13' } },
  ],
  'Q4 2022': [
    { text: 'Ellipsis', size: { kit: '1/5' } },
    { text: 'Table enhancement', size: { ui: '3/5', kit: '5/9' } },
    { text: 'Components animation', size: { ui: '7/15', kit: '11/15' } },
    { text: 'A11y components enhancement', size: { ui: '1/15', kit: '1/7' } },
  ],
  'Q1 2023': [
    { text: 'Design Tokens and Themes onboarding', size: { ui: '1/11', kit: '1/11' } },
    { text: 'Radar chart', size: { ui: '1/8', kit: '4/9' } },
    { text: 'Components animation', size: { kit: '5/9' } },
    { text: 'BottomSheet (draft name)', size: { ui: '9/15', kit: '11/15' } },
  ],
  'Q2 2023': [{ text: 'Enhancing accessibility of the components', size: { kit: '1/11' } }],
};

function Gant(props) {
  const { sprint = [], components = [] } = props;
  const lengthSprint = sprint.length - 1;

  return (
    <div className='gantt'>
      <Row_Column className='gantt__row gantt__row--months' size={lengthSprint}>
        {sprint.map((date, index) => {
          if (index === lengthSprint) return null;
          return (
            <span key={date}>{`${date.format('D MMM')}-${sprint[index + 1]
              .subtract(1, 'day')
              .format('D MMM')}`}</span>
          );
        })}
      </Row_Column>
      <Row_Column className='gantt__row gantt__row--lines' size={lengthSprint}>
        {sprint.map((date, index) => {
          const currentDate = dayjs();
          if (index === lengthSprint) return null;
          if (date < currentDate && sprint[index + 1].subtract(1, 'day') > currentDate) {
            return <span className='marker' key={date} />;
          }
          return <span key={date} />;
        })}
      </Row_Column>

      {/* rome-ignore lint/style/useDefaultParameterLast: */}
      {components.map((component = {}, index) => (
        <Row_Bar className='gantt__row-bars' size={lengthSprint * 2} key={index}>
          {Object.keys(component.size).map((team, index) => (
            <li
              key={index}
              style={{
                gridColumn: component.size[team],
              }}
              className={`gantt__row-bars__${team}`}
              title={component.text}
            >
              {component.name && <LinkComponent to={`/components/${component.name}`} />}
              {component.text}
            </li>
          ))}
        </Row_Bar>
      ))}
    </div>
  );
}

function Roadmap() {
  const [value, setValue] = useState(9);
  let TabContent = null;

  switch (value) {
    case 0:
      TabContent = <Gant sprint={dateSprint.slice(26, 33)} components={components['Q1 2021']} />;
      break;
    case 1:
      TabContent = <Gant sprint={dateSprint.slice(32, 39)} components={components['Q2 2021']} />;
      break;
    case 2:
      TabContent = <Gant sprint={dateSprint.slice(38, 47)} components={components['Q3 2021']} />;
      break;
    case 3:
      TabContent = <Gant sprint={dateSprint.slice(46, 53)} components={components['Q4 2021']} />;
      break;
    case 4:
      TabContent = <Gant sprint={dateSprint.slice(53, 61)} components={components['Q1 2022']} />;
      break;
    case 5:
      TabContent = <Gant sprint={dateSprint.slice(60, 67)} components={components['Q2 2022']} />;
      break;
    case 6:
      TabContent = <Gant sprint={dateSprint.slice(66, 73)} components={components['Q3 2022']} />;
      break;
    case 7:
      TabContent = <Gant sprint={dateSprint.slice(72, 80)} components={components['Q4 2022']} />;
      break;
    case 8:
      TabContent = <Gant sprint={dateSprint.slice(80, 87)} components={components['Q1 2023']} />;
      break;
    case 9:
      TabContent = <Gant sprint={dateSprint.slice(86, 93)} components={components['Q2 2023']} />;
      break;
  }
  return (
    <>
      <Tabs value={value} onChange={(v) => setValue(v)} mb={5} styles={styles} className='tabs'>
        {Object.keys(components).map((nameQ, i) => (
          <Tabs.Item key={nameQ} value={i}>
            {nameQ}
          </Tabs.Item>
        ))}
      </Tabs>
      <Legenda>
        <li>
          <Oval />
          UX/UI
        </li>
        <li>
          <Oval />
          Development
        </li>
      </Legenda>
      {TabContent}
    </>
  );
}

export default Roadmap;
