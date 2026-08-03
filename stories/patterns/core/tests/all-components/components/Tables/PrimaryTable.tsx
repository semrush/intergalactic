import ReloadM from '@semcore/icon/Reload/m';
import Return from '@semcore/icon/Return/m';
import TrashM from '@semcore/icon/Trash/m';
import WarningM from '@semcore/icon/Warning/m';
import { Box, Flex } from '@semcore/ui/base-components';
import Button, { ButtonLink } from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import { ACCORDION, type CellRenderProps, SelectableRows } from '@semcore/ui/data-table';
import Dot from '@semcore/ui/dot';
import { PageError } from '@semcore/ui/errors';
import FullscreenModal from '@semcore/ui/fullscreen-modal';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Pagination from '@semcore/ui/pagination';
import Pills from '@semcore/ui/pills';
import ProgressBar from '@semcore/ui/progress-bar';
import SidePanel from '@semcore/ui/side-panel';
import { Text } from '@semcore/ui/typography';
import React, { useDeferredValue, useState } from 'react';
import { IntlProvider } from 'react-intl';

import { BeforeTablesControls } from './BeforeTablesControls';
import PrimaryTableAddFilter from './PrimaryTableAddFilter';
import { CopyCell, Currency, DateCell, Money, OperationType, StatusCell, TimeCell } from './table_perf/cells';
import { SelectedRowsInfo } from './table_perf/SelectedRowsInfo';
import Table, { type TableDemoState } from './table_perf/table_perf';
import AdvancedFilter from '../../../../../filters/advanced-filters/docs/examples/filters-with-filter-conditions';

const refsMap: Record<string | symbol, HTMLElement | null> = {};

const COLUMNS_CONFIG = [
  {
    id: 'name',
    copyHandle: false,
    defaultActive: true,
    Component: CopyCell,
    wMin: 180,
    ref: (node: HTMLElement | null) => {
      if (node) {
        refsMap.name = node;
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
    wMin: 220,
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
  {
    id: 'actions',
    defaultActive: true,
    wMin: 200,
    fixed: 'right' as const,
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

const cols = COLUMNS_CONFIG.map((c) => ({
  name: c.id,
  children: c.id,
  gtcWidth: c.wMin ? `minmax(${c.wMin}px, 1fr)` : 'max-content',
  ref: c.ref,
  fixed: c.fixed,
  sortable: c.sortable,
  alignItems: 'flex-start' as const,
  ...('justifyContent' in c && c.justifyContent ? { justifyContent: c.justifyContent } : {}),
}));

const ALWAYS_VISIBLE_COLUMN_NAME = 'name';
const manageableCols = cols.filter((c) => c.name !== ALWAYS_VISIBLE_COLUMN_NAME);

const COLUMN_COPY_HANDLE = Object.fromEntries(
  COLUMNS_CONFIG.map((c) => [c.id, 'copyHandle' in c ? Boolean(c.copyHandle) : true]),
);

const DEFAULT_LOCALE = 'en-US';
const DEFAULT_MESSAGES = {};

const selectedRows = new SelectableRows<string>();

export type PrimaryTableProps = {
  onPageErrorChange?: (active: boolean) => void;
};

type PillValue = TableDemoState | 'pageError' | 'progress';

export default function PrimaryTable({ onPageErrorChange }: PrimaryTableProps = {}) {
  const [columns, setColumns] = useState<string[]>(manageableCols.map((c) => c.name));

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pillValue, setPillValue] = React.useState<PillValue>('default');
  const defferedPillValue = React.useDeferredValue(pillValue);
  const tableDemoState: TableDemoState =
    defferedPillValue === 'pageError' || defferedPillValue === 'progress' ? 'default' : defferedPillValue;
  const [nameFilter, setNameFilter] = React.useState('');
  const [debouncedNameFilter, setDebouncedNameFilter] = React.useState('');
  const [sidePanelOpen, setSidePanelOpen] = React.useState(false);
  const [sidePanelRow, setSidePanelRow] = React.useState<Record<string, unknown> | null>(null);
  const [fullReportModalVisible, setFullReportModalVisible] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [noticeBubbleManager] = React.useState(() => new NoticeBubbleManager());

  React.useEffect(() => {
    const id = window.setTimeout(() => setDebouncedNameFilter(nameFilter), 400);
    return () => window.clearTimeout(id);
  }, [nameFilter]);

  const searchPending = nameFilter !== debouncedNameFilter;

  const showFailureNoticeBubble = React.useCallback(() => {
    noticeBubbleManager.add({
      children: 'Unfortunately, your recent changes were not saved. Try again later.',
      icon: <WarningM color='--intergalactic-icon-primary-warning' />,
      action: (
        <Button theme='invert' addonLeft={ReloadM}>
          Reload the page
        </Button>
      ),
      initialAnimation: true,
      duration: 0,
      type: 'info',
      focusLock: false,
    });
  }, [noticeBubbleManager]);

  const cellRenderer = React.useCallback(
    (props: CellRenderProps<any, any>) => {
      const parentRowIndex = props.rowIndex;

      if (parentRowIndex === 0 && props.columnName === ACCORDION) {
        return {
          p: 0,
          children: props.defaultRender(),
        };
      }

      if (props.columnName === 'actions') {
        return {
          children: (
            <Flex gap={2} alignItems='flex-start' inline>
              <Button
                use='tertiary'
                onClick={(e) => {
                  e.stopPropagation();
                  setSidePanelRow(props.row);
                  setSidePanelOpen(true);
                }}
              >
                Open SidePanel
              </Button>
              <Button
                use='tertiary'
                theme='muted'
                addonLeft={TrashM}
                aria-label='Delete'
                title='Delete'
                onClick={(e) => {
                  e.stopPropagation();
                  showFailureNoticeBubble();
                }}
              />
            </Flex>
          ),
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

      if (props.columnName === 'percent_tax') {
        return {
          children: (
            <Flex direction='column' alignItems='flex-end' gap={1} w='100%'>
              <Text>{props.value != null ? String(props.value) : ''}</Text>
              <ButtonLink
                use='secondary'
                onClick={(e) => {
                  e.stopPropagation();
                  setFullReportModalVisible(true);
                }}
              >
                Open full report
              </ButtonLink>
            </Flex>
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
              handle={COLUMN_COPY_HANDLE[props.columnName as string] ?? true}
            />
          ),
        };
      }

      return {
        children: <Text>{props.value}</Text>,
      };
    },
    [showFailureNoticeBubble],
  );

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

  const mainTableContent =
    defferedPillValue === 'pageError'
      ? (
          <Box w='100%'>
            <PageError />
          </Box>
        )
      : (
          <Card w='100%'>
            <Card.Body p={0}>
              <Flex justifyContent='space-between' alignItems='center' px={4}>
                <SelectedRowsInfo selectedRows={selectedRows} />

                <BeforeTablesControls
                  columns={manageableCols}
                  selectedColumns={columns}
                  setSelectedColumns={(columns: string[] | null) => {
                    if (columns === null) {
                      setColumns(manageableCols.map((c) => c.name));
                    } else {
                      setColumns(columns);
                    }
                  }}
                  onChangeColumns={handleChangeColumns}
                />
              </Flex>
              <Table
                loading={searchPending}
                currentPage={currentPage}
                selectedRows={selectedRows}
                columns={cols.filter((c) => c.name === ALWAYS_VISIBLE_COLUMN_NAME || columns.includes(c.name))}
                CellRenderer={cellRenderer}
                demoState={tableDemoState}
                nameSearchQuery={debouncedNameFilter}
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
        );

  return (
    <IntlProvider
      locale={DEFAULT_LOCALE}
      defaultLocale={DEFAULT_LOCALE}
      messages={DEFAULT_MESSAGES}
    >
      <Flex gap={3} alignItems='flex-start' my={4} justifyContent='space-between'>
        <Flex gap={2} alignItems='flex-start'>
          <Pills
            value={pillValue}
            onChange={(v: string | null) => {
              if (v === 'default' || v === 'progress' || v === 'limited' || v === 'pageError') {
                setPillValue(v);
                onPageErrorChange?.(v === 'pageError');
              }
            }}
            aria-label='Table state'
          >
            <Pills.Item value='default'>Default state</Pills.Item>
            <Pills.Item value='progress'>Progress</Pills.Item>
            <Pills.Item value='limited'>
              <Pills.Item.Text>Limited data</Pills.Item.Text>
              <Dot
                aria-label='New'
                size='l'
                up={true}
              />
            </Pills.Item>
            <Pills.Item value='pageError'>Page error</Pills.Item>
          </Pills>
          <PrimaryTableAddFilter nameFilter={nameFilter} onNameFilterChange={setNameFilter} />
        </Flex>

        <Flex gap={3} alignItems='center'>
          {defferedPillValue === 'progress' && (
            <ProgressBar
              tabIndex={0}
              value={65}
              size='l'
              w={120}
              aria-label='Progress'
            >
              <ProgressBar.Value />
            </ProgressBar>
          )}
          <AdvancedFilter />
        </Flex>

      </Flex>

      {mainTableContent}

      <NoticeBubbleContainer manager={noticeBubbleManager} />

      <SidePanel
        visible={sidePanelOpen}
        onClose={() => {
          setSidePanelOpen(false);
          setSidePanelRow(null);
        }}
        aria-label='Row data'
      >
        <SidePanel.Body px={5} py={4}>
          {sidePanelRow && (
            <Text tag='p' size={200}>
              payment_intent_id:
              {' '}
              {String(sidePanelRow.payment_intent_id ?? '')}
            </Text>
          )}
        </SidePanel.Body>
      </SidePanel>

      <FullscreenModal visible={fullReportModalVisible} onClose={() => setFullReportModalVisible(false)}>
        <FullscreenModal.Close />
        <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
        <FullscreenModal.Header title='Modal Window Title' description='Additional information' />
        <FullscreenModal.Footer />
      </FullscreenModal>
    </IntlProvider>
  );
};
