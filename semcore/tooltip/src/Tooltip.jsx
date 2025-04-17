import React from 'react';
import { createComponent, Component, CREATE_COMPONENT, sstyled, Root } from '@semcore/core';
import PopperOrigin from '@semcore/popper';
import { Box } from '@semcore/flex-box';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import logger from '@semcore/core/lib/utils/logger';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { PortalContext } from '@semcore/base-components';
import style from './style/tooltip.shadow.css';
import {
  useZIndexStacking,
  ZIndexStackingContextProvider,
} from '@semcore/core/lib/utils/zIndexStacking';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';

const Popper = PopperOrigin[CREATE_COMPONENT]();
const tooltipContainer = new WeakMap();

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
  static contextType = PortalContext;
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
  tooltipContainerContainer = null;

  constructor(props, context) {
    super(props, context);

    if (canUseDOM()) {
      this.tooltipContainerContainer = new Promise((resolve) => {
        setTimeout(() => {
          const key = this.context.current ?? document.body;
          let element = tooltipContainer.get(key) ?? null;

          if (
            element === null ||
            (element instanceof HTMLElement && !document.body.contains(element))
          ) {
            element = document.createElement('div');
            element.setAttribute('role', 'status');
            element.setAttribute('aria-live', 'polite');

            tooltipContainer.set(key, element);

            key.appendChild(element);
          }

          resolve(element);
        }, 0);
      });
    }
  }

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
      tooltipContainer: this.tooltipContainerContainer,
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
    'aria-live': ariaLive,
    arrowBgColor,
    arrowShadowColor,
    tooltipContainer,
  } = props;
  const STooltip = Root;
  const SArrow = Box;

  const contextZIndex = useZIndexStacking('z-index-tooltip');
  const zIndex = props.zIndex || contextZIndex;

  const [tooltipContainerNode, setTooltipContainerNode] = React.useState(tooltipContainer);

  React.useEffect(() => {
    if (ariaLive === 'polite' && tooltipContainer instanceof Promise) {
      tooltipContainer.then((result) => {
        setTooltipContainerNode(result);
      });
    }
  }, [tooltipContainer]);

  return sstyled(styles)(
    <ZIndexStackingContextProvider designToken='z-index-tooltip'>
      <STooltip
        render={Popper.Popper}
        use:theme={resolveColor(theme)}
        use:zIndex={zIndex}
        nodeToMount={ariaLive === 'polite' && tooltipContainerNode instanceof Element ? tooltipContainerNode : undefined}
      >
        <Children />
        <SArrow
          data-popper-arrow
          use:theme={resolveColor(theme)}
          bgColor={resolveColor(arrowBgColor)}
          shadowColor={resolveColor(arrowShadowColor ?? arrowBgColor)}
        />
      </STooltip>
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
