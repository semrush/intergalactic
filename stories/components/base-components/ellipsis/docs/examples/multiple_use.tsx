import type { DataTableProps } from '@semcore/ui/data-table';
import { DataTable } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const columns = React.useMemo(() => {
    return [
      { name: 'keyword', children: 'Keyword' },
      { name: 'kd', children: 'KD,%' },
      { name: 'cpc', children: 'CPC' },
      {
        name: 'vol',
        children: 'Vol.',
        gtcWidth: '100px',
      },
    ];
  }, []);

  const renderCell: DataTableProps<any, any, any>['renderCell'] | undefined = React.useMemo(() => {
    return (props) => {
      const cellRef = React.useRef<HTMLDivElement | null>(null);

      if (props.columnName === 'vol') {
        return {
          ref: cellRef,
          children: (
            <Text
              ellipsis={{ cropPosition: 'middle' }}
              hint:triggerRef={cellRef}
              hint:placement='right'
              flex={1}
            >
              {props.value}
            </Text>
          ),
        };
      }

      return props.defaultRender();
    };
  }, []);

  return (
    <DataTable
      data={data}
      aria-label='Table title'
      columns={columns}
      renderCell={renderCell}
    />
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000,500,00032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920,000,50032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640,000,50032,500,000,500,00032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290,000,500',
  },
];

export default Demo;
