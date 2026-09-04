import figma from '@figma/code-connect/react';
import { NoticeBubbleContainer } from '@semcore/ui/notice-bubble';

figma.connect(
  NoticeBubbleContainer,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10142-195417&t=wyKe5rNq2KHENfRl-11',
  {
    example: () => <NoticeBubbleContainer manager={/* add NoticeBubbleManager, check examples in documentation */} />,
  },
);
