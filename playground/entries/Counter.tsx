import type { NSCounter } from '@semcore/ui/counter';
import Counter from '@semcore/ui/counter';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type CounterJSXProps = JSXProps<NSCounter.Props>;

function getJSX({ handleControlChange, ...counterProps }: CounterJSXProps) {
  return <Counter {...counterProps} />;
}

const entry: PlaygroundEntry<CounterJSXProps> = {
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
      value: 'info',
      options: ['info', 'warning', 'danger'],
      displayName: 'Theme',
    },
    children: {
      type: 'text-number',
      value: 42,
      displayName: 'Value',
    },
  },
  link: createGithubLink('counter'),
};

export default entry;
