import React from 'react';
import DataTable from 'intergalactic/data-table';
import Flag from 'intergalactic/flags';
import { Flex } from '@semcore/flex-box';
import DnD from 'intergalactic/drag-and-drop';

const data = [
  {
    countryCode: 'US',
    countryTitle: 'United States',
    cpc: 1,
    vol: 1.14,
    kd: 37.7,
  },
  {
    countryCode: 'RS',
    countryTitle: 'Serbia',
    cpc: 1,
    vol: 1.58,
    kd: 37.7,
  },
  {
    countryCode: 'ES',
    countryTitle: 'Spain',
    cpc: 3,
    vol: 2.3,
    kd: 37.7,
  },
  {
    countryCode: 'CY',
    countryTitle: 'Cyprus',
    cpc: 53,
    vol: 4.8,
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
    <DataTable use='secondary' data={sortedData} w={400} aria-label={'Table title'}>
      <DataTable.Head>
        <DataTable.Column name='countryTitle' children='Keyword' wMin={140} justifyContent='left' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' justifyContent='left' />
        <DataTable.Column name='kd' children='KD' justifyContent='right' />
      </DataTable.Head>
      <DnD onDnD={handleDnD}>
        <DataTable.Body>
          <DataTable.Cell data={data} name='countryTitle'>
            {(_, row) => ({
              children: (
                <Flex gap={1} alignItems='center'>
                  <Flag iso2={row.countryCode as any} />
                  <span>{row.countryTitle}</span>
                </Flex>
              ),
            })}
          </DataTable.Cell>
          <DataTable.Row>
            {(props) => {
              return {
                children: (
                  <DnD.Draggable tag={Flex} placement='left'>
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
