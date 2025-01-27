import type { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import type { Box, BoxProps } from '@semcore/flex-box';
import type Button from '@semcore/button';
import type { IconProps } from '@semcore/icon';
import type { FadeInOutProps } from '@semcore/animation';
import type { Text } from '@semcore/typography';

export type NoticeTheme = 'danger' | 'warning' | 'success' | 'info' | 'muted';
export type NoticeUse = 'primary' | 'secondary';

/** @deprecated */
export interface INoticeProps extends NoticeProps, UnknownProperties {}
export type NoticeProps = BoxProps &
  FadeInOutProps & {
    /** Property for managing visibility of Notice */
    hidden?: boolean;
    /** Notice type
     * @deprecated since version ^4.1.0
     */
    use?: NoticeUse;
    /**
     * Notice theme
     * @default info
     */
    theme?: NoticeTheme;
    /** Duration of animation, ms
     * @default 250
     */
    duration?: number;
    locale?: string;
  };

/** @deprecated */
export interface INoticeLabelProps extends NoticeLabelProps, UnknownProperties {}
export type NoticeLabelProps = BoxProps & {
  theme?: NoticeTheme;
};

/** @deprecated */
export interface INoticeContext extends NoticeContext, UnknownProperties {}
export type NoticeContext = {
  getLabelProps: PropGetterFn;
};

/** @deprecated */
export interface INoticeSmartProps extends NoticeSmartProps, UnknownProperties {}
export type NoticeSmartProps = NoticeProps & {
  /**
   * A custom element for additional information
   */
  label?: React.ReactNode;

  /**
   * A custom element for title
   */
  title?: React.ReactNode;

  /**
   * Custom action element
   */
  actions?: React.ReactNode;
  /**
   *  Adds a Close button
   */
  closable?: boolean;
  /**
   * Callback on a click on the close button
   */
  onClose?: (event: React.SyntheticEvent) => void;
};

declare const Notice: Intergalactic.Component<'div', NoticeProps, NoticeContext> & {
  Label: Intergalactic.Component<'div', NoticeLabelProps>;
  Actions: typeof Box;
  Content: typeof Box;
  Title: typeof Text;
  Text: typeof Text;
  /**
   * @deprecated Use Notice.Close instead of Notice.CloseIcon
   */
  CloseIcon: Intergalactic.Component<'div', IconProps>;
  Close: typeof Button;
};

declare const NoticeSmart: Intergalactic.Component<'div', NoticeSmartProps>;

export { NoticeSmart };
export default Notice;
