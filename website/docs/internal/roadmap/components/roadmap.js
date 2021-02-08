import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Tabs from '@semcore/tab-panel';

import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { css } from '@semcore/core';

const styles = css`
  STabPanelItem {
    &:active,
    &[active] {
      color: #ff622d;
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
  margin-right: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const Legenda = styled.ul`
  display: flex;
  padding: 0;
  margin: 0 0 16px !important;
  list-style: none;

  li {
    display: flex;
    align-items: flex-start;
  }

  li:first-child {
    span {
      background: rgba(184, 128, 255, 0.4);
    }
  }

  li:nth-child(2) {
    margin-left: 24px;
    span {
      background: #b880ff;
    }
  }
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

const year2018 = generateSprint(dayjs('2018-07-9'), dayjs('2018-12-23'));
const year2019 = generateSprint(dayjs('2019-02-9'), dayjs('2019-12-29'));
const year2020 = generateSprint(dayjs('2020-01-06'), dayjs('2020-12-27'));
const year2021 = generateSprint(dayjs('2021-01-04'), dayjs('2021-03-28'));
const dateSprint = [
  ...year2018,
  dayjs('2018-12-30'),
  dayjs('2019-01-10'),
  dayjs('2019-01-26'),
  ...year2019,
  ...year2020,
  ...year2021,
];

const components = {
  'Q3 2018': [
    { text: 'Checkbox', name: 'checkbox', size: { ui: '5/7', kit: '7/9' } },
    { text: 'Radiobutton', name: 'radio', size: { ui: '5/7', kit: '7/9' } },
    { text: 'Input', name: 'input', size: { ui: '1/7', kit: '7/11' } },
    { text: 'Textarea', name: 'textarea', size: { ui: '3/7', kit: '7/11' } },
    {
      text: 'ControlsGroup',
      name: 'controls-group',
      size: { ui: '5/7', kit: '7/9' },
    },
    { text: 'Link', name: 'link', size: { ui: '5/7', kit: '7/9' } },
    { text: 'Dropdown', name: 'dropdown', size: { ui: '9/11', kit: '11/13' } },
    { text: 'Popover', size: { ui: '9/11', kit: '11/13' } },
    { text: 'Tooltip', size: { ui: '9/11', kit: '11/13' } },
    { text: 'Notice', name: 'notice', size: { ui: '11/13' } },
    { text: 'Chart', size: { ui: '1/13' } },
  ],
  'Q4 2018': [
    { text: 'Notice', name: 'notice', size: { kit: '1/3' } },
    { text: 'Feedback', size: { ui: '1/3', kit: '3/5' } },
    { text: 'FeedbackYesNo', size: { ui: '1/3' } },
    { text: 'Tag', name: 'tag', size: { ui: '4/6', kit: '6/8' } },
    { text: 'Pills', name: 'pills', size: { ui: '5/7', kit: '8/9' } },
    { text: 'Badge', name: 'badge', size: { ui: '6/8', kit: '8/9' } },
    {
      text: 'ScrollArea',
      name: 'scroll-area',
      size: { ui: '10/11', kit: '11/12' },
    },
    {
      text: 'Select / Option / Multiselect',
      size: { ui: '3/11', kit: '12/15' },
    },
    { text: 'Dot', size: { ui: '8/14' } },
    { text: 'Tab', size: { ui: '8/10' } },
    { text: 'PanelSummary / Metric', size: { ui: '8/13' } },
    { text: 'Table 2.0', size: { ui: '8/11', kit: '11/15' } },
    { text: 'Skeleton', size: { ui: '8/14' } },
    { text: 'Datepicker', size: { ui: '12/14' } },
    { text: 'Modal', size: { ui: '12/14' } },
    { text: 'Limit Indicator', size: { ui: '11/12' } },
    { text: 'Chart', size: { ui: '1/3', kit: '9/15' } },
  ],
  'Q1 2019': [
    { text: 'Tooltip', name: 'tooltip', size: { kit: '1/3' } },
    { text: 'Select/Multiselect', name: 'select', size: { kit: '1/3' } },
    { text: 'Dropdown-menu', name: 'dropdown-menu', size: { kit: '1/3' } },
    { text: 'Table', name: 'table', size: { kit: '1/3' } },
    { text: 'Dot', name: 'dot', size: { ui: '1/2', kit: '2/3' } },
    {
      text: 'ProgressBar',
      name: 'progress-bar',
      size: { ui: '1/2', kit: '3/5' },
    },
    { text: 'TabPanel', name: 'tab-panel', size: { ui: '3/4', kit: '4/5' } },
    { text: 'TabLine', name: 'tab-line', size: { ui: '3/4', kit: '4/5' } },
    { text: 'Line chart', name: 'line-chart', size: { kit: '4/7' } },
    { text: 'Skeleton', name: 'skeleton', size: { ui: '3/6', kit: '6/7' } },
    { text: 'Modal', name: 'modal', size: { ui: '4/6', kit: '6/7' } },
    { text: 'Divider', name: 'divider', size: { ui: '5/6', kit: '6/7' } },
    { text: 'Pattern: Errors', size: { kit: '5/7' } },
    { text: 'Combobox', name: 'auto-tips', size: { ui: '5/9', kit: '9/11' } },
    {
      text: 'SuggestDropdown',
      name: 'auto-tips',
      size: { ui: '5/9', kit: '9/11' },
    },
    { text: 'Date picker', size: { ui: '5/11', kit: '11/13' } },
    { text: 'Table 3.0', size: { ui: '7/10', kit: '11/12' } },
    { text: 'Time picker', size: { ui: '7/9', kit: '11/12' } },
    {
      text: 'InputNumber',
      name: 'input-number',
      size: { ui: '7/8', kit: '8/9' },
    },
    { text: 'Form', name: 'form', size: { ui: '7/8', kit: '8/9' } },
    { text: 'Pattern: Система отступов', size: { ui: '7/9' } },
    { text: 'Pagination', name: 'pagination', size: { kit: '7/9' } },
    { text: 'Area chart', name: 'area-chart', size: { kit: '7/9' } },
    { text: 'Bar chart', size: { ui: '7/11', kit: '11/13' } },
    { text: 'Pattern: Accordion', size: { ui: '9/11' } },
    { text: 'Pattern: Система подсказок, реклама фич', size: { ui: '9/13' } },
  ],
  'Q2 2019': [
    { text: 'Bar chart', name: 'bar-chart', size: { ui: '1/2', kit: '2/3' } },
    { text: 'Sticky', name: 'sticky', size: { kit: '2/3' } },
    { text: 'InputTags', name: 'input-tags', size: { kit: '1/3' } },
    { text: 'Flags', name: 'flags', size: { kit: '1/3' } },
    { text: 'Checkbox/Radio themes', size: { kit: '1/3' } },
    { text: 'Technichal sprint 🛠', size: { kit: '3/5' } },
    { text: 'Table 3.0', name: 'table', size: { kit: '1/7' } },
    { text: 'Time picker', name: 'time-picker', size: { kit: '1/7' } },
    { text: 'Product head', size: { kit: '7/9' } },
    { text: 'Breadcrumbs', name: 'breadcrumbs', size: { kit: '7/9' } },
    { text: 'Informer', size: { ui: '7/8', kit: '8/9' } },
    {
      text: 'Horizontal bar chart',
      name: 'bar-chart',
      size: { ui: '1/5', kit: '9/11' },
    },
    { text: 'Date picker', size: { ui: '1/3', kit: '9/13' } },
    { text: 'Pie chart / Donut chart', size: { ui: '7/9', kit: '11/13' } },
    { text: 'Chart colors 🎨', size: { kit: '11/13' } },
    { text: 'Accordion', size: { ui: '1/13' } },
    { text: 'FeatureTooltip', size: { ui: '5/13' } },
    { text: 'Venn chart', size: { ui: '12/13' } },
    { text: 'Table 4.0', size: { ui: '12/13' } },
    { text: 'Pattern: Система подсказок', size: { ui: '1/11' } },
  ],
  'Q3 2019': [
    { text: 'InputMask / InputPhone', name: 'input-mask', size: { kit: '1/3' } },
    { text: 'Donut / Pie chart', name: 'chart', size: { kit: '1/3' } },
    { text: 'Chart colors 🎨', size: { kit: '1/3' } },
    { text: 'Spacing system', size: { ui: '1/4' } },
    { text: 'Date picker', name: 'date-picker', size: { kit: '1/5' } },
    { text: 'FilterTrigger', size: { ui: '1/7', kit: '13/15' } },
    { text: 'ProjectCreate', size: { kit: '5/9' } },
    { text: 'Histogram chart', size: { ui: '5/7' } },
    { text: 'Localization', size: { kit: '7/9' } },
    { text: 'GlobalErrors', name: 'errors', size: { kit: '9/11' } },
    { text: 'Technichal sprint 🛠', size: { kit: '9/11' } },
    { text: 'MonthRangePicker', name: 'date-picker', size: { kit: '9/13' } },
    { text: 'Table 4.0', size: { ui: '5/11' } },
    { text: 'WidgetErrors', name: 'errors', size: { kit: '11/15' } },
    { text: 'SSO page', size: { ui: '11/13' } },
    { text: 'Breakpoints (research)', size: { ui: '13/14', kit: '14/15' } },
    { text: 'Themes (research)', size: { kit: '14/15' } },
    { text: 'FeatureTooltip', size: { ui: '1/15' } },
    { text: 'Bubble chart', size: { ui: '11/13' } },
    { text: 'ScatterPlot chart', size: { ui: '13/15' } },
  ],
  'Q4 2019': [
    { text: 'Themes in UI Kit', size: { kit: '1/13' } },
    { text: 'Adaptive UI Kit components', size: { kit: '1/13' } },
    { text: 'Расширяемость CSS', size: { kit: '1/13' } },
    { text: 'ScatterPlot chart', size: { ui: '1/5' } },
    { text: 'Accordion', size: { ui: '1/2', kit: '2/7' } },
    { text: 'Venn chart', size: { kit: '1/7' } },
    { text: 'FeaturePopover (Spotlight)', size: { kit: '3/7' } },
    { text: 'Technical sprint 🛠', size: { kit: '5/7' } },
    { text: 'Table 4.0', name: 'table', size: { kit: '5/11' } },
    { text: 'Histogram chart', name: 'chart', size: { kit: '7/9' } },
    { text: 'Оповещания об обновлениях', size: { kit: '7/9' } },
    { text: 'Fullscreen modal 👑', size: { ui: '11/13' } },
    { text: 'Technical sprint 🛠', size: { kit: '11/13' } },
  ],
  'Q1 2020': [
    { text: 'z-index', size: { kit: '1/13' } },
    { text: 'a11y', size: { kit: '1/13' } },
    { text: 'Intergalactic enchancement 💪', size: { kit: '1/7' } },
    { text: 'Pagination', name: 'pagination', size: { kit: '3/7' } },
    { text: 'Fullscreen modal 👑', size: { ui: '3/7' } },
    { text: 'ChartHead', size: { kit: '5/7' } },
    { text: 'ChartLegend', size: { kit: '5/7' } },
    { text: 'Drag & drop', size: { ui: '5/11' } },
    { text: 'FullscreenModal', size: { ui: '5/11', kit: '11/13' } },
    { text: 'Component 2.0', size: { kit: '7/13' } },
    { text: 'ComplexExport', size: { ui: '9/11' } },
    { text: 'DivergingBar Chart', size: { ui: '11/13' } },
    { text: 'WizardModal 🧙🏻', size: { ui: '1/13' } },
    { text: 'ColorPicker input', size: { ui: '1/13' } },
  ],
  'Q2 2020': [
    { text: 'Component 2.0', size: { kit: '1/15' } },
    { text: 'FullscreenModal', size: { kit: '1/5' } },
    { text: 'Themes enchancement 💪', size: { kit: '3/9' } },
    { text: 'Drag & drop', size: { kit: '5/15' } },
    { text: 'PanelSummary', size: { ui: '5/15' } },
    { text: 'Funnel chart', size: { ui: '9/13' } },
    { text: 'Table enchancement 💪', name: 'table', size: { kit: '13/15' } },
    { text: 'TableData 💪', size: { kit: '13/15' } },
    { text: 'Counter', size: { kit: '13/15' } },
    { text: 'WizardModal 🧙🏻', size: { ui: '1/15' } },
  ],
  'Q3 2020': [
    { text: 'Documentation enchancement 💪', size: { kit: '1/15' } },
    { text: 'TableData 💪', size: { kit: '1/11' } },
    { text: 'Relise system research', size: { kit: '1/9' } },
    { text: 'SidePanel (Drawer)', size: { ui: '1/7', kit: '3/7' } },
    { text: 'Intergalactic enchancement 💪', size: { ui: '3/15' } },
    { text: 'Counter', size: { kit: '5/7' } },
    { text: 'ProjectSelect', size: { ui: '5/11' } },
    { text: 'Drag & drop', size: { kit: '7/11' } },
    { text: 'Funnel chart', size: { ui: '7/11' } },
    { text: 'Chart library research', size: { kit: '11/15' } },
    { text: 'Filters', size: { ui: '9/15' } },
    { text: 'a11y recommendations', size: { ui: '13/15' } },
    { text: 'MediaModal', size: { ui: '13/15' } },
  ],
  'Q4 2020': [
    { text: 'Documentation enchancement 💪', size: { kit: '1/13' } },
    { text: 'Intergalactic redesign 🎨', size: { ui: '1/5', kit: '5/13' } },
    { text: 'MediaModal', size: { ui: '1/3', kit: '1/5' } },
    { text: 'Filter Search', size: { ui: '1/3' } },
    { text: 'Advanced filters', size: { ui: '1/3' } },
    { text: 'Chart library research', size: { kit: '1/7' } },
    { text: 'PanelSummary', size: { ui: '1/7' } },
    { text: 'New brand styles implementation research', size: { ui: '3/13' } },
    { text: 'Other filter guides', size: { ui: '3/13' } },
    { text: 'New chart library', size: { kit: '7/13' } },
    { text: 'DataTable checkboxes functionality', size: { ui: '9/11', kit: '11/13' } },
    { text: 'WYSIWYG', size: { ui: '11/13' } },
  ],
  'Q1 2021': [
    { text: 'Wake up sprint ⏰', size: { kit: '1/3' } },
    { text: 'Mobile first guides', size: { ui: '3/9' } },
    { text: 'Mobile first components', size: { kit: '3/11' } },
    { text: 'Charts: Line, Bar', size: { kit: '3/7' } },
    { text: 'GlobalNotice', size: { ui: '7/11', kit: '9/13' } },
    { text: 'Slider', size: { ui: '9/13', kit: '11/13' } },
    { text: 'Themes enchancement', size: { kit: '7/13' } },
    { text: 'Charts: Donut', size: { kit: '9/13' } },
    { text: 'Charts: Area', size: { kit: '11/13' } },
  ],
};

function Gant(props) {
  const { sprint = [], components = [] } = props;
  const lengthSprint = sprint.length - 1;

  return (
    <div className="gantt">
      <div className={`gantt__row gantt__row--months gantt__row--months_${lengthSprint}`}>
        {sprint.map((date, index) => {
          if (index === lengthSprint) return null;
          return (
            <span key={date}>{`${date.format('D MMM')} - ${sprint[index + 1]
              .subtract(1, 'day')
              .format('D MMM')}`}</span>
          );
        })}
      </div>
      <div className={`gantt__row gantt__row--lines gantt__row--lines_${lengthSprint}`}>
        {sprint.map((date, index) => {
          const currentDate = dayjs();
          if (index === lengthSprint) return null;
          if (date < currentDate && sprint[index + 1].subtract(1, 'day') > currentDate) {
            return <span className="marker" key={date} />;
          }
          return <span key={date} />;
        })}
      </div>

      {components.map((component = {}, index) => (
        <ul className={`gantt__row-bars gantt__row-bars_${lengthSprint * 2}`} key={index}>
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
        </ul>
      ))}
    </div>
  );
}

function Roadmap() {
  const [value, setValue] = useState(10);
  let TabContent = null;

  switch (value) {
    case 0:
      TabContent = <Gant sprint={dateSprint.slice(0, 7)} components={components['Q3 2018']} />;
      break;
    case 1:
      TabContent = <Gant sprint={dateSprint.slice(6, 14)} components={components['Q4 2018']} />;
      break;
    case 2:
      TabContent = <Gant sprint={dateSprint.slice(14, 21)} components={components['Q1 2019']} />;
      break;
    case 3:
      TabContent = <Gant sprint={dateSprint.slice(20, 27)} components={components['Q2 2019']} />;
      break;
    case 4:
      TabContent = <Gant sprint={dateSprint.slice(26, 34)} components={components['Q3 2019']} />;
      break;
    case 5:
      TabContent = <Gant sprint={dateSprint.slice(33, 40)} components={components['Q4 2019']} />;
      break;
    case 6:
      TabContent = <Gant sprint={dateSprint.slice(41, 48)} components={components['Q1 2020']} />;
      break;
    case 7:
      TabContent = <Gant sprint={dateSprint.slice(47, 55)} components={components['Q2 2020']} />;
      break;
    case 8:
      TabContent = <Gant sprint={dateSprint.slice(54, 62)} components={components['Q3 2020']} />;
      break;
    case 9:
      TabContent = <Gant sprint={dateSprint.slice(61, 68)} components={components['Q4 2020']} />;
      break;
    case 10:
      TabContent = <Gant sprint={dateSprint.slice(68, 76)} components={components['Q1 2021']} />;
      break;
  }
  return (
    <>
      <Tabs value={value} onChange={(v) => setValue(v)} mb={5} styles={styles}>
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
