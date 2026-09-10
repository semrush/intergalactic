import figma from '@figma/code-connect/react';
import { NoticeSmart } from '@semcore/ui/notice';

figma.connect(
  NoticeSmart,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10097-57985&t=wyKe5rNq2KHENfRl-11',
  {
    props: {
      theme: figma.enum('theme', {
        '🟢 limit': 'success',
        '🔴 danger': 'danger',
        '🟠 warning': 'warning',
        '⚪️ muted': 'muted',
      }),
      // actions: figma.boolean('actions', {
      //   true: figma.children('*'),
      //   false: undefined,
      // }),
      // closable: figma.boolean('closable'), // commented because don't want to show this prop by default
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      // icon: figma.children('Notice.Label'),
    },
    example: ({ theme, title, text }) => (
      <NoticeSmart
        aria-label={/* Add aria-label */}
        theme={theme}
        label={/* icon or illustration from the library */}
        title={title}
        actions={/* add Buttons here */}
      >
        {text}
      </NoticeSmart>
    ),
  },
);
