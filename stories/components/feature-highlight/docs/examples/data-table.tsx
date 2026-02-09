import SummaryAI from '@semcore/icon/SummaryAI/m';
import { Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableSort } from '@semcore/ui/data-table';
import React from 'react';

const Demo = () => {
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['cpc', 'desc']);
  const handleSortChange: (sort: DataTableSort<string>, e?: React.SyntheticEvent) => void = (
    newSort,
  ) => {
    setSort(newSort as DataTableSort<SortableColumn>);
  };
  return (
    <Flex gap={6} direction='column'>

      <DataTable
        data={data}
        sort={sort}
        onSortChange={handleSortChange}
        aria-label='Primary table with highlighted column'
        wMax='800px'
        columns={[
          {
            name: 'keyword',
            children: 'Keyword',
          },
          {
            name: 'kd',
            children: (
              <>
                <SummaryAI color='--intergalactic-icon-primary-feature-highlight' />
                KD %
                <ScreenReaderOnly>Powered by AI</ScreenReaderOnly>
              </>
            ),
            sortable: true,
            style: { gap: '4px' },
            justifyContent: 'end',
          },
          {
            name: 'cpc',
            children: 'CPC',
            sortable: true,
            justifyContent: 'end',
          },
        ]}
      />

      <DataTable
        use='secondary'
        data={data}
        aria-label='Secondary table with highlighted column'
        wMax='300px'
        columns={[
          {
            name: 'keyword',
            children: 'Keyword',
          },
          {
            name: 'kd',
            children: (
              <>
                <SummaryAI color='--intergalactic-icon-primary-feature-highlight' />
                KD %
                <ScreenReaderOnly>Powered by AI</ScreenReaderOnly>
              </>
            ),
            style: { gap: '4px' },
            justifyContent: 'end',
          },
          {
            name: 'cpc',
            children: 'CPC',
            justifyContent: 'end',
          },
        ]}
      />

    </Flex>
  );
};

type SortableColumn = Exclude<keyof typeof data[0], 'keyword'>;

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
  },
];

export default Demo;
