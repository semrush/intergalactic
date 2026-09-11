import Button from '@semcore/ui/button';
import type { DataTableSort } from '@semcore/ui/data-table';
import { DataTable } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import React from 'react';
type SortableColumn = Exclude<keyof (typeof data)[0], 'keyword'>;

const Demo = () => {
  const [sort, setSort] = React.useState<DataTableSort<keyof (typeof data)[0]>>(
    ['vol', 'desc'],
  );
  const [loading, setLoading] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

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
    () =>
      new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }),
    [],
  );
  const handleSortChange: (
    sort: DataTableSort<string>,
    e?: React.SyntheticEvent,
  ) => void = (newSort) => {
    setSort(newSort as DataTableSort<SortableColumn>);
  };

  const handleLoadingStart = () => {
    clearTimeout(timeoutRef.current);
    setLoading(true);

    timeoutRef.current = setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div>
      <Button style={{ marginBottom: 500 }} onClick={handleLoadingStart}>Start loading (5s)</Button>
      <DataTable
        data={sortedData}
        sort={sort}
        onSortChange={handleSortChange}
        loading={loading}
        aria-label='Sorting'
        columns={[
          {
            name: 'keyword',
            children: 'Keyword',
            justifyContent: 'left',
            sortable: true,
          },
          {
            name: 'kd',
            children: (
              <Text ellipsis={true}>KD % and some another text long</Text>
            ),
            justifyContent: 'right',
            gtcWidth: 'minmax(0, 68px)',
            sortable: true,
          },
          {
            name: 'cpc',
            children: 'CPC',
            gtcWidth: 'minmax(0, 60px)',
            sortable: 'asc',
          },
          {
            name: 'vol',
            children: 'Vol.',
            gtcWidth: 'minmax(0, 120px)',
            justifyContent: 'left',
            sortable: 'desc',
          },
        ]}
        renderCell={(props) => {
          if (props.columnName === 'keyword') {
            return props.defaultRender();
          }

          const rawValue = props.row[props.columnName as SortableColumn];

          return typeof rawValue === 'number' && rawValue !== -1
            ? props.columnName === 'cpc'
              ? currencyFormat.format(rawValue)
              : numberFormat.format(rawValue)
            : 'n/a';
        }}
      />
    </div>
  );
};

export default Demo;

const data = Array.from({ length: 100 }, (_, index) => ({
  keyword: `ebay buy ${index}`,
  kd: 77.8,
  cpc: 1.25,
  vol: 32500000,
}));

export const App = () => <Demo />;
