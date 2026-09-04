import figma from '@figma/code-connect';
import Skeleton from '@semcore/ui/skeleton';

// Skeleton for hiding text

figma.connect(
  Skeleton.Text,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-146975&t=Fgs2Jv2CPgCOdctF-11',
  {
    props: {
      theme: figma.nestedProps('Skeleton', {
        theme: figma.enum('theme', {
          dark: 'dark',
          invert: 'invert',
        }),
      }),
    },
    example: ({ theme }) => <Skeleton theme={theme.theme}><Skeleton.Text amount={3} /></Skeleton>,
  },
);
