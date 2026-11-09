import { Box, Flex } from '@semcore/ui/base-components';
import Checkbox from '@semcore/ui/checkbox';
import { Plot, Line, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import type { DataTableSort } from '@semcore/ui/data-table';
import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import { scaleLinear } from 'd3-scale';
import React from 'react';

export type PerformanceStressProps = {
  rows: number;
  columns: number;
  scrollMode: 'page' | 'container';
  headerScrollBar: boolean;
  stickyTop: number;
  accordion: 'rows' | 'chart';
  accordionDuration: number;
  fixedRight: boolean;
  compact: boolean;
  wideSideIndents: boolean;
  loading: boolean;
  virtualScroll: boolean;
};

const COLUMN_WIDTH = '160px';
const KEYWORD_COLUMN_WIDTH = 'minmax(240px, 1fr)';
const STICKY_COLUMN_WIDTH = '200px';
const CHECKBOX_COLUMN_WIDTH = '32px';
const TABLE_WIDTH = 960;
const TABLE_HEIGHT = 520;
const NESTED_ROWS = 3;
const ACCORDION_EVERY = 5;

const METRIC_MODES = [
  { value: 'traffic', label: 'Traffic', sort: 'trninety', diffSort: 'trninetydiff' },
  { value: 'position', label: 'Position', sort: 'posninety', diffSort: 'posninetydiff' },
  { value: 'visibility', label: 'Visibility', sort: 'vininety', diffSort: 'vininetydiff' },
] as const;

type MetricMode = (typeof METRIC_MODES)[number]['value'];

type PotentialValues = Record<MetricMode, { value: number; diff: number }>;

type PerformanceRow = {
  id: string;
  index: number;
  keyword: string;
  status: string;
  potential: PotentialValues;
  [metric: `m${number}`]: string;
  [ACCORDION]?: PerformanceRow[] | React.ReactNode;
};

const createPotential = (label: string): PotentialValues => {
  let seed = 0;
  for (let i = 0; i < label.length; i += 1) {
    seed = (seed + label.charCodeAt(i) * (i + 1)) % 997;
  }

  const potential = {} as PotentialValues;
  METRIC_MODES.forEach((mode, modeIndex) => {
    const base = seed + (modeIndex + 1) * 17;
    potential[mode.value] = {
      value: base % 100,
      diff: (base % 21) - 10,
    };
  });

  return potential;
};

const metricCount = (columnCount: number) => Math.max(0, columnCount - 2);

const createRow = (id: string, index: number, label: string, metrics: number): PerformanceRow => {
  const row = {
    id,
    index,
    keyword: `keyword-${label}`,
    status: `status-${label}`,
    potential: createPotential(label),
  } as PerformanceRow;

  for (let metric = 1; metric <= metrics; metric += 1) {
    row[`m${metric}`] = `m${metric}-${label}`;
  }

  return row;
};

const VisibleWidthContext = React.createContext<number | undefined>(undefined);

const useVisibleWidth = (ref: React.RefObject<HTMLElement>) => {
  const [width, setWidth] = React.useState<number>();

  React.useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return width;
};

const CHART_HEIGHT = 240;
const CHART_PADDING_X = 48;
const CHART_MARGIN = 32;
const CHART_MARGIN_LEFT = 48;
const CHART_DAYS = 30;

// Deterministic positions per row, so re-renders and sorting draw the same lines.
const createChartData = (seed: number) => {
  let value = seed * 9301 + 49297;
  const random = () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
  let domain = 5 + Math.round(random() * 40);
  let competitor = 5 + Math.round(random() * 40);

  return Array.from({ length: CHART_DAYS }, (_, day) => {
    domain = Math.min(100, Math.max(1, domain + Math.round((random() - 0.5) * 8)));
    competitor = Math.min(100, Math.max(1, competitor + Math.round((random() - 0.5) * 8)));
    return { day, domain, competitor };
  });
};

// Pinned to the visible part of the table like the positions chart in product tables:
// only the table scrolls horizontally under it.
const AccordionChart = React.memo(({ keyword, seed }: { keyword: string; seed: number }) => {
  const width = React.useContext(VisibleWidthContext);
  const data = React.useMemo(() => createChartData(seed), [seed]);
  const plotWidth = Math.max(0, (width ?? TABLE_WIDTH) - CHART_PADDING_X * 2);

  const xScale = scaleLinear()
    .range([CHART_MARGIN_LEFT, plotWidth - CHART_MARGIN])
    .domain(minMax(data, 'day'));
  // Position 1 is on top.
  const yScale = scaleLinear()
    .range([CHART_HEIGHT - CHART_MARGIN, CHART_MARGIN])
    .domain([100, 1]);

  return (
    <Box
      px={CHART_PADDING_X / 4}
      py={4}
      w={width}
      style={{
        position: 'sticky',
        left: 0,
        boxSizing: 'border-box',
        background: 'var(--intergalactic-bg-primary-neutral, #fff)',
      }}
    >
      <Box mb={2}>
        Positions for
        {' '}
        {keyword}
      </Box>
      {plotWidth > 0 && (
        <Plot data={data} scale={[xScale, yScale]} width={plotWidth} height={CHART_HEIGHT}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks ticks={xScale.ticks(10)}>
              {({ value }) => ({ children: `Day ${Number(value) + 1}` })}
            </XAxis.Ticks>
          </XAxis>
          <Line x='day' y='domain' color='chart-palette-order-1' />
          <Line x='day' y='competitor' color='chart-palette-order-2' />
        </Plot>
      )}
    </Box>
  );
});

type HeaderState = { checked: boolean; indeterminate: boolean };

type SelectionStore = {
  subscribe: (listener: () => void) => () => void;
  has: (id: string) => boolean;
  getHeaderState: () => HeaderState;
  toggle: (id: string) => void;
  toggleAll: () => void;
  setIds: (ids: string[]) => void;
};

const createSelectionStore = (): SelectionStore => {
  let ids: string[] = [];
  let selected = new Set<string>();
  const listeners = new Set<() => void>();
  let headerState: HeaderState = { checked: false, indeterminate: false };

  const refreshHeader = () => {
    let count = 0;
    for (const id of ids) {
      if (selected.has(id)) count += 1;
    }
    const checked = ids.length > 0 && count === ids.length;
    const indeterminate = count > 0 && count < ids.length;
    if (headerState.checked === checked && headerState.indeterminate === indeterminate) return false;
    headerState = { checked, indeterminate };
    return true;
  };

  const emit = () => {
    listeners.forEach((listener) => listener());
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    has(id) {
      return selected.has(id);
    },
    getHeaderState() {
      return headerState;
    },
    toggle(id) {
      if (selected.has(id)) selected.delete(id);
      else selected.add(id);
      refreshHeader();
      emit();
    },
    toggleAll() {
      const allSelected = ids.length > 0 && ids.every((id) => selected.has(id));
      selected = allSelected ? new Set() : new Set(ids);
      refreshHeader();
      emit();
    },
    setIds(next) {
      ids = next;
      if (refreshHeader()) emit();
    },
  };
};

const SelectionContext = React.createContext<SelectionStore | null>(null);

const EMPTY_HEADER: HeaderState = { checked: false, indeterminate: false };
const getEmptyHeader = () => EMPTY_HEADER;
const subscribeNothing = () => () => {};

const stopRowToggle = (event: React.SyntheticEvent) => event.stopPropagation();

const HeaderCheckbox = () => {
  const store = React.useContext(SelectionContext);
  const state = React.useSyncExternalStore(
    store?.subscribe ?? subscribeNothing,
    store?.getHeaderState ?? getEmptyHeader,
  );

  return (
    <Checkbox
      aria-label='Select all rows'
      checked={state.checked}
      indeterminate={state.indeterminate}
      onClick={stopRowToggle}
      onChange={store ? store.toggleAll : undefined}
    >
      <Checkbox.Value />
    </Checkbox>
  );
};

const RowCheckbox = React.memo(({ id }: { id: string }) => {
  const store = React.useContext(SelectionContext);
  const checked = React.useSyncExternalStore(
    store?.subscribe ?? subscribeNothing,
    () => (store ? store.has(id) : false),
  );

  return (
    <Checkbox
      aria-label={`Select ${id}`}
      checked={checked}
      onClick={stopRowToggle}
      onChange={store ? () => store.toggle(id) : undefined}
    >
      <Checkbox.Value />
    </Checkbox>
  );
});

type Column = {
  name: string;
  children: React.ReactNode;
  gtcWidth: string;
  fixed?: 'left' | 'right';
  sortable?: boolean;
  borders?: 'left' | 'right' | 'both';
  justifyContent?: string;
  alignItems?: string;
};

const createColumns = (columnCount: number, fixedRight: boolean, metricMode: MetricMode) => {
  const metrics = metricCount(columnCount);
  const mode = METRIC_MODES.find((item) => item.value === metricMode) ?? METRIC_MODES[0];
  const columns: Column[] = [
    // Empty fixed column for the accordion toggle, as in product tables.
    { name: 'accordion', children: null, gtcWidth: 'max-content', fixed: 'left' },
    {
      name: 'checkbox',
      children: <HeaderCheckbox />,
      gtcWidth: CHECKBOX_COLUMN_WIDTH,
      justifyContent: 'center',
      fixed: 'left',
    },
    {
      name: 'keyword',
      children: 'Keyword',
      gtcWidth: KEYWORD_COLUMN_WIDTH,
      fixed: 'left',
      sortable: true,
    },
    {
      name: mode.sort,
      children: mode.label,
      gtcWidth: COLUMN_WIDTH,
      justifyContent: 'flex-end',
      sortable: true,
      borders: 'left',
    },
    {
      name: mode.diffSort,
      children: 'Growth',
      gtcWidth: COLUMN_WIDTH,
      justifyContent: 'flex-end',
      sortable: true,
      borders: 'right',
    },
  ];

  for (let metric = 1; metric <= metrics; metric += 1) {
    columns.push({
      name: `m${metric}`,
      children: `m${metric}`,
      gtcWidth: COLUMN_WIDTH,
      justifyContent: 'flex-end',
      sortable: true,
      borders: metric % 2 === 0 ? 'right' : undefined,
    });
  }

  columns.push({
    name: 'status',
    children: 'Status',
    gtcWidth: STICKY_COLUMN_WIDTH,
    fixed: fixedRight ? 'right' : undefined,
  });

  return columns.map((column) => ({ alignItems: 'center', ...column }));
};

const createData = (
  rowCount: number,
  columnCount: number,
  accordion: PerformanceStressProps['accordion'],
): PerformanceRow[] => {
  const metrics = metricCount(columnCount);
  const data: PerformanceRow[] = [];

  for (let index = 0; index < rowCount; index += 1) {
    const row = createRow(`row-${index}`, index, String(index), metrics);

    if (accordion === 'chart') {
      row[ACCORDION] = <AccordionChart keyword={row.keyword} seed={index} />;
    } else if ((index + 1) % ACCORDION_EVERY === 0) {
      const nested: PerformanceRow[] = [];

      for (let child = 0; child < NESTED_ROWS; child += 1) {
        nested.push(createRow(`row-${index}-${child}`, index, `${index}-${child}`, metrics));
      }

      row[ACCORDION] = nested;
    }

    data.push(row);
  }

  return data;
};

const Demo = (props: PerformanceStressProps) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const visibleWidth = useVisibleWidth(wrapperRef);
  const selection = React.useMemo(() => createSelectionStore(), []);
  // DataTable mutates this Set (add/delete) before onAccordionToggle, then force-updates that row.
  // A new Set here changes the prop: DataTable is a PureComponent and re-renders every row.
  // The same reference, already holding the toggled key, leaves the other rows unrendered.
  const [expandedRows] = React.useState(() => new Set<string>());
  const [sort, setSort] = React.useState<DataTableSort<keyof PerformanceRow>>(['keyword', 'asc']);
  const [metricMode, setMetricMode] = React.useState<MetricMode>('traffic');

  const sourceData = React.useMemo(
    () => createData(props.rows, props.columns, props.accordion),
    [props.rows, props.columns, props.accordion],
  );
  // Sorting only reverses the rows: enough to re-render the body without paying for a real compare.
  const data = React.useMemo(
    () => (sort[1] === 'desc' ? [...sourceData].reverse() : sourceData),
    [sourceData, sort],
  );
  const columns = React.useMemo(
    () => createColumns(props.columns, props.fixedRight, metricMode),
    [props.columns, props.fixedRight, metricMode],
  );

  const rowIds = React.useMemo(() => data.map((row) => row.id), [data]);
  React.useLayoutEffect(() => {
    selection.setIds(rowIds);
  }, [rowIds]);

  const handleAccordionToggle = React.useCallback(() => {
    // The toggled key is already on `expandedRows`. Replacing the Set re-renders every row.
  }, []);

  const renderCell = React.useCallback(
    ({
      columnName,
      rawData,
      defaultRender,
    }: {
      columnName: string | symbol;
      rawData: PerformanceRow;
      defaultRender: () => any;
    }) => {
      if (columnName === ACCORDION) {
        return { p: 0 };
      }
      if (columnName === 'accordion') {
        return { justifyContent: 'center', children: null };
      }
      if (columnName === 'checkbox') {
        return {
          'justifyContent': 'center',
          'data-row-selector': true,
          'children': <RowCheckbox id={rawData.id} />,
        };
      }
      const mode = METRIC_MODES.find((item) => item.value === metricMode);
      if (mode && (columnName === mode.sort || columnName === mode.diffSort)) {
        const cell = rawData.potential[metricMode];
        return {
          justifyContent: 'flex-end',
          style: { whiteSpace: 'nowrap' },
          children: String(columnName === mode.sort ? cell.value : cell.diff),
        };
      }
      if (typeof columnName === 'string' && columnName.startsWith('m')) {
        return { justifyContent: 'flex-end', style: { whiteSpace: 'nowrap' }, children: defaultRender() };
      }
      return defaultRender();
    },
    [metricMode],
  );

  const rowProps = React.useCallback(
    (row: PerformanceRow, rowIndex: number) => ({ 'data-row-index': rowIndex }),
    [],
  );

  const headerProps = React.useMemo(
    () => ({ sticky: true, top: props.stickyTop, withScrollBar: props.headerScrollBar }),
    [props.stickyTop, props.headerScrollBar],
  );

  const sizes =
    props.scrollMode === 'container'
      ? { hMax: TABLE_HEIGHT, wMax: TABLE_WIDTH }
      : { w: '100%' };

  const table = (
    <DataTable
      data={data}
      columns={columns}
      aria-label='Data table performance stress'
      {...sizes}
      headerProps={headerProps}
      uniqueRowKey='id'
      expandedRows={expandedRows}
      onAccordionToggle={handleAccordionToggle}
      sort={sort}
      onSortChange={setSort}
      renderCell={renderCell as any}
      rowProps={rowProps as any}
      compact={props.compact}
      sideIndents={props.wideSideIndents ? 'wide' : undefined}
      loading={props.loading}
      accordionDuration={props.accordionDuration}
      // Virtual scroll needs a scroll container with a height.
      virtualScroll={props.virtualScroll && props.scrollMode === 'container'}
    />
  );

  return (
    <SelectionContext.Provider value={selection}>
      <VisibleWidthContext.Provider value={visibleWidth}>
        <Box ref={wrapperRef} wMax={TABLE_WIDTH}>
          <Flex alignItems='center' gap={2} mb={3}>
            <Select
              aria-label='Metric mode'
              value={metricMode}
              onChange={setMetricMode}
              options={METRIC_MODES.map((mode) => ({ value: mode.value, children: mode.label }))}
              w={160}
            />
            <Text size={200} color='text-secondary' tag='div'>
              Rows already contain every metric. Switching the mode only renames two columns.
            </Text>
          </Flex>
          {props.scrollMode === 'page' && props.stickyTop > 0 && (
            <Box
              h={props.stickyTop}
              style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--intergalactic-bg-primary-neutral, #fff)' }}
            >
              Sticky page header ({props.stickyTop}px)
            </Box>
          )}
          {table}
        </Box>
      </VisibleWidthContext.Provider>
    </SelectionContext.Provider>
  );
};

export const performanceStressDefaultProps: PerformanceStressProps = {
  rows: 200,
  columns: 12,
  scrollMode: 'page',
  headerScrollBar: true,
  stickyTop: 0,
  accordion: 'rows',
  accordionDuration: 0,
  fixedRight: true,
  compact: true,
  wideSideIndents: true,
  loading: false,
  virtualScroll: false,
};

Demo.defaultProps = performanceStressDefaultProps;

export default Demo;
