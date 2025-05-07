import React from 'react';
import Breadcrumbs from '@semcore/breadcrumbs';

const Demo = () => (
  <>
<Breadcrumbs>
<Breadcrumbs.Item active data-testid ='one-active'>One active</Breadcrumbs.Item>
<Breadcrumbs.Item active data-testid ='second-active'>Second active</Breadcrumbs.Item>
</Breadcrumbs>

<Breadcrumbs separator = 'LinkExternalM'>
<Breadcrumbs.Item data-testid ='first-cust-separator'>first</Breadcrumbs.Item>
<Breadcrumbs.Item data-testid ='second-cust-separator'>second</Breadcrumbs.Item>
<Breadcrumbs.Item data-testid ='active-cust-separator' active>active</Breadcrumbs.Item>
<Breadcrumbs.Item data-testid ='style-cust-separator' style={{ opacity: 0.3 }}>custom style</Breadcrumbs.Item>
</Breadcrumbs>
</>

);
export default Demo;
