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
    <Breadcrumbs.Item tag={Link} href="/whatever">
      404
    </Breadcrumbs.Item>
    <Breadcrumbs.Item tag={Link} active>
      this example
    </Breadcrumbs.Item>
  </Breadcrumbs>
);
