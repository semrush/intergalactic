import figma from '@figma/code-connect/react';
import Dot from '@semcore/ui/dot';

figma.connect(
  Dot,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10129-56238&t=TXEgCxM6iJO0FYiJ-11',
  {
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      value: figma.boolean('value', {
        true: figma.textContent('↳ value'),
        false: undefined,
      }),
    },
    example: ({ size, value }) => <Dot up aria-label='/* Add aria-label */' id='/* Add id for a control that should be described by the Dot*/' size={size} value={value} />,
  },
);
