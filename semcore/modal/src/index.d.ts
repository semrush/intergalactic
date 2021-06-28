import React, { ComponentProps } from 'react';
import { IFadeInOutProps } from '@semcore/animation';
import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import { IPortalProps } from '@semcore/portal';
import { Box, IBoxProps } from '@semcore/flex-box';
import { ILinkProps } from '@semcore/link/src';

export interface IModalProps extends IPortalProps, IBoxProps, IFadeInOutProps {
  /** Duration of animation, ms
   * @default 200
   */
  duration?: number;
  /** This property is responsible for the visibility of the modal window */
  visible?: boolean;
  /** Function called when the component is hidden */
  onClose?: (
    trigger: 'onOutsideClick' | 'onCloseClick' | 'onEscape',
    e?: React.MouseEvent | React.KeyboardEvent,
  ) => void;
  /** Displaying the close button(x) in the upper-right corner of the modal dialog
   * @default true
   * */
  closable?: boolean;
}

export interface IModalContext extends IModalProps {
  getOverlayProps: PropGetterFn;
  getWindowProps: PropGetterFn;
  getCloseProps: PropGetterFn;
}

declare const Modal: (<T>(props: CProps<IModalProps & T, IModalContext>) => ReturnEl) & {
  Window: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
  Overlay: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
  Close: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
};

export default Modal;
