import React, { useRef } from 'react';
import FocusLock from 'react-focus-lock';
import { FadeInOut } from '@semcore/animation';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Portal, { PortalProvider } from '@semcore/portal';
import { Box } from '@semcore/flex-box';
import OutsideClick from '@semcore/outside-click';
import CloseIcon from '@semcore/icon/Close/l';
import fire from '@semcore/utils/lib/fire';
import usePreventScroll from '@semcore/utils/lib/use/usePreventScroll';
import findComponent from '@semcore/utils/lib/findComponent';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import style from './style/modal.shadow.css';

class ModalRoot extends Component {
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

const FocusLockWrapper = React.forwardRef(function({ tag, ...other }, ref) {
  return <FocusLock ref={ref} as={tag} lockProps={other} {...other} />;
});

function Window(props) {
  const SWindow = Root;
  const { Children, styles, visible, closable } = props;
  const windowRef = useRef(null);

  if (!visible) return null;

  return sstyled(styles)(
    <SWindow
      render={FocusLockWrapper}
      tag={Box}
      ref={windowRef}
      returnFocus={true}
      tabIndex={-1}
      autoFocus={true}
      role="dialog"
      aria-modal={true}
      aria-label="Modal window"
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
  const overlayRef = useRef(null);
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
  return sstyled(props.styles)(
    <SClose render={Box} tag="button" tabIndex={0} aria-label="Close" />,
  );
}

Close.defaultProps = {
  children: <CloseIcon title="Close" />,
};

Close.enhance = [keyboardFocusEnhance()];

const Modal = createComponent(ModalRoot, {
  Window,
  Overlay,
  Close,
});

export default Modal;
