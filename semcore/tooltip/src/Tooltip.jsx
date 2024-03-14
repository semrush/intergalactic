import React from 'react';
import createComponent, { Component, CREATE_COMPONENT, sstyled, Root } from '@semcore/core';
import PopperOrigin from '@semcore/popper';
import { Box } from '@semcore/flex-box';
import resolveColorEnhance from '@semcore/utils/lib/enhances/resolveColorEnhance';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';
import logger from '@semcore/utils/lib/logger';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import Portal from '@semcore/portal';

import style from './style/tooltip.shadow.css';

const Popper = PopperOrigin[CREATE_COMPONENT]();

const defaultProps = {
  theme: 'default',
  placement: 'top',
  interaction: 'hover',
  timeout: [100, 50],
  offset: [0, 10],
  flip: {
    flipVariations: true,
    flipVariationsByContent: true,
  },
  defaultVisible: false,
  focusLoop: false,
  liveRegion: true,
};

class TooltipRoot extends Component {
  static displayName = 'Tooltip';
  static style = style;
  static enhance = [uniqueIDEnhancement(), resolveColorEnhance()];
  static defaultProps = { ...defaultProps };
  state = { popperChildren: null };
  subcomponents = [Tooltip.Trigger.displayName, Tooltip.Popper.displayName];
  defaultChildren = (title, Children, props) => (
    <>
      <Tooltip.Trigger {...props}>
        <Children />
      </Tooltip.Trigger>
      <Tooltip.Popper>{title}</Tooltip.Popper>
    </>
  );

  uncontrolledProps() {
    return {
      visible: null,
    };
  }

  getTriggerProps() {
    const { uid, visible, theme, liveRegion } = this.asProps;

    const popperId = visible ? `igc-${uid}-popper` : undefined;
    let ariaLive = theme === 'warning' ? 'assertive' : 'polite';
    if (!liveRegion) {
      ariaLive = undefined;
    }

    return {
      'aria-describedby': popperId,
      popperId,
      'aria-live': ariaLive,
    };
  }

  getPopperProps() {
    const { theme, uid, disablePortal, ignorePortalsStacking, interaction, resolveColor } =
      this.asProps;
    return {
      id: `igc-${uid}-popper`,
      theme,
      disablePortal,
      ignorePortalsStacking,
      interaction,
      resolveColor,
      role: 'tooltip',
    };
  }

  render() {
    const { Children, title, offset, forcedAdvancedMode, ...other } = this.asProps;

    const advancedMode = forcedAdvancedMode || isAdvanceMode(Children, this.subcomponents);

    logger.warn(
      title && advancedMode,
      "You can't use 'title' and '<Tooltip.Trigger/>/<Tooltip.Popper/>' at the same time",
      other['data-ui-name'] || Tooltip.displayName,
    );

    return (
      <Root render={Popper} onVisibleChange={this.handlePopperVisibleChange}>
        {advancedMode ? <Children /> : this.defaultChildren(title, Children, other)}
      </Root>
    );
  }
}

function TooltipTrigger(props) {
  const { Children, styles } = props;
  const STrigger = Root;

  return sstyled(styles)(
    <STrigger render={Popper.Trigger} role={undefined}>
      <Children />
    </STrigger>,
  );
}

function TooltipPopper(props) {
  const {
    Children,
    styles,
    theme,
    resolveColor,
    disablePortal,
    ignorePortalsStacking,
    'aria-live': ariaLive,
  } = props;
  const STooltip = Root;
  const SArrow = Box;

  return sstyled(styles)(
    <Portal disablePortal={disablePortal} ignorePortalsStacking={ignorePortalsStacking}>
      <div aria-live={ariaLive}>
        <STooltip
          render={Popper.Popper}
          use:disablePortal
          use:theme={resolveColor(theme)}
          use:aria-live={undefined}
        >
          <Children />
          <SArrow data-popper-arrow use:theme={resolveColor(theme)} />
        </STooltip>
      </div>
    </Portal>,
  );
}

class HintRoot extends TooltipRoot {
  static displayName = 'Hint';
  static style = style;
  static enhance = [uniqueIDEnhancement(), resolveColorEnhance()];
  static defaultProps = {
    ...defaultProps,
    liveRegion: false,
  };
  subcomponents = [Hint.Trigger.displayName, Hint.Popper.displayName];
  defaultChildren = (title, Children, props) => (
    <>
      <Hint.Trigger {...props}>
        <Children />
      </Hint.Trigger>
      <Hint.Popper>{title}</Hint.Popper>
    </>
  );

  getTriggerProps() {
    const props = super.getTriggerProps();
    return {
      ...props,
      'aria-describedby': undefined,
      'aria-label': this.asProps.title,
    };
  }

  getPopperProps() {
    const props = super.getPopperProps();
    return {
      ...props,
      'aria-hidden': true,
      role: undefined,
      children: this.asProps.title,
    };
  }
}

class DescriptionTooltipRoot extends TooltipRoot {
  static displayName = 'DescriptionTooltip';
  static style = style;
  static enhance = [uniqueIDEnhancement(), resolveColorEnhance()];
  static defaultProps = {
    ...defaultProps,
    liveRegion: false,
    interaction: 'click',
  };
  popperRef = React.createRef();
  subcomponents = [DescriptionTooltip.Trigger.displayName, DescriptionTooltip.Popper.displayName];
  defaultChildren = (title, Children, props) => (
    <>
      <Hint.Trigger {...props}>
        <Children />
      </Hint.Trigger>
      <Hint.Popper>{title}</Hint.Popper>
    </>
  );
  handlePopperVisibleChange = (visible) => {
    if (visible) {
      setTimeout(() => {
        this.popperRef.current.focus();
      }, 0);
    }
  };

  getTriggerProps() {
    const props = super.getTriggerProps();
    return {
      ...props,
      'aria-haspopup': !(this.asProps.disabled || props.disabled),
      'aria-expanded': this.asProps.visible,
      'aria-describedby': undefined,
      onKeyDownCapture: this.handleTriggerKeyDown,
    };
  }

  getPopperProps() {
    const props = super.getPopperProps();
    return {
      ...props,
      ref: this.popperRef,
    };
  }
}

export const Hint = createComponent(
  HintRoot,
  {
    Trigger: TooltipTrigger,
    Popper: TooltipPopper,
  },
  {
    parent: Popper,
  },
);

export const Tooltip = createComponent(
  TooltipRoot,
  {
    Trigger: TooltipTrigger,
    Popper: TooltipPopper,
  },
  {
    parent: Popper,
  },
);

export const DescriptionTooltip = createComponent(
  DescriptionTooltipRoot,
  {
    Trigger: TooltipTrigger,
    Popper: TooltipPopper,
  },
  {
    parent: Popper,
  },
);

export default Tooltip;
