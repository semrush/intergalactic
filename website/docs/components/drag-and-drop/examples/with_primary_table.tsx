import React from 'react';
import DataTable from 'intergalactic/data-table';
import { Flex } from 'intergalactic/flex-box';
import DnD from 'intergalactic/drag-and-drop';
import Checkbox from 'intergalactic/checkbox';
import { Text } from 'intergalactic/typography';
import Link from 'intergalactic/link';
import LinkExternalM from 'intergalactic/icon/LinkExternal/m';
import { Hint } from 'intergalactic/tooltip';

const data = [
  {
    domain: 'https://www.example.com',
    title: 'Example',
    cpc: 1,
    vol: 1.14,
    kd: 37.7,
  },
  {
    domain: 'https://semrush.com',
    title: 'Semrush',
    cpc: 1,
    vol: 1.58,
    kd: 37.7,
  },
  {
    domain: 'https://wikipedia.org',
    title: 'Wikipedia',
    cpc: 3,
    vol: 2.3,
    kd: 37.7,
  },
];

const Demo = () => {
  const [sortedData, setSortedData] = React.useState(data);

  const handleDnD = React.useCallback(
    ({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) => {
      setSortedData((data) => {
        const newData = [...data];
        const shift = fromIndex < toIndex ? 1 : -1;
        for (let i = fromIndex; i !== toIndex; i += shift) {
          newData[i] = data[i + shift];
        }
        newData[toIndex] = data[fromIndex];
        return newData;
      });
    },
    [],
  );

  return (
    <DataTable data={sortedData} w={600} aria-label={'Table title'}>
      <DataTable.Head>
        <DataTable.Column name='checkbox' wMax={30}>
          <Checkbox />
        </DataTable.Column>
        <DataTable.Column name='title' children='Website' wMin={250} />
        <DataTable.Column name='hint' children='Hints' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
        <DataTable.Column name='kd' children='KD' />
      </DataTable.Head>
      <DnD onDnD={handleDnD} aria-label={'drag-and-drop container'}>
        <DataTable.Body>
          <DataTable.Cell data={data} name='checkbox'>
            {() => ({ children: <Checkbox /> })}
          </DataTable.Cell>
          <DataTable.Cell data={data} name='title'>
            {(_, row) => ({
              children: (
                <Flex direction='column' gap={1}>
                  <Text>{row.title}</Text>
                  <Link href={row.domain} addonRight={LinkExternalM}>
                    {row.domain}
                  </Link>
                </Flex>
              ),
            })}
          </DataTable.Cell>
          <DataTable.Cell data={data} name='hint'>
            {() => ({
              children: (
                <Hint
                  title='Hello world'
                  tag={Text}
                  underline
                  style={{ textDecorationStyle: 'dashed' }}
                  color='text-secondary'
                >
                  Hint link
                </Hint>
              ),
            })}
          </DataTable.Cell>
          <DataTable.Row>
            {(props, data, rowIndex) => {
              return {
                children: (
                  <DnD.Draggable tag={Flex} placement='left' aria-label={`${rowIndex} row`}>
                    {props.children}
                  </DnD.Draggable>
                ),
              };
            }}
          </DataTable.Row>
        </DataTable.Body>
      </DnD>
    </DataTable>
  );
};
export default Demo;
