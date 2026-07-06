import type { Intergalactic } from '@semcore/core';
import type { NSNoticeSmart } from '@semcore/notice';
import type Notice from '@semcore/notice';

export type HighlightedNoticeComponent = Intergalactic.Component<'div', NSNoticeSmart.Props> & {
  Label: typeof Notice['Label'];
  Actions: typeof Notice['Actions'];
  Content: typeof Notice['Content'];
  Title: typeof Notice['Title'];
  Text: typeof Notice['Text'];
  Close: typeof Notice['Close'];
};
