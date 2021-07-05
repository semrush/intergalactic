import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import { IIconProps } from '@semcore/icon';

export type NoticeTheme = 'danger' | 'warning' | 'success' | 'info' | string;
export type NoticeUse = 'primary' | 'secondary';

export interface INoticeProps extends IBoxProps {
  /** Property for managing visibility of Notice */
  hidden?: boolean;
  /** Notice type
   * @default secondary
   */
  use?: NoticeUse;
  /**
   * Notice theme
   * @default info
   */
  theme?: NoticeTheme;
  /** Duration of animation, ms
   * @default 200
   */
  duration?: number;
}

export interface INoticeLabelProps extends IBoxProps {
  theme?: NoticeTheme;
}

export interface INoticeContext {
  getLabelProps: PropGetterFn;
}

export interface INoticeSmartProps extends INoticeProps {
  /**
   * A custom element for additional information
   */
  label?: React.ReactNode;
  /**
   * Custom action element
   */
  actions?: React.ReactNode;
  /**
   *  Adds a Close icon
   */
  closable?: boolean;
  /**
   * Callback on a click on the close button
   */
  onClose?: (event: React.SyntheticEvent) => void;
}

declare const Notice: (<T>(props: CProps<INoticeProps & T, INoticeContext>) => ReturnEl) & {
  Label: <T>(props: INoticeLabelProps & T) => ReturnEl;
  Actions: typeof Box;
  Content: typeof Box;
  CloseIcon: <T>(props: IIconProps & T) => ReturnEl;
};

declare const NoticeSmart: <T>(props: CProps<INoticeSmartProps & T>) => ReturnEl;

export { NoticeSmart };
export default Notice;
