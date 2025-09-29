import figma from '@figma/code-connect';
import { ButtonLink } from '@semcore/ui/button';
import React from 'react';

figma.connect(
  ButtonLink,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=45638-2735&t=fvHZdzdrBaexbYww-11',
  {
    variant: { 'icon only': 'false' },
    props: {
      label: figma.textContent('↳ text'),
      use: figma.enum('use', {
        primary: 'primary',
        secondary: 'secondary',
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      active: figma.enum('state', {
        active: true,
      }),
      addonLeft: figma.boolean('← addon', {
        true: figma.children('← - - addon properties'),
        false: undefined,
      }),
      addonRight: figma.boolean('addon →', {
        true: figma.children('addon properties - - →'),
        false: undefined,
      }),
    },
    example: ({ use, addonLeft, addonRight, active, disabled, label }) => (
      <ButtonLink
        size='/* fontSize */'
        use={use}
        color='/* color-token */'
        addonLeft={addonLeft}
        addonRight={addonRight}
        active={active}
        disabled={disabled}
      >
        {label}
      </ButtonLink>
    ),
  },
);

figma.connect(
  ButtonLink,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=45638-2735&t=fvHZdzdrBaexbYww-11',
  {
    variant: { 'icon only': 'true' },
    props: {
      use: figma.enum('use', {
        primary: 'primary',
        secondary: 'secondary',
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      active: figma.enum('state', {
        active: true,
      }),
      addonLeft: figma.children('*'),
      title: figma.textContent('↳ title'),
    },
    example: ({ use, addonLeft, active, disabled, title }) => (
      <ButtonLink
        size='/* fontSize */'
        use={use}
        color='/* color-token */'
        addonLeft={addonLeft}
        active={active}
        disabled={disabled}
        aria-label={title}
      />
    ),
  },
);
