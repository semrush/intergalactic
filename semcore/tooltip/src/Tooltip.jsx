import React from 'react';
import createComponent, { Component, CREATE_COMPONENT, sstyled, Root } from '@semcore/core';
import PopperOrigin from '@semcore/popper';
import { Box } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';
import logger from '@semcore/utils/lib/logger';

import style from './style/tooltip.shadow.css';

const Popper = PopperOrigin[CREATE_COMPONENT]();

function use(props) {
  return Object.keys(props).reduce((acc, key) => {
    acc[`use:${key}`] = props[key];
    return acc;
  }, {});
}

class RootTooltip extends Component {
  static displayName = 'Tooltip';
  static style = style;
  static defaultProps = {
    theme: 'default',
    placement: 'top',
    interaction: 'hover',
    timeout: [100, 50],
    offset: [0, 10],
    flip: {
      flipVariations: true,
      flipVariationsByContent: true,
    },
  };

  getTriggerProps() {
    return {
      active: false,
    };
  }

  getPopperProps() {
    const { theme } = this.asProps;
    return {
      theme,
    };
  }

  render() {
    const { Children, title, offset, ...other } = this.asProps;

    const advanceMode = isAdvanceMode(Children, [
      TooltipBase.Trigger.displayName,
      TooltipBase.Popper.displayName,
    ]);

    logger.warn(
      title && advanceMode,
      "You can't use 'title' and '<Tooltip.Trigger/>/<Tooltip.Popper/>' at the same time",
      other['data-ui-name'] || TooltipBase.displayName,
    );

    return (
      <Root render={Popper}>
        {advanceMode ? (
          <Children />
        ) : (
          <>
            <TooltipBase.Trigger {...other}>
              <Children />
            </TooltipBase.Trigger>
            <TooltipBase.Popper>{title}</TooltipBase.Popper>
          </>
        )}
      </Root>
    );
  }
}

function TooltipPopper(props) {
  const { Children, styles, theme } = props;
  const STooltip = Root;
  const SArrow = Box;

  return sstyled(styles)(
    <STooltip render={Popper.Popper} role="tooltip" use:theme={resolveColor(theme)}>
      <Children />
      <SArrow data-popper-arrow use:theme={resolveColor(theme)} />
    </STooltip>,
  );
}

const TooltipBase = createComponent(
  RootTooltip,
  {
    Trigger: Popper.Trigger,
    Popper: TooltipPopper,
  },
  {
    parent: Popper,
  },
);

export default TooltipBase;

const Tooltip = React.forwardRef(function (props, ref) {
  logger.warn(
    true,
    "The named import 'import { Tooltip }' is deprecated, use the default 'import Tooltip'",
    props['data-ui-name'] || Tooltip.displayName,
  );
  return <TooltipBase ref={ref} interaction="click" {...props} />;
});
Tooltip.displayName = TooltipBase.displayName;
Tooltip.Trigger = TooltipBase.Trigger;
Tooltip.Popper = TooltipBase.Popper;

export { Tooltip };
