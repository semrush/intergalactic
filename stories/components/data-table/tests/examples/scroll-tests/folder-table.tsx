import KebabM from '@semcore/icon/Kebab/m';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { Box, Flex } from '@semcore/ui/base-components';
import Button, { ButtonLink } from '@semcore/ui/button';
import type { CellRenderProps } from '@semcore/ui/data-table';
import { DataTable } from '@semcore/ui/data-table';
import Ellipsis from '@semcore/ui/ellipsis';
import Link from '@semcore/ui/link';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type FolderRow = (typeof data)[number];

const renderCell = ({ columnName, row: rawRow }: CellRenderProps<FolderRow, string>) => {
  const row = rawRow as unknown as FolderRow;
  if (columnName === 'folder') {
    return (
      <Flex direction='column' style={{ minWidth: 0, alignItems: 'start' }}>
        <Flex style={{ width: '100%', alignItems: 'center', gap: 8 }}>
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${row.domain}`}
            width={16}
            height={16}
            loading='lazy'
            alt=''
            aria-hidden='true'
          />
          <Ellipsis>
            <Ellipsis.Content tag={Link} size={300} fontWeight={700} href={row.folderHref}>
              {row.domain}
            </Ellipsis.Content>
            <Ellipsis.Popper />
          </Ellipsis>
        </Flex>
        <Box style={{ paddingLeft: 24 }}>
          <Link
            href={`https://${row.domain}`}
            size={200}
            color='var(--intergalactic-text-hint, #6c6e79)'
            target='_blank'
            rel='noreferrer'
          >
            <Link.Text>{row.domain}</Link.Text>
            <Link.Addon>
              <LinkExternalM color='icon-secondary-neutral' />
            </Link.Addon>
          </Link>
        </Box>
      </Flex>
    );
  }

  if (columnName === 'siteHealth') {
    return row.siteHealth !== null
      ? (
          <Link href={row.siteHealthHref!} size={300} fontWeight={700}>
            {row.siteHealth}
          </Link>
        )
      : (
          <Button use='primary' theme='info'>
            Set up
          </Button>
        );
  }

  if (columnName === 'visibility') {
    return row.visibility !== null
      ? (
          <Flex direction='column' style={{ alignItems: 'end', gap: 4 }}>
            <Link href={row.visibilityHref!} size={300} fontWeight={700}>
              {row.visibility}
            </Link>
            <Text size={200} color='var(--intergalactic-text-secondary, #6c6e79)'>
              {row.visibilityUpdated}
            </Text>
          </Flex>
        )
      : (
          <Button use='primary' theme='info'>
            Set up
          </Button>
        );
  }

  if (columnName === 'toxicDomains') {
    return row.toxicDomains !== null
      ? (
          <Link href={row.toxicDomainsHref!} size={300} fontWeight={700}>
            {row.toxicDomains}
          </Link>
        )
      : (
          <Button use='primary' theme='info'>
            Set up
          </Button>
        );
  }

  if (columnName === 'ideasTodo') {
    return row.ideasTodo !== null
      ? (
          <Link href={row.ideasTodoHref!} size={300} fontWeight={700}>
            {row.ideasTodo}
          </Link>
        )
      : (
          <ButtonLink size={200}>Set up</ButtonLink>
        );
  }

  if (columnName === 'backlinkProspects') {
    return row.backlinkProspects !== null
      ? (
          <Link href={row.backlinkProspectsHref!} size={300} fontWeight={700}>
            {row.backlinkProspects}
          </Link>
        )
      : (
          <ButtonLink size={200}>Set up</ButtonLink>
        );
  }

  if (columnName === 'organicSessions') {
    return row.organicSessions !== null
      ? (
          <Link href={row.organicSessionsHref!} size={300} fontWeight={700}>
            {row.organicSessions}
          </Link>
        )
      : (
          <ButtonLink size={200}>Set up</ButtonLink>
        );
  }

  if (columnName === 'folderActions') {
    return (
      <Button use='tertiary' theme='muted' aria-label='Settings'>
        <Button.Addon>
          <KebabM />
        </Button.Addon>
      </Button>
    );
  }
};

const Demo = () => {
  return (
    <Box wMax={900}>
      <DataTable
        data={data}
        aria-label='Folders table'
        use='secondary'
        sideIndents='wide'
        compact
        headerProps={{
          sticky: true,
        }}
        renderCell={renderCell}
        columns={[
          {
            name: 'folder',
            children: 'Folder',
            gtcWidth: 'minmax(232px, 1fr)',
            fixed: 'left',
          },
          {
            name: 'siteHealth',
            children: 'Site Health',
            gtcWidth: 'minmax(138px, 1fr)',
            justifyContent: 'end',
          },
          {
            name: 'visibility',
            children: 'Visibility',
            gtcWidth: 'minmax(138px, 1fr)',
            justifyContent: 'end',
          },
          {
            name: 'toxicDomains',
            children: 'Toxic Domains',
            gtcWidth: 'minmax(138px, 1fr)',
            justifyContent: 'end',
          },
          {
            name: 'ideasTodo',
            children: 'Ideas to Do',
            gtcWidth: 'minmax(138px, 1fr)',
            justifyContent: 'end',
          },
          {
            name: 'backlinkProspects',
            children: 'Backlink Prospects',
            gtcWidth: 'minmax(138px, 1fr)',
            justifyContent: 'end',
          },
          {
            name: 'organicSessions',
            children: 'Organic Sessions',
            gtcWidth: 'minmax(138px, 1fr)',
            justifyContent: 'end',
          },
          {
            name: 'folderActions',
            children: '',
            gtcWidth: '56px',
            fixed: 'right',
            justifyContent: 'center',
          },
        ]}
      />
    </Box>
  );
};

const data = [
  {
    domain: 'nike.com',
    folderHref: '/seo/20958779/?fid=6594639',
    siteHealth: '96%',
    siteHealthHref: '/siteaudit/campaign/20958779/review/overview/',
    visibility: '100%',
    visibilityHref: '/tracking/landscape/20958779_4526683.html?fid=6594639',
    visibilityUpdated: '5 hours ago',
    toxicDomains: '4.9K',
    toxicDomainsHref: '/backlink_audit/20958779/overview/?fid=6594639',
    ideasTodo: '191',
    ideasTodoHref: '/on-page-seo-checker/20958779/overview?fid=6594639',
    backlinkProspects: null as string | null,
    backlinkProspectsHref: null as string | null,
    organicSessions: null as string | null,
    organicSessionsHref: null as string | null,
  },
  {
    domain: 'onboarding.online',
    folderHref: '/seo/?fid=6619602&name=onboarding.online&domain=onboarding.online',
    siteHealth: null as string | null,
    siteHealthHref: null as string | null,
    visibility: null as string | null,
    visibilityHref: null as string | null,
    visibilityUpdated: null as string | null,
    toxicDomains: null as string | null,
    toxicDomainsHref: null as string | null,
    ideasTodo: null as string | null,
    ideasTodoHref: null as string | null,
    backlinkProspects: null as string | null,
    backlinkProspectsHref: null as string | null,
    organicSessions: null as string | null,
    organicSessionsHref: null as string | null,
  },
];

export default Demo;
