import { Box } from '@semcore/ui/base-components';
import { Chart, BAD, GOOD, HIGHLIGHT_DOT, INSIGHTFUL } from '@semcore/ui/d3-chart';
import TabLine from '@semcore/ui/tab-line';
import React from 'react';

import { categories } from './basic-usage';

const values = [2, 5, 7, 7, 9];

const trafficData = categories.map((category, i) => ({ category, bar: values[i] }));

const insightsData = categories.map((category, i) => ({
  category,
  bar: values[i],
  [HIGHLIGHT_DOT]: [GOOD, INSIGHTFUL, BAD][i],
}));

const tabs = [
  { value: 'traffic', title: 'Traffic', data: trafficData },
  { value: 'insights', title: 'Insights', data: insightsData },
];

type StoryProps = {
  // Adds the same reference area to the charts of both tabs.
  withReferenceArea?: boolean;
};

const Demo = ({ withReferenceArea = false }: StoryProps) => {
  const [tab, setTab] = React.useState('traffic');

  return (
    <>
      <TabLine value={tab} onChange={setTab} aria-label='Reports'>
        {tabs.map(({ value, title }) => (
          <TabLine.Item key={value} value={value} id={`tab-${value}`} aria-controls={`panel-${value}`}>
            {title}
          </TabLine.Item>
        ))}
      </TabLine>
      {tabs.map(({ value, data }) => (
        <Box
          key={value}
          id={`panel-${value}`}
          role='tabpanel'
          aria-labelledby={`tab-${value}`}
          hidden={tab !== value}
          mt={4}
        >
          <Chart.Bar
            data={data}
            groupKey='category'
            plotWidth={500}
            plotHeight={260}
            maxBarSize={12}
            showLegend={false}
            duration={0}
            referenceArea={withReferenceArea ? { value: ['Category 2', 'Category 4'], use: 'good' } : undefined}
            aria-label={`${value} chart`}
          />
        </Box>
      ))}
    </>
  );
};

export default Demo;
