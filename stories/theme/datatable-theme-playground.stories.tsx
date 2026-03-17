import SummaryAI from '@semcore/icon/SummaryAI/m';
import { Box, Flex } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableData, DataTableSort } from '@semcore/ui/data-table';
import Pagination from '@semcore/ui/pagination';
import { Text } from '@semcore/ui/typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { ThemePlaygroundLayout } from './theme-playground-switcher';
import AccordionInTableExample from '../components/data-table/docs/examples/table-in-table';
import './theme-playground-fonts.css';

const LAZZER_FONT = '\'Lazzer\', sans-serif';

const meta: Meta = {
  title: 'Theme/DataTable Theme Playground',
};

export default meta;

type Story = StoryObj;

const dataTableData: DataTableData = [
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.40', vol: '65,457,920' },
  { keyword: 'ebay store', kd: '10.0', cpc: '$0.65', vol: '47,354,640' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0.00', vol: '21,644,290' },
];

type FirstTableRow = (typeof dataTableData)[number];

const rowThemeStyles = ['success', 'info', 'muted', 'warning', 'danger'] as const;
const primaryDataTableThemedRows: DataTableData = rowThemeStyles.map((theme, i) => ({
  theme,
  metric: String(100 - i * 15),
  value: String(250 + i * 50),
  change: `${i % 2 === 0 ? '+' : ''}${(i - 2) * 5}%`,
}));
const primaryDataTablePlainRows: DataTableData = [
  { theme: 'neutral', metric: '72', value: '520', change: '+3%' },
  { theme: 'neutral', metric: '58', value: '410', change: '-1%' },
  { theme: 'neutral', metric: '91', value: '680', change: '+7%' },
  { theme: 'neutral', metric: '44', value: '290', change: '-2%' },
  { theme: 'neutral', metric: '63', value: '395', change: '+5%' },
];
const primaryDataTableData: DataTableData = [...primaryDataTableThemedRows, ...primaryDataTablePlainRows];

type PrimaryTableRow = (typeof primaryDataTableData)[number];

const featureHighlightTableData: DataTableData = [
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25' },
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25' },
];

type FeatureHighlightTableRow = (typeof featureHighlightTableData)[number];

const featureHighlightColumnsPrimary = [
  { name: 'keyword', children: 'Keyword' },
  {
    name: 'kd',
    children: (
      <>
        <SummaryAI color='--intergalactic-icon-primary-feature-highlight' />
        KD %
      </>
    ),
    sortable: true,
    style: { gap: '4px' },
    justifyContent: 'end',
  },
  { name: 'cpc', children: 'CPC', sortable: true, justifyContent: 'end' },
];

const featureHighlightColumnsSecondary = [
  { name: 'keyword', children: 'Keyword' },
  {
    name: 'kd',
    children: (
      <>
        <SummaryAI color='--intergalactic-icon-primary-feature-highlight' />
        KD %
      </>
    ),
    style: { gap: '4px' },
    justifyContent: 'end',
  },
  { name: 'cpc', children: 'CPC', justifyContent: 'end' },
];

function DataTableThemePlaygroundContent() {
  const [firstTablePage, setFirstTablePage] = React.useState(1);
  const [primaryThemedTablePage, setPrimaryThemedTablePage] = React.useState(1);
  const [firstTableSort, setFirstTableSort] = React.useState<
    DataTableSort<keyof FirstTableRow>
  >(['keyword', 'asc']);
  const firstTableSortedData = React.useMemo(
    () =>
      [...dataTableData].sort((a, b) => {
        const [prop, direction] = firstTableSort;
        const aVal = a[prop];
        const bVal = b[prop];
        if (prop === 'kd') {
          const diff = Number(aVal) - Number(bVal);
          return direction === 'asc' ? diff : -diff;
        }
        if (prop === 'cpc') {
          const parse = (s: string) => Number(String(s).replace(/[^.\d]/g, '')) || 0;
          const diff = parse(String(aVal)) - parse(String(bVal));
          return direction === 'asc' ? diff : -diff;
        }
        if (prop === 'vol') {
          const parse = (s: string) => Number(String(s).replace(/,/g, '')) || 0;
          const diff = parse(String(aVal)) - parse(String(bVal));
          return direction === 'asc' ? diff : -diff;
        }
        const cmp = String(aVal).localeCompare(String(bVal));
        return direction === 'asc' ? cmp : -cmp;
      }),
    [firstTableSort],
  );

  const secondaryTableSortedByVol = React.useMemo(
    () =>
      [...dataTableData].sort((a, b) => {
        const parse = (s: string) => Number(String(s).replace(/,/g, '')) || 0;
        return parse(String(b.vol)) - parse(String(a.vol));
      }),
    [],
  );

  const [featureHighlightTableSort, setFeatureHighlightTableSort] = React.useState<
    DataTableSort<keyof FeatureHighlightTableRow>
  >(['cpc', 'desc']);
  const handleFeatureHighlightSortChange = (newSort: DataTableSort<string>) => {
    setFeatureHighlightTableSort(newSort as DataTableSort<keyof FeatureHighlightTableRow>);
  };

  const [primaryTableSort, setPrimaryTableSort] = React.useState<
    DataTableSort<keyof PrimaryTableRow>
  >(['theme', 'asc']);
  const primaryTableSortedData = React.useMemo(
    () =>
      [...primaryDataTableData].sort((a, b) => {
        const [prop, direction] = primaryTableSort;
        const aVal = a[prop];
        const bVal = b[prop];
        if (prop === 'metric' || prop === 'value') {
          const diff = Number(aVal) - Number(bVal);
          return direction === 'asc' ? diff : -diff;
        }
        if (prop === 'change') {
          const parseChange = (s: string) => Number(String(s).replace(/[^-\d]/g, '')) || 0;
          const diff = parseChange(String(aVal)) - parseChange(String(bVal));
          return direction === 'asc' ? diff : -diff;
        }
        const cmp = String(aVal).localeCompare(String(bVal));
        return direction === 'asc' ? cmp : -cmp;
      }),
    [primaryTableSort],
  );

  return (
    <ThemePlaygroundLayout switcherZIndex={10000}>
      <Box px={6} pt={6} pb={30} style={{ background: 'var(--intergalactic-bg-primary-neutral)' }}>
        <Flex justifyContent='space-between' alignItems='center' mb={10}>
          <Text tag='h1' semibold size={600} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
            DataTable theme playground
          </Text>
        </Flex>

        <Flex direction='column' gap={10} alignItems='flex-start'>
          <Box wMin={500}>
            <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
              DataTable (primary)
            </Text>
            <DataTable
              data={firstTableSortedData}
              sort={firstTableSort}
              onSortChange={setFirstTableSort}
              aria-label='Theme playground table'
              w='600px'
              defaultGridTemplateColumnWidth='minmax(80px, 1fr)'
              columns={[
                {
                  name: 'keyword',
                  children: 'Keyword',
                  gtcWidth: 'minmax(130px, 2fr)',
                  sortable: true,
                  changeSortSize: true,
                },
                {
                  name: 'kd',
                  children: 'KD %',
                  gtcWidth: 'minmax(80px, 1fr)',
                  justifyContent: 'end',
                  sortable: true,
                  changeSortSize: true,
                },
                {
                  name: 'cpc',
                  children: 'CPC',
                  gtcWidth: 'minmax(80px, 1fr)',
                  justifyContent: 'end',
                  sortable: true,
                  changeSortSize: true,
                },
                {
                  name: 'vol',
                  children: 'Vol.',
                  gtcWidth: 'minmax(95px, 1fr)',
                  justifyContent: 'end',
                  sortable: true,
                  changeSortSize: true,
                },
              ]}
            />
            <Pagination
              mt={3}
              totalPages={10}
              currentPage={firstTablePage}
              onCurrentPageChange={setFirstTablePage}
              aria-label='Pagination'
            />
          </Box>
          <Box wMin={500} className='secondary-table-vol-desc'>
            <style>{`.secondary-table-vol-desc [role="columnheader"][aria-sort], .secondary-table-vol-desc [role="columnheader"][aria-sort] a, .secondary-table-vol-desc [role="columnheader"][aria-sort] button { color: var(--intergalactic-icon-primary-neutral) !important; cursor: default !important; }`}</style>
            <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
              DataTable (secondary)
            </Text>
            <DataTable
              use='secondary'
              data={secondaryTableSortedByVol}
              sort={['vol', 'desc']}
              onSortChange={() => {}}
              aria-label='Theme playground table secondary'
              w='600px'
              defaultGridTemplateColumnWidth='minmax(80px, 1fr)'
              columns={[
                { name: 'keyword', children: 'Keyword', gtcWidth: 'minmax(130px, 2fr)' },
                { name: 'kd', children: 'KD %', gtcWidth: 'minmax(80px, 1fr)', justifyContent: 'end' },
                { name: 'cpc', children: 'CPC', gtcWidth: 'minmax(80px, 1fr)', justifyContent: 'end' },
                {
                  name: 'vol',
                  children: 'Vol.',
                  gtcWidth: 'minmax(95px, 1fr)',
                  justifyContent: 'end',
                  sortable: true,
                  changeSortSize: true,
                },
              ]}
            />
          </Box>
          <Box wMin={500}>
            <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
              DataTable (primary, rows with different themes)
            </Text>
            <DataTable
              use='primary'
              data={primaryTableSortedData}
              sort={primaryTableSort}
              onSortChange={setPrimaryTableSort}
              aria-label='Primary table with themed rows'
              w='600px'
              defaultGridTemplateColumnWidth='minmax(80px, 1fr)'
              columns={[
                {
                  name: 'theme',
                  children: 'Theme',
                  gtcWidth: 'minmax(120px, 1fr)',
                  sortable: true,
                  changeSortSize: true,
                },
                {
                  name: 'metric',
                  children: 'Metric',
                  gtcWidth: 'minmax(85px, 1fr)',
                  justifyContent: 'end',
                  sortable: true,
                  changeSortSize: true,
                },
                {
                  name: 'value',
                  children: 'Value',
                  gtcWidth: 'minmax(85px, 1fr)',
                  justifyContent: 'end',
                  sortable: true,
                  changeSortSize: true,
                },
                {
                  name: 'change',
                  children: 'Change',
                  gtcWidth: 'minmax(90px, 1fr)',
                  justifyContent: 'end',
                  sortable: true,
                  changeSortSize: true,
                },
              ]}
              rowProps={(row) =>
                rowThemeStyles.includes(row.theme as (typeof rowThemeStyles)[number])
                  ? { theme: row.theme as (typeof rowThemeStyles)[number] }
                  : {}}
            />
            <Pagination
              mt={3}
              totalPages={10}
              currentPage={primaryThemedTablePage}
              onCurrentPageChange={setPrimaryThemedTablePage}
              aria-label='Pagination'
            />
          </Box>
          <Box wMin={500}>
            <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
              DataTable (primary, AI icon)
            </Text>
            <DataTable
              data={featureHighlightTableData}
              sort={featureHighlightTableSort}
              onSortChange={handleFeatureHighlightSortChange}
              aria-label='Primary table with AI column'
              wMax='800px'
              columns={featureHighlightColumnsPrimary}
            />
          </Box>
          <Box wMin={300}>
            <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
              DataTable (secondary, AI icon)
            </Text>
            <DataTable
              use='secondary'
              data={featureHighlightTableData}
              aria-label='Secondary table with AI column'
              wMax='300px'
              columns={featureHighlightColumnsSecondary}
            />
          </Box>
          <Box wMin={500}>
            <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
              Accordion in table
            </Text>
            <AccordionInTableExample />
          </Box>
        </Flex>
      </Box>
    </ThemePlaygroundLayout>
  );
}

export const Default: Story = {
  render: () => <DataTableThemePlaygroundContent />,
};
