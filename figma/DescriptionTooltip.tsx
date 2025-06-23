import figma from '@figma/code-connect';
import { DescriptionTooltip } from '@semcore/tooltip';
import React from 'react';

figma.connect(
  DescriptionTooltip,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=51966-59511&t=0hjqYEp7RXqjnbR7-11',
  {
    props: {
      nested: figma.nestedProps('Tooltip', {
        theme: figma.enum('theme', {
          '⚪️ default': 'default',
          '⚫️ invert': 'invert',
          '🔴 warning': 'warning',
        }),
        content: figma.instance('content'),
      }),
      ariaLabel: figma.textContent('aria-label prop'),
      placement: figma.enum('placement', {
        top: 'top',
        bottom: 'bottom',
        left: 'left',
        right: 'right',
      }),
    },
    example: (props) => (
      <DescriptionTooltip theme={props.nested.theme} placement={props.placement}>
        <DescriptionTooltip.Trigger
          tag={ButtonLink}
          addonLeft={InfoM}
          aria-label={props.ariaLabel}
        />
        <DescriptionTooltip.Popper>
          {props.nested.content}
        </DescriptionTooltip.Popper>
      </DescriptionTooltip>
    ),
  },
);
