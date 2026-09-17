import figma from '@figma/code-connect';
import Hint from '@semcore/ui/hint';

figma.connect(
  Hint,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=45323-1531',
  {
    props: {
      title: figma.textContent('↳ text'),
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
    example: ({ title, placement }) => (
      <Hint
        title={title}
        placement={placement.placement}
        tag={addonTag}
        {...addonProps}
      />
    ),
  },
);
