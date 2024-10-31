import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Badge from '@semcore/badge';
import CheckM from '@semcore/icon/Check/m';
import Ellipsis, { useResizeObserver } from '@semcore/ellipsis';
import { Box } from '@semcore/flex-box';
import CheckL from '@semcore/icon/Check/l';
import CloseM from '@semcore/icon/Close/m';
import Spin from '@semcore/spin';
import Card from '@semcore/card';
import { Text } from '@semcore/typography';
import DataTable from '@semcore/data-table';
import Link from '@semcore/link';

const meta: Meta<typeof Ellipsis> = {
  title: 'Components/Ellipsis',
  component: Ellipsis,
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof Ellipsis>;

export const BasicUsage: Story = {
  args: {
    children: 'Ellipsis',
    trim: 'end',
    //onClick: fn(),
    // use: 'primary',
  },
  render: (args) => {
    return (
      <Box w={220}>
        <Ellipsis>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
          voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae sed
          ullam voluptate? Aperiam distinctio minus possimus quasi.
        </Ellipsis>
      </Box>
    );
  },
};

export const EllipsisForLink: Story = {
  render: (props) => {
    return (
      <>
        <Box w={220}>
          <Link inline href='https://developer.semrush.com/intergalactic/'>
            <Link.Text tag={Ellipsis}>https://developer.semrush.com/intergalactic/</Link.Text>
          </Link>
        </Box>
      </>
    );
  },
};

export const TrimmingType: Story = {
  render: (props) => {
    return (
      <>
        <Box w={150}>
          <Ellipsis trim='middle'>Source page very long title and URL</Ellipsis>
        </Box>
      </>
    );
  },
};

export const Multiline: Story = {
  render: (props) => {
    return (
      <>
        <Card w={220}>
          <Card.Header>
            <Card.Title tag='h4' inline my={0}>
              Card heading
            </Card.Title>
            <Card.Description tag='div'>
              <Ellipsis maxLine={3}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
                voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae
                sed ullam voluptate? Aperiam distinctio minus possimus quasi.
              </Ellipsis>
            </Card.Description>
          </Card.Header>
          <Card.Body>
            <Text size={100}>Your awesome card content</Text>
          </Card.Body>
        </Card>
      </>
    );
  },
};

export const MultipleUse: Story = {
  render: (props) => {
    const containerRef = React.useRef(null);

    const containerRect = useResizeObserver(containerRef);

    return (
      <>
        <DataTable data={data} aria-label={'Table title'}>
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
                    <Ellipsis
                      trim='middle'
                      containerRect={containerRect}
                      containerRef={containerRef}
                    >
                      {row[props.name]}
                    </Ellipsis>
                  ),
                };
              }}
            </DataTable.Cell>
          </DataTable.Body>
        </DataTable>
      </>
    );
  },
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

export const AdvancedUse: Story = {
  render: (props) => {
    return (
      <>
        <Box>
          <Ellipsis trim='middle'>
            <Ellipsis.Content w={100}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
              commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit
              rerum tempore voluptas. Aliquam eos expedita illo quasi unde!
            </Ellipsis.Content>
            <Ellipsis.Popper w={500} wMax={500} />
          </Ellipsis>
        </Box>
      </>
    );
  },
};
