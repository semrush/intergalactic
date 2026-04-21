import figma from '@figma/code-connect';
import { DescriptionTooltip } from '@semcore/ui/tooltip';

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
      }),
      ariaLabel: figma.textContent('aria-label prop'),
      placement: figma.enum('placement', {
        top: 'top',
        bottom: 'bottom',
        left: 'left',
        right: 'right',
      }),
    },
    example: ({ nested, placement, ariaLabel }) => (
      <DescriptionTooltip theme={nested.theme} placement={placement}>
        <DescriptionTooltip.Trigger
          addonLeft={InfoM}
          aria-label={ariaLabel}
          tag={ButtonLink}
          {...addonProps}
        />
        <DescriptionTooltip.Popper>
          {/* Add content here */}
        </DescriptionTooltip.Popper>
      </DescriptionTooltip>
    ),
  },
);
