import type { FadeInOutProps, SlideProps, NSBox, NSPortal } from '@semcore/base-components';
import type Button from '@semcore/button';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { NSText } from '@semcore/typography';
import type React from 'react';

export type ModalProps = NSPortal.Props &
  NSBox.Props &
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
    /** Specifies the locale for i18n support */
    locale?: string;
    /**
     * Props for render modal without background and paddings. Useful in carousel for example
     */
    ghost?: boolean;
  };

export type WindowProps = NSBox.Props & SlideProps & {};

export type ModalContext = {
  getOverlayProps: PropGetterFn;
  getWindowProps: PropGetterFn;
  getCloseProps: PropGetterFn;
};

declare const Modal: Intergalactic.Component<'div', ModalProps, ModalContext> & {
  Window: Intergalactic.Component<'div', WindowProps>;
  Overlay: NSBox.Component;
  Close: typeof Button;
  Title: Intergalactic.Component<'div', NSText.Props>;
};

export default Modal;
