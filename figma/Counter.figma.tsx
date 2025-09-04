import figma from '@figma/code-connect';
import Counter from '@semcore/counter';
import React from 'react';

// TODO: Update links to actual nodes

figma.connect(
  Counter,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-55&t=CQtTqD9cubPV2oYP-11',
  {
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
        XL: 'xl',
      }),
      theme: figma.enum('theme', {
        default: 'default',
        info: 'info',
        warning: 'warning',
        danger: 'danger',
        custom: 'custom',
      }),
      value: figma.textContent('↳ value'),
    },
    example: ({ size, theme, value }) => <Counter size={size} theme={theme}>{value}</Counter>,
  },
);
