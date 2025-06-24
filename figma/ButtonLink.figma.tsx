import figma from '@figma/code-connect';
import { ButtonLink } from '@semcore/button';
import React from 'react';

figma.connect(
  ButtonLink,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=45638-2735&t=fvHZdzdrBaexbYww-11',
  {
    props: {
      label: figma.textContent('↳ text'),
      use: figma.enum('use', {
        primary: 'primary',
        secondary: 'secondary',
      }),
      // size: figma.enum("size", {
      //   "100": "100 = 12px",
      //   "200": "200 = 14px",
      //   "300": "300 = 16px",
      //   "400": "400 = 20px",
      //   "500": "500 = 24px",
      //   "600": "600 = 32px",
      //   "700": "700 = 36px",
      //   "800": "800 = 48px",
      // }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      active: figma.enum('state', {
        active: true,
      }),
      addonLeft: figma.boolean('← addon', {
        true: figma.instance('{ ↳ AddonLeft }'),
        false: undefined,
      }),
      addonRight: figma.boolean('addon →', {
        true: figma.instance('{ ↳ AddonRight }'),
        false: undefined,
      }),
    },
    example: ({ use, addonLeft, addonRight, active, disabled, label }) => (
      <ButtonLink
        use={use}
        addonLeft={addonLeft}
        addonRight={addonRight}
        active={active}
        disabled={disabled}
      // size={props.size}
      >
        {label}
      </ButtonLink>
    ),
  },
);
