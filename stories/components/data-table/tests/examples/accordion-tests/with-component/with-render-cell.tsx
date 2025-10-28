import { ButtonLink } from '@semcore/ui/button';
import { Plot, Line, XAxis, YAxis, ResponsiveContainer, minMax } from '@semcore/ui/d3-chart';
import type { DataTableData } from '@semcore/ui/data-table';
import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import { NoData } from '@semcore/ui/widget-empty';
import { scaleLinear } from 'd3-scale';
import React from 'react';

const Demo = () => {
  return (
    <DataTable
      data={data}
      aria-label='Accordion with render cell'
      h='100%'
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: 'minmax(60%, 80%)' },
        {
          name: 'group1',
          children: 'Organic Sessions',
          borders: 'both',
          columns: [
            { name: 'kd', children: 'KD,%' },
            { name: 'cpc', children: 'CPC' },
            { name: 'vol', children: 'Vol.' },
          ],
        },
      ]}

      renderCell={(props) => {
        if (props.dataKey === 'keyword') {
          return (
            <ButtonLink
              onClick={() => {
                alert(`Click row
                            props: ${JSON.stringify(Object.keys(props), null, '  ')};
                            row: ${JSON.stringify(props.row, null, '  ')};
                            index: ${props.rowIndex};`);
              }}
            >
              {props.value}
            </ButtonLink>
          );
        }

        if (props.dataKey === 'kd') {
          return {
            'data-test-id': 'kd cell',
          };
        }
        const parentRowIndex = props.rowIndex;

        if (parentRowIndex === 2 && props.columnName === ACCORDION) {
          return {
            p: 0, // set empty paddings for the first accordion
            children: props.defaultRender(),
          };
        }

        return props.defaultRender();
      }}
    />
  );
};

const WidgetExample = () => {
  return (
    <NoData type='nothing-found' my={7} mx='auto'>
    </NoData>
  );
};

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
    [ACCORDION]: (<WidgetExample />),
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: {
      toString: () => '65,457,920',
      [ACCORDION]: (<WidgetExample />),
    },
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    [ACCORDION]: (<WidgetExample />),
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: (<WidgetExample />),
  },
];

export default Demo;
