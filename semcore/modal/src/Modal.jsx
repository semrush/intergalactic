import React from 'react';
import { FadeInOut, Slide } from '@semcore/animation';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Portal, { PortalProvider } from '@semcore/portal';
import Button from '@semcore/button';
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
import { useColorResolver } from '@semcore/utils/lib/use/useColorResolver';
import { useZIndexStacking } from '@semcore/utils/lib/zIndexStacking';

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
    disablePreventScroll: false,
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
    const { duration, visible, animationsDisabled, disablePreventScroll } = this.asProps;
    return {
      duration,
      visible,
      onOutsideClick: this.handleOutsideClick,
      animationsDisabled,
      disablePreventScroll,
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
    const { getI18nText, ghost } = this.asProps;

    return {
      onClick: this.handleIconCloseClick,
      getI18nText,
      ghost,
    };
  }

  getTitleProps() {
    const { uid } = this.asProps;
    const setHasTitle = () => this.setState({ hasTitle: true });

    return {
      id: `igc-${uid}-title`,
      setHasTitle,
    };
  }

  render() {
    const { Children, disablePortal, forcedAdvancedMode, ignorePortalsStacking } = this.asProps;

    const advancedMode =
      forcedAdvancedMode ||
      isAdvanceMode(Children, [Modal.Overlay.displayName, Modal.Window.displayName]);

    return (
      <Portal disablePortal={disablePortal} ignorePortalsStacking={ignorePortalsStacking}>
        {advancedMode ? (
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
  const windowRef = React.useRef(null);

  useFocusLock(windowRef, true, 'auto', !visible, true);

  return sstyled(styles)(
    <SWindow
      render={Slide}
      initialAnimation={true}
      slideOrigin='top'
      visible={visible}
      role='dialog'
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
  const overlayRef = React.useRef(null);
  usePreventScroll(visible, props.disablePreventScroll);
  useContextTheme(overlayRef, visible);
  const zIndex = useZIndexStacking();

  return sstyled(styles)(
    <SOverlay render={FadeInOut} ref={overlayRef} zIndex={zIndex}>
      <OutsideClick root={overlayRef} onOutsideClick={onOutsideClick}>
        <Children />
      </OutsideClick>
    </SOverlay>,
  );
}

function Close(props) {
  const SClose = Root;
  const { Children, children: hasChildren, getI18nText, ghost } = props;
  return sstyled(props.styles)(
    <SClose
      render={Button}
      use='tertiary'
      size='l'
      theme={ghost ? 'invert' : 'muted'}
      aria-label={getI18nText('close')}
    >
      {hasChildren ? (
        <Children />
      ) : (
        <Button.Addon ml={'7px'} mr={'7px'}>
          <CloseIcon title={getI18nText('close')} />
        </Button.Addon>
      )}
    </SClose>,
  );
}

Close.enhance = [keyboardFocusEnhance()];

function Title(props) {
  const { setHasTitle, styles, color } = props;
  const STitle = Root;

  const resolveColor = useColorResolver();
  React.useEffect(() => setHasTitle());

  return sstyled(styles)(<STitle render={Text} tag='h2' use:color={resolveColor(color)} />);
}

const Modal = createComponent(ModalRoot, {
  Window,
  Overlay,
  Close,
  Title,
});

export default Modal;
