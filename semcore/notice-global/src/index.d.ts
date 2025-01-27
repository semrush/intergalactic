import type { Intergalactic, UnknownProperties } from '@semcore/core';
import type { Flex } from '@semcore/flex-box';
import type { IconProps } from '@semcore/icon';
import type { FadeInOutProps } from '@semcore/animation';

export type NoticeGlobalTheme = 'danger' | 'warning' | 'success' | 'info' | 'neutral';

/** @deprecated */
export interface INoticeGlobalProps extends NoticeGlobalProps, UnknownProperties {}
export type NoticeGlobalProps = FadeInOutProps & {
  /**
   * Notice theme
   * @default neutral
   */
  theme?: NoticeGlobalTheme;
  /** Duration of animation, ms
   * @default 250
   */
  duration?: number;
  /**
   *  Adds a Close button
   */
  closable?: boolean;
  /**
   * Callback on a click on the close button
   */
  onClose?: (event: React.SyntheticEvent) => void;
  locale?: string;
};

declare const NoticeGlobal: Intergalactic.Component<'div', NoticeGlobalProps> & {
  Content: typeof Flex;
  CloseIcon: Intergalactic.Component<'div', IconProps>;
};

export default NoticeGlobal;
