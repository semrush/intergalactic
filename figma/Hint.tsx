import figma from '@figma/code-connect';
import { Hint } from '@semcore/tooltip';
import React from 'react';

figma.connect(
  Hint,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=45323-1421&t=0hjqYEp7RXqjnbR7-11',
  {
    props: {
      title: figma.textContent('↳ text'),
      theme: figma.enum('theme', {
        '⚪️ default': 'default',
        '⚫️ invert': 'invert',
        '🔴 warning': 'warning',
      }),
      placement: figma.nestedProps('placement', {
        placement: figma.enum('placement', {
          'top-start': 'top-start',
          'top-end': 'top-end',
          'top': 'top',
          'bottom-start': 'bottom-start',
          'bottom-end': 'bottom-end',
          'bottom': 'bottom',
          'left': 'left',
          'left-start': 'left-start',
          'left-end': 'left-end',
          'right': 'right',
          'right-start': 'right-start',
          'right-end': 'right-end',
        }),
      }),
    },
    example: (props) => (
      <Hint
        title={props.title}
        theme={props.theme}
        placement={props.placement.placement}
        tag={Button / IconName}
      />
    ),
  },
);
