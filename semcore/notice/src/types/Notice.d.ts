import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';
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
  /**
   * Property for managing visibility of Notice
   * @deprecated v2.0.0 {@link INoticeProps.hidden}
   *  */
  invisible?: boolean;
}

export interface INoticeLabelProps extends IBoxProps {
  theme?: NoticeTheme;
}

export interface INoticeContext {
  getLabelProps: PropGetterFn;
}

declare const Notice: (<T>(props: CProps<INoticeProps & T, INoticeContext>) => ReturnEl) & {
  Label: <T>(props: CProps<INoticeLabelProps & T>) => ReturnEl;
  Actions: <T>(props: CProps<IBoxProps & T>) => ReturnEl;
  Content: <T>(props: CProps<IBoxProps & T>) => ReturnEl;
  CloseIcon: <T>(props: CProps<IBoxProps & IIconProps>) => ReturnEl;
};

export default Notice;
