---
title: Ellipsis
fileSource: ellipsis
tabs: Design('ellipsis'), A11y('ellipsis-a11y'), API('ellipsis-api'), Example('ellipsis-code'), Changelog('ellipsis-changelog')
---

## Basic usage

::: sandbox

<script lang="tsx">
import React from 'react';
import Ellipsis from '@semcore/ui/ellipsis';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <Box w={220}>
      <Ellipsis>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
        voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae sed ullam
        voluptate? Aperiam distinctio minus possimus quasi.
      </Ellipsis>
    </Box>
  );
}
</script>

:::

## Link

::: sandbox

<script lang="tsx">
import React from 'react';
import Ellipsis from '@semcore/ui/ellipsis';
import { Box } from '@semcore/ui/flex-box';
import Link from '@semcore/ui/link';

const Demo = () => {
  return (
    <Box w={220}>
      <Link inline href='https://developer.semrush.com/intergalactic/'>
        <Link.Text tag={Ellipsis}>https://developer.semrush.com/intergalactic/</Link.Text>
      </Link>
    </Box>
  );
}
</script>

:::

## Trimming type

It's possible to truncate the middle of the text string.

::: sandbox

<script lang="tsx">
import React from 'react';
import Ellipsis from '@semcore/ui/ellipsis';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <Box w={150}>
      <Ellipsis trim='middle'>Source page very long title and URL</Ellipsis>
    </Box>
  );
}
</script>

:::

## Multiline

It's possible to specify after what text line apply truncating

::: sandbox

<script lang="tsx">
import React from 'react';
import Ellipsis from '@semcore/ui/ellipsis';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  return (
    <Card w={220}>
      <Card.Header>
        <Card.Title tag='h4' inline my={0}>
          Card heading
        </Card.Title>
        <Card.Description tag='div'>
          <Ellipsis maxLine={3}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
            voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae sed
            ullam voluptate? Aperiam distinctio minus possimus quasi.
          </Ellipsis>
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Text size={100}>Your awesome card content</Text>
      </Card.Body>
    </Card>
  );
}
</script>

:::

## Multiple use

in case of multiple use of a component for optimization you can use one observer for all components

::: sandbox

<script lang="tsx">
import React, { useRef } from 'react';
import DataTable from '@semcore/ui/data-table';
import Ellipsis, { useResizeObserver } from '@semcore/ui/ellipsis';

const Demo = () => {
  const containerRef = useRef(null);

  const containerRect = useResizeObserver(containerRef);

  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' ref={containerRef} />
      </DataTable.Head>
      <DataTable.Body>
        <DataTable.Cell data={data} name='vol'>
          {(props, row) => {
            return {
              children: (
                <Ellipsis trim='middle' containerRect={containerRect} containerRef={containerRef}>
                  {row[props.name]}
                </Ellipsis>
              ),
            };
          }}
        </DataTable.Cell>
      </DataTable.Body>
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000,500,00032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920,000,50032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640,000,50032,500,000,500,00032,500,000,500,00032,500,000,500,000',
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
    vol: '21,644,290,000,500',
  },
];
</script>

:::

## Advanced use

For more control over the container and tooltip, you can use the `Ellipsis.Content` and `Ellipsis.Popper` components.

::: sandbox

<script lang="tsx">
import React from 'react';
import Ellipsis from '@semcore/ui/ellipsis';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <Box>
      <Ellipsis trim='middle'>
        <Ellipsis.Content w={100}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem commodi,
          doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum tempore
          voluptas. Aliquam eos expedita illo quasi unde!
        </Ellipsis.Content>
        <Ellipsis.Popper w={500} wMax={500} />
      </Ellipsis>
    </Box>
  );
}
</script>

:::
