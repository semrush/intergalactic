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
    <Accordion value={value} onChange={setValue}>
      <DataTable data={data}>
        <DataTable.Head wMin={800}>
          <DataTable.Column name="keyword" children="Keyword" fixed="left" />
          <DataTable.Column name="kd" children="KD,%" />
          <DataTable.Column name="cpc" children="CPC" />
          <DataTable.Column name="vol" children="Vol." />
        </DataTable.Head>
        <DataTable.Body>
          <DataTable.Row tag={RowAccordion}>
            {(props, row, index) => {
              return {
                value: index,
                active: value.includes(index),
                collapse: {
                  /* [1] Render the table to accordion content */
                  children: (
                    /* [2] Set the desired z-index */
                    <DataTable data={data} zIndex={2}>
                      {/* [3] Hide the table header */}
                      <DataTable.Head hidden>
                        <DataTable.Column name="keyword" fixed="left" />
                        <DataTable.Column name="kd" />
                        <DataTable.Column name="cpc" />
                        <DataTable.Column name="vol" />
                      </DataTable.Head>
                      <DataTable.Body />
                    </DataTable>
                  ),
                },
              };
            }}
          </DataTable.Row>
          <DataTable.Cell name="keyword">
            {(props, row, index) => {
              return {
                children: (
                  <Flex alignItems="center">
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
