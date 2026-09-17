import figma from '@figma/code-connect';
import Skeleton from '@semcore/ui/skeleton';

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52851-1247&t=KO1tOJU4Y49Pygq3-11',
  {
    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

// Shapes for charts which are not components in the code

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=57013-41&t=h1bo3HmVL3r4a55A-11',
  {
    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);
