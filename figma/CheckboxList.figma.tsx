import figma from '@figma/code-connect';
import Checkbox from '@semcore/checkbox';
import Flex from '@semcore/flex';
import React from 'react';

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=19530-124198&t=uvqbUJPa7hkmPVOa-11',
  {
    props: {
      size: figma.enum('size', {
        L: 'l',
        M: 'm',
      }),
    },
    example: ({ size }) => (
      <Flex>
        <Checkbox size={size} />
      </Flex>
    ),
  },
);
