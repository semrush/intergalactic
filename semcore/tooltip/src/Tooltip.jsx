import React from 'react';
import createComponent, { Component, CREATE_COMPONENT, sstyled, Root } from '@semcore/core';
import PopperOrigin from '@semcore/popper';
import { Box } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';
import logger from '@semcore/utils/lib/logger';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

import style from './style/tooltip.shadow.css';

const Popper = PopperOrigin[CREATE_COMPONENT]();

class TooltipRoot extends Component {
  static displayName = 'Tooltip';
  static style = style;
  static enhance = [uniqueIDEnhancement()];
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
    const { uid, visible } = this.asProps;

    return {
      active: false,
      'aria-labelledby': visible ? `igc-${uid}-popper` : undefined,
    };
  }

  getPopperProps() {
    const { theme, uid } = this.asProps;
    return {
      id: `igc-${uid}-popper`,
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

function TooltipTrigger(props) {
  const { Children, styles } = props;
  const STrigger = Root;

  return sstyled(styles)(
    <STrigger render={Popper.Trigger} active={false} role={undefined}>
      <Children />
    </STrigger>,
  );
}

function TooltipPopper(props) {
  const { Children, styles, theme } = props;
  const STooltip = Root;
  const SArrow = Box;

  return sstyled(styles)(
    <STooltip
      render={Popper.Popper}
      role="tooltip"
      use:theme={resolveColor(theme)}
      aria-live={theme === 'warning' ? 'assertive' : 'polite'}
    >
      <Children />
      <SArrow data-popper-arrow use:theme={resolveColor(theme)} />
    </STooltip>,
  );
}

const Tooltip = createComponent(
  TooltipRoot,
  {
    Trigger: TooltipTrigger,
    Popper: TooltipPopper,
  },
  {
    parent: Popper,
  },
);

export default Tooltip;
