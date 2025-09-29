import figma from '@figma/code-connect/react';
import Divider from '@semcore/ui/divider';
import React from 'react';

figma.connect(
  Divider,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=11947-115134',
  {
    props: {
      use: figma.enum('use', {
        primary: 'primary',
        secondary: 'secondary',
      }),
      theme: figma.enum('theme', {
        default: 'default',
        invert: 'invert',
      }),
    },
    example: (props) => <Divider {...props} />,
  },
);
