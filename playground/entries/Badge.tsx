import type { NSBadge } from '@semcore/ui/badge';
import Badge from '@semcore/ui/badge';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type BadgeJSXProps = JSXProps<NSBadge.Props>;

function getJSX({ handleControlChange, ...badgeProps }: BadgeJSXProps) {
  return <Badge {...badgeProps} />;
}

const entry: PlaygroundEntry<BadgeJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    type: {
      type: 'select',
      options: ['admin', 'alpha', 'beta', 'new', 'soon', 'unavailable'],
      displayName: 'Type',
      value: 'new',
    },
    inverted: {
      type: 'boolean',
      displayName: 'Inverted',
      value: false,
    },
  },
  link: createGithubLink('badge'),
};

export default entry;
