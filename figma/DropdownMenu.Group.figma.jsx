import figma from '@figma/code-connect';
import DropdownMenu from '@semcore/ui/dropdown-menu';

figma.connect(
  DropdownMenu.Group,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47909-9527&t=7CEXrbu9XEfMUFlr-11',
  {
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      title: figma.textContent('↳ title'),
      subTitle: figma.boolean('subTitle', {
        true: figma.textContent('↳ subTitle'),
        false: undefined,
      }),
    },
    example: ({ size, title, subTitle }) => (
      <DropdownMenu.Group size={size} title={title} subTitle={subTitle}>
        {/* items */}
      </DropdownMenu.Group>
    ),
  },
);
