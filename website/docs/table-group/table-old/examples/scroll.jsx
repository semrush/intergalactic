import React from 'react';
import styled from 'styled-components';
import Spin from '@semcore/ui/spin';
import ScrollArea from '@semcore/ui/scroll-area';
import { Text } from '@semcore/ui/typography';
import Table from '@semcore/table';
import Tooltip from '@semcore/ui/tooltip';
import Checkbox from '@semcore/ui/checkbox';
import Link from '@semcore/ui/link';

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    'last update': new Intl.DateTimeFormat('en-US', { year: 'numeric', era: 'long' }).format(
      new Date('2019/11/12'),
    ),
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    'last update': new Intl.DateTimeFormat('en-US', { year: 'numeric', era: 'long' }).format(
      new Date('2019/11/12'),
    ),
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    'last update': new Intl.DateTimeFormat('en-US', { year: 'numeric', era: 'long' }).format(
      new Date('2019/11/12'),
    ),
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    last_update: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: <Spin />,
    vol: <Spin />,
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    last_update: 'n/a',
  },
];

const StyledScrollArea = styled(ScrollArea)`
  [class*='SShadowHorizontal']::before {
    left: 200px !important;
  }
`;

const TableLayoutFixed = styled(Table)`
  table-layout: fixed;
`;

const StyledCellSticky = styled(Table.Cell)`
  position: sticky;
  z-index: 1;
`;

const StyledThSticky = styled(Table.CellHead)`
  position: sticky;
`;

const Demo = () => (
  <StyledScrollArea shadow>
    <ScrollArea.Container>
      <TableLayoutFixed>
        <Table.Head>
          <Table.Row theme="false">
            <StyledThSticky align="center" valign="middle" width="50" left={0}>
              <Checkbox size="l">
                <Checkbox.Value />
              </Checkbox>
            </StyledThSticky>
            <StyledThSticky
              width="150"
              left={50}
              valign="middle"
              style={{ boxShadow: '0 0 1px #dee3e5' }}
            >
              <Tooltip title="Lorem ipsum">
                <span>
                  Keyword <Text color="gray60">(1 – 100)</Text>
                </span>
              </Tooltip>
            </StyledThSticky>

            {Object.keys(data[0])
              .slice(1)
              .map((name) => (
                <Table.CellHead width="200" valign="middle">
                  <Tooltip title="Lorem ipsum">
                    <span>
                      {name.toUpperCase()} {['kd', 'traffic'].includes(name) && '%'}
                    </span>
                  </Tooltip>
                </Table.CellHead>
              ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map((row, i) => (
            <Table.Row key={i} theme={row.kd === '-' ? 'danger' : 'default'}>
              <StyledCellSticky
                theme={row.kd === '-' ? false : 'default'}
                align="center"
                valign="middle"
                left={0}
              >
                <Checkbox size="l">
                  <Checkbox.Value />
                </Checkbox>
              </StyledCellSticky>
              <StyledCellSticky theme={row.kd === '-' ? false : 'default'} left={50}>
                <Link>{row.keyword}</Link>
              </StyledCellSticky>

              {Object.keys(data[0])
                .slice(1)
                .map((name) => (
                  <Table.Cell align="right" theme={row.kd === '-' ? false : 'default'}>
                    {row[name]}
                  </Table.Cell>
                ))}
            </Table.Row>
          ))}
        </Table.Body>
      </TableLayoutFixed>
    </ScrollArea.Container>
    <ScrollArea.Bar w="calc(100% - 200px)" ml="200px" />
  </StyledScrollArea>
);

export default Demo;
