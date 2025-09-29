import figma from '@figma/code-connect';
import Flags from '@semcore/ui/flags';
import React from 'react';

figma.connect(
  Flags,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10034-250009&t=NrTxRQcw036G61Oc-11',
  {
    example: (props) => <Flags iso2={/* value */} />,
  },
);
