import CalendarIconM from '@semcore/icon/CalendarCheck/m';
import Link from '@semcore/link';
import { ButtonLink } from '@semcore/ui/button';
import { DataTable, LinkAction } from '@semcore/ui/data-table';
import React from 'react';

const Demo = () => {
  return (
    <DataTable
      data={data}
      aria-label='Access to cells'
      columns={[
        { name: 'keyword', children: 'Keyword' },
        { name: 'kd', children: 'KD,%' },
        { name: 'cpc', children: 'CPC' },
        { name: 'vol', children: 'Vol.' },
      ]}
      renderCell={(props) => {
        if (props.dataKey === 'keyword') {
          const href = `https://${props.rawData[props.dataKey]}`;
          return (
            <LinkAction>
              <Link href={href} isExternal={false}>{props.value}</Link>
              <ButtonLink
                title='Open in a new tab'
                onClick={() => {
                  alert(`Click row
                  props: ${JSON.stringify(Object.keys(props), null, '  ')};
                  row: ${JSON.stringify(props.row, null, '  ')};
                  index: ${props.rowIndex};`);
                }}
                addonLeft={CalendarIconM}
              />
            </LinkAction>
          );
        }

        if (props.dataKey === 'kd') {
          return {
            'data-test-id': 'kd cell',
          };
        }

        return props.defaultRender();
      }}
    />
  );
};

const data = [
  {
    keyword: 'it must be link ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
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
    vol: '21,644,290',
  },
  {
    'keyword/kd/cpc': '434',
    'vol': 'ebay buy',
  },
];

export default Demo;
