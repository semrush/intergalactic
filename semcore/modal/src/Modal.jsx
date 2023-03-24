import React, { useRef, useEffect } from 'react';
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
import { cssVariableEnhance } from '@semcore/utils/lib/useCssVariable';
import { useFocusLock } from '@semcore/utils/lib/use/useFocusLock';
import { useContextTheme } from '@semcore/utils/lib/ThemeProvider';

class ModalRoot extends Component {
  static displayName = 'Modal';
  static style = style;
  static enhance = [
    i18nEnhance(localizedMessages),
    uniqueIDEnhancement(),
    cssVariableEnhance({
      variable: '--intergalactic-duration-modal',
      fallback: '200',
      map: Number.parseInt,
      prop: 'duration',
    }),
  ];
  static defaultProps = {
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
    const { duration, visible, animationsDisabled } = this.asProps;
    return {
      duration,
      visible,
      onOutsideClick: this.handleOutsideClick,
      animationsDisabled,
    };
  }

  getWindowProps() {
    const { visible, closable, getI18nText, uid, duration, animationsDisabled } = this.asProps;
    const { hasTitle } = this.state;
    return {
      visible,
      closable,
      onKeyDown: this.handleKeyDown,
      'aria-label': hasTitle ? undefined : getI18nText('title'),
      'aria-labelledby': hasTitle ? `igc-${uid}-title` : undefined,
      duration,
      animationsDisabled,
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

function Window(props) {
  const SWindow = Root;
  const { Children, styles, visible, closable, duration } = props;
  const windowRef = useRef(null);

  useFocusLock(windowRef, true, 'auto', !visible);

  return sstyled(styles)(
    <SWindow
      render={Slide}
      initialAnimation={true}
      slideOrigin="top"
      visible={visible}
      role="dialog"
      aria-modal={true}
      duration={duration}
      ref={windowRef}
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
  useContextTheme(overlayRef, visible);

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
