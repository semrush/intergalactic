import Button from '@semcore/ui/button';
import type { NSDot } from '@semcore/ui/dot';
import Dot from '@semcore/ui/dot';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

type AdditionalJSXProps = { value: string };
export type DotJSXProps = JSXProps<NSDot.Props> & AdditionalJSXProps;

function getJSX(props: DotJSXProps) {
  const { handleControlChange, ...dotProps } = props;

  const value = Number.isInteger(props.value) ? props.value : null;

  return (
    <Button aria-describedby={dotProps.hidden ? undefined : 'dot'}>
      <Button.Text textAlign='center'>Notifications</Button.Text>
      {dotProps.up
        ? (
            <Dot {...dotProps} aria-label={Number.isInteger(value) ? undefined : 'New'} id='dot'>
              {value}
            </Dot>
          )
        : (
            <Button.Addon>
              <Dot {...dotProps} aria-label={Number.isInteger(value) ? undefined : 'New'} id='dot'>
                {value}
              </Dot>
            </Button.Addon>
          )}
    </Button>
  );
}

const entry: PlaygroundEntry<DotJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    size: {
      type: 'inline-radio',
      value: 'l',
      options: ['m', 'l'],
      displayName: 'Size',
    },
    up: {
      type: 'boolean',
      value: true,
      displayName: 'Up',
    },
    hidden: {
      type: 'boolean',
      value: false,
      displayName: 'Hidden',
    },
    value: {
      type: 'text-number',
      min: 0,
      displayName: 'Value',
    },
  },
  link: createGithubLink('dot'),
};

export default entry;
