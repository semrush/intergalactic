import { useEllipsis, Hint } from '@semcore/base-components';
import type { BreadcrumbsItemProps } from '@semcore/breadcrumbs';
import Breadcrumbs from '@semcore/breadcrumbs';
import React from 'react';

const BreadcrumbsItem = (props: BreadcrumbsItemProps & { href?: string; role?: string }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const showTooltip = useEllipsis(ref, { trim: 'middle' });

  return (
    <>
      <Breadcrumbs.Item tag='div' ref={ref} {...props} />
      {showTooltip && <Hint triggerRef={ref}>{props.children}</Hint>}
    </>
  );
};

const Demo = () => (
  <Breadcrumbs w={600}>
    <BreadcrumbsItem active={false} href='#' role='link'>
      Ellipsis
    </BreadcrumbsItem>
    <BreadcrumbsItem active={false} href='#' role='link'>
      This title is longer than a giraffe's neck, I bet it's been doing neck workouts!
    </BreadcrumbsItem>
    <BreadcrumbsItem active>Current page</BreadcrumbsItem>
  </Breadcrumbs>
);
export default Demo;
