import figma from '@figma/code-connect';
import InputRange from '@semcore/input-range';
import React from 'react';

figma.connect(
  InputRange,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=10162-90618&t=nJSzcLnvK6HvK1l7-11',
  {
    props: {},
    example: (props) => <InputRange />,
  },
);
