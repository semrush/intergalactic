import React from 'react';
import styled from 'styled-components';
import Sticky from '@semcore/sticky';
import Checkbox from '@semcore/checkbox';
import Link from '@semcore/link';
import Table from '@semcore/table';
import { Text } from '@semcore/typography';
import Button from '@semcore/button';
import Spin from '@semcore/spin';
import ScrollArea from '@semcore/scroll-area';

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let data = [
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
    cpc: <Spin />,
    vol: <Spin />,
  },
];

data.forEach((d) => (data = shuffle(data.concat(data))));

const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 150px;
  background: hsla(0, 0%, 100%, 0.8);
`;

const Demo = () => (
  <ScrollArea h={500}>
    <Table style={{ position: 'relative' }}>
      <Table.Body>
        {data.map((row, i) => (
          <Table.Row key={i}>
            <Table.Cell>
              <Checkbox>
                <Checkbox.Value />
              </Checkbox>
            </Table.Cell>
            <Table.Cell>
              <Link>{row.keyword}</Link>
            </Table.Cell>
            <Table.Cell align="right">{row.kd}</Table.Cell>
            <Table.Cell align="right">{row.cpc}</Table.Cell>
            <Table.Cell align="right">{row.vol}</Table.Cell>
          </Table.Row>
        ))}
        <Loader>
          <Sticky top={150} style={{ textAlign: 'center' }}>
            <Text size={500} medium tag="h4" mb="16px">
              Want to view more results?
            </Text>
            <Text size={300} tag="p" mb="24px">
              To view more data, upgrade to a Guru or Business subscription plan.
            </Text>
            <Button use="primary" theme="success" size="xl">
              See plans and pricing
            </Button>
          </Sticky>
        </Loader>
      </Table.Body>
    </Table>
  </ScrollArea>
);

export default Demo;
