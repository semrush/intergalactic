import React from 'react';
import createComponent, { Component, CREATE_COMPONENT, sstyled, Root } from '@semcore/core';
import PopperOrigin from '@semcore/popper';
import { Box } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';
import logger from '@semcore/utils/lib/logger';

import style from './style/tooltip.shadow.css';

const Popper = PopperOrigin[CREATE_COMPONENT]();

class TooltipRoot extends Component {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { Children, title, offset, ...other } = this.asProps;

    const advanceMode = isAdvanceMode(Children, [
      Tooltip.Trigger.displayName,
      Tooltip.Popper.displayName,
    ]);

    logger.warn(
      title && advanceMode,
      "You can't use 'title' and '<Tooltip.Trigger/>/<Tooltip.Popper/>' at the same time",
      other['data-ui-name'] || Tooltip.displayName,
    );

    return (
      <Root render={Popper}>
        {advanceMode ? (
          <Children />
        ) : (
          <>
            <Tooltip.Trigger {...other}>
              <Children />
            </Tooltip.Trigger>
            <Tooltip.Popper>{title}</Tooltip.Popper>
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

const Tooltip = createComponent(
  TooltipRoot,
  {
    Trigger: Popper.Trigger,
    Popper: TooltipPopper,
  },
  {
    parent: Popper,
  },
);

export default Tooltip;
