import Breadcrumbs from '@semcore/ui/breadcrumbs';
import Button from '@semcore/ui/button';
import React, { useState } from 'react';

const Demo = () => {
  const [name, setName] = useState('Name');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Breadcrumbs>
        <Breadcrumbs.Item href='/'>Home</Breadcrumbs.Item>
        <Breadcrumbs.Item wMax={150} active ellipsis:observeChildrenMutations>
          {name}
        </Breadcrumbs.Item>
      </Breadcrumbs>
      <div>Actual name: {name}</div>
      <Button onClick={() => setName(`Name ${Math.random()}`)}>
        Update breadcrumb item name
      </Button>
    </div>
  );
};
export default Demo;
