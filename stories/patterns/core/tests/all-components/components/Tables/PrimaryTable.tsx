import Return from '@semcore/icon/Return/m';
import { Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import { ACCORDION, type CellRenderProps, SelectableRows } from '@semcore/ui/data-table';
import Divider from '@semcore/ui/divider';
import Pagination from '@semcore/ui/pagination';
import Pills from '@semcore/ui/pills';
import { Text } from '@semcore/ui/typography';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import { BeforeTablesControls } from './BeforeTablesControls';
import { CopyCell, Currency, DateCell, Money, OperationType, StatusCell, TimeCell } from './table_perf/cells';
import { SelectedRowsInfo } from './table_perf/SelectedRowsInfo';
import Table from './table_perf/table_perf';
import AddFilter from '../../../../../../components/add-filter/docs/examples/add-filter-basic';
import AdvancedFilter from '../../../../../filters/advanced-filters/docs/examples/filters-with-filter-conditions';

const refsMap: Record<string | symbol, HTMLElement | null> = {};

const COLUMNS_CONFIG = [
  {
    id: 'payment_intent_id',
    defaultActive: true,
    Component: CopyCell,
    wMin: 180,
    ref: (node: HTMLElement | null) => {
      if (node) {
        refsMap['payment_intent_id'] = node;
      }
    },
    fixed: 'left' as const,
  },
  // {
  //   id: 'actions',
  //   defaultActive: true,
  // },
  // {
  //   id: 'quickLinks',
  //   defaultActive: true,
  // },
  {
    id: 'payment_status',
    defaultActive: true,
    Component: StatusCell,
    wMin: 110,
    fixed: 'left' as const,
    sortable: true,
  },
  {
    id: 'operation_type',
    defaultActive: true,
    wMin: 170,
    Component: OperationType,
    sortable: true,
  },
  {
    id: 'lastSuccessful_refund_intent_id',
    defaultActive: true,
  },
  {
    id: 'affected_payment_intent_id',
    defaultActive: false,
    Component: CopyCell,
    wMin: 150,
  },
  {
    id: 'amount_base',
    defaultActive: true,
    justifyContent: 'flex-end',
    Component: Money,
    wMin: 120,
    sortable: true,
  },
  {
    id: 'amount_tax',
    defaultActive: true,
    justifyContent: 'flex-end',
    Component: Money,
    wMin: 120,
  },
  {
    id: 'percent_tax',
    defaultActive: true,
    justifyContent: 'flex-end',
    wMin: 120,
  },
  {
    id: 'currency',
    defaultActive: true,
    wMin: 90,
    Component: Currency,
  },
  {
    id: 'card_digits',
    defaultActive: true,
    justifyContent: 'flex-end',
    wMin: 100,
  },
  {
    id: 'payment_date',
    defaultActive: true,
    Component: DateCell,
    wMin: 120,
  },
  {
    id: 'payment_time',
    defaultActive: true,
    Component: TimeCell,
    wMin: 100,
  },
  {
    id: 'country_code',
    defaultActive: true,
    wMin: 80,
  },
  {
    id: 'state_code',
    defaultActive: true,
    wMin: 120,
  },
  {
    id: 'customer_email',
    defaultActive: true,
    wMin: 200,
    Component: CopyCell,
  },
  {
    id: 'customer_id',
    defaultActive: false,
    Component: CopyCell,
    wMin: 120,
  },
  {
    id: 'payment_description',
    defaultActive: true,
    wMin: 200,
    Component: CopyCell,
  },
  {
    id: 'description_ellipsis',
    defaultActive: true,
    wMin: 150,
  },
  {
    id: 'merchant',
    defaultActive: true,
    wMin: 100,
  },
  {
    id: 'merchant_external_id',
    defaultActive: false,
    Component: CopyCell,
    wMin: 170,
  },
  {
    id: 'merchant_user_id',
    defaultActive: false,
    Component: CopyCell,
    wMin: 140,
  },
  {
    id: 'platform',
    defaultActive: true,
    wMin: 130,
  },
  {
    id: 'payment_system',
    defaultActive: true,
    wMin: 100,
  },
  {
    id: 'payment_system_transaction_id',
    defaultActive: true,
    Component: CopyCell,
    wMin: 140,
  },
  {
    id: 'payment_type',
    defaultActive: false,
    wMin: 130,
  },
  {
    id: 'is_test_mode',
    defaultActive: false,
    wMin: 100,
  },
];

// with React.memo
// const componentsMap = Object.fromEntries(
//   COLUMNS_CONFIG.map((c) => [
//     c.id,
//     c.Component ? React.memo(c.Component) : undefined,
//   ]),
// );

// no memo
const componentsMap = Object.fromEntries(
  COLUMNS_CONFIG.map((c) => [c.id, c.Component]),
);

const CellRenderer = (props: CellRenderProps<any, any>) => {
  const parentRowIndex = props.rowIndex;

  if (parentRowIndex === 0 && props.columnName === ACCORDION) {
    return {
      p: 0, // set empty paddings for the first accordion
      children: props.defaultRender(),
    };
  }

  if (props.dataKey === 'description_ellipsis') {
    return {
      children: (
        <Text
          ellipsis:cropPosition='middle'
        >
          {String(props.row.payment_description)}
        </Text>
      ),
    };
  }

  // @ts-ignore
  const Component = componentsMap[props.columnName];
  if (Component) {
    return {
      children: (
        <Component
          value={props.value}
          row={props.row}
          cellProps={props}
          headerRef={refsMap[props.columnName]}
          cropPosition='middle'
        />
      ),
    };
  }

  return {
    children: <Text>{props.value}</Text>,
  };
};

const cols = COLUMNS_CONFIG.map((c) => ({
  name: c.id,
  children: c.id,
  gtcWidth: c.wMin ? `minmax(${c.wMin}px, 1fr)` : 'max-content',
  ref: c.ref,
  fixed: c.fixed,
  sortable: c.sortable,
}));

const DEFAULT_LOCALE = 'en-US';
const DEFAULT_MESSAGES = {};

const selectedRows = new SelectableRows<string>();

export default function PrimaryTable() {
  const [columns, setColumns] = useState<string[]>(cols.map((c) => c.name));

  const [currentPage, setCurrentPage] = React.useState(1);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleApplyPage = () => {
    const newValue = Number(inputRef.current?.value);
    if (!isNaN(newValue)) {
      setCurrentPage(newValue);
    }
  };

  const handleChangeColumns = React.useCallback(({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) => {
    setColumns((columns) => {
      const newColumns = [...columns];
      const shift = fromIndex < toIndex ? 1 : -1;
      for (let i = fromIndex; i !== toIndex; i += shift) {
        newColumns[i] = columns[i + shift];
      }
      newColumns[toIndex] = columns[fromIndex];
      return newColumns;
    });
  }, [columns, setColumns]);

  return (
    <IntlProvider
      locale={DEFAULT_LOCALE}
      defaultLocale={DEFAULT_LOCALE}
      messages={DEFAULT_MESSAGES}
    >
      <Flex gap={3} alignItems='center' my={4} justifyContent='space-between'>
        <Flex>
          <Pills defaultValue={1}>
            <Pills.Item value={1}>Visibility</Pills.Item>
            <Pills.Item value={2}>Est. Traffic</Pills.Item>
            <Pills.Item value={3}>Avg. Position</Pills.Item>
          </Pills>
          <Divider orientation='vertical' mx={2} />
          <AddFilter />
        </Flex>

        <AdvancedFilter />

      </Flex>

      <Card w='100%'>
        <Card.Body p={0}>
          <Flex justifyContent='space-between' px={4}>
            <SelectedRowsInfo selectedRows={selectedRows} />

            <BeforeTablesControls
              columns={cols}
              selectedColumns={columns}
              setSelectedColumns={(columns: string[] | null) => {
                if (columns === null) {
                  setColumns(cols.map((c) => c.name));
                } else {
                  setColumns(columns);
                }
              }}
              onChangeColumns={handleChangeColumns}
            />
          </Flex>
          <Table
            loading={false}
            variant='card'
            currentPage={currentPage}
            selectedRows={selectedRows}
            columns={cols.filter((c) => columns.includes(c.name))}
            CellRenderer={CellRenderer}
          />
          <Pagination currentPage={currentPage} totalPages={100} onCurrentPageChange={setCurrentPage} p={4}>
            <Pagination.FirstPage />
            <Pagination.PrevPage />
            <Pagination.NextPage />
            <Pagination.PageInput>
              <Pagination.PageInput.Value ref={inputRef} />
              {/* @ts-ignore */}
              <Pagination.PageInput.Addon
                data-testid='selectPageButton'
                tag={ButtonLink}
                onClick={handleApplyPage}
                p={0}
                h='calc(100% - 8px)'
              >
                <ButtonLink.Addon tag={Return} />
              </Pagination.PageInput.Addon>
            </Pagination.PageInput>
            <Pagination.TotalPages />
          </Pagination>
        </Card.Body>
      </Card>
    </IntlProvider>
  );
};
