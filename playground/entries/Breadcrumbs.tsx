import type { BreadcrumbsItemProps } from '@semcore/breadcrumbs';
import Breadcrumbs from '@semcore/breadcrumbs';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type BreadcrumbsJSXProps = JSXProps<BreadcrumbsItemProps>;

function getJSX({ handleControlChange, ...breadcrumbsItemProps }: BreadcrumbsJSXProps) {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item href='#'>Projects</Breadcrumbs.Item>
      <Breadcrumbs.Item href='#'>semrush.com</Breadcrumbs.Item>
      <Breadcrumbs.Item {...breadcrumbsItemProps}>Position Tracking</Breadcrumbs.Item>
    </Breadcrumbs>
  );
}

const entry: PlaygroundEntry<BreadcrumbsJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    active: {
      type: 'boolean',
      value: true,
      displayName: 'Active',
    },
  },
  link: createGithubLink('breadcrumbs'),
};

export default entry;
