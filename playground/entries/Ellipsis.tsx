import { Box } from '@semcore/base-components';
import type { EllipsisProps } from '@semcore/ellipsis';
import Ellipsis from '@semcore/ellipsis';
import { Text } from '@semcore/typography';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type EllipsisJSXProps = JSXProps<EllipsisProps>;

function getJSX({ handleControlChange, ...ellipsisProps }: EllipsisJSXProps) {
  return (
    <Box w={200}>
      <Ellipsis {...ellipsisProps}>
        <Text>
          Intergalactic, planetary, planetary, intergalactic Intergalactic, planetary, planetary, intergalactic
          Intergalactic, planetary, planetary, intergalactic Intergalactic, planetary, planetary, intergalactic Another
          dimension, another dimension Another dimension, another dimension Another dimension, another dimension Another
          dimension, another dimension Another dimension, another dimension Another dimension
        </Text>
      </Ellipsis>
    </Box>
  );
}

const entry: PlaygroundEntry<EllipsisJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    trim: {
      type: 'inline-radio',
      value: 'end',
      options: ['end', 'middle'],
      displayName: 'Trimming type',
    },
    tooltip: {
      type: 'boolean',
      value: true,
      displayName: 'Show tooltip',
    },
    maxLine: {
      type: 'text-number',
      value: 1,
      displayName: 'Number of lines',
      visibleIf: [{ dependsOn: 'trim', equals: 'end' }],
    },
  },
  link: createGithubLink('ellipsis'),
};

export default entry;
