import Breadcrumbs from '@semcore/breadcrumbs';
import React from 'react';

const Demo = () => (
  <Breadcrumbs w={600}>
    <Breadcrumbs.Item active={false} href='#' role='link'>
      Ellipsis
    </Breadcrumbs.Item>
    <Breadcrumbs.Item active={false} href='#' role='link' ellipsis={{ trim: 'middle' }}>
      This title is longer than a giraffe's neck, I bet it's been doing neck workouts!
    </Breadcrumbs.Item>
    <Breadcrumbs.Item active>Current page</Breadcrumbs.Item>
  </Breadcrumbs>
);
export default Demo;
