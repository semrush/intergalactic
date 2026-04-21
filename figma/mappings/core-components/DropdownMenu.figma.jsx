import figma from '@figma/code-connect';
import DropdownMenu from '@semcore/ui/dropdown-menu';

figma.connect(
  DropdownMenu.Menu,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=57511-1988',
  {
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      children: figma.children('*'),
    },

    example: ({ size, children }) => (
      <DropdownMenu.Menu size={size} hMax='/* value */'>
        {children}
      </DropdownMenu.Menu>
    ),
  },
);
