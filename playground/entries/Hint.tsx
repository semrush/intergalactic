import FileExportM from '@semcore/icon/FileExport/m';
import Button from '@semcore/ui/button';
import type { NSButton } from '@semcore/ui/button';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type HintJSXProps = JSXProps<NSButton.Props> & Pick<HTMLButtonElement, 'title'>;

function getJSX({ handleControlChange, ...props }: HintJSXProps) {
  return (
    <Button {...props} size='l'>
      <Button.Addon><FileExportM /></Button.Addon>
    </Button>
  );
}

const entry: PlaygroundEntry<HintJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    hintPlacement: {
      type: 'select',
      value: 'top',
      options: [
        'top-start', 'top', 'top-end',
        'right-start', 'right', 'right-end',
        'bottom-start', 'bottom', 'bottom-end',
        'left-start', 'left', 'left-end',
      ],
      displayName: 'Placement',
    },
    title: {
      type: 'text',
      value: 'Export data',
      displayName: 'Title',
    },
  },
  link: createGithubLink('base-components'),
};

export default entry;
