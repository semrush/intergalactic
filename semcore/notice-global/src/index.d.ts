import { CProps, ReturnEl } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { IIconProps } from '@semcore/icon';

export type NoticeTheme = 'danger' | 'warning' | 'success' | 'info' | 'neutral' | string;

export interface INoticeGlobalProps {
  /**
   * Notice theme
   * @default neutral
   */
  theme?: NoticeTheme;
  /** Duration of animation, ms
   * @default 200
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
}

declare const NoticeGlobal: (<T>(props: CProps<INoticeGlobalProps & T>) => ReturnEl) & {
  Content: typeof Flex;
  CloseIcon: <T>(props: IIconProps & T) => ReturnEl;
};

export default NoticeGlobal;
