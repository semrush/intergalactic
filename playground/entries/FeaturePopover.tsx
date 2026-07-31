import Button from '@semcore/ui/button';
import type { NSFeaturePopover } from '@semcore/ui/feature-popover';
import FeaturePopover from '@semcore/ui/feature-popover';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

type FeaturePopoverProps = NSFeaturePopover.Props & {
  closeIcon: boolean;
};
export type FeaturePopoverJSXProps = JSXProps<FeaturePopoverProps>;

function getJSX({ handleControlChange, closeIcon, ...restProps }: FeaturePopoverJSXProps) {
  return (
    <FeaturePopover {...restProps} onVisibleChange={((value) => handleControlChange?.('visible', value))}>
      <FeaturePopover.Trigger>
        <Button>
          Feature
          {restProps.visible && <FeaturePopover.Spot />}
        </Button>
      </FeaturePopover.Trigger>
      <FeaturePopover.Popper closeIcon={closeIcon} wMax={250} aria-label='New feature'>
        <Text size={200}>
          With this new feature, users can now enjoy improved user experience, or expanded capabilities.
        </Text>
      </FeaturePopover.Popper>
    </FeaturePopover>
  );
}

const entry: PlaygroundEntry<FeaturePopoverJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    theme: {
      type: 'select',
      displayName: 'Theme',
      value: 'accent',
      options: ['accent', 'neutral'],
    },
    closeIcon: {
      type: 'boolean',
      value: true,
      displayName: 'Close button',
    },
    visible: {
      type: 'boolean',
      value: true,
      displayName: 'Visible',
    },
    placement: {
      type: 'select',
      value: 'bottom-start',
      options: [
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end',
      ],
      displayName: 'Placement',
    },
  },
  link: createGithubLink('feature-popover'),
  filterProps: ['onVisibleChange'],
};

export default entry;
