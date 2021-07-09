import React from 'react';
import { IPortalProps } from '@semcore/portal';
import { IFadeInOutProps, ITransformProps } from '@semcore/animation';
import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';

export type OnCloseTriggerType = 'onOutsideClick' | 'onEscape' | 'onCloseClick';
export type OnCloseType = (
  trigger: OnCloseTriggerType,
  e?: React.MouseEvent | React.KeyboardEvent,
) => void;

export type SidePanelPlacement = 'top' | 'left' | 'right' | 'bottom';

export interface ISidePanelProps extends IPortalProps {
  /** Animation display duration in ms
   * @default 350
   */
  duration?: number;
  /**
   * The property responsible for the visibility of the component
   */
  visible?: boolean;
  /**
   * Callback for the component closure
   */
  onClose?: OnCloseType;
  /**
   * Property for displaying the close button
   * @default true
   */
  closable?: boolean;
  /**
   * Position of a dropdown window
   * @default right
   */
  placement?: SidePanelPlacement;
}

export interface ISidePanelOverlayProps extends IFadeInOutProps, IBoxProps {}

export interface ISidePanelPanelProps extends ITransformProps, IBoxProps {
  onOutsideClick?: (e?: React.SyntheticEvent) => void;
}

export interface ISidePanelContext {
  getOverlayProps?: PropGetterFn;
  getPanelProps?: PropGetterFn;
  getCloseProps?: PropGetterFn;
}

declare const SidePanel: (<T>(
  props: CProps<ISidePanelProps & T, ISidePanelContext>,
) => ReturnEl) & {
  Overlay: <T>(props: ISidePanelOverlayProps & T) => ReturnEl;
  Panel: <T>(props: ISidePanelPanelProps & T) => ReturnEl;
  Close: typeof Box;
};

export default SidePanel;
