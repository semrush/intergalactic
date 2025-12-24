import type { FadeInOutProps, Flex } from '@semcore/base-components';
import type Button from '@semcore/button';
import type { Intergalactic, UnknownProperties } from '@semcore/core';
import type { IconProps } from '@semcore/icon';

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
  /** Specifies the locale for i18n support */
  locale?: string;
};

/** @deprecated since v.16 -> will be removed in v.17 */
declare const NoticeGlobal: Intergalactic.Component<'div', NoticeGlobalProps> & {
  /** @deprecated since v.16 -> will be removed in v.17 */
  Content: typeof Flex;
  /** @deprecated since v.16 -> will be removed in v.17 */
  CloseIcon: typeof Button;
};

export default NoticeGlobal;
