import React from 'react';
import Table from 'intergalactic/table';
import Skeleton from 'intergalactic/skeleton';
import Checkbox from 'intergalactic/checkbox';
import Tooltip from 'intergalactic/tooltip';
import { Text } from 'intergalactic/typography';

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
              Keyword <Text color='text-secondary'>(1 - 100)</Text>
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

export default Demo;
