import type { NSBox } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { Plot, Line, XAxis, YAxis, ResponsiveContainer, minMax } from '@semcore/ui/d3-chart';
import type { DataTableData, DataTableProps } from '@semcore/ui/data-table';
import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import { scaleLinear } from 'd3-scale';
import React from 'react';

export type AccordionWithButtonExampleProps = {
  accordionMode: DataTableProps<typeof data, any, any>['accordionMode'];
  variant?: DataTableProps<typeof data, any, any>['variant'];
  use?: DataTableProps<typeof data, any, any>['use'];
  compact?: DataTableProps<typeof data, any, any>['compact'];
  loading?: DataTableProps<typeof data, any, any>['loading'];

  defaultGridTemplateColumnWidth?: DataTableProps<typeof data, any, any>['defaultGridTemplateColumnWidth'];
} & NSBox.Props;

const Demo = (props: AccordionWithButtonExampleProps) => {
  return (
    <DataTable
      data={data}
      aria-label='Custom Accordion with button inside table'
      accordionMode={props.accordionMode}
      variant={props.variant}
      loading={props.loading}
      use={props.use}
      compact={props.compact}
      onAccordionToggle={(type, key, i) => {
        console.log('called', type, key, i);
      }}
      h={props.h}
      w={props.w}
      defaultGridTemplateColumnWidth={props.defaultGridTemplateColumnWidth}
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: 'minmax(20%, 50%)' },
        {
          name: 'group',
          children: 'Organic Sessions',
          borders: 'both',
          columns: [
            { name: 'kd', children: 'KD,%' },
            { name: 'cpc', children: 'CPC' },
            { name: 'vol', children: 'Vol.' },
          ],
        },
      ]}
    />
  );
};
export const accordionWithButtonDefaultProps: AccordionWithButtonExampleProps = {
  accordionMode: 'independent',
  variant: undefined,
  use: undefined,
  compact: undefined,
  h: '300px',
  w: undefined,
  defaultGridTemplateColumnWidth: '1fr',
  loading: undefined,

};

Demo.defaultProps = accordionWithButtonDefaultProps;

const ChartExample = () => {
  const [[width, height], setSize] = React.useState([600, 300]);
  const MARGIN = 40;
  const [dataChart, setDataChart] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fixedData = Array(20)
      .fill({})
      .map((_, i) => ({
        x: i,
        y: (i % 10) + 1,
      }));
    setDataChart(fixedData);
  }, []);

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(dataChart, 'x'));
  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <ResponsiveContainer onResize={setSize} h={300} w='100%' style={{ background: '#fff' }}>
      <Plot data={dataChart} scale={[xScale, yScale]} width={width} height={height} style={{ background: '#fff' }}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <Line x='x' y='y'>
          <Line.Dots display />
        </Line>
      </Plot>
    </ResponsiveContainer>
  );
};

const data: DataTableData = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: {
      toString: () => '65,457,920',
      [ACCORDION]: (<ChartExample />),
    },
  },
  {
    keyword: 'www.ebay.com',
    kd: (
      <span>
        10
        <Button>Click Me</Button>
      </span>
    ),
    cpc: '$0.65',
    vol: '47,354,640',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: (<ChartExample />),
  },
];

export default Demo;
