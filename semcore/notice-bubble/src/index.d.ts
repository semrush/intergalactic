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
   * Notice display duration.
   */
  duration?: number;
  /**
   * Enables animation on first rendering.
   * @default false
   */
  initialAnimation?: boolean;
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
    ref: React.RefObject<HTMLDivElement>;
    focus: () => void;
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
declare const NoticeBubble: Intergalactic.Component<'div', NoticeBubbleInfoProps>;
/**
 * @deprecated use `NoticeBubbleManager` instead.
 * */
declare const NoticeBubbleWarning: Intergalactic.Component<'div', NoticeBubbleWarningProps>;
declare const NoticeBubbleContainer: Intergalactic.Component<'div', NoticeBubbleContainerProps> & {
  /**
   * @deprecated use `NoticeBubbleManager` instead.
   * */
  Info: typeof NoticeBubble;

  /**
   * @deprecated use `NoticeBubbleManager` instead.
   * */
  Warning: typeof NoticeBubbleWarning;
};
declare class NoticeBubbleManager implements NoticeBubbleManagerClass {
  /**
   * Creates and shows a notice.
   * */
  add(props: NoticeBubbleInfoProps | NoticeBubbleWarningProps): {
    uid: string;
    update: (props: Partial<NoticeBubbleInfoProps> | Partial<NoticeBubbleWarningProps>) => boolean;
    remove: () => boolean;
    ref: React.RefObject<HTMLDivElement>;
    focus: () => void;
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

declare const noticeBubbleDefaultManager: NoticeBubbleManager;

export {
  NoticeBubbleContainer,
  NoticeBubble,
  NoticeBubbleWarning,
  NoticeBubbleManager,
  noticeBubbleDefaultManager,
};
/**
 * @deprecated Use `import { noticeBubbleDefaultManager } from ...` instead
 */
export default noticeBubbleDefaultManager;
