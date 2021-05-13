import React from 'react';
import { CSSTransition } from 'react-transition-group';
import createComponent, { Root, Component, styled } from '@semcore/core';
import Popper from '@semcore/popper';
import { Box } from '@semcore/flex-box';
import Close from '@semcore/icon/lib/Close/xs';
import If from '@semcore/utils/lib/if';

import style from './style/feature-popover.shadow.css';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';

class FeaturePopover extends Component {
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

class FeaturePopoverPopper extends Component {
  static defaultProps = {
    closeIcon: false,
    duration: 200,
  };

  render() {
    const SFeaturePopover = Root;
    const SClose = Close;
    const { Children, styles, visible, closeIcon, duration, $onCloseClick } = this.asProps;

    const transitionDuration = `${duration}ms`;
    return (
      <CSSTransition in={visible} timeout={duration} unmountOnExit>
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
  const SSpot = Root;

  const { styles, visible } = props;

  return styled(styles)(
    <If condition={visible}>
      <SSpot render={Box} />
    </If>,
  );
};

export default createComponent(
  FeaturePopover,
  {
    Trigger: Popper.Trigger,
    Popper: FeaturePopoverPopper,
    Spot,
  },
  { parent: Popper },
);
