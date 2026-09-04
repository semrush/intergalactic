import figma from '@figma/code-connect';
import Counter from '@semcore/ui/counter';

figma.connect(
  Counter,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10121-56141&t=Fgs2Jv2CPgCOdctF-11',
  {
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
        XL: 'xl',
      }),
      theme: figma.enum('theme', {
        default: 'default',
        info: 'info',
        warning: 'warning',
        danger: 'danger',
        white: 'white',
      }),
      value: figma.textContent('↳ value'),
    },
    example: ({ size, theme, value }) => <Counter size={size} theme={theme}>{value}</Counter>,
  },
);

// figma.connect(
//   Counter,
//   'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10121-56141&t=Fgs2Jv2CPgCOdctF-11',
//   {
//     variant: { theme: 'custom' },
//     props: {
//       size: figma.enum('size', {
//         M: 'm',
//         L: 'l',
//         XL: 'xl',
//       }),
//       value: figma.textContent('↳ value'),
//     },
//     example: ({ size, value }) => <Counter size={size} theme='bg-primary-neutral'>{value}</Counter>,
//   },
// );
