import React, { useRef, useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import { FadeInOut, Slide } from '@semcore/animation';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Portal, { PortalProvider } from '@semcore/portal';
import { Box } from '@semcore/flex-box';
import OutsideClick from '@semcore/outside-click';
import CloseIcon from '@semcore/icon/Close/l';
import fire from '@semcore/utils/lib/fire';
import usePreventScroll from '@semcore/utils/lib/use/usePreventScroll';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import style from './style/modal.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { Text } from '@semcore/typography';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import propsForElement from '@semcore/utils/lib/propsForElement';

class ModalRoot extends Component {
  static displayName = 'Modal';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages), uniqueIDEnhancement()];
  static defaultProps = {
    duration: 200,
    closable: true,
    i18n: localizedMessages,
    locale: 'en',
  };
  state = { hasTitle: false };

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
    const { visible, closable, getI18nText, uid } = this.asProps;
    const { hasTitle } = this.state;
    return {
      visible,
      closable,
      onKeyDown: this.handleKeyDown,
      'aria-label': hasTitle ? undefined : getI18nText('title'),
      'aria-labelledby': hasTitle ? `igc-${uid}-title` : undefined,
    };
  }

  getCloseProps() {
    const { getI18nText } = this.asProps;

    return {
      onClick: this.handleIconCloseClick,
      getI18nText,
    };
  }

  getTitleProps() {
    const { uid } = this.asProps;
    const setTitle = () => this.setState({ hasTitle: true });

    return {
      id: `igc-${uid}-title`,
      setTitle,
    };
  }

  render() {
    const { Children, disablePortal } = this.asProps;

    const advanceMode = isAdvanceMode(Children, [
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

const FocusLockWrapper = React.forwardRef(function ({ tag, ...other }, ref) {
  return <FocusLock ref={ref} as={tag} lockProps={propsForElement(other)} {...other} />;
});

function Window(props) {
  const SWindow = Root;
  const { Children, styles, visible, closable } = props;
  const windowRef = useRef(null);

  return sstyled(styles)(
    <SWindow
      render={Slide}
      tag={FocusLockWrapper}
      initialAnimation={true}
      slideOrigin="top"
      visible={visible}
      ref={windowRef}
      returnFocus={true}
      tabIndex={-1}
      autoFocus={true}
      role="dialog"
      aria-modal={true}
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
  const { Children, children: hasChildren, getI18nText } = props;
  return sstyled(props.styles)(
    <SClose render={Box} tag="button" tabIndex={0} aria-label={getI18nText('close')}>
      {hasChildren ? <Children /> : <CloseIcon title={getI18nText('close')} />}
    </SClose>,
  );
}

Close.enhance = [keyboardFocusEnhance()];

function Title(props) {
  const { setTitle, styles } = props;
  const STitle = Root;

  useEffect(() => setTitle());

  return sstyled(styles)(<STitle render={Text} tag="h2" />);
}

const Modal = createComponent(ModalRoot, {
  Window,
  Overlay,
  Close,
  Title,
});

export default Modal;
