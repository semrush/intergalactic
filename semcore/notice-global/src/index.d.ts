import { CProps, ReturnEl } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { IIconProps } from '@semcore/icon';

export type NoticeGlobalTheme = 'danger' | 'warning' | 'success' | 'info' | 'neutral' | string;

export interface INoticeGlobalProps {
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
   *  Adds a Close icon
   */
  closable?: boolean;
  /**
   * Callback on a click on the close button
   */
  onClose?: (event: React.SyntheticEvent) => void;
  locale?: string;
}

declare const NoticeGlobal: (<T>(props: CProps<INoticeGlobalProps & T>) => ReturnEl) & {
  Content: typeof Flex;
  CloseIcon: <T>(props: IIconProps & T) => ReturnEl;
};

export default NoticeGlobal;
