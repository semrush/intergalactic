import type { DividerProps } from '@semcore/divider';
import Divider from '@semcore/divider';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type DividerJSXProps = JSXProps<DividerProps>;

function getJSX({ handleControlChange, ...dividerProps }: DividerJSXProps) {
  const { orientation } = dividerProps;
  return orientation === 'horizontal' ? <Divider w={200} {...dividerProps} /> : <Divider h={20} {...dividerProps} />;
}

const entry: PlaygroundEntry<DividerJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    use: {
      type: 'inline-radio',
      value: 'primary',
      options: ['primary', 'secondary'],
      displayName: 'Use',
    },
    theme: {
      type: 'inline-radio',
      value: 'default',
      options: ['default', 'invert'],
      displayName: 'Theme',
    },
    orientation: {
      type: 'inline-radio',
      value: 'horizontal',
      options: ['horizontal', 'vertical'],
      displayName: 'Orientation',
    },
  },
  link: createGithubLink('divider'),
};

export default entry;
