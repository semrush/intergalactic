import figma from '@figma/code-connect';
import Tooltip from '@semcore/tooltip';
import React from 'react';

figma.connect(
  Tooltip,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=10355-260578&t=TbZAkRDwOBuye4Je-11',
  {
    props: {
      title: figma.instance('content'),
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
    example: ({ title, theme, placement }) => (
      <Tooltip
        title={title}
        theme={theme}
        placement={placement.placement}
        tag={addonTag}
        {...addonProps}
      />
    ),
  },
);
