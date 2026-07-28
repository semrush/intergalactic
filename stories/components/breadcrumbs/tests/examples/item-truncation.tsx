import Breadcrumbs from '@semcore/ui/breadcrumbs';
import type { NSBreadcrumbs } from '@semcore/ui/breadcrumbs';
import React from 'react';

type BreadcrumbsExampleProps = {
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  hintProps?: false;
} & NSBreadcrumbs.Item.Props;

const Demo = (props: BreadcrumbsExampleProps) => (
  <>
    <Breadcrumbs w={600}>
      <Breadcrumbs.Item
        hint={props.hintProps}
        hint:placement={props.hintPlacement}
      >
        With Hint Props Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur assumenda harum
        officia perspiciatis saepe sit? Aliquid consequatur culpa, eligendi harum ipsam molestias
        nulla odio quis recusandae sed, sequi ut!
      </Breadcrumbs.Item>
      <Breadcrumbs.Item wMax={150}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur assumenda harum
        officia perspiciatis saepe sit? Aliquid consequatur culpa, eligendi harum ipsam molestias
        nulla odio quis recusandae sed, sequi ut!
      </Breadcrumbs.Item>
      <Breadcrumbs.Item wMax={150} active={props.active}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur assumenda harum
        officia perspiciatis saepe sit? Aliquid consequatur culpa, eligendi harum ipsam molestias
        nulla odio quis recusandae sed, sequi ut!
      </Breadcrumbs.Item>
    </Breadcrumbs>

  </>

);

export const breadcrumbsExampleProps: BreadcrumbsExampleProps = {
  active: true,
};

Demo.defaultProps = breadcrumbsExampleProps;
export default Demo;
