import Breadcrumbs from '@semcore/ui/breadcrumbs';
import React from 'react';

const Demo = () => (
  <Breadcrumbs aria-label='Truncation example'>
    <Breadcrumbs.Item
      active={false}
      href='#'
      role='link'
      ellipsis={true}
    >
      Ellipsis
    </Breadcrumbs.Item>
    <Breadcrumbs.Item
      active={false}
      href='#'
      role='link'
      wMax={200}
      ellipsis={true}
    >
      This title is longer than a giraffe's neck, I bet it's been doing neck workouts!
    </Breadcrumbs.Item>
    <Breadcrumbs.Item active>Current page</Breadcrumbs.Item>
  </Breadcrumbs>
);

export default Demo;
