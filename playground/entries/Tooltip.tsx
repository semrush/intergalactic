import FileExportM from '@semcore/icon/FileExport/m';
import Button from '@semcore/ui/button';
import Link from '@semcore/ui/link';
import Tooltip, { DescriptionTooltip, type DescriptionTooltipProps, type TooltipProps } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

const Components = [Tooltip.displayName, DescriptionTooltip.displayName] as const;

type AdditionalJSXProps<Component extends (typeof Components)[number]> = {
  component: Component;
};
type DescriptionTooltipComponentJSXProps = JSXProps<DescriptionTooltipProps> & AdditionalJSXProps<'DescriptionTooltip'>;
type TooltipComponentJSXProps = JSXProps<TooltipProps> & AdditionalJSXProps<'Tooltip'>;

export type TooltipJSXProps =
  | DescriptionTooltipComponentJSXProps
  | TooltipComponentJSXProps;

const JSXMap = {
  DescriptionTooltip: (props: DescriptionTooltipComponentJSXProps) => (
    <DescriptionTooltip
      placement={props.placement}
      theme={props.theme}
    >
      <DescriptionTooltip.Trigger>
        <Button>Additional information</Button>
      </DescriptionTooltip.Trigger>
      <DescriptionTooltip.Popper aria-label='Description tooltip popper'>
        <Text tag='p' mb={1} bold>Additional information</Text>
        <Text tag='p' mb={3}>
          Use this tooltip type when you need to show a lot of additional information.
        </Text>
        <Text tag='p'>
          It may contain several paragraphs and interactive elements (for example,
          <Link href='https://semrush.com'>links</Link>
          ).
        </Text>
      </DescriptionTooltip.Popper>
    </DescriptionTooltip>
  ),
  Tooltip: (props: TooltipComponentJSXProps) => (
    <Tooltip
      placement={props.placement}
      theme={props.theme}
      title='Default tooltip contains additional information about the feature.'
    >
      <Button>
        Button
      </Button>
    </Tooltip>
  ),
};

function getJSX(props: TooltipJSXProps) {
  const { component } = props;

  if (component === 'DescriptionTooltip') return JSXMap[component](props);
  return JSXMap[component](props);
}

const entry: PlaygroundEntry<TooltipJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    component: {
      type: 'select',
      value: 'Tooltip',
      options: [...Components],
      displayName: 'Component',
    },
    placement: {
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
    theme: {
      type: 'select',
      value: 'default',
      options: ['default', 'warning', 'invert'],
      displayName: 'Theme',
    },
  },
  link: createGithubLink('tooltip'),
};

export default entry;
