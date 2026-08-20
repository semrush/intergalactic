import type { NSProgressBar } from '@semcore/ui/progress-bar';
import ProgressBar from '@semcore/ui/progress-bar';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type ProgressBarJSXProps = JSXProps<NSProgressBar.Props>;

function getJSX({ handleControlChange, ...progressBarProps }: ProgressBarJSXProps) {
  return <ProgressBar {...progressBarProps} aria-label='Progress bar' w={200} />;
}

const entry: PlaygroundEntry<NSProgressBar.Props> = {
  JSX: (props) => getJSX(props),
  controls: {
    size: {
      type: 'inline-radio',
      value: 'm',
      options: ['s', 'm', 'l'],
      displayName: 'Size',
    },
    theme: {
      type: 'select',
      value: 'default',
      options: ['default', 'invert'],
      displayName: 'Theme',
    },
    duration: {
      type: 'text-number',
      value: 1000,
      min: 0,
      displayName: 'Duration',
    },
    value: {
      type: 'text-number',
      value: 50,
      min: 0,
      displayName: 'Value',
    },
  },
  link: createGithubLink('progress-bar'),
};

export default entry;
