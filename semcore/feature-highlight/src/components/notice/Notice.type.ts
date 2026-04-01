import type { NoticeSmart } from '@semcore/notice';
import type Notice from '@semcore/notice';
import type { Intergalactic } from '@semcore/ui/core/lib/index';

export type HighlightedNoticeComponent = Intergalactic.Component<typeof Notice & typeof NoticeSmart, { children: React.ReactNode }> & {
  Label: typeof Notice['Label'];
  Actions: typeof Notice['Actions'];
  Content: typeof Notice['Content'];
  Title: typeof Notice['Title'];
  Text: typeof Notice['Text'];
  Close: typeof Notice['Close'];
};
