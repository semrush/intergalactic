import figma from '@figma/code-connect/react';
import Divider from '@semcore/ui/divider';

figma.connect(
  Divider,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=11947-115134',
  {
    props: {
      use: figma.enum('use', {
        secondary: 'secondary',
      }),
      theme: figma.enum('theme', {
        invert: 'invert',
      }),
      orientation: figma.enum('orientation', {
        vertical: 'vertical',
      }),
    },
    example: (props) => <Divider {...props} />,
  },
);
