import React, { ComponentProps, HTMLAttributes, useRef } from 'react';
import FocusLock from 'react-focus-lock';
import { FadeInOut, IFadeInOutProps } from '@semcore/animation';
import createComponent, { Component, Merge, PropGetter, sstyled, Root } from '@semcore/core';
import Portal, { IPortalProps, PortalProvider } from '@semcore/portal';
import { Box, IBoxProps } from '@semcore/flex-box';
import OutsideClick from '@semcore/outside-click';
import CloseS from '@semcore/icon/lib/Close/s';
import fire from '@semcore/utils/lib/fire';
import usePreventScroll from '@semcore/utils/lib/use/usePreventScroll';
import findComponent from '@semcore/utils/lib/findComponent';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import style from './style/modal.shadow.css';

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
  getOverlayProps: PropGetter<ModalRoot['getOverlayProps']>;
  getWindowProps: PropGetter<ModalRoot['getWindowProps']>;
  getCloseProps: PropGetter<ModalRoot['getCloseProps']>;
}

class ModalRoot extends Component<IModalProps> {
  static displayName = 'Modal';
  static style = style;
  static defaultProps = {
    duration: 200,
    closable: true,
  };

  handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      fire(this, 'onClose', 'onEscape', e);
    }
  };

  handleIconCloseClick = (e) => {
    fire(this, 'onClose', 'onCloseClick', e);
  };

  handleOutsideClick = (e) => {
    fire(this, 'onClose', 'onOutsideClick', e);
  };

  getOverlayProps() {
    const { duration, visible } = this.asProps;
    return {
      duration,
      visible,
      onOutsideClick: this.handleOutsideClick,
    };
  }

  getWindowProps() {
    const { visible, closable } = this.asProps;
    return {
      visible,
      closable,
      onKeyDown: this.handleKeyDown,
    };
  }

  getCloseProps() {
    return {
      onClick: this.handleIconCloseClick,
    };
  }

  render() {
    const { Children, disablePortal } = this.asProps;

    const advanceMode = !!findComponent(Children, [
      Modal.Overlay.displayName,
      Modal.Window.displayName,
    ]);

    return (
      <Portal disablePortal={disablePortal}>
        {advanceMode ? (
          <Children />
        ) : (
          <Modal.Overlay>
            <Root render={Modal.Window} />
          </Modal.Overlay>
        )}
      </Portal>
    );
  }
}

// @ts-ignore
const FocusLockWrapper = React.forwardRef<HTMLElement>(function ({ tag, ...other }, ref) {
  return <FocusLock ref={ref} as={tag} lockProps={other} {...other} />;
});

function Window(props) {
  const SWindow = Root;
  const { Children, styles, visible, closable } = props;
  const windowRef = useRef<HTMLElement>(null);

  if (!visible) return null;

  return sstyled(styles)(
    <SWindow
      render={FocusLockWrapper}
      tag={Box}
      ref={windowRef}
      returnFocus={true}
      tabIndex={-1}
      autoFocus={true}
    >
      <PortalProvider value={windowRef}>
        {closable && <Modal.Close />}
        <Children />
      </PortalProvider>
    </SWindow>,
  );
}

function Overlay(props) {
  const SOverlay = Root;
  const { Children, styles, onOutsideClick, visible } = props;
  const overlayRef = useRef<HTMLElement>(null);
  usePreventScroll(visible);

  return sstyled(styles)(
    <SOverlay render={FadeInOut} ref={overlayRef}>
      <OutsideClick root={overlayRef} onOutsideClick={onOutsideClick}>
        <Children />
      </OutsideClick>
    </SOverlay>,
  );
}

function Close(props) {
  const SClose = Root;
  return sstyled(props.styles)(<SClose render={Box} tag="button" tabIndex={0} />);
}

Close.defaultProps = {
  children: <CloseS title="Close" />,
};

Close.enhance = [keyboardFocusEnhance()];

const Modal = createComponent<
  Merge<IModalProps, HTMLAttributes<HTMLDivElement>>,
  {
    Window: ComponentProps<typeof Box>;
    Overlay: ComponentProps<typeof Box>;
    Close: ComponentProps<typeof Box>;
  },
  IModalContext
>(ModalRoot, {
  Window,
  Overlay,
  Close,
});

export default Modal;
