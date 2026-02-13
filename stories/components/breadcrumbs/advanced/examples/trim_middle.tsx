import Breadcrumbs from '@semcore/ui/breadcrumbs';
import type { BreadcrumbsItemProps } from '@semcore/ui/breadcrumbs';
import Ellipsis from '@semcore/ui/ellipsis';
import React from 'react';

const Demo = (props: BreadcrumbsItemProps) => (
  <Breadcrumbs w={600}>
    <Breadcrumbs.Item tag={Ellipsis} trim='middle' active={false} href='#' role='link'>
      Ellipsis
    </Breadcrumbs.Item>
    <Breadcrumbs.Item tag={Ellipsis} trim='middle' active={false} href='#' role='link'>
      This title is longer than a giraffe's neck, I bet it's been doing neck workouts!
    </Breadcrumbs.Item>
    <Breadcrumbs.Item tag={Ellipsis} trim='middle' active={props.active}>Current page</Breadcrumbs.Item>
  </Breadcrumbs>
);

export const breadcrumbsEllipsisExampleProps: BreadcrumbsItemProps = {
  active: true,
};
Demo.defaultProps = breadcrumbsEllipsisExampleProps;

export default Demo;
