import React, { ComponentProps, useRef } from 'react';
import FocusLock from 'react-focus-lock';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { FadeInOut, IFadeInOutProps, ITransformProps, Transform } from '@semcore/animation';
import Portal, { IPortalProps, PortalProvider } from '@semcore/portal';
import OutsideClick from '@semcore/outside-click';
import CloseIcon from '@semcore/icon/Close/l';
import fire from '@semcore/utils/lib/fire';
import findComponent, { isAdvanceMode } from '@semcore/utils/lib/findComponent';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import usePreventScroll from '@semcore/utils/lib/use/usePreventScroll';

import style from './style/side-panel.shadow.css';

const placementTransformMap = {
  top: ['translate(0, -100%)', 'translate(0, 0)'],
  right: ['translate(100%, 0)', 'translate(0, 0)'],
  bottom: ['translate(0, 100%)', 'translate(0, 0)'],
  left: ['translate(-100%, 0)', 'translate(0, 0)'],
};

class RootSidePanel extends Component {
  static displayName = 'SidePanel';
  static style = style;
  static defaultProps = {
    placement: 'right',
    duration: 350,
    closable: true,
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
    const { visible, duration } = this.asProps;
    return {
      visible,
      duration,
      delay: this.calculateDelayAnimation('overlay'),
    };
  }

  getPanelProps() {
    const { placement, visible, closable, duration } = this.asProps;

    return {
      visible,
      placement,
      closable,
      duration,
      disableEnforceFocus: !this.isUsedOverlay(),
      delay: this.calculateDelayAnimation('panel'),
      onOutsideClick: this.handleOutsideClick,
      onKeyDown: this.handleSidebarKeyDown,
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
  usePreventScroll(props.visible);
  return sstyled(props.styles)(<SOverlay render={FadeInOut} />);
}

const FocusLockWrapper = React.forwardRef(function({ disableEnforceFocus, ...other }, ref) {
  return <FocusLock ref={ref} lockProps={other} disabled={disableEnforceFocus} {...other} />;
});

const TransformWrapper = React.forwardRef(function({ tag, ...other }, ref) {
  return <Transform tag={FocusLockWrapper} ref={ref} as={tag} {...other} />;
});

function Panel(props) {
  const SPanel = Root;
  const { Children, styles, visible, closable, placement, onOutsideClick } = props;

  const sidebarRef = useRef(null);

  return sstyled(styles)(
    <>
      {visible && <OutsideClick onOutsideClick={onOutsideClick} excludeRefs={[sidebarRef]} />}
      <SPanel
        render={TransformWrapper}
        tag={Box}
        ref={sidebarRef}
        tabIndex={-1}
        returnFocus={true}
        autoFocus={true}
        transform={placementTransformMap[placement]}
      >
        <PortalProvider value={sidebarRef}>
          {closable && <SidePanel.Close />}
          <Children />
        </PortalProvider>
      </SPanel>
    </>,
  );
}

function Close(props) {
  const SClose = Root;
  return sstyled(props.styles)(<SClose render={Box} tag="button" />);
}

Close.defaultProps = {
  children: <CloseIcon title="Close" />,
};
Close.enhance = [keyboardFocusEnhance()];

const SidePanel = createComponent(RootSidePanel, {
  Overlay,
  Panel,
  Close,
});

export default SidePanel;
