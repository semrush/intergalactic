import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import DataTable from '@semcore/data-table';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/TestingExamples',
  component: DataTable,
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// export const SimpleButton: DataTable = {
//   args: {
//     children: 'Button',
//     // size: 'm',
//     onClick: fn(),
//     // use: 'primary',
//   },
// };

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

export const BasicPrimaryTable: Story = {
  render: (props) => {
    return (
      <>
        <DataTable data={data} aria-label={'Base table example'}>
          <DataTable.Head>
            <DataTable.Column name='keyword' children='Keyword' />
            <DataTable.Column name='kd' children='KD,%' />
            <DataTable.Column name='cpc' children='CPC' />
            <DataTable.Column name='vol' children='Vol.' />
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      </>
    );
  },
};
