import InfoM from '@semcore/icon/Info/m';
import { ButtonLink } from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableSort } from '@semcore/ui/data-table';
import Link from '@semcore/ui/link';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';
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
  const handleSortChange: (sort: DataTableSort<string>, e?: React.SyntheticEvent) => void = (
    newSort,
  ) => {
    setSort(newSort as DataTableSort<SortableColumn>);
  };

  return (
    <DataTable
      data={sortedData}
      sort={sort}
      onSortChange={handleSortChange}
      aria-label='Sorting'
      columns={[
        { name: 'keyword', children: (
          <Text>
            KD %
            <DescriptionTooltip placement='bottom'>

              <DescriptionTooltip.Trigger
                ml={1}
                tag={ButtonLink}
                addonLeft={InfoM}
                size={100}
                color='icon-secondary-neutral'
                aria-label='Additional info 1'
                data-test-id='tooltip-with-interactive-el'
                onClick={(e) => e.stopPropagation()}
              />
              <DescriptionTooltip.Popper aria-label='Additional info about item 1'>
                Jesus Christ, Joe,
                {' '}
                <Link>fucking forget</Link>
                {' '}
                about it. I'm Mr.
                Pink. Let's move on.
              </DescriptionTooltip.Popper>
            </DescriptionTooltip>
          </Text>
        ), justifyContent: 'left', sortable: true },
        {
          name: 'kd',
          children: (
            <Text ellipsis={true}>
              KD % and some another text long
            </Text>
          ),
          justifyContent: 'right',
          gtcWidth: 'minmax(0, 68px)',
          sortable: true,
        },
        { name: 'cpc', children: 'CPC', gtcWidth: 'minmax(0, 60px)', sortable: 'asc' },
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
  );
};

export default Demo;

const data = [
  {
    keyword: 'ebay buy',
    kd: 77.8,
    cpc: 1.25,
    vol: 32500000,
  },
  {
    keyword: 'www.ebay.com',
    kd: 11.2,
    cpc: 3.4,
    vol: 65457920,
  },
  {
    keyword: 'www.ebay.com',
    kd: 10,
    cpc: 0.65,
    vol: 47354640,
  },
  {
    keyword: 'ebay buy',
    kd: -1,
    cpc: 0,
    vol: -1,
  },
  {
    keyword: 'ebay buy',
    kd: 75.89,
    cpc: 0,
    vol: 21644290,
  },
];
