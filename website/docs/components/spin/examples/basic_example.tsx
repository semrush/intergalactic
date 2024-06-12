import React from 'react';
import DataTable from 'intergalactic/data-table';
import Spin from 'intergalactic/spin';
import Button from 'intergalactic/button';

const Demo = () => {
  const [loading, setLoading] = React.useState(false);

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
      <Button onClick={() => setLoading(true)} mb={3} mr={2}>
        Load data
      </Button>
      <Button onClick={() => setLoading(false)} mb={3}>
        Stop loading
      </Button>
      <DataTable data={data}>
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
    </>
  );
};

export default Demo;
