import type { NSColorPicker } from '@semcore/ui/color-picker';
import ColorPicker from '@semcore/ui/color-picker';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type ColorPickerJSXProps = JSXProps<NSColorPicker.Props>;

function getJSX({ handleControlChange, ...colorPickerProps }: ColorPickerJSXProps) {
  return <ColorPicker {...colorPickerProps} />;
}

const entry: PlaygroundEntry<ColorPickerJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    displayLabel: {
      type: 'boolean',
      value: false,
      displayName: 'Display label',
    },
  },
  link: createGithubLink('color-picker'),
};

export default entry;
