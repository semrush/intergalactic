---
title: Table code and API
fileSource: table
deprecated: true
tabs: Example('table-old'), API('table-old-api'), Changelog('table-old-changelog')
---

::: warning
:rotating_light: Library `@semcore/table` is deprecated. Use new library [@semcore/data-table](/table-group/data-table/data-table). It is based on `CSS-flex` technology and doesn't use native tables.
:::

## Table with an accordion

Example of a table with an [accordion](/components/accordion/accordion) 😎

::: sandbox

<script lang="tsx">
import React from 'react';
import Table from '@semcore/ui/table';
import Accordion from '@semcore/ui/accordion';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => (
  <Table>
    <Table.Head>
      <Table.Row>
        {Object.keys(data[0]).map((name) => (
          <Table.CellHead key={name}>{name}</Table.CellHead>
        ))}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      <Accordion>
        {data.map((item, index) => (
          <Accordion.Item value={index} key={index}>
            <Accordion.Item.Toggle tag={Table.Row}>
              {Object.values(item).map((value, ind) => (
                <Table.Cell
                  key={value}
                  style={ind === 0 ? { display: 'flex', alignItems: 'center' } : {}}
                >
                  {ind === 0 && <Accordion.Item.Chevron color='stone' mr={2} />}
                  {value}
                </Table.Cell>
              ))}
            </Accordion.Item.Toggle>
            <Accordion.Item.Collapse>
              <Box p={'12px 32px'}>{`Section ${index + 1}`}</Box>
            </Accordion.Item.Collapse>
          </Accordion.Item>
        ))}
      </Accordion>
    </Table.Body>
  </Table>
);

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Table with a fixed header

::: sandbox

<script lang="tsx">
import React, { useState, useEffect } from 'react';
import Spin from '@semcore/ui/spin';
import ScrollArea from '@semcore/ui/scroll-area';
import { Text } from '@semcore/ui/typography';
import Table from '@semcore/ui/table';
import Tooltip from '@semcore/ui/tooltip';
import Checkbox from '@semcore/ui/checkbox';
import Link from '@semcore/ui/link';

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let data = [
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

data.forEach((d) => {
  data = shuffle(data.concat(data));
});

const Demo = () => {
  const [top, setTop] = useState(0);
  useEffect(() => {
    const header = document.getElementsByTagName('header')[0];
    header && setTop(header.offsetHeight);
  }, []);

  return (
    <ScrollArea>
      <ScrollArea.Container>
        <Table>
          <Table.StickyHead top={top} />
          <Table.Head>
            <Table.Row>
              <Table.CellHead align='center' valign='middle' width='50'>
                <Checkbox size='l'>
                  <Checkbox.Value />
                </Checkbox>
              </Table.CellHead>
              <Table.CellHead width='200'>
                <Tooltip title='Lorem ipsum'>
                  <span>
                    Keyword <Text color='gray60'>(1 - 100)</Text>
                  </span>
                </Tooltip>
              </Table.CellHead>

              {Object.keys(data[0])
                .slice(1)
                .map((name) => (
                  <Table.CellHead width='200' align='right'>
                    <Tooltip title='Lorem ipsum'>
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
                <Table.Cell
                  theme={row.kd === '-' ? false : 'default'}
                  align='center'
                  valign='middle'
                >
                  <Checkbox size='l'>
                    <Checkbox.Value />
                  </Checkbox>
                </Table.Cell>
                <Table.Cell theme={row.kd === '-' ? false : 'default'}>
                  <Link>{row.keyword}</Link>
                </Table.Cell>

                {Object.keys(data[0])
                  .slice(1)
                  .map((name) => (
                    <Table.Cell align='right' theme={row.kd === '-' ? false : 'default'}>
                      {row[name]}
                    </Table.Cell>
                  ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </ScrollArea.Container>
      <ScrollArea.Bar />
    </ScrollArea>
  );
};


</script>

:::

## Secondary table

You can use secondary table for compact displaying small amount of data inside widgets.

::: sandbox

<script lang="tsx">
import React from 'react';
import Table from '@semcore/ui/table';

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: 'n/a',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: '65,457,920',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];

const Demo = () => (
  <Table use='secondary'>
    <Table.Head>
      <Table.Row theme={false}>
        {Object.keys(data[0])
          .slice(0, -1)
          .map((name) => (
            <Table.CellHead key={name}>{name}</Table.CellHead>
          ))}
        {Object.keys(data[0])
          .slice(-1)
          .map((name) => (
            <Table.CellHead key={name} sorting='asc' active>
              {name}
            </Table.CellHead>
          ))}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {data.map((row) => (
        <Table.Row>
          {Object.keys(row).map((name) => (
            <Table.Cell key={row[name]}>{row[name]}</Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);


</script>

:::

## Example of data being loaded for the first time

::: sandbox

<script lang="tsx">
import React from 'react';
import Table from '@semcore/ui/table';
import Skeleton from '@semcore/ui/skeleton';
import Checkbox from '@semcore/ui/checkbox';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';

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
];
const fetchData = () => (
  <Table.Cell>
    <Skeleton height={17}>
      <Skeleton.Text y='5' width='60%' />
    </Skeleton>
  </Table.Cell>
);

const Demo = () => (
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.CellHead align='center' valign='middle'>
          <Checkbox size='l'>
            <Checkbox.Value />
          </Checkbox>
        </Table.CellHead>
        <Table.CellHead>
          <Tooltip title='Lorem ipsum'>
            <span>
              Keyword <Text color='gray60'>(1 - 100)</Text>
            </span>
          </Tooltip>
        </Table.CellHead>
        {Object.keys(data[0])
          .slice(1)
          .map((name) => (
            <Table.CellHead>
              <Tooltip title='Lorem ipsum'>
                <span>
                  {name.toUpperCase()} {['kd', 'traffic'].includes(name) && '%'}
                </span>
              </Tooltip>
            </Table.CellHead>
          ))}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {[...new Array(10)].map(() => (
        <Table.Row theme={false}>
          {fetchData()}
          {Object.keys(data[0]).map(() => fetchData())}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);


</script>

:::

## Table with no data

These states for widgets are described in detail in [Widget empty state](/components/widget-empty/widget-empty-code).

::: sandbox

<script lang="tsx">
import React from 'react';
import Table from '@semcore/ui/table';
import { NoData } from '@semcore/ui/widget-empty';

const Demo = () => {
  const data = [...new Array(5)];

  return (
    <Table h={300}>
      <Table.Head>
        <Table.Row>
          {data.map((_, indCell) => (
            <Table.CellHead>Cell - {indCell + 1}</Table.CellHead>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row theme={false}>
          <Table.Cell colSpan={data.length} pt={10}>
            <NoData
              type={'table'}
              description='Try selecting a different date or changing your filter settings.'
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};


</script>

:::

