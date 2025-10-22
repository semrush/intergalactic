import Breadcrumbs from '@semcore/ui/breadcrumbs';
import type { BreadcrumbsItemProps } from '@semcore/ui/breadcrumbs';
import React from 'react';

const Demo = (props: BreadcrumbsItemProps) => (
  <>
    <Breadcrumbs w={600}>
      <Breadcrumbs.Item>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur assumenda harum
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

export const breadcrumbsExampleProps: BreadcrumbsItemProps = {
  active: true,
};

Demo.defaultProps = breadcrumbsExampleProps;
export default Demo;
