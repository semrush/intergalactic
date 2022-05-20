import React from 'react';
import Table from '@semcore/table';

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
  <Table use="secondary">
    <Table.Head>
      <Table.Row theme="false">
        {Object.keys(data[0])
          .slice(0, -1)
          .map((name) => (
            <Table.CellHead key={name}>{name}</Table.CellHead>
          ))}
        {Object.keys(data[0])
          .slice(-1)
          .map((name) => (
            <Table.CellHead key={name} sorting="asc" active>
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

export default Demo;
