import figma from '@figma/code-connect';
import Select from '@semcore/ui/select';
import React from 'react';

// TODO: Add addons

figma.connect(
  Select.Group,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11950-115223&t=TXEgCxM6iJO0FYiJ-11',
  {
    props: {
      title: figma.textContent('↳ title'),
      subTitle: figma.boolean('subTitle', {
        true: figma.textContent('↳ subTitle'),
        false: undefined,
      }),
    },
    example: ({ title, subTitle }) => (
      <Select.Group title={title} subTitle={subTitle}>
        {/* options */}
      </Select.Group>
    ),
  },
);
