import React from 'react';
import DataTable from '@semcore/data-table';
import { ButtonLink } from '@semcore/button';

const Demo = () => {
  return (
    <DataTable data={data} aria-label={'Access to cells'}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body>
        <DataTable.Cell data={data} name='keyword'>
          {(props, row, index) => {
            return {
              children: (
                <ButtonLink
                  onClick={() => {
                    alert(`Click row 
                  props: ${JSON.stringify(Object.keys(props), null, '  ')};
                  row: ${JSON.stringify(row, null, '  ')};
                  index: ${index};`);
                  }}
                >
                  {row[props.name]}
                </ButtonLink>
              ),
            };
          }}
        </DataTable.Cell>
      </DataTable.Body>
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
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
];

export default Demo;
