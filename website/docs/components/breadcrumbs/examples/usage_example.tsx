import React from 'react';
import Breadcrumbs from 'intergalactic/breadcrumbs';
import Tooltip from 'intergalactic/tooltip';

const Demo = () => (
  <Breadcrumbs tag='nav'>
    <Tooltip tag={Breadcrumbs.Item} active={false} href='#' title='Projects'>
      Projects
    </Tooltip>
    <Tooltip
      tag={Breadcrumbs.Item}
      active={false}
      href='#'
      title="This title is longer than a giraffe's neck, I bet it's been doing neck workouts!"
    >
      This title is longer than a giraffe's neck, I bet it's been doing neck workouts!
    </Tooltip>
    <Breadcrumbs.Item active>Current page</Breadcrumbs.Item>
  </Breadcrumbs>
);

export default Demo;
