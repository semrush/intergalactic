import figma from '@figma/code-connect';
import ProgressBar from '@semcore/ui/progress-bar';

figma.connect(
  ProgressBar,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10142-113186&m=dev',
  {
    props: {
      size: figma.enum('size', {
        S: 's',
        M: 'm',
        L: 'l',
      }),
      theme: figma.enum('theme', {
        invert: 'invert',
        dark: 'dark',
      }),
    },

    example: ({ size, theme }) => (
      <ProgressBar
        value={/* number */}
        size={size}
        theme={theme}
        aria-valuetext={/* aria-valuetext */}
        aria-label={/* Add your aria-label */}
      />
    ),
  },
);
