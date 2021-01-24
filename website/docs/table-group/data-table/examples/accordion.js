import React, { useState } from 'react';
import DataTable from '@semcore/data-table';
import Accordion from '@semcore/accordion';
import { Box, Flex } from '@semcore/flex-box';

function RowAccordion({ value, collapse = {}, ...props }) {
  return (
    <Accordion.Item value={value}>
      <Accordion.Item.Toggle {...props} />
      <Accordion.Item.Collapse {...collapse} />
    </Accordion.Item>
  );
}

export default () => {
  const [value, setValue] = useState([]);
  return (
    /* [1] Add Accordion component */
    <Accordion value={value} onChange={setValue}>
      <DataTable data={data}>
        <DataTable.Head>
          <DataTable.Column name="keyword" children="Keyword" />
          <DataTable.Column name="kd" children="KD,%" />
          <DataTable.Column name="cpc" children="CPC" />
          <DataTable.Column name="vol" children="Vol." />
        </DataTable.Head>
        <DataTable.Body>
          {/* [2] Add Row component */}
          <DataTable.Row tag={RowAccordion}>
            {(props, row, index) => {
              return {
                /* [3] Set value for Accordion.Item */
                value: index,
                /* [4] Calculate active row if need apply style */
                active: value.includes(index),
                collapse: {
                  children: <Box p={'12px 32px'}>{`Section ${index + 1}`}</Box>,
                },
              };
            }}
          </DataTable.Row>
          <DataTable.Cell name="keyword">
            {(props, row, index) => {
              return {
                children: (
                  <Flex alignItems="center">
                    {/* [5] Render Chevron if need */}
                    <Accordion.Item.Chevron color="stone" mr={2} />
                    {props.children}
                  </Flex>
                ),
              };
            }}
          </DataTable.Cell>
        </DataTable.Body>
      </DataTable>
    </Accordion>
  );
};

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
