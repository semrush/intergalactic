import type { NSAnimation, NSBox } from '@semcore/base-components';
import type Button from '@semcore/button';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { Text } from '@semcore/typography';

export type NoticeTheme = 'danger' | 'warning' | 'success' | 'info' | 'muted';

export type NoticeProps = NSBox.Props &
  NSAnimation.FadeInOut.Props & {
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

export type NoticeLabelProps = NSBox.Props & {
  theme?: NoticeTheme;
};

export type NoticeContext = {
  getLabelProps?: PropGetterFn;
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
  Actions: NSBox.Component;
  Content: NSBox.Component;
  Title: typeof Text;
  Text: typeof Text;
  Close: typeof Button;
};

declare const NoticeSmart: (
  props: Intergalactic.InternalTypings.EfficientOmit<
    Intergalactic.InternalTypings.ComponentProps<'div', 'div', NoticeSmartProps>,
    'children'
  >
) => Intergalactic.InternalTypings.ComponentRenderingResults & Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', NoticeSmartProps>;

export { NoticeSmart };
export default Notice;
