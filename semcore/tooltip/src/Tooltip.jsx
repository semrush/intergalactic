import React from 'react';
import { createComponent, Component, CREATE_COMPONENT, sstyled, Root } from '@semcore/core';
import PopperOrigin from '@semcore/popper';
import { Box } from '@semcore/flex-box';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import logger from '@semcore/core/lib/utils/logger';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import Portal from '@semcore/portal';

import style from './style/tooltip.shadow.css';
import {
  useZIndexStacking,
  ZIndexStackingContextProvider,
} from '@semcore/core/lib/utils/zIndexStacking';

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
      <Tooltip.Trigger {...props}>
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
      'aria-haspopup': undefined,
      'aria-describedby': popperId,
      popperId,
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
      timeout,
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
      timeout,
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
    Children,
    styles,
    theme,
    resolveColor,
    disablePortal,
    ignorePortalsStacking,
    'aria-live': ariaLive,
    arrowBgColor,
    arrowShadowColor,
    visible,
    timeout,
  } = props;
  const STooltip = Root;
  const SArrow = Box;
  const STooltipPortalledWrapper = Box;
  const timeoutConfig = typeof timeout === 'number' ? [timeout, timeout] : timeout;

  const [isVisible, setIsVisible] = React.useState(false);

  const contextZIndex = useZIndexStacking('z-index-tooltip');
  const zIndex = props.zIndex || contextZIndex;

  // We need this effect with timer to prevent creating all STooltipPortalledWrapper on each tooltip initialization.
  // On the same time, we need to have a container with role=status to announce tooltip popper content on the fly by screen readers.
  React.useEffect(() => {
    let timer;

    if (visible) {
      timer = setTimeout(() => {
        setIsVisible(true);
      }, timeoutConfig[0] + 50);
    } else {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, timeoutConfig[1] + 50);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [visible]);

  if (!visible && !isVisible) {
    return null;
  }

  return sstyled(styles)(
    <ZIndexStackingContextProvider designToken='z-index-tooltip'>
      <Portal disablePortal={disablePortal} ignorePortalsStacking={ignorePortalsStacking}>
        <STooltipPortalledWrapper
          role={ariaLive === 'polite' ? 'status' : undefined}
          aria-live={ariaLive}
          zIndex={zIndex}
        >
          <STooltip
            use:visible={visible && isVisible}
            render={Popper.Popper}
            use:disablePortal
            use:theme={resolveColor(theme)}
            use:aria-live={undefined}
            use:zIndex={undefined}
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
      </Portal>
    </ZIndexStackingContextProvider>,
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
      <DescriptionTooltip.Trigger {...props}>
        <Children />
      </DescriptionTooltip.Trigger>
      <DescriptionTooltip.Popper>{title}</DescriptionTooltip.Popper>
    </>
  );

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
      'aria-controls': visible ? `igc-${this.asProps.uid}-popper` : undefined,
      onKeyDown: this.handleTriggerKeyDown,
      role: 'button',
    };
  }

  getPopperProps() {
    const props = super.getPopperProps();
    return {
      ...props,
      ref: this.popperRef,
      role: 'dialog',
      tabIndex: 0,
      autoFocus: 'enforced',
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
