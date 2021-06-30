import { IPortalProps } from '@semcore/portal';
import { CProps, Merge, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';

export interface INoticeBubbleContainerProps extends IPortalProps {
  /** Manager copy */
  manager?: NoticeBubbleManager;
  /** Offset from the upper-right corner of the screen */
  offset?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
}

export interface INoticeBubbleInfoProps extends INoticeBubbleProps {
  readonly type?: 'info';
  /** Notice display duration
   * @default 5000
   */
  duration?: number;
}

export interface INoticeBubbleWarningProps extends INoticeBubbleProps {
  readonly type?: 'warning';
  /**
   * Notice display duration
   * @default 0
   */
  duration?: number;
}

export interface INoticeBubbleProps extends IBoxProps {
  /**
   * Manager instance
   * @default NoticeBubbleManager()
   */
  manager?: NoticeBubbleManager;
  /**
   * Notice visibility
   */
  visible?: boolean;
  /** Adds controls (buttons, etc.) */
  action?: React.ReactNode;

  /** Triggered when the notice is closed */
  onClose?: () => void;

  /** Triggered on mouseEnter */
  onMouseEnter?: (e?: React.SyntheticEvent) => void;

  /** Triggered on mouseLeave */
  onMouseLeave?: (e?: React.SyntheticEvent) => void;
}

export interface INoticeBubbleManager {
  /**
   * Adding a notice.
   * Takes the props properties of NoticeBubble.
   *  Returns an object with the uid and the update, remove functions.
   * */
  add?: (props: object) => object;
  /**
   * Updates the notice by uid.
   * Takes the uid-unique identifier and the props-properties of NoticeBubble.
   *  Returns a successful or unsuccessful update.
   * */
  update?: (uid: string, props: object) => boolean;
  /**
   * Deletes the notice by uid.
   * Takes an uid-unique identifier.
   * Returns a successful or unsuccessful deletion.
   * */
  remove?: (uid: string) => boolean;
}

declare const NoticeBubble: <T>(props: INoticeBubbleInfoProps & T) => ReturnEl;
declare const NoticeBubbleWarning: <T>(props: INoticeBubbleWarningProps & T) => ReturnEl;
declare const NoticeBubbleContainer: (<T>(
  props: CProps<INoticeBubbleContainerProps & T>,
) => ReturnEl) & {
  Info: typeof NoticeBubble;
  Warning: typeof NoticeBubbleWarning;
};

export { NoticeBubbleContainer, NoticeBubble, NoticeBubbleWarning };
export default NoticeBubbleManager;
