import figma from '@figma/code-connect';
import SpinContainer from '@semcore/ui/spin-container';

figma.connect(
  SpinContainer,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10966-127734&t=Fgs2Jv2CPgCOdctF-11',
  {
    props: {
      theme: figma.enum('theme', {
        dark: 'dark',
        invert: 'invert',
      }),
      size: figma.nestedProps('Spin', {
        size: figma.enum('size', {
          'XS (16 x 16)': 'xs',
          'S (20 x 20)': 's',
          'M (24 x 24)': 'm',
          'L (32 x 32)': 'l',
          'XL (40 x 40)': 'xl',
          'XXL (72 x 72)': 'xxl',
        }),
      }),
    },
    example: ({ size, theme }) => <SpinContainer loading size={size.size} theme={theme} aria-live='polite' role='status'>{/* Place content here */}</SpinContainer>,
  },
);
