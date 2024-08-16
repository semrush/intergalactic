import React from 'react';
import { FadeInOutProps, SlideProps } from '@semcore/animation';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { PortalProps } from '@semcore/portal';
import { Box, BoxProps } from '@semcore/flex-box';
import { TextProps } from '@semcore/typography';
import Button from '@semcore/button';

/** @deprecated */
export interface IModalProps extends ModalProps, UnknownProperties {}
export type ModalProps = PortalProps &
  BoxProps &
  FadeInOutProps & {
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
    /**
     * Setting `true` disables mechanism that hides document body scrollbar when Modal is visible
     * @default false
     */
    disablePreventScroll?: boolean;

    locale?: string;

    /**
     * Props for render modal without background and paddings. Useful in carousel for example
     */
    ghost?: boolean;
  };

/** @deprecated */
export interface IWindowProps extends WindowProps, UnknownProperties {}
export type WindowProps = BoxProps & SlideProps & {};

/** @deprecated */
export interface IModalContext extends ModalContext, UnknownProperties {}
export type ModalContext = {
  getOverlayProps: PropGetterFn;
  getWindowProps: PropGetterFn;
  getCloseProps: PropGetterFn;
};

declare const Modal: Intergalactic.Component<'div', ModalProps, ModalContext> & {
  Window: Intergalactic.Component<'div', WindowProps>;
  Overlay: typeof Box;
  Close: typeof Button;
  Title: Intergalactic.Component<'div', TextProps>;
};

export default Modal;
