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

    const handleSortChange: (sort: DataTableSort<string>, e?: React.SyntheticEvent) => void = (newSort) => {
        setSort(newSort as DataTableSort<SortableColumn>);
      };

    return (
        <DataTable data={sortedData} use='secondary' defaultGridTemplateColumnWidth={'1fr'} sort={['kd', 'desc']} aria-label={'Secondary'} onSortChange={handleSortChange} >
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
