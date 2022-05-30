import React from 'react';
import Breadcrumbs from '@semcore/breadcrumbs';

function Link(props) {
  return <a {...props} />;
}

export default () => (
  <Breadcrumbs>
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
      <Link active>this example</Link>
    </Breadcrumbs.Item>
  </Breadcrumbs>
);
