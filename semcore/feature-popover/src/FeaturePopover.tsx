import React, { ComponentProps } from 'react';
import { CSSTransition } from 'react-transition-group';
import createComponent, { Component, PropGetterFn, Merge, styled } from '@semcore/core';
import Popper, { IPopperContext, IPopperPopperProps, IPopperProps } from '@semcore/popper';
import { Box } from '@semcore/flex-box';
import Close from '@semcore/icon/lib/Close/xs';
import If from '@semcore/utils/lib/if';

import style from './style/feature-popover.shadow.css';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';

export interface IFeaturePopoverPopperProps extends IPopperPopperProps {
  /**
   * The property responsible for the visibility of the closing icon
   * @default false
   */
  closeIcon?: boolean;
  /** Animation display duration in `ms`
   * @default 200
   */
  duration?: number;
  /** @ignore */
  $onCloseClick?: () => void;
}

export interface IFeaturePopoverContext extends IPopperContext {
  getSpotProps: PropGetterFn;
}

class FeaturePopover extends Component<IPopperProps> {
  static displayName = 'FeaturePopover';
  static style = style;
  static defaultProps = {
    offset: [0, 12],
    placement: 'bottom-start',
    defaultVisible: false,
    onOutsideClick: () => false,
    interaction: {
      trigger: [['onClick']],
      popper: [],
    },
  };

  defaultModifiers = [
    {
      name: 'flip',
      enabled: false,
    },
  ];

  uncontrolledProps() {
    return {
      visible: null,
    };
  }

  handleVisibleChange = (visible) => {
    this.handlers.visible(visible);
  };

  handleCloseClick = (e) => {
    this.handlers.visible(false, e);
  };

  getPopperProps() {
    const { visible } = this.asProps;
    return {
      visible,
      $onCloseClick: this.handleCloseClick,
    };
  }

  getSpotProps() {
    const { visible } = this.asProps;
    return { visible };
  }

  render() {
    const { styles, forwardRef, onVisibleChange, modifiers = [], ...other } = this.asProps;

    return styled(styles)(
      <Popper
        ref={forwardRef}
        onVisibleChange={callAllEventHandlers(onVisibleChange, this.handleVisibleChange)}
        modifiers={[...this.defaultModifiers, ...modifiers]}
        {...other}
      />,
    );
  }
}

class FeaturePopoverPopper extends Component<IFeaturePopoverPopperProps> {
  static defaultProps = {
    closeIcon: false,
    duration: 200,
  };

  render() {
    const { Root: SFeaturePopover } = this;
    const SClose = Close;
    const { Children, styles, visible, closeIcon, duration, $onCloseClick } = this.asProps;

    const transitionDuration = `${duration}ms`;
    return (
      <CSSTransition in={visible as boolean} timeout={duration} unmountOnExit>
        {(state) => {
          return styled(styles)`
            SFeaturePopover {
              transition: all ${transitionDuration} ease-in;
            }
          `(
            <Popper.Popper disableEnforceFocus>
              <SFeaturePopover render={Box} animate={state}>
                <If condition={closeIcon}>
                  <SClose onClick={$onCloseClick} />
                </If>
                <Children />
              </SFeaturePopover>
            </Popper.Popper>,
          );
        }}
      </CSSTransition>
    );
  }
}

const Spot = (props) => {
  const { Root: SSpot, styles, visible } = props;

  return styled(styles)(
    <If condition={visible}>
      <SSpot render={Box} />
    </If>,
  );
};

export default createComponent<
  FeaturePopover,
  {
    Trigger: ComponentProps<typeof Popper.Trigger>;
    Popper: IFeaturePopoverPopperProps & ComponentProps<typeof Box>;
    Spot: ComponentProps<typeof Box>;
  },
  Merge<IFeaturePopoverContext, IPopperProps>
>(
  FeaturePopover,
  {
    Trigger: Popper.Trigger,
    Popper: FeaturePopoverPopper,
    Spot,
  },
  { parent: Popper },
);
