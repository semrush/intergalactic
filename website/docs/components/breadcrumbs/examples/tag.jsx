import React from 'react';
import Breadcrumbs from '@semcore/ui/breadcrumbs';
import Link from '@semcore/ui/link';

export default () => (
  <Breadcrumbs tag="nav">
    <Breadcrumbs.Item tag="a" href="/">
      main page
    </Breadcrumbs.Item>
    <Breadcrumbs.Item tag="a" href="/components/breadcrumbs">
      breadcrumbs
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Link href="/whatever">404</Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Link active href="#">
        this example
      </Link>
    </Breadcrumbs.Item>
  </Breadcrumbs>
);
