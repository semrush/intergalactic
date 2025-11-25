import figma from '@figma/code-connect/react';
import NoticeGlobal from '@semcore/ui/notice-global';

figma.connect(
  NoticeGlobal,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10270-107436&t=wyKe5rNq2KHENfRl-11',
  {
    props: {
      theme: figma.enum('theme', {
        '🌚 neutral': 'neutral',
        '🔵 info': 'info',
        '🟢 success': 'success',
        '🟠 warning': 'warning',
        '🔴 danger': 'danger',
      }),
      //   closable: figma.boolean('closable'), // commented because don't want to show this prop by default
      content: figma.textContent('↳ text'),
      actions: figma.children('Button'),
    },
    example: ({ theme, content, actions }) => (
      <NoticeGlobal theme={theme}>
        <NoticeGlobal.Content gap={2} alignItems='center'>
          {content}
          {actions}
        </NoticeGlobal.Content>
      </NoticeGlobal>
    ),
  },
);
