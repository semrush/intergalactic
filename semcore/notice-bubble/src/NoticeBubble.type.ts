import type { PortalProps, BoxProps } from '@semcore/base-components';
import type { UnknownProperties, Intergalactic } from '@semcore/core';
import type { useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';
import type { NodeByRef } from '@semcore/core/lib/utils/ref';
import type { RefObject } from 'react';

/** @deprecated */
export interface INoticeBubbleContainerProps
  extends NoticeBubbleContainerProps,
  UnknownProperties {}

/**
 * @deprecated. Pass noticeBubbleContainer property from window.sm2.getNoticeBubbleContainer()
 */
export type NoticeBubbleContainerPortalProps = PortalProps;

export type NoticeBubbleContainerProps = BoxProps &
  NoticeBubbleContainerPortalProps & {
    /** Ref or element to mount bubbles in. You should element form window.sm2.getNoticeBubbleContainer() */
    containerNode?: NodeByRef;
    /** Manager copy */
    manager?: NoticeBubbleManagerClass;
    /** Specifies the locale for i18n support */
    locale?: string;
  };

export type NoticeBubbleViewItemProps = NoticeBubbleProps & {
  containerNode?: NodeByRef;
  // notice: NoticeBubbleInfoProps | NoticeBubbleWarningProps;
  animationDuration: number;
  getI18nText: ReturnType<typeof useI18n>;
  styles: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement> | undefined;
};

/** @deprecated */
export interface INoticeBubbleProps extends NoticeBubbleProps, UnknownProperties {}
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
/** @deprecated */
export interface INoticeBubbleInfoProps extends NoticeBubbleInfoProps, UnknownProperties {}
export type NoticeBubbleInfoProps = NoticeBubbleProps & {
  readonly type?: 'info';
};

/** @deprecated */
export interface INoticeBubbleWarningProps extends NoticeBubbleWarningProps, UnknownProperties {}
export type NoticeBubbleWarningProps = NoticeBubbleProps & {
  readonly type?: 'warning';
};

export type AddReturnObj = {
  uid: number;
  update: (props: NoticeBubbleInfoProps | NoticeBubbleWarningProps) => boolean;
  remove: () => boolean;
  ref: RefObject<HTMLElement>;
  focus: () => void;
};

/** @deprecated */
export interface INoticeBubbleManager extends NoticeBubbleManagerClass, UnknownProperties {}
export type NoticeBubbleManagerClass = {
  /**
   * Creates and shows a notice.
   * */
  add: (props: NoticeBubbleInfoProps | NoticeBubbleWarningProps) => AddReturnObj;
  /**
   * Updates notice by uid.
   * */
  update: (
    uid: number,
    props: Partial<NoticeBubbleInfoProps> | Partial<NoticeBubbleWarningProps>,
  ) => boolean;
  /**
   * Removes notice by uid.
   * */
  remove: (uid: number) => boolean;
  /**
   * Replace last notice (if it is existing)
   */
  replaceLast: (props: NoticeBubbleInfoProps | NoticeBubbleWarningProps) => void;
};

/**
 * @deprecated use `NoticeBubbleManager` instead.
 * */
export declare const NoticeBubble: Intergalactic.Component<'div', NoticeBubbleInfoProps>;
/**
 * @deprecated use `NoticeBubbleManager` instead.
 * */
export declare const NoticeBubbleWarning: Intergalactic.Component<'div', NoticeBubbleWarningProps>;
export declare const NoticeBubbleContainer: Intergalactic.Component<
  'div',
  NoticeBubbleContainerProps
> & {
  /**
   * @deprecated use `NoticeBubbleManager` instead.
   * */
  Info: typeof NoticeBubble;

  /**
   * @deprecated use `NoticeBubbleManager` instead.
   * */
  Warning: typeof NoticeBubbleWarning;
};
// export declare class NoticeBubbleManager implements NoticeBubbleManagerClass {
//   /**
//    * Creates and shows a notice.
//    * */
//   add(props: NoticeBubbleInfoProps | NoticeBubbleWarningProps): {
//     uid: string;
//     update: (props: Partial<NoticeBubbleInfoProps> | Partial<NoticeBubbleWarningProps>) => boolean;
//     remove: () => boolean;
//     ref: React.RefObject<HTMLDivElement>;
//     focus: () => void;
//   };
//   /**
//    * Updates notice by uid.
//    * */
//   update(
//     uid: string,
//     props: Partial<NoticeBubbleInfoProps> | Partial<NoticeBubbleWarningProps>,
//   ): boolean;
//   /**
//    * Removes notice by uid.
//    * */
//   remove(uid: string): boolean;
//   /**
//    * Replace last notice (if it is existing)
//    */
//   replaceLast: (props: NoticeBubbleInfoProps | NoticeBubbleWarningProps) => void;
// }
//
// export declare const noticeBubbleDefaultManager: NoticeBubbleManager;
//
// /**
//  * @deprecated Use `import { noticeBubbleDefaultManager } from ...` instead
//  */
// export default noticeBubbleDefaultManager;
