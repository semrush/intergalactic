import React from 'react';
import Breadcrumbs from 'intergalactic/breadcrumbs';
import Ellipsis from 'intergalactic/ellipsis';

const Demo = () => (
  <Breadcrumbs wMax={300}>
    <Ellipsis>
      <Ellipsis.Content tag={Breadcrumbs.Item} active={false} href='#' role={'link'}>
        Ellipsis
      </Ellipsis.Content>
      <Ellipsis.Popper />
    </Ellipsis>
    <Ellipsis>
      <Ellipsis.Content tag={Breadcrumbs.Item} href='#' role={'link'}>
        This title is longer than a giraffe's neck, I bet it's been doing neck workouts!
      </Ellipsis.Content>
      <Ellipsis.Popper />
    </Ellipsis>
    <Breadcrumbs.Item active>Current page</Breadcrumbs.Item>
  </Breadcrumbs>
);

export default Demo;
