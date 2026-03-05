import Breadcrumbs from '@semcore/ui/breadcrumbs';
import Button from '@semcore/ui/button';
import type { TextProps } from '@semcore/ui/typography';
import React, { useState } from 'react';

const ellipsisProps = {
  observeChildrenMutations: true,
} satisfies TextProps['ellipsis'];

const Demo = () => {
  const [name, setName] = useState('Name');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Breadcrumbs>
        <Breadcrumbs.Item href='/'>Home</Breadcrumbs.Item>
        <Breadcrumbs.Item wMax={150} active ellipsis={ellipsisProps}>
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
