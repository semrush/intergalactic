import { IPortalProps } from '@semcore/portal';
import { CProps, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';

export interface INoticeBubbleContainerProps extends IBoxProps, IPortalProps {
  /** Manager copy */
  manager?: INoticeBubbleManager;
  locale?: string;
}

export interface INoticeBubbleProps extends IBoxProps {
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
  children: React.ReactNode;
}
export interface INoticeBubbleInfoProps extends INoticeBubbleProps {
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
}

export interface INoticeBubbleWarningProps extends INoticeBubbleProps {
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
}

export interface INoticeBubbleManager {
  /**
   * Creates and shows a notice.
   * */
  add: (props: INoticeBubbleInfoProps | INoticeBubbleWarningProps) => {
    uid: string;
    update: (
      props: Partial<INoticeBubbleInfoProps> | Partial<INoticeBubbleWarningProps>,
    ) => boolean;
    remove: () => boolean;
  };
  /**
   * Updates notice by uid.
   * */
  update: (
    uid: string,
    props: Partial<INoticeBubbleInfoProps> | Partial<INoticeBubbleWarningProps>,
  ) => boolean;
  /**
   * Removes notice by uid.
   * */
  remove: (uid: string) => boolean;
}

/**
 * @deprecated use `NoticeBubbleManager` instead.
 * */
declare const NoticeBubble: <T>(props: INoticeBubbleInfoProps & T) => ReturnEl;
/**
 * @deprecated use `NoticeBubbleManager` instead.
 * */
declare const NoticeBubbleWarning: <T>(props: INoticeBubbleWarningProps & T) => ReturnEl;
declare const NoticeBubbleContainer: (<T>(
  props: CProps<INoticeBubbleContainerProps & T>,
) => ReturnEl) & {
  /**
   * @deprecated use `NoticeBubbleManager` instead.
   * */
  Info: typeof NoticeBubble;

  /**
   * @deprecated use `NoticeBubbleManager` instead.
   * */
  Warning: typeof NoticeBubbleWarning;
};
declare class NoticeBubbleManager implements INoticeBubbleManager {
  /**
   * Creates and shows a notice.
   * */
  add(props: INoticeBubbleInfoProps | INoticeBubbleWarningProps): {
    uid: string;
    update: (
      props: Partial<INoticeBubbleInfoProps> | Partial<INoticeBubbleWarningProps>,
    ) => boolean;
    remove: () => boolean;
  };
  /**
   * Updates notice by uid.
   * */
  update(
    uid: string,
    props: Partial<INoticeBubbleInfoProps> | Partial<INoticeBubbleWarningProps>,
  ): boolean;
  /**
   * Removes notice by uid.
   * */
  remove(uid: string): boolean;
}

export { NoticeBubbleContainer, NoticeBubble, NoticeBubbleWarning, NoticeBubbleManager };
export default NoticeBubbleManager;
