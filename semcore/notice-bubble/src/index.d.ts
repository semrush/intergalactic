import { IPortalProps } from '@semcore/portal';
import { CProps, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';

export interface INoticeBubbleContainerProps extends IBoxProps, IPortalProps {
  /** Manager copy */
  manager?: INoticeBubbleManager;
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
  manager?: INoticeBubbleManager;
  /**
   * Notice visibility
   */
  visible?: boolean;
  /** Adds controls (buttons, etc.) */
  action?: React.ReactNode;

  /** Triggered when the notice is closed */
  onClose?: (e?: React.SyntheticEvent) => void;
}

export interface INoticeBubbleManager {
  /**
   * Adding a notice.
   * Takes the props properties of NoticeBubble.
   *  Returns an object with the uid and the update, remove functions.
   * */
  add: (props: object) => {
    uid: string;
    update: (props: object) => boolean;
    remove: () => boolean;
  };
  /**
   * Updates the notice by uid.
   * Takes the uid-unique identifier and the props-properties of NoticeBubble.
   *  Returns a successful or unsuccessful update.
   * */
  update: (uid: string, props: object) => boolean;
  /**
   * Deletes the notice by uid.
   * Takes an uid-unique identifier.
   * Returns a successful or unsuccessful deletion.
   * */
  remove: (uid: string) => boolean;
}

declare const NoticeBubble: <T>(props: INoticeBubbleInfoProps & T) => ReturnEl;
declare const NoticeBubbleWarning: <T>(props: INoticeBubbleWarningProps & T) => ReturnEl;
declare const NoticeBubbleContainer: (<T>(
  props: CProps<INoticeBubbleContainerProps & T>,
) => ReturnEl) & {
  Info: typeof NoticeBubble;
  Warning: typeof NoticeBubbleWarning;
};

declare class NoticeBubbleManager implements INoticeBubbleManager {}

export { NoticeBubbleContainer, NoticeBubble, NoticeBubbleWarning, NoticeBubbleManager };
export default NoticeBubbleManager;
