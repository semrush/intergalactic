import type { NSPortal, BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';
import type { RefObject } from 'react';

import type { NoticeBubbleManager, NoticeItem } from './NoticeBubbleManager';
import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

/**
 * @deprecated. Pass noticeBubbleContainer property from window.sm2.getNoticeBubbleContainer()
 */
export type NoticeBubbleContainerPortalProps = NSPortal.Props;

export type NoticeBubbleContainerProps = BoxProps &
  NoticeBubbleContainerPortalProps & {
    /** Ref to mount bubbles in. You should use element form window.sm2.getNoticeBubbleContainer() */
    containerNode?: HTMLElement | null;
    /** Manager copy */
    manager?: NoticeBubbleManagerClass;
    /** Specifies the locale for i18n support */
    locale?: string;
  };

export type NoticeBubbleContainerDefaultProps = {
  manager: NoticeBubbleManagerClass;
  i18n: LocalizedMessages;
  locale: 'en';
};

export type NoticeBubbleViewItemProps = NoticeBubbleProps & {
  containerNode?: HTMLElement;
  animationDuration: number;
  getI18nText: ReturnType<typeof useI18n>;
  styles: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement> | undefined;
};

export type NoticeBubbleProps = BoxProps & {
  /** Notice type */
  type?: 'info' | 'warning';
  /**
   * Notice display duration. Set to 0 to disable auto-close.
   */
  duration?: number;
  /**
   * Enables animation on first rendering.
   * @default false
   */
  initialAnimation?: boolean;
  /**
   * Use it for complex notices with important controls.
   * If enabled, browser focus will be locked in the notice
   * until it's closed. After close focus should return to the element
   * where it was placed before notice appear.
   *
   * @deprecated
   */
  focusLock?: boolean;
  /**
   * Notice visibility.
   */
  visible?: boolean;
  /**
   * Control under the notice children.
   * */
  action?: React.ReactNode;
  /**
   * Callback triggered by "Close" icon click.
   * */
  onClose?: (e?: React.SyntheticEvent) => void;
  /**
   * Notice content.
   * */
  children?: React.ReactNode;
  manager?: NoticeBubbleManagerClass;
  icon?: React.ReactElement;
};

export type NoticeBubbleInfoProps = NoticeBubbleProps & {
  readonly type?: 'info';
};

export type NoticeBubbleWarningProps = NoticeBubbleProps & {
  readonly type?: 'warning';
};

export type AddedNoticeMeta = {
  uid: number;
  update: (props: NoticeBubbleInfoProps | NoticeBubbleWarningProps) => Promise<AddedNoticeMeta>;
  remove: () => boolean;
  ref: RefObject<HTMLElement>;
};

export type NoticeBubbleManagerClass = {
  /**
   * Creates and shows a notice.
   * */
  add: (props: NoticeBubbleInfoProps | NoticeBubbleWarningProps) => AddedNoticeMeta;
  /**
   * Removes notice by uid.
   * */
  remove: (uid: number) => boolean;
  /**
   * Replace notice by uid.
   */
  replace: (uid: number, props: NoticeBubbleInfoProps | NoticeBubbleWarningProps) => void;
  /**
   * Replace last notice (if it is existing)
   */
  replaceLast: (props: NoticeBubbleInfoProps | NoticeBubbleWarningProps) => void;
  /** Add change listener */
  addListener: (fn: (items: NoticeItem[]) => void) => (() => void);
};

export declare const NoticeBubbleContainer: Intergalactic.Component<
  'div',
  NoticeBubbleContainerProps
>;
