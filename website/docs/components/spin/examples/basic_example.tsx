import React from 'react';
import DataTable from '@semcore/data-table';
import Spin from '@semcore/spin';
import Button from '@semcore/button';

const Demo = () => {
  const [loading, setLoading] = React.useState(true);

  const data = [
    {
      fruit: 'Apples',
      quantity: '456',
    },
    {
      fruit: 'Bananas',
      quantity: loading ? <Spin size='s' /> : '32',
    },
  ];

  return (
    <>
      <DataTable data={data} aria-label={'Table title'}>
        <DataTable.Head>
          <DataTable.Column name='fruit' children='Fruit' />
          <DataTable.Column name='quantity' children='Quantity' />
        </DataTable.Head>
        <DataTable.Body>
          <DataTable.Cell data={data} name='quantity'>
            {(props, row) => {
              return {
                children: (
                  <div role='status' aria-live='polite'>
                    {row[props.name]}
                  </div>
                ),
              };
            }}
          </DataTable.Cell>
        </DataTable.Body>
      </DataTable>
      <Button onClick={() => setLoading(!loading)} mt={3}>
        {loading ? 'Stop loading' : 'Start loading'}
      </Button>
    </>
  );
};

export default Demo;
