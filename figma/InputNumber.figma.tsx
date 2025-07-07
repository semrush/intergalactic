import figma from '@figma/code-connect';
import InputNumber from '@semcore/input-number';
import React from 'react';

figma.connect(
  InputNumber,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=10162-90608&t=nJSzcLnvK6HvK1l7-11',
  {
    props: {},
    example: (props) => <InputNumber />,
  },
);
