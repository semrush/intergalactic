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
      {/* biome-ignore lint/a11y/useValidAriaValues: */}
      <Tooltip.Trigger {...props} aria-haspopup={undefined}>
        <Children />
      </Tooltip.Trigger>
      <Tooltip.Popper>{title}</Tooltip.Popper>
    </>
  );

  uncontrolledProps() {
    return {
      visible: [
        null,
        (visible) => {
          this.handlePopperVisibleChange?.(visible);
        },
      ],
    };
  }

  getTriggerProps() {
    const { uid, visible } = this.asProps;
    const popperId = visible ? `igc-${uid}-popper` : undefined;

    return {
      'aria-describedby': popperId,
      popperId,
      role: undefined,
    };
  }

  getPopperProps() {
    const {
      theme,
      uid,
      liveRegion,
      disablePortal,
      ignorePortalsStacking,
      interaction,
      resolveColor,
      visible,
    } = this.asProps;

    let ariaLive = theme === 'warning' ? 'assertive' : 'polite';
    if (!liveRegion) {
      ariaLive = undefined;
    }

    return {
      id: `igc-${uid}-popper`,
      theme,
      disablePortal,
      ignorePortalsStacking,
      interaction,
      resolveColor,
      role: 'tooltip',
      'aria-live': ariaLive,
      visible,
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
      <Root render={Popper}>
        {advancedMode ? <Children /> : this.defaultChildren(title, Children, other)}
      </Root>
    );
  }
}

function TooltipTrigger(props) {
  const { Children, styles } = props;
  const STrigger = Root;

  return sstyled(styles)(
    <STrigger render={Popper.Trigger}>
      <Children />
    </STrigger>,
  );
}

function TooltipPopper(props) {
  const {
    visible,
    Children,
    styles,
    theme,
    resolveColor,
    disablePortal,
    ignorePortalsStacking,
    'aria-live': ariaLive,
    zIndex,
    role,
    arrowBgColor,
    arrowShadowColor,
  } = props;
  const STooltip = Root;
  const SArrow = Box;
  const STooltipPortalledWrapper = Box;

  const popperRef = React.useRef(null);

  React.useEffect(() => {
    if (role === 'dialog' && visible && process.env.NODE_ENV !== 'production') {
      const hasTitle = (node) => {
        if (node.hasAttribute('aria-label')) return true;
        if (node.hasAttribute('aria-labelledby')) return true;
        if (node.hasAttribute('title')) return true;

        return false;
      };

      logger.warn(
        popperRef.current && !hasTitle(popperRef.current),
        `'title' or 'aria-label' or 'aria-labelledby' are required props`,
        props['data-ui-name'] || DescriptionTooltipRoot.Popper.displayName,
      );
    }
  }, [visible, role]);

  return sstyled(styles)(
    <Portal disablePortal={disablePortal} ignorePortalsStacking={ignorePortalsStacking}>
      <STooltipPortalledWrapper aria-live={ariaLive} zIndex={zIndex}>
        <STooltip
          render={Popper.Popper}
          use:disablePortal
          use:theme={resolveColor(theme)}
          use:aria-live={undefined}
          ref={popperRef}
        >
          <Children />
          <SArrow
            data-popper-arrow
            use:theme={resolveColor(theme)}
            bgColor={resolveColor(arrowBgColor)}
            shadowColor={resolveColor(arrowShadowColor ?? arrowBgColor)}
          />
        </STooltip>
      </STooltipPortalledWrapper>
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
      {/* biome-ignore lint/a11y/useValidAriaValues: */}
      <Hint.Trigger {...props} aria-haspopup={undefined}>
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
      <DescriptionTooltip.Trigger {...props} aria-haspopup='dialog'>
        <Children />
      </DescriptionTooltip.Trigger>
      <DescriptionTooltip.Popper>{title}</DescriptionTooltip.Popper>
    </>
  );
  handlePopperVisibleChange = (visible) => {
    if (visible) {
      setTimeout(() => {
        this.popperRef.current.focus();
      }, 0);
    }
  };
  handleTriggerKeyDown = (event) => {
    if (this.asProps.interaction !== 'click') return;
    if (event.key === ' ' && ['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;
    if (event.key === 'Enter' && event.target.tagName === 'TEXTAREA') return;

    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      this.handlers.visible(true);
    }
  };

  getTriggerProps() {
    const { disabled, visible } = this.asProps;
    const props = super.getTriggerProps();
    return {
      ...props,
      'aria-haspopup': !(disabled || props.disabled) ? 'dialog' : 'false',
      'aria-expanded': visible,
      'aria-describedby': undefined,
      onKeyDown: this.handleTriggerKeyDown,
    };
  }

  getPopperProps() {
    const props = super.getPopperProps();
    return {
      ...props,
      ref: this.popperRef,
      role: 'dialog',
      tabIndex: 0,
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
