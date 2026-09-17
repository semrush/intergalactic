import Card from '@semcore/ui/card';
import { DataTable } from '@semcore/ui/data-table';
import React from 'react';

const Demo = () => {
  return (
    <Card w='700px'>
      <Card.Body pt={0} px={0} pb={1}>
        <DataTable
          variant='card'
          data={data}
          w='100%'
          headerProps={{ sticky: true, withScrollBar: true }}
          columns={[
            {
              name: 'keyword',
              children: 'Keyword',
              gtcWidth: 'minmax(246px, 1fr)',
            },
            { name: 'kd', children: 'KD %', gtcWidth: '70px' },
            { name: 'cpc', children: 'CPC', gtcWidth: '80px' },
          ]}
          uniqueRowKey='id'
          loading
          compact
        />
      </Card.Body>
    </Card>
  );
};

const data = Array.from({ length: 100 }, (_, index) => ({
  id: `${index + 1}`,
  keyword: `ebay buy ${index + 1}`,
  kd: '31.2',
  cpc: '$1.15',
}));

export default Demo;
