import figma from '@figma/code-connect';
import Select from '@semcore/select';
import React from 'react';

figma.connect(
  Select.Menu,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47952-16111&t=TXEgCxM6iJO0FYiJ-11',
  {
    variant: { 'search input': 'false', 'notice ↓': 'false' },

    example: () => (
      <Select.Menu hMax={/* value */}>
        <Select.Option key={/* value */} value={/* value */}>
          {/* option */}
        </Select.Option>
      </Select.Menu>
    ),
  },
);
