import type { Intergalactic } from '@semcore/core';
import type { NoticeSmartProps } from '@semcore/notice';
import type Notice from '@semcore/notice';

export type HighlightedNoticeComponent = Intergalactic.Component<'div', NoticeSmartProps> & {
  Label: typeof Notice['Label'];
  Actions: typeof Notice['Actions'];
  Content: typeof Notice['Content'];
  Title: typeof Notice['Title'];
  Text: typeof Notice['Text'];
  Close: typeof Notice['Close'];
};
