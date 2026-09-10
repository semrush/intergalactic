import figma from '@figma/code-connect';
import Flags from '@semcore/ui/flags';

figma.connect(
  Flags,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=32767-192692',
  {
    example: () => <Flags iso2={/* value */} />,
  },
);
