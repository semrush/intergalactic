import type { DataTableData, DataTableSort } from '@semcore/ui/data-table';
import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import { NoData } from '@semcore/ui/widget-empty';
import React from 'react';

export type AccordionWithFixedColumnProps = {
  loading: boolean;
  sticky: boolean;
  withScrollBar: boolean;
  top?: number;
};

const Demo = (props: AccordionWithFixedColumnProps) => {
  const [openedRow, setOpenedRow] = React.useState(new Set<string>());
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['keyword', 'asc']);
  const headerRef = React.useRef<HTMLDivElement | null>(null);

  const sortedData = React.useMemo(() => {
    const [sortBy, sortDirection] = sort;

    return [...data].sort((aRow, bRow) => {
      const a = String(aRow[sortBy as string]);
      const b = String(bRow[sortBy as string]);

      if (a === b) return 0;

      return sortDirection === 'asc' ? (a > b ? 1 : -1) : (a > b ? -1 : 1);
    });
  }, [sort]);

  const handleSortChange: (sort: DataTableSort<keyof typeof data[0]>) => void = (newSort) => {
    setSort(newSort);
  };

  const handleAccordionToggle = (type: 'close' | 'open', uniqKey: string) => {
    if (type === 'open') {
      setOpenedRow((prevState) => {
        prevState.add(uniqKey);

        return new Set([...prevState]);
      });
    }
    if (type === 'close') {
      setOpenedRow((prevState) => {
        prevState.delete(uniqKey);

        return new Set([...prevState]);
      });
    }
  };

  return (
    <DataTable

      loading={props.loading}
      data={sortedData}
      uniqueRowKey='id'
      sort={sort}
      onSortChange={handleSortChange}
      aria-label='Accordion with fixed column'
      headerProps={{ sticky: props.sticky, withScrollBar: props.withScrollBar, top: props.top }}
      hMax={500}
      wMax={400}
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: '200px', fixed: 'left', sortable: true },
        { name: 'kd', children: 'KD,%', gtcWidth: '200px' },
        { name: 'cpc', children: 'CPC', gtcWidth: '150px' },
        { name: 'vol', children: 'Vol.', gtcWidth: '100px', fixed: 'right' },
      ]}
      onAccordionToggle={handleAccordionToggle}
      renderCell={(props) => {
        const rowKey = props.rawData?.id as string | undefined;

        if (rowKey !== undefined && openedRow.has(rowKey) && props.columnName !== ACCORDION) {
          const headerHeight = headerRef.current?.children.item(0)?.getBoundingClientRect().height;

          return {
            style: {
              position: 'sticky',
              top: `${headerHeight}px`,
              zIndex: props.column.fixed ? 12 : 10,
            },
          };
        }

        return {};
      }}
    />
  );
};

export const accordionWithFixedColumnDefaultProps: AccordionWithFixedColumnProps = {
  loading: false,
  withScrollBar: false,
  sticky: true,
  top: undefined,
};

Demo.defaultProps = accordionWithFixedColumnDefaultProps;

const WidgetExample = () => {
  return (<NoData type='nothing-found' my={7} mx='auto' />);
};

const data: DataTableData = [
  {
    id: '1',
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    [ACCORDION]: (<WidgetExample />),
  },
  {
    id: '2',
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: {
      toString: () => '65,457,920',
      [ACCORDION]: (<WidgetExample />),
    },
  },
  {
    id: '3',
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    [ACCORDION]: (<WidgetExample />),
  },
  {
    id: '4',
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    [ACCORDION]: (<WidgetExample />),
  },
  {
    id: '5',
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: (<WidgetExample />),
  },
];

export default Demo;
