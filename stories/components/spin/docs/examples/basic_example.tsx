import React from 'react';
import { DataTable } from '@semcore/data-table';
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
      <DataTable data={data} aria-label={'Table title'}  h={'auto'}
        columns={[
          {name: 'fruit', children: 'Fruit'},
          {name: 'quantity', children: 'Quantity'},
        ]}
                 renderCell={(props) => {
                   if (props.columnName === 'quantity') {
                     return (
                         <div role='status' aria-live='polite'>
                           {props.value}
                         </div>
                     );
                   }

                   return props.defaultRender();
                 }}
      />
      <Button onClick={() => setLoading(!loading)} mt={3}>
        {loading ? 'Stop loading' : 'Start loading'}
      </Button>
    </>
  );
};

export default Demo;
