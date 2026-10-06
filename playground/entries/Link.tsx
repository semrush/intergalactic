import type { NSLink } from '@semcore/ui/link';
import Link from '@semcore/ui/link';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';
import renderIcon from '../utils/renderIcon';

type AdditionalJSXProps = {
  beforeIcon: boolean;
  afterIcon: boolean;
};
export type LinkJSXProps = JSXProps<NSLink.Props> & AdditionalJSXProps;

function getJSX(props: LinkJSXProps) {
  return (
    <Link color={props.color} size={props.size} disabled={props.disabled} active={props.active} theme={props.theme} href='#'>
      {props.beforeIcon && <Link.Addon>{renderIcon('before', props.size)}</Link.Addon>}
      {props.beforeIcon || props.afterIcon ? <Link.Text>{props.children}</Link.Text> : props.children}
      {props.afterIcon && <Link.Addon>{renderIcon('after', props.size)}</Link.Addon>}
    </Link>
  );
}

const entry: PlaygroundEntry<LinkJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    size: {
      type: 'select',
      value: '300',
      options: ['100', '200', '300', '400', '500', '600', '700', '800'],
      displayName: 'Size',
    },
    theme: {
      type: 'select',
      value: 'primary',
      options: ['default', 'light', 'accent', 'invert'],
      displayName: 'Use',
    },
    color: {
      type: 'text',
      value: '',
      displayName: 'Color',
    },
    active: {
      type: 'boolean',
      value: false,
      displayName: 'Active',
    },
    disabled: {
      type: 'boolean',
      value: false,
      displayName: 'Disabled',
    },
    beforeIcon: {
      type: 'boolean',
      value: false,
      displayName: 'Addon left',
    },
    afterIcon: {
      type: 'boolean',
      value: false,
      displayName: 'Addon right',
    },
    children: {
      type: 'text',
      value: 'Link',
      displayName: 'Text',
    },
  },
  link: createGithubLink('link'),
};

export default entry;
