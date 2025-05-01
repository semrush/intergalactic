import React from 'react';
import { DataTable, DataTableSort } from '@semcore/data-table';
type SortableColumn = Exclude<keyof typeof data[0], 'keyword'>;

const Demo = () => {

    const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['kd', 'desc']);
    const sortedData = React.useMemo(
        () =>
            [...data].sort((aRow, bRow) => {
                const [prop, sortDirection] = sort;
                const a = aRow[prop as SortableColumn];
                const b = bRow[prop as SortableColumn];
                if (a === b) return 0;
                if (sortDirection === 'asc') return a > b ? 1 : -1;
                else return a > b ? -1 : 1;
            }),
        [sort],
    );
    const numberFormat = React.useMemo(() => new Intl.NumberFormat('en-US'), []);
    const currencyFormat = React.useMemo(
        () => new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }),
        [],
    );


    return (
        <DataTable data={sortedData} use='secondary' defaultGridTemplateColumnWidth={'1fr'} aria-label={'Secondary'} sort={sort} onSortChange={setSort} virtualScroll h={200}>
            <DataTable.Head>
                <DataTable.Head.Column name='keyword' children='Keyword' sortable />
                <DataTable.Head.Column name='kd' children='KD,%' sortable/>
                <DataTable.Head.Column name='cpc' children='CPC' />
                <DataTable.Head.Column name='vol' children='Vol.' />
            </DataTable.Head>
            <DataTable.Body />
        </DataTable>
    );
};

const keyword = ['ebay buy', 'www.ebay.com', 'ebay buy']
const kd = ['77.8', '10', '11.2', '-', '75.89'];
const cpc = ['$3.4', '$0.65', '$1.25', '$0', '$0'];
const vol = ['32,500,000', '65,457,920', '47,354,640', 'n/a', '21,644,290'];

const data = Array(10000)
  .fill(0)
  .map((_, index) => ({
    id: `#${index + 1}`,
    keyword: keyword[Math.floor(keyword.length * Math.random())],
    // [ROW_GROUP]: [
    //   {
        kd: kd[Math.floor(kd.length * Math.random())],
        cpc: cpc[Math.floor(cpc.length * Math.random())],
        vol: vol[Math.floor(vol.length * Math.random())],
      // },
    // ],
  }));

export default Demo;
