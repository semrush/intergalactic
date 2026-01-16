import type { Box } from '@semcore/base-components';
import type Button from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import type { NoticeSmartProps, NoticeLabelProps, NoticeContext } from '@semcore/notice';
import type { Text } from '@semcore/typography';

export type HighlightedNoticeComponent = Intergalactic.Component<'div', NoticeSmartProps, NoticeContext> & {
  Label: Intergalactic.Component<'div', NoticeLabelProps>;
  Actions: typeof Box;
  Content: typeof Box;
  Title: typeof Text;
  Text: typeof Text;
  Close: typeof Button;
  /**
   * @deprecated Use NoticeFH.Close instead of NoticeFH.CloseIcon
   */
  CloseIcon: Intergalactic.Component<'div', any>;
};
