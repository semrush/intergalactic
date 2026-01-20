import type { NoticeSmart } from '@semcore/notice';
import type Notice from '@semcore/notice';

export type HighlightedNoticeComponent = typeof Notice & typeof NoticeSmart;
