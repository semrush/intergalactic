import type { CounterProps } from '@semcore/counter';
import Counter from '@semcore/counter';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type CounterJSXProps = JSXProps<CounterProps>;

function getJSX({ handleControlChange, ...counterProps }: CounterJSXProps) {
  return <Counter {...counterProps} />;
}

const entry: PlaygroundEntry<CounterJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    size: {
      type: 'inline-radio',
      value: 'm',
      options: ['m', 'l', 'xl'],
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
      value: '42',
      displayName: 'Value',
    },
  },
  link: createGithubLink('counter'),
};

export default entry;
