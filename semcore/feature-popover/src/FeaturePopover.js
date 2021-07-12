import React from 'react';
import { Animation } from '@semcore/animation';
import createComponent, { Root, Component, sstyled } from '@semcore/core';
import Popper from '@semcore/popper';
import { Box } from '@semcore/flex-box';
import Close from '@semcore/icon/lib/Close/xs';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';

import style from './style/feature-popover.shadow.css';

const stylePopper = sstyled.css`
  @keyframes enter {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes exit {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-10px);
    }
  }
`;

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

    return sstyled(styles)(
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

    return sstyled(styles)(
      <Popper.Popper disableEnforceFocus>
        <Animation
          visible={visible}
          duration={duration}
          keyframes={[stylePopper['@enter'], stylePopper['@exit']]}
        >
          <SFeaturePopover render={Box}>
            {closeIcon ? <SClose onClick={$onCloseClick} /> : null}
            <Children />
          </SFeaturePopover>
        </Animation>
      </Popper.Popper>,
    );
  }
}

const Spot = (props) => {
  const SSpot = Root;

  const { styles, visible } = props;

  if (!visible) return null;

  return sstyled(styles)(<SSpot render={Box} />);
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
