import type { BadgeProps } from '@semcore/badge';
import Badge from '@semcore/badge';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type BadgeJSXProps = JSXProps<BadgeProps>;

function getJSX({ handleControlChange, ...badgeProps }: BadgeJSXProps) {
  return <Badge {...badgeProps} />;
}

const entry: PlaygroundEntry<BadgeJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    color: {
      type: 'select',
      displayName: 'Color',
      options: ['text-primary', 'text-primary-invert'],
      value: 'text-primary',
      colorOptions: {
        withIntergalacticPrefix: true,
      },
    },
    bg: {
      type: 'select',
      options: ['gray-400', 'blue-400', 'red-400', 'orange-400', 'green-400', 'violet-400'],
      displayName: 'Background color',
      value: 'gray-400',
      colorOptions: {
        withIntergalacticPrefix: false,
      },
    },
    children: {
      type: 'text',
      displayName: 'Text',
      value: 'soon',
    },
  },
  link: createGithubLink('badge'),
};

export default entry;
