import React from 'react';
import Breadcrumbs from 'intergalactic/breadcrumbs';
import Link from 'intergalactic/link';

const Demo = () => (
  <Breadcrumbs tag='nav'>
    <Breadcrumbs.Item tag='a' href='/'>
      Projects
    </Breadcrumbs.Item>
    <Breadcrumbs.Item tag='a' href='/components/breadcrumbs'>
      somedomain.com
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Link active href='#'>
        Current page
      </Link>
    </Breadcrumbs.Item>
  </Breadcrumbs>
);

export default Demo;
