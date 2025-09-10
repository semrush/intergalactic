import type { DataTableProps } from '@semcore/data-table';
import { DataTable, ACCORDION } from '@semcore/data-table';
import Pagination from '@semcore/pagination';
import React, { useState } from 'react';

const Accordion = () => {
  const [firstArray, setFirstArray] = useState(['1']);

  return firstArray.length
    ? (
        <div>
          {firstArray.map((text) => (
            <p key={text}>
              <span>{text}</span>
              <button
                onClick={() => {
                  setFirstArray([]);
                }}
              >
                remove
              </button>
            </p>
          ))}
        </div>
      )
    : null;
};

const Demo = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const renderCell: DataTableProps<typeof data[number], 'id', string>['renderCell'] = ({
    columnName,
    rowIndex,
    defaultRender,
  }) => {
    if (columnName === 'vol') {
      return 'Accordion here';
    }
    return defaultRender();
  };

  return (
    <>
      <DataTable
        data={data[currentPage - 1]}
        aria-label='Parent'
        selectedRows={[]}
        renderCell={renderCell}
        columns={columns}
        uniqueRowKey='id'
      />
      <Pagination
        currentPage={currentPage}
        totalPages={2}
        onCurrentPageChange={changePage}
      />
    </>
  );
};

const columns = [
  { name: 'keyword', children: 'Keyword' },
  { name: 'kd', children: 'KD %' },
  { name: 'cpc', children: 'CPC' },
  { name: 'vol', children: 'Vol.' },
];

const data = [
  [
    {
      id: '1',
      keyword: 'www.ebay.com',
      kd: '10',
      cpc: '$0.65',
      vol: {
        [ACCORDION]: <Accordion key='1' />,
      },
    },
    {
      id: '2',

      keyword: 'ebay buy',
      kd: '-',
      cpc: '$0',
      vol: 'n/a',
    },
    {
      id: '3',

      keyword: 'ebay buy',
      kd: '75.89',
      cpc: '$0',
      vol: {
        [ACCORDION]: <Accordion key='2' />,
      },
    },
    {
      id: '4',

      keyword: 'ebay buy',
      kd: '77.8',
      cpc: '$1.25',
      vol: '32,500,000',
    },
    {
      id: '5',

      keyword: 'www.ebay.com',
      kd: '11.2',
      cpc: '$3.4',
      vol: '65,457,920',
    },
  ],
  [
    {
      id: '6',

      keyword: 'ebay buy',
      kd: '75.89',
      cpc: '$0',
      vol: {
        [ACCORDION]: <Accordion key='3' />,
      },
    },
    {
      id: '7',

      keyword: 'ebay buy',
      kd: '77.8',
      cpc: '$1.25',
      vol: '32,500,000',
    },
    {
      id: '8',

      keyword: 'www.ebay.com',
      kd: '11.2',
      cpc: '$3.4',
      vol: '65,457,920',
    },
  ],
];

export default Demo;
