import Breadcrumbs from '@semcore/breadcrumbs';
import Link from '@semcore/link';
import React from 'react';

const Demo = () => (
  <Breadcrumbs aria-label='Redefining tag example'>
    <Breadcrumbs.Item href='/'>Projects</Breadcrumbs.Item>
    <Breadcrumbs.Item href='/components/breadcrumbs'>somedomain.com</Breadcrumbs.Item>
    <Breadcrumbs.Item tag={Link} active href='#'>
      Current page
    </Breadcrumbs.Item>
  </Breadcrumbs>
);

export default Demo;
