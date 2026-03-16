import type { FadeInOutProps, Box, BoxProps } from '@semcore/base-components';
import type Button from '@semcore/button';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { Text } from '@semcore/typography';

export type NoticeTheme = 'danger' | 'warning' | 'success' | 'info' | 'muted';

export type NoticeProps = BoxProps &
  FadeInOutProps & {
    /** Property for managing visibility of Notice */
    hidden?: boolean;
    /**
     * Notice theme
     * @default info
     */
    theme?: NoticeTheme;
    /** Duration of animation, ms
     * @default 250
     */
    duration?: number;
    /** Specifies the locale for i18n support */
    locale?: string;
  };

export type NoticeLabelProps = BoxProps & {
  theme?: NoticeTheme;
};

export type NoticeContext = {
  getLabelProps: PropGetterFn;
};

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

  /** A custom element for text */
  text?: React.ReactNode;
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
  Close: typeof Button;
};

declare const NoticeSmart: Intergalactic.Component<'div', NoticeSmartProps>;

export { NoticeSmart };
export default Notice;
