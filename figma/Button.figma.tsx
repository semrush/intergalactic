import figma from '@figma/code-connect';
import Button from '@semcore/button';
import React from 'react';

const sharedProps = {
  size: figma.enum('size', {
    L: 'l',
    M: 'm',
  }),
  use: figma.enum('use', {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
  }),
  theme: figma.enum('theme', {
    '🔵 info': 'info',
    '🟢 success': 'success',
    '🔴 danger': 'danger',
    '⚫️ muted': 'muted',
    '⚪️ invert': 'invert',
  }),
  disabled: figma.enum('state', {
    disabled: true,
  }),
  active: figma.enum('state', {
    active: true,
  }),
  loading: figma.boolean('loading'),
  addonLeft: figma.boolean('← addon', {
    true: figma.instance('{ ↳ AddonLeft }'),
    false: undefined,
  }),

};

figma.connect(
  Button,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=10043-43724&t=fvHZdzdrBaexbYww-11',
  {
    props: {
      ...sharedProps,
      label: figma.textContent('↳ text'),
      textAddon: figma.boolean('textAddon →', {
        true: figma.textContent('↳ textAddon'),
        false: undefined,
      }),
      addonRight: figma.boolean('addon →', {
        true: figma.instance('{ ↳ AddonRight }'),
        false: undefined,
      }),
    },
    example: (props) => (
      <>
        <Button
          size={props.size}
          use={props.use}
          theme={props.theme}
          disabled={props.disabled}
          active={props.active}
          loading={props.loading}
        >
          <Button.Addon>{props.addonLeft}</Button.Addon>
          {props.label}
          <Button.Addon>{props.textAddon}</Button.Addon>
          <Button.Addon>{props.addonRight}</Button.Addon>
        </Button>
      </>
    ),
  },
);

// figma.connect(
//   Button,
//   'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=10043-43724&t=fvHZdzdrBaexbYww-11',
//   {
//     props: {
//       ...sharedProps,
//       title: figma.textContent('title prop'),
//     },
//     example: (props) => (
//       <>
//         <Button
//           size={props.size}
//           use={props.use}
//           theme={props.theme}
//           disabled={props.disabled}
//           active={props.active}
//           loading={props.loading}
//           title={props.title}
//         >
//           <Button.Addon>{props.addonLeft}</Button.Addon>
//         </Button>
//       </>
//     ),
//   },
// );
