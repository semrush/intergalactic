import React from 'react';
import Breadcrumbs from '@semcore/breadcrumbs';
import Ellipsis from '@semcore/ellipsis';

const Demo = () => (
  <Breadcrumbs w={600}>
    <Breadcrumbs.Item tag={Ellipsis} trim={'middle'} active={false} href='#' role={'link'}>
      Ellipsis
    </Breadcrumbs.Item>
    <Breadcrumbs.Item tag={Ellipsis} trim={'middle'} active={false} href='#' role={'link'} >
      This title is longer than a giraffe's neck, I bet it's been doing neck workouts!
    </Breadcrumbs.Item>
    <Breadcrumbs.Item active>Current page</Breadcrumbs.Item>
  </Breadcrumbs>
);
export default Demo;
