import React, { useState } from 'react';
import DataTable from '@semcore/ui/data-table';
import Accordion from '@semcore/ui/accordion';
import { Flex } from '@semcore/ui/flex-box';

const RowAccordion = React.forwardRef(function ({ value, collapse = {}, ...props }, ref) {
  return (
    <Accordion.Item value={value} ref={ref}>
      <Accordion.Item.Toggle {...props} />
      <Accordion.Item.Collapse {...collapse} />
    </Accordion.Item>
  );
});

export default () => {
  const [value, setValue] = useState([]);
  return (
    <Accordion value={value} onChange={setValue}>
      <DataTable data={data}>
        <DataTable.Head>
          <DataTable.Column name="keyword" children="Keyword" />
          <DataTable.Column name="kd" children="KD,%" />
          <DataTable.Column name="cpc" children="CPC" />
          <DataTable.Column name="vol" children="Vol." />
        </DataTable.Head>
        <DataTable.Body>
          <DataTable.Row<typeof data> tag={RowAccordion}>
            {(_props, _row, index) => {
              return {
                value: index,
                active: value.includes(index),
                collapse: {
                  children: (
                    <DataTable data={data}>
                      {/* [1] Hide the table header */}
                      <DataTable.Head hidden>
                        {/* [2] Set "inherit" to use the size from the top table for each column. */}
                        <DataTable.Column name="keyword" flex="inherit" />
                        <DataTable.Column name="kd" flex="inherit" />
                        <DataTable.Column name="cpc" flex="inherit" />
                        <DataTable.Column name="vol" flex="inherit" />
                      </DataTable.Head>
                      <DataTable.Body />
                    </DataTable>
                  ),
                },
              };
            }}
          </DataTable.Row>
          <DataTable.Cell<typeof data> name="keyword">
            {(props) => {
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
