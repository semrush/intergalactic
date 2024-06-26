import { PortalProps } from '@semcore/portal';
import { UnknownProperties, Intergalactic } from '@semcore/core';
import { BoxProps } from '@semcore/flex-box';

/** @deprecated */
export interface INoticeBubbleContainerProps
  extends NoticeBubbleContainerProps,
    UnknownProperties {}
export type NoticeBubbleContainerProps = BoxProps &
  PortalProps & {
    /** Manager copy */
    manager?: NoticeBubbleManager;
    locale?: string;
  };

/** @deprecated */
export interface INoticeBubbleProps extends NoticeBubbleProps, UnknownProperties {}
export type NoticeBubbleProps = BoxProps & {
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
  manager?: NoticeBubbleManager;
  icon?: React.ReactElement;
};
/** @deprecated */
export interface INoticeBubbleInfoProps extends NoticeBubbleInfoProps, UnknownProperties {}
export type NoticeBubbleInfoProps = NoticeBubbleProps & {
  readonly type?: 'info';
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
};

/** @deprecated */
export interface INoticeBubbleWarningProps extends NoticeBubbleWarningProps, UnknownProperties {}
export type NoticeBubbleWarningProps = NoticeBubbleProps & {
  readonly type?: 'warning';
  /**
   * Notice display duration.
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
};

/** @deprecated */
export interface INoticeBubbleManager extends NoticeBubbleManagerClass, UnknownProperties {}
export type NoticeBubbleManagerClass = {
  /**
   * Creates and shows a notice.
   * */
  add: (props: NoticeBubbleInfoProps | NoticeBubbleWarningProps) => {
    uid: string;
    update: (props: Partial<NoticeBubbleInfoProps> | Partial<NoticeBubbleWarningProps>) => boolean;
    remove: () => boolean;
  };
  /**
   * Updates notice by uid.
   * */
  update: (
    uid: string,
    props: Partial<NoticeBubbleInfoProps> | Partial<NoticeBubbleWarningProps>,
  ) => boolean;
  /**
   * Removes notice by uid.
   * */
  remove: (uid: string) => boolean;
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
export declare class NoticeBubbleManager implements NoticeBubbleManagerClass {
  /**
   * Creates and shows a notice.
   * */
  add(props: NoticeBubbleInfoProps | NoticeBubbleWarningProps): {
    uid: string;
    update: (props: Partial<NoticeBubbleInfoProps> | Partial<NoticeBubbleWarningProps>) => boolean;
    remove: () => boolean;
  };
  /**
   * Updates notice by uid.
   * */
  update(
    uid: string,
    props: Partial<NoticeBubbleInfoProps> | Partial<NoticeBubbleWarningProps>,
  ): boolean;
  /**
   * Removes notice by uid.
   * */
  remove(uid: string): boolean;
}

export declare const noticeBubbleDefaultManager: NoticeBubbleManager;

/**
 * @deprecated Use `import { noticeBubbleDefaultManager } from ...` instead
 */
export default noticeBubbleDefaultManager;
