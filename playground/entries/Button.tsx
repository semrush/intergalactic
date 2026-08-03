import type { NSButton, NSButtonLink } from '@semcore/ui/button';
import Button, { ButtonLink } from '@semcore/ui/button';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import type { WithChildComponents } from '../types/WithChildComponents';
import createGithubLink from '../utils/createGHLink';
import renderIcon from '../utils/renderIcon';

type AdditionalJSXProps<Component> = {
  component: Component;
  beforeIcon: boolean;
  afterIcon: boolean;
};
type ButtonComponentJSXProps = JSXProps<NSButton.Props> & AdditionalJSXProps<'Button'>;
type ButtonLinkComponentJSXProps = JSXProps<NSButtonLink.Props> & AdditionalJSXProps<'ButtonLink'>;

export type ButtonJSXProps = ButtonComponentJSXProps | ButtonLinkComponentJSXProps;

function getJSX({ handleControlChange, component, beforeIcon, afterIcon, ...componentProps }: ButtonJSXProps) {
  const Component: WithChildComponents<'Addon' | 'Text'> = component === 'Button' ? Button : ButtonLink;
  return (
    <Component {...componentProps}>
      {beforeIcon && <Component.Addon>{renderIcon('before', componentProps.size)}</Component.Addon>}
      {beforeIcon || (afterIcon && componentProps.children)
        ? (
            <Component.Text>{componentProps.children}</Component.Text>
          )
        : (
            componentProps.children
          )}
      {afterIcon && <Component.Addon>{renderIcon('after', componentProps.size)}</Component.Addon>}
    </Component>
  );
}

const entry: PlaygroundEntry<ButtonJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    component: {
      type: 'select',
      displayName: 'Component',
      options: ['Button', 'ButtonLink'],
      value: 'Button',
    },
    size: {
      type: 'select',
      displayName: 'Size',
      value: 'm',
      options: ({ component }) => {
        switch (component) {
          case 'Button':
            return ['m', 'l'];
          case 'ButtonLink':
            return ['100', '200', '300', '400', '500', '600', '700', '800'];
          default:
            return [];
        }
      },
    },
    use: {
      type: 'select',
      value: 'secondary',
      displayName: 'Use',
      options: ({ component }) => {
        switch (component) {
          case 'Button':
            return ['primary', 'secondary', 'tertiary'];
          case 'ButtonLink':
            return ['primary', 'secondary'];
          default:
            return [];
        }
      },
    },
    theme: {
      type: 'select',
      value: 'muted',
      displayName: 'Theme',
      options: ({ use }) => {
        switch (use) {
          case 'primary':
            return ['info', 'success', 'brand', 'danger', 'invert'];
          case 'secondary':
          case 'tertiary':
            return ['muted', 'invert'];
          default:
            return [];
        }
      },
      visibleIf: [{ dependsOn: 'component', equals: 'Button' }],
    },
    /*
      TODO: There is no color prop for ButtonLink.
    */
    // @ts-ignore
    color: {
      type: 'text',
      displayName: 'Color',
      value: '',
      visibleIf: [{ dependsOn: 'component', equals: 'ButtonLink' }],
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
    loading: {
      type: 'boolean',
      value: false,
      displayName: 'Loading',
      visibleIf: [{ dependsOn: 'component', equals: 'Button' }],
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
      value: 'Button',
      displayName: 'Text',
    },
  },
  link: createGithubLink('button'),
};

export default entry;
