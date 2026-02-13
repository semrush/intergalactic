import Breadcrumbs from '@semcore/ui/breadcrumbs';
import Ellipsis from '@semcore/ui/ellipsis';
import React from 'react';

const Demo = () => (
  <Breadcrumbs aria-label='Truncation example'>
    <Ellipsis>
      <Ellipsis.Content tag={Breadcrumbs.Item} active={false} href='#' role='link'>
        Ellipsis
      </Ellipsis.Content>
      <Ellipsis.Popper />
    </Ellipsis>
    <Ellipsis>
      <Ellipsis.Content tag={Breadcrumbs.Item} active={false} href='#' role='link' w={300}>
        This title is longer than a giraffe's neck, I bet it's been doing neck workouts!
      </Ellipsis.Content>
      <Ellipsis.Popper />
    </Ellipsis>
    <Breadcrumbs.Item active>Current page</Breadcrumbs.Item>
  </Breadcrumbs>
);

export default Demo;
