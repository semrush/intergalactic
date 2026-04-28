import type { DataTableSort } from '@semcore/ui/data-table';
import { DataTable } from '@semcore/ui/data-table';
import Input from '@semcore/ui/input';
import Pagination from '@semcore/ui/pagination';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type ColumnKey = keyof (typeof allData)[0];

const MAX_ROWS = 5;

const allData = [
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: '21,644,290' },
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: '21,644,290' },
];

const Demo = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<DataTableSort<ColumnKey>>(['kd', 'desc']);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [displayedData, setDisplayedData] = useState(() => allData.slice(0, MAX_ROWS));
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const filteredData = useMemo(
    () => allData.filter((row) => row.keyword.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const totalPages = Math.ceil(filteredData.length / MAX_ROWS);

  const getPageData = useCallback(
    (page: number) => filteredData.slice((page - 1) * MAX_ROWS, page * MAX_ROWS),
    [filteredData],
  );

  useEffect(() => {
    clearTimeout(timerRef.current);
    setLoading(true);
    timerRef.current = setTimeout(() => {
      setDisplayedData(getPageData(currentPage));
      setLoading(false);
    }, 800);

    return () => clearTimeout(timerRef.current);
  }, [currentPage, getPageData]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((nextSort: DataTableSort<ColumnKey>) => {
    setSort(nextSort);
    setCurrentPage(1);
  }, []);

  return (
    <>
      <div style={{ height: '200px', background: '#f0f0f0', padding: '16px' }}>
        Spacer above — scroll down to see sticky header
      </div>
      <div style={{ padding: '16px' }}>
        <Input mb={3} wMax={300}>
          <Input.Value
            value={search}
            onChange={handleSearchChange}
            placeholder='Search by keyword...'
          />
        </Input>
        <DataTable
          data={displayedData}
          sort={sort}
          onSortChange={handleSortChange}
          loading={loading}
          aria-label='Table with sticky header and hidden column'
          headerProps={{ sticky: true }}
          columns={[
            { name: 'keyword', children: 'Keyword', sortable: true },
            { name: 'kd', children: 'KD %', sortable: true },
            { name: 'cpc', children: 'CPC', sortable: true },
            { name: 'hiddenColumn', children: 'Empty' },
            { name: 'vol', children: 'Vol.', sortable: true },
          ]}
        />
        {totalPages > 1 && (
          <Pagination
            mt={3}
            currentPage={currentPage}
            totalPages={totalPages}
            onCurrentPageChange={setCurrentPage}
          />
        )}
      </div>
      <div style={{ height: '600px', background: '#f0f0f0', padding: '16px' }}>
        Spacer below
      </div>
    </>
  );
};

export default Demo;
