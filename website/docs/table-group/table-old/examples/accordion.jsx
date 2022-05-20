import React from 'react';
import Table from '@semcore/table';
import Accordion from '@semcore/accordion';
import { Box } from '@semcore/flex-box';

export default () => (
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
                <Table.Cell key={value}>
                  {ind === 0 && <Accordion.Item.Chevron color="stone" mr={2} />}
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
