import React from 'react';
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
import Button from '@semcore/button';
import { cssVariableEnhance } from '@semcore/utils/lib/useCssVariable';
import { useFocusLock } from '@semcore/utils/lib/use/useFocusLock';
import { useContextTheme } from '@semcore/utils/lib/ThemeProvider';
import logger from '@semcore/utils/lib/logger';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import {
  ZIndexStackingContextProvider,
  useZIndexStacking,
} from '@semcore/utils/lib/zIndexStacking';
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
    i18nEnhance(localizedMessages),
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
    const {
      placement,
      visible,
      closable,
      duration,
      animationsDisabled,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    } = this.asProps;

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
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    };
  }

  getCloseProps() {
    return {
      onClick: this.handleIconCloseClick,
      getI18nText: this.asProps.getI18nText,
    };
  }

  render() {
    const { Children, disablePortal, ignorePortalsStacking } = this.asProps;

    return (
      <Portal disablePortal={disablePortal} ignorePortalsStacking={ignorePortalsStacking}>
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
  const overlayRef = React.useRef(null);
  usePreventScroll(props.visible, props.disablePreventScroll);
  useContextTheme(overlayRef, props.visible);
  const zIndex = useZIndexStacking('z-index-modal');
  return sstyled(props.styles)(<SOverlay render={FadeInOut} ref={overlayRef} zIndex={zIndex} />);
}

function Panel(props) {
  const SPanel = Root;
  const { Children, styles, visible, closable, placement, onOutsideClick, forcedAdvancedMode } =
    props;
  const advancedMode =
    forcedAdvancedMode ||
    isAdvanceMode(Children, [
      SidePanel.Header.displayName,
      SidePanel.Body.displayName,
      SidePanel.Footer.displayName,
    ]);

  const sidebarRef = React.useRef(null);

  useFocusLock(sidebarRef, true, 'auto', !visible, true);

  const hasLabel = Boolean(props['aria-label'] || props['aria-labelledby']);

  logger.warn(
    !hasLabel,
    "'aria-label' or 'aria-labelledby' are required for SidePanel component",
    props['data-ui-name'] || Panel.displayName,
  );

  return sstyled(styles)(
    <>
      {visible && <OutsideClick onOutsideClick={onOutsideClick} excludeRefs={[sidebarRef]} />}
      <SPanel
        render={Slide}
        visible={visible}
        initialAnimation={true}
        slideOrigin={placement}
        ref={sidebarRef}
        role='dialog'
        aria-modal='true'
      >
        <ZIndexStackingContextProvider designToken='z-index-modal'>
          <PortalProvider value={sidebarRef}>
            {closable && <SidePanel.Close />}
            {advancedMode ? (
              <Children />
            ) : (
              <SidePanel.Body>
                <Children />
              </SidePanel.Body>
            )}
          </PortalProvider>
        </ZIndexStackingContextProvider>
      </SPanel>
    </>,
  );
}

function Footer(props) {
  const SFooter = Root;
  return sstyled(props.styles)(<SFooter render={Flex} tag='footer' />);
}

function Close({ styles, children: hasChildren, Children, getI18nText }) {
  const SClose = Root;
  return sstyled(styles)(
    <SClose render={Button} aria-label={getI18nText('close')} use='tertiary' theme='muted' size='l'>
      {hasChildren ? (
        <Children />
      ) : (
        <Button.Addon ml={'7px'} mr={'7px'}>
          <CloseIcon />
        </Button.Addon>
      )}
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
  const SBackText = Button.Text;
  const { Children, styles } = props;

  return sstyled(styles)(
    <SBack render={Button} use='tertiary' theme='muted' type='button'>
      <Button.Addon tag={ArrowLeft} />
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
    <SHeader render={Box} tag='header'>
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
