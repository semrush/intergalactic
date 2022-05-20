import React from 'react';
import Table from '@semcore/table';
import { NoData } from '@semcore/widget-empty';

const Demo = () => {
  const data = [...new Array(5)];

  return (
    <Table h={300}>
      <Table.Head>
        <Table.Row>
          {data.map((_, indCell) => (
            <Table.CellHead>Cell - {indCell + 1}</Table.CellHead>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row theme={false}>
          <Table.Cell colSpan={data.length} pt={10}>
            <NoData
              type={'table'}
              description="Try selecting a different date or changing your filter settings."
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default Demo;
