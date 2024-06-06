import React from 'react';
import Breadcrumbs from 'intergalactic/breadcrumbs';
import Link from 'intergalactic/link';

const Demo = () => (
  <Breadcrumbs>
    <Breadcrumbs.Item href='/'>Projects</Breadcrumbs.Item>
    <Breadcrumbs.Item href='/components/breadcrumbs'>somedomain.com</Breadcrumbs.Item>
    <Breadcrumbs.Item tag={Link} active href={'#'}>
      Current page
    </Breadcrumbs.Item>
  </Breadcrumbs>
);

export default Demo;
