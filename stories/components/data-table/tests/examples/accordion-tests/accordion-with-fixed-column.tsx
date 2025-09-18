import type { DataTableData } from '@semcore/data-table';
import { DataTable, ACCORDION } from '@semcore/data-table';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { NoData } from '@semcore/widget-empty';
import React from 'react';

export type AccordionWithFixedColumnProps = {
  loading: boolean;
  rowsLimit?: number;
  columnsLimit?: number;
};

const Demo = (props: AccordionWithFixedColumnProps) => {
  const [openedRow, setOpenedRow] = React.useState(new Set<number>());
  const headerRef = React.useRef<HTMLDivElement | null>(null);
  const { rowsLimit, columnsLimit } = props;

  const handleAccordionToggle = (type: 'close' | 'open', uniqKey: string, rowIndex: number) => {
    if (type === 'open') {
      setOpenedRow((prevState) => {
        prevState.add(rowIndex);

        return new Set([...prevState]);
      });
    }
    if (type === 'close') {
      setOpenedRow((prevState) => {
        prevState.delete(rowIndex);

        return new Set([...prevState]);
      });
    }
  };

  return (
    <DataTable
      loading={props.loading}
      data={data}
      aria-label='Accordion inside table'
      headerProps={{ sticky: true, ref: headerRef }}
      hMax={500}
      wMax={400}
      limit={{
        fromRow: rowsLimit,
        fromColumn: columnsLimit,
        renderOverlay() {
          return (
            <Flex alignItems='center' direction='column' gap={3} py={6} wMax={320}>
              <Text size={300} fontWeight='bold' textAlign='center'>You've reached your report limit for today</Text>
              <Text size={200} textAlign='center'>
                To increase your daily report limit,upgrade to a Guru plan.
              </Text>
            </Flex>
          );
        },
      }}
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: '200px', fixed: 'left' },
        { name: 'kd', children: 'KD,%', gtcWidth: '200px' },
        { name: 'cpc', children: 'CPC', gtcWidth: '150px' },
        { name: 'vol', children: 'Vol.', gtcWidth: '100px', fixed: 'right' },
      ]}
      onAccordionToggle={handleAccordionToggle}
      renderCell={(props) => {
        if (openedRow.has(props.rowIndex) && props.columnName !== ACCORDION) {
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
  columnsLimit: -1,
  rowsLimit: -1,
};

Demo.defaultProps = accordionWithFixedColumnDefaultProps;

const ChartExample = () => {
  return (<NoData type='nothing-found' my={7} mx='auto' />);
};

const data: DataTableData = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: {
      toString: () => '65,457,920',
      [ACCORDION]: (<ChartExample />),
    },
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: (<ChartExample />),
  },
];

export default Demo;
