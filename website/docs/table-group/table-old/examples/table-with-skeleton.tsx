import React from 'react';
import Table from '@semcore/table';
import Skeleton from '@semcore/skeleton';
import Checkbox from '@semcore/checkbox';
import { Hint } from '@semcore/tooltip';
import { Text } from '@semcore/typography';

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
          <Hint title='Lorem ipsum'>
            <span tabIndex={0}>
              Keyword <Text color='text-secondary'>(1 - 100)</Text>
            </span>
          </Hint>
        </Table.CellHead>
        {Object.keys(data[0])
          .slice(1)
          .map((name) => (
            <Table.CellHead>
              <Hint title='Lorem ipsum'>
                <span tabIndex={0}>
                  {name.toUpperCase()} {['kd', 'traffic'].includes(name) && '%'}
                </span>
              </Hint>
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
