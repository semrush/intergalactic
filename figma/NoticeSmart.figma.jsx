import figma from '@figma/code-connect/react';
import { NoticeSmart } from '@semcore/ui/notice';

figma.connect(
  NoticeSmart,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=53929-5665&t=9SvFLXk2pXerGpqA-11',
  {
    props: {
      theme: figma.enum('theme', {
        '🟢 limit': 'success',
        '🔴 danger': 'danger',
        '🟠 warning': 'warning',
        '⚪️ muted': 'muted',
      }),
      actions: figma.boolean('actions', {
        true: figma.children('*'),
        false: undefined,
      }),
      closable: figma.boolean('closable'),
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      // icon: figma.children('Notice.Label'),
    },
    example: ({ theme, title, closable, actions, text }) => <NoticeSmart aria-label={/* Add aria-label */} theme={theme} label={/* icon or illustration from the library */} title={title} closable={closable} actions={(actions)}>{text}</NoticeSmart>,
  }
);