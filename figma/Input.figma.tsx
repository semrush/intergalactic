import figma from '@figma/code-connect';
import Input from '@semcore/input';
import React from 'react';

figma.connect(
  Input,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=10043-48576&t=nJSzcLnvK6HvK1l7-11',
  {
    props: {},
    example: (props) => <Input />,
  },
);
