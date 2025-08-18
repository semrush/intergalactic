import figma from '@figma/code-connect';
import Link from '@semcore/link';
import React from 'react';

figma.connect(
  Link,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=10142-178857&t=CE9QdkPSfZjp1bN9-11',
  {
    props: {
      label: figma.textContent('↳ text'),
      active: figma.enum('state', {
        active: true,
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      addonLeft: figma.boolean('← addon', {
        true: figma.instance('← - - - addon type'),
        false: undefined,
      }),
      addonRight: figma.boolean('addon →', {
        true: figma.instance('addon type - - →'),
        false: undefined,
      }),
    },
    example: ({ addonLeft, addonRight, active, disabled, label }) => (
      <Link
        size='fontSize'
        color='color-token'
        href='#'
        active={active}
        disabled={disabled}
        addonLeft={addonLeft}
        addonRight={addonRight}
      >
        {label}
      </Link>
    ),
  },
);
