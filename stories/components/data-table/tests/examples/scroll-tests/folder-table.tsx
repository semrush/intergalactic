import KebabM from '@semcore/icon/Kebab/m';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { Box, Flex } from '@semcore/ui/base-components';
import Button, { ButtonLink } from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import Link from '@semcore/ui/link';
import Skeleton from '@semcore/ui/skeleton';
import { Text } from '@semcore/ui/typography';
import React, { useMemo } from 'react';

type RowData = {
  id: string;
  domain: string;
  isLoading?: boolean;
  isLastAdded: boolean;
  siteHealth: string | null;
  visibility: string | null;
  visibilityUpdated: string | null;
  toxicDomains: string | null;
  ideasTodo: string | null;
  backlinkProspects: string | null;
  organicSessions: string | null;
};

enum TableColumn {
  folder = 'folder',
  siteHealth = 'siteHealth',
  visibility = 'visibility',
  toxicDomains = 'toxicDomains',
  ideasTodo = 'ideasTodo',
  backlinkProspects = 'backlinkProspects',
  organicSessions = 'organicSessions',
  folderActions = 'folderActions',
}

const headerToolCellProps = {
  gtcWidth: 'minmax(138px, 1fr)',
  justifyContent: 'end',
  alignItems: 'end',
} as const;

const headerProps = { sticky: true, h: 41, withScrollBar: true } as const;

const emptyLoadingRow: RowData = {
  id: '',
  isLoading: true,
  isLastAdded: false,
  domain: '',
  siteHealth: null,
  visibility: null,
  visibilityUpdated: null,
  toxicDomains: null,
  ideasTodo: null,
  backlinkProspects: null,
  organicSessions: null,
};

const loadingData: RowData[] = [
  { ...emptyLoadingRow, id: 'loading-1' },
  { ...emptyLoadingRow, id: 'loading-2' },
  { ...emptyLoadingRow, id: 'loading-3' },
];

const renderCellChildren = (cellName: TableColumn, row: RowData): React.ReactNode => {
  switch (cellName) {
    case TableColumn.folder:
      return (
        <Flex direction='column' alignItems='start' w='100%'>
          <Flex style={{ width: '100%', alignItems: 'center', gap: 8 }}>
            <img
              src={`https://www.google.com/s2/favicons?sz=64&domain_url=${row.domain}`}
              width={16}
              height={16}
              loading='lazy'
              alt=''
              aria-hidden='true'
            />
            <Link
              size={300}
              fontWeight={700}
              w='calc(100% - 24px)'
            >
              <Link.Text ellipsis w='100%'>{row.domain}</Link.Text>
            </Link>
          </Flex>
          <Box style={{ paddingLeft: 24 }}>
            <Link
              size={200}
              color='var(--intergalactic-text-hint, #6c6e79)'
            >
              <Link.Text>{row.domain}</Link.Text>
              <Link.Addon>
                <LinkExternalM color='icon-secondary-neutral' />
              </Link.Addon>
            </Link>
          </Box>
        </Flex>
      );

    case TableColumn.siteHealth:
      if (row.siteHealth !== null) {
        return (
          <Link size={300} fontWeight={700}>
            {row.siteHealth}
          </Link>
        );
      }
      return (
        <Button use='primary' theme='info'>
          Set up
        </Button>
      );

    case TableColumn.visibility:
      if (row.visibility !== null) {
        return (
          <Flex direction='column' style={{ alignItems: 'end', gap: 4 }}>
            <Link size={300} fontWeight={700}>
              {row.visibility}
            </Link>
            <Text size={200} color='var(--intergalactic-text-secondary, #6c6e79)'>
              {row.visibilityUpdated}
            </Text>
          </Flex>
        );
      }
      return (
        <Button use='primary' theme='info'>
          Set up
        </Button>
      );

    case TableColumn.toxicDomains:
      if (row.toxicDomains !== null) {
        return (
          <Link size={300} fontWeight={700}>
            {row.toxicDomains}
          </Link>
        );
      }
      return (
        <Button use='primary' theme='info'>
          Set up
        </Button>
      );

    case TableColumn.ideasTodo:
      if (row.ideasTodo !== null) {
        return (
          <Link size={300} fontWeight={700}>
            {row.ideasTodo}
          </Link>
        );
      }
      return <ButtonLink size={200}>Set up</ButtonLink>;

    case TableColumn.backlinkProspects:
      if (row.backlinkProspects !== null) {
        return (
          <Link size={300} fontWeight={700}>
            {row.backlinkProspects}
          </Link>
        );
      }
      return <ButtonLink size={200}>Set up</ButtonLink>;

    case TableColumn.organicSessions:
      if (row.organicSessions !== null) {
        return (
          <Link size={300} fontWeight={700}>
            {row.organicSessions}
          </Link>
        );
      }
      return <ButtonLink size={200}>Set up</ButtonLink>;

    case TableColumn.folderActions:
      return (
        <Button use='tertiary' theme='muted' aria-label='Settings'>
          <Button.Addon>
            <KebabM />
          </Button.Addon>
        </Button>
      );
  }
};

type DemoProps = {
  loading?: boolean;
};

const Demo = ({ loading = false }: DemoProps) => {
  const computedData = useMemo(() => (loading ? loadingData : data), [loading]);

  const columns: React.ComponentProps<typeof DataTable>['columns'] = useMemo(
    () => [
      {
        name: TableColumn.folder,
        children: 'Folder',
        gtcWidth: 'minmax(215px, 1fr)',
        fixed: 'left' as const,
        justifyContent: 'start',
        alignItems: 'end',
      },
      { ...headerToolCellProps, name: TableColumn.siteHealth, children: 'Site Health' },
      { ...headerToolCellProps, name: TableColumn.visibility, children: 'Visibility' },
      { ...headerToolCellProps, name: TableColumn.toxicDomains, children: 'Toxic Domains' },
      { ...headerToolCellProps, name: TableColumn.ideasTodo, children: 'Ideas to Do' },
      { ...headerToolCellProps, name: TableColumn.backlinkProspects, children: 'Backlink Prospects' },
      { ...headerToolCellProps, name: TableColumn.organicSessions, children: 'Organic Sessions' },
      {
        name: TableColumn.folderActions,
        children: null,
        gtcWidth: '56px',
        fixed: 'right' as const,
        justifyContent: 'center',
      },
    ],
    [],
  );

  return (
    <DataTable
      uniqueRowKey='id'
      use='secondary'
      data={computedData}
      aria-label='Folders table'
      w='calc(100vw - 3rem)'
      headerProps={headerProps}
      sideIndents='wide'
      columns={columns}
      renderCell={({ dataKey, row, defaultRender }) => {
        const cellName = dataKey as TableColumn;
        const { isLoading, ...typedRow } = row as unknown as RowData;

        if (isLoading) {
          if (cellName === TableColumn.folderActions) {
            return null;
          }
          if (cellName === TableColumn.folder) {
            return (
              <Skeleton height={17} pr={4}>
                <Skeleton.Text y='5' width='100%' />
              </Skeleton>
            );
          }
          return (
            <Skeleton height={17} px={1}>
              <Skeleton.Text y='5' width='100%' />
            </Skeleton>
          );
        }

        const children = renderCellChildren(cellName, typedRow as RowData);
        if (children === undefined) {
          return defaultRender();
        }

        return {
          alignItems: 'start',
          children,
        };
      }}
    />
  );
};

const data: RowData[] = [
  { id: '1', domain: 'semrush.com', isLastAdded: false, siteHealth: '96%', visibility: '100%', visibilityUpdated: '5 hours ago', toxicDomains: '4.9K', ideasTodo: '191', backlinkProspects: null, organicSessions: null },
  { id: '2', domain: 'moz.com', isLastAdded: true, siteHealth: '88%', visibility: '74%', visibilityUpdated: '2 hours ago', toxicDomains: '2.1K', ideasTodo: '342', backlinkProspects: '1.3K', organicSessions: '580K' },
  { id: '3', domain: 'ahrefs.com', isLastAdded: false, siteHealth: '99%', visibility: '98%', visibilityUpdated: '1 day ago', toxicDomains: '310', ideasTodo: '57', backlinkProspects: '4.7K', organicSessions: '2.1M' },
  { id: '4', domain: 'searchengineland.com', isLastAdded: false, siteHealth: '91%', visibility: '85%', visibilityUpdated: '3 hours ago', toxicDomains: '8.2K', ideasTodo: '1.1K', backlinkProspects: null, organicSessions: '12.4M' },
  { id: '5', domain: 'backlinko.com', isLastAdded: false, siteHealth: null, visibility: '62%', visibilityUpdated: '12 hours ago', toxicDomains: '1.8K', ideasTodo: '204', backlinkProspects: null, organicSessions: null },
  { id: '6', domain: 'neilpatel.com', isLastAdded: false, siteHealth: '78%', visibility: null, visibilityUpdated: null, toxicDomains: '3.4K', ideasTodo: null, backlinkProspects: '920', organicSessions: '760K' },
  { id: '7', domain: 'searchmetrics.com', isLastAdded: false, siteHealth: '94%', visibility: '91%', visibilityUpdated: '6 hours ago', toxicDomains: '5.6K', ideasTodo: '88', backlinkProspects: '3.2K', organicSessions: '4.8M' },
  { id: '8', domain: 'serpstat.com', isLastAdded: false, siteHealth: null, visibility: null, visibilityUpdated: null, toxicDomains: null, ideasTodo: null, backlinkProspects: null, organicSessions: null },
  { id: '9', domain: 'majestic.com', isLastAdded: false, siteHealth: '83%', visibility: '55%', visibilityUpdated: '2 days ago', toxicDomains: '670', ideasTodo: '415', backlinkProspects: null, organicSessions: '310K' },
  { id: '10', domain: 'spyfu.com', isLastAdded: false, siteHealth: '97%', visibility: '93%', visibilityUpdated: '30 min ago', toxicDomains: '1.2K', ideasTodo: '129', backlinkProspects: '6.1K', organicSessions: '9.3M' },
];

export default Demo;
