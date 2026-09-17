import figma from '@figma/code-connect/react';
import FeaturePopover from '@semcore/ui/feature-popover';
import { Text } from '@semcore/ui/typography';

figma.connect(
  FeaturePopover,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52334-2678&t=B1622uxt4mPTLZzH-11',

  {
    props: {
      theme: figma.enum('theme', {
        accent: 'accent',
        neutral: 'neutral',
      }),
      text: figma.textContent('↳ text'),
      title: figma.textContent('↳ title'),
      actions: figma.children('Button'),
      placement: figma.nestedProps('placement', {
        placement: figma.enum('placement', {
          'top-start': 'top-start',
          'top': 'top',
          'top-end': 'top-end',
          'right-start': 'right-start',
          'right': 'right',
          'right-end': 'right-end',
          'bottom-start': 'bottom-start',
          'bottom': 'bottom',
          'bottom-end': 'bottom-end',
          'left-start': 'left-start',
          'left': 'left',
          'left-end': 'left-end',
        }),
      }),
    },
    example: ({ theme, placement, text, title, actions }) => (
      <FeaturePopover theme={theme} placement={placement.placement}>
        <FeaturePopover.Trigger>
          {/* Add trigger */}
        </FeaturePopover.Trigger>
        <FeaturePopover.Popper
          aria-label='/* Add aria-label */'
          closeIcon
          wMax={250}
        >
          <Text size={300} bold tag='h3' mb={1} mt={0}>
            {title}
          </Text>
          <Text mb={4} size={200} tag='p'>
            {text}
          </Text>
          {actions}
        </FeaturePopover.Popper>
      </FeaturePopover>
    ),
  },
);
