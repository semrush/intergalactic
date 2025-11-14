import figma from '@figma/code-connect';
import DropdownMenu from '@semcore/ui/dropdown-menu';

figma.connect(
  DropdownMenu.Menu,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47952-16111&t=7CEXrbu9XEfMUFlr-11',
  {
    variant: { 'type': 'menu', 'search input': 'false' },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      children: figma.children('*'),
    },

    example: ({ size, children }) => (
      <DropdownMenu size={size}>
        {children}
      </DropdownMenu>
    ),
  },
);
