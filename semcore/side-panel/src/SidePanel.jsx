import React, { useRef } from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Flex, Box } from '@semcore/flex-box';
import { FadeInOut, Slide } from '@semcore/animation';
import Portal, { PortalProvider } from '@semcore/portal';
import OutsideClick from '@semcore/outside-click';
import CloseIcon from '@semcore/icon/Close/l';
import fire from '@semcore/utils/lib/fire';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import usePreventScroll from '@semcore/utils/lib/use/usePreventScroll';
import { Text } from '@semcore/typography';
import ArrowLeft from '@semcore/icon/ArrowLeft/m';
import { cssVariableEnhance } from '@semcore/utils/lib/useCssVariable';
import { useFocusLock } from '@semcore/utils/lib/use/useFocusLock';
import { useContextTheme } from '@semcore/utils/lib/ThemeProvider';

import style from './style/side-panel.shadow.css';

class RootSidePanel extends Component {
  static displayName = 'SidePanel';
  static style = style;
  static enhance = [
    cssVariableEnhance({
      variable: '--intergalactic-duration-modal',
      fallback: '200',
      map: Number.parseInt,
      prop: 'duration',
    }),
  ];
  static defaultProps = {
    placement: 'right',
    closable: true,
    disablePreventScroll: false,
  };

  sidebarRef = React.createRef();

  handleSidebarKeyDown = (e) => {
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

  isAdvanceMode() {
    return isAdvanceMode(this.asProps.Children, [
      SidePanel.Overlay.displayName,
      SidePanel.Panel.displayName,
    ]);
  }

  isUsedOverlay() {
    return (
      !this.isAdvanceMode() || isAdvanceMode(this.asProps.Children, [SidePanel.Overlay.displayName])
    );
  }

  calculateDelayAnimation(name) {
    const delay = this.asProps.duration / 2;
    const usedOverlay = this.isUsedOverlay();

    return {
      overlay: usedOverlay ? [0, delay] : 0,
      panel: usedOverlay ? [delay, 0] : 0,
    }[name];
  }

  getOverlayProps() {
    const { visible, duration, animationsDisabled, disablePreventScroll } = this.asProps;
    return {
      visible,
      duration,
      delay: this.calculateDelayAnimation('overlay'),
      animationsDisabled,
      disablePreventScroll,
    };
  }

  getPanelProps() {
    const { placement, visible, closable, duration, animationsDisabled } = this.asProps;

    return {
      visible,
      placement,
      closable,
      duration,
      disableEnforceFocus: !this.isUsedOverlay(),
      delay: this.calculateDelayAnimation('panel'),
      onOutsideClick: this.handleOutsideClick,
      onKeyDown: this.handleSidebarKeyDown,
      animationsDisabled,
    };
  }

  getCloseProps() {
    return {
      onClick: this.handleIconCloseClick,
    };
  }

  render() {
    const { Children, disablePortal } = this.asProps;

    return (
      <Portal disablePortal={disablePortal}>
        {this.isAdvanceMode() ? (
          <Children />
        ) : (
          <SidePanel.Overlay>
            <Root render={SidePanel.Panel} />
          </SidePanel.Overlay>
        )}
      </Portal>
    );
  }
}

function Overlay(props) {
  const SOverlay = Root;
  const overlayRef = useRef(null);
  usePreventScroll(props.visible, props.disablePreventScroll);
  useContextTheme(overlayRef, props.visible);
  return sstyled(props.styles)(<SOverlay render={FadeInOut} ref={overlayRef} />);
}

function Panel(props) {
  const SPanel = Root;
  const { Children, styles, visible, closable, placement, onOutsideClick } = props;
  const advanceMode = isAdvanceMode(Children, [
    SidePanel.Header.displayName,
    SidePanel.Body.displayName,
    SidePanel.Footer.displayName,
  ]);

  const sidebarRef = useRef(null);

  useFocusLock(sidebarRef, true, 'auto', !visible);

  return sstyled(styles)(
    <>
      {visible && <OutsideClick onOutsideClick={onOutsideClick} excludeRefs={[sidebarRef]} />}
      <SPanel
        render={Slide}
        visible={visible}
        initialAnimation={true}
        slideOrigin={placement}
        ref={sidebarRef}
      >
        <PortalProvider value={sidebarRef}>
          {closable && <SidePanel.Close />}
          {advanceMode ? (
            <Children />
          ) : (
            <SidePanel.Body>
              <Children />
            </SidePanel.Body>
          )}
        </PortalProvider>
      </SPanel>
    </>,
  );
}

function Footer(props) {
  const SFooter = Root;
  return sstyled(props.styles)(<SFooter render={Flex} />);
}

function Close({ styles, children, Children }) {
  const SClose = Root;
  return sstyled(styles)(
    <SClose render={Box} tag='button'>
      {children ? <Children /> : <CloseIcon title='Close' />}
    </SClose>,
  );
}
Close.enhance = [keyboardFocusEnhance()];

function Title(props) {
  const STitle = Root;
  return sstyled(props.styles)(<STitle render={Text} tag='h6' />);
}

function Back(props) {
  const SBack = Root;
  const SBackText = Text;
  const { Children, styles } = props;

  return sstyled(styles)(
    <SBack render={Box}>
      <ArrowLeft />
      <SBackText>
        <Children />
      </SBackText>
    </SBack>,
  );
}

function Body(props) {
  const SBody = Root;
  return sstyled(props.styles)(<SBody render={Box} />);
}

function Header(props) {
  const SHeader = Root;
  const { Children, styles, title } = props;
  return sstyled(styles)(
    <SHeader render={Box}>
      {title && <SidePanel.Title children={title} />}
      <Children />
    </SHeader>,
  );
}

const SidePanel = createComponent(RootSidePanel, {
  Overlay,
  Panel,
  Close,
  Header,
  Footer,
  Body,
  Back,
  Title,
});

export default SidePanel;
