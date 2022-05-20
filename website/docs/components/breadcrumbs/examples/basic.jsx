import React from 'react';
import Breadcrumbs from '@semcore/breadcrumbs';
import Tooltip from '@semcore/tooltip';

export default () => (
  <Breadcrumbs>
    <Breadcrumbs.Item href="#">Dashboard</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">Projects</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">semrush.com</Breadcrumbs.Item>
    <Tooltip
      tag={Breadcrumbs.Item}
      active={false}
      href="#"
      title="Very-very long title, you can't even imagine how long it is."
    >
      Very-very long title, you can't even imagine how long it is
    </Tooltip>
    <Breadcrumbs.Item active>Current page</Breadcrumbs.Item>
  </Breadcrumbs>
);
