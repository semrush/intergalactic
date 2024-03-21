import React from 'react';
import Breadcrumbs from 'intergalactic/breadcrumbs';
import Link from 'intergalactic/link';

const Demo = () => (
  <Breadcrumbs tag='nav'>
    <Breadcrumbs.Item tag='a' href='/'>
      main page
    </Breadcrumbs.Item>
    <Breadcrumbs.Item tag='a' href='/components/breadcrumbs'>
      breadcrumbs
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Link href='/whatever'>404</Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Link active href='#'>
        this example
      </Link>
    </Breadcrumbs.Item>
  </Breadcrumbs>
);

export default Demo;
