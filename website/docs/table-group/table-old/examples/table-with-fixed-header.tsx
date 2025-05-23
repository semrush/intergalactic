import React from 'react';
import Spin from '@semcore/spin';
import ScrollArea from '@semcore/scroll-area';
import { Text } from '@semcore/typography';
import Table from '@semcore/table';
import { Hint } from '@semcore/tooltip';
import Checkbox from '@semcore/checkbox';
import Link from '@semcore/link';

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
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    'last update': new Intl.DateTimeFormat('en-US', { year: 'numeric', era: 'long' }).format(
      new Date('2019/11/12'),
    ),
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    'last update': new Intl.DateTimeFormat('en-US', { year: 'numeric', era: 'long' }).format(
      new Date('2019/11/12'),
    ),
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    'last update': new Intl.DateTimeFormat('en-US', { year: 'numeric', era: 'long' }).format(
      new Date('2019/11/12'),
    ),
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    last_update: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: <Spin />,
    vol: <Spin />,
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    last_update: 'n/a',
  },
];

data.forEach((d) => {
  data = shuffle(data.concat(data));
});

const Demo = () => {
  const [top, setTop] = React.useState(0);
  React.useEffect(() => {
    const header = document.getElementsByTagName('header')[0];
    header && setTop(header.offsetHeight);
  }, []);

  return (
    <ScrollArea>
      <ScrollArea.Container>
        <Table>
          <Table.StickyHead top={top} />
          <Table.Head>
            <Table.Row>
              <Table.CellHead align='center' valign='middle' width='50'>
                <Checkbox size='l'>
                  <Checkbox.Value />
                </Checkbox>
              </Table.CellHead>
              <Table.CellHead width='200'>
                <Hint title='Lorem ipsum'>
                  <span tabIndex={0}>
                    Keyword <Text color='text-secondary'>(1 - 100)</Text>
                  </span>
                </Hint>
              </Table.CellHead>

              {Object.keys(data[0])
                .slice(1)
                .map((name) => (
                  <Table.CellHead width='200' align='right'>
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
            {data.map((row, i) => (
              <Table.Row key={i} theme={row.kd === '-' ? 'danger' : 'default'}>
                <Table.Cell
                  theme={row.kd === '-' ? false : 'default'}
                  align='center'
                  valign='middle'
                >
                  <Checkbox size='l'>
                    <Checkbox.Value />
                  </Checkbox>
                </Table.Cell>
                <Table.Cell theme={row.kd === '-' ? false : 'default'}>
                  <Link>{row.keyword}</Link>
                </Table.Cell>

                {Object.keys(data[0])
                  .slice(1)
                  .map((name) => (
                    <Table.Cell align='right' theme={row.kd === '-' ? false : 'default'}>
                      {row[name]}
                    </Table.Cell>
                  ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </ScrollArea.Container>
      <ScrollArea.Bar />
    </ScrollArea>
  );
};

export default Demo;
