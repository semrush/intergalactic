import figma from '@figma/code-connect';
// import MathPlusM from '@semcore/icon/Math/m';
import Tag from '@semcore/tag';
import React from 'react';

figma.connect(
  Tag,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=12026-120376&t=TbZAkRDwOBuye4Je-11',
  {
    props: {
      label: figma.textContent('↳ text'),
      size: figma.enum('size', {
        XL: 'xl',
        L: 'l',
        M: 'm',
      }),
      active: figma.enum('state', {
        active: true,
      }),
    },
    example: (props) => (
      <Tag
        size={props.size}
        theme='additional'
        active={props.active}
        addonLeft={MathPlusM}
      >
        {props.label}
      </Tag>
    ),
  },
);
