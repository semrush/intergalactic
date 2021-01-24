import React from 'react';
import Table from '@semcore/table';
import Skeleton from '@semcore/skeleton';
import Checkbox from '@semcore/checkbox';
import Tooltip from '@semcore/tooltip';
import { Text } from '@semcore/typography';

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
      new Date('12.11.2019'),
    ),
  },
];
const fetchData = () => (
  <Table.Cell>
    <Skeleton visible height={17}>
      <Skeleton.Text y="5" width="60%" />
    </Skeleton>
  </Table.Cell>
);

const Demo = () => (
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.CellHead align="center" valign="middle">
          <Checkbox size="l">
            <Checkbox.Value />
          </Checkbox>
        </Table.CellHead>
        <Table.CellHead>
          <Tooltip title="Lorem ipsum">
            <span>
              Keyword <Text color="gray60">(1 – 100)</Text>
            </span>
          </Tooltip>
        </Table.CellHead>
        {Object.keys(data[0])
          .slice(1)
          .map((name) => (
            <Table.CellHead>
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
      {[...new Array(10)].map(() => (
        <Table.Row theme={false}>
          {fetchData()}
          {Object.keys(data[0]).map(() => fetchData())}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default Demo;
