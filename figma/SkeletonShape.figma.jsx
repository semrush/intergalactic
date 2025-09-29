import figma from '@figma/code-connect';
import Skeleton from '@semcore/ui/skeleton';
import React from 'react';

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52772-1911&t=Fgs2Jv2CPgCOdctF-11',
  {
    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);
