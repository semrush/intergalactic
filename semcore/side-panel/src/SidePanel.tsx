import React, { ComponentProps, useRef } from 'react';
import FocusLock from 'react-focus-lock';
import createComponent, {
  Component,
  IFunctionProps,
  Merge,
  PropGetter,
  styled,
} from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { FadeInOut, IFadeInOutProps, ITransformProps, Transform } from '@semcore/animation';
import Portal, { IPortalProps, PortalProvider } from '@semcore/portal';
import OutsideClick from '@semcore/outside-click';
import CloseS from '@semcore/icon/lib/Close/s';
import fire from '@semcore/utils/lib/fire';
import findComponent from '@semcore/utils/lib/findComponent';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import usePreventScroll from '@semcore/utils/lib/use/usePreventScroll';

import style from './style/side-panel.shadow.css';

export type OnCloseTriggerType = 'onOutsideClick' | 'onEscape' | 'onCloseClick';
export type OnCloseType = (
  trigger: OnCloseTriggerType,
  e?: React.MouseEvent | React.KeyboardEvent,
) => void;

export type SidePanelPlacement = 'top' | 'left' | 'right' | 'bottom';

export interface ISidePanelProps extends IPortalProps {
  /** Animation display duration in ms
   * @default 350
   */
  duration?: number;
  /**
   * The property responsible for the visibility of the component
   */
  visible?: boolean;
  /**
   * Callback for the component closure
   */
  onClose?: OnCloseType;
  /**
   * Property for displaying the close button
   * @default true
   */
  closable?: boolean;
  /**
   * Position of a dropdown window
   * @default right
   */
  placement?: SidePanelPlacement;
}

export interface ISidePanelOverlayProps extends IFadeInOutProps {
  /**
   * @link ISidePanelProps.visible
   */
  visible?: ISidePanelProps['visible'];
}

export interface ISidePanelPanelProps extends ITransformProps {
  /**
   * @link ISidePanelProps.visible
   */
  visible?: ISidePanelProps['visible'];
  /**
   * @link ISidePanelProps.placement
   */
  placement?: ISidePanelProps['placement'];
  /**
   * @link ISidePanelProps.closable
   */
  closable?: ISidePanelProps['closable'];

  onOutsideClick?: (e?: React.SyntheticEvent) => void;
}

export interface ISidePanelContext extends ISidePanelProps {
  /**
   * The method that encapsulates the props needed to run SidePanel.Overlay
   */
  getOverlayProps?: PropGetter<RootSidePanel['getOverlayProps']>;
  /**
   * The method that encapsulates the props needed to run SidePanel.Panel
   */
  getPanelProps?: PropGetter<RootSidePanel['getPanelProps']>;
  /**
   * The method that encapsulates the props needed to run SidePanel.Close
   */
  getCloseProps?: PropGetter<RootSidePanel['getCloseProps']>;
}

const placementTransformMap = {
  top: ['translate(0, -100%)', 'translate(0, 0)'],
  right: ['translate(100%, 0)', 'translate(0, 0)'],
  bottom: ['translate(0, 100%)', 'translate(0, 0)'],
  left: ['translate(-100%, 0)', 'translate(0, 0)'],
};

class RootSidePanel extends Component<ISidePanelProps> {
  static displayName = 'SidePanel';
  static style = style;
  static defaultProps = {
    placement: 'right',
    duration: 350,
    closable: true,
  };

  sidebarRef = React.createRef<HTMLElement>();

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
    return !!findComponent(this.asProps.Children, [
      SidePanel.Overlay.displayName,
      SidePanel.Panel.displayName,
    ]);
  }

  isUsedOverlay() {
    return (
      !this.isAdvanceMode() ||
      !!findComponent(this.asProps.Children, [SidePanel.Overlay.displayName])
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
    const Root = this.Root;
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

function Overlay(props: IFunctionProps<ISidePanelOverlayProps>) {
  const { Root: SOverlay, styles, visible } = props;
  usePreventScroll(visible);

  return styled(styles)(<SOverlay render={FadeInOut} visible={visible} />);
}

const FocusLockWrapper = React.forwardRef<HTMLElement, any>(function (
  { disableEnforceFocus, ...other },
  ref,
) {
  return <FocusLock ref={ref} lockProps={other} disabled={disableEnforceFocus} {...other} />;
});

const TransformWrapper = React.forwardRef<HTMLElement, any>(function ({ tag, ...other }, ref) {
  return <Transform tag={FocusLockWrapper} ref={ref} as={tag} {...other} />;
});

function Panel(props: IFunctionProps<ISidePanelPanelProps>) {
  const { Root: SPanel, Children, styles, visible, closable, placement, onOutsideClick } = props;

  const sidebarRef = useRef<HTMLElement>(null);

  return styled(styles)(
    <>
      {visible && <OutsideClick onOutsideClick={onOutsideClick} excludeRefs={[sidebarRef]} />}
      <SPanel
        render={TransformWrapper}
        tag={Box}
        ref={sidebarRef}
        placement={placement}
        visible={visible}
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
  const { Root: SClose, styles, keyboardFocused } = props;
  return styled(styles)(
    <SClose render={Box} tag="button" tabIndex={0} keyboardFocused={keyboardFocused} />,
  );
}

Close.defaultProps = {
  children: <CloseS title="Close" />,
};
Close.enhance = [keyboardFocusEnhance()];

const SidePanel = createComponent<
  ISidePanelProps,
  {
    Overlay: Merge<ISidePanelOverlayProps, ComponentProps<typeof Box>>;
    Panel: Merge<ISidePanelPanelProps, ComponentProps<typeof Box>>;
    Close: ComponentProps<typeof Box>;
  },
  ISidePanelContext
>(RootSidePanel, {
  Overlay,
  Panel,
  Close,
});

export default SidePanel;
