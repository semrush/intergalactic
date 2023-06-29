import React from 'react';
import createComponent, { Component, CREATE_COMPONENT, sstyled, Root } from '@semcore/core';
import PopperOrigin from '@semcore/popper';
import { Box } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';
import logger from '@semcore/utils/lib/logger';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

import style from './style/tooltip.shadow.css';
import { ScreenReaderOnly } from '@semcore/utils/lib/ScreenReaderOnly';

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
  state = { popperChildren: null };

  getTriggerProps() {
    const { uid, visible, interaction } = this.asProps;

    return {
      active: false,
      'aria-labelledby': visible ? `igc-${uid}-popper` : undefined,
      'aria-haspopup': interaction !== 'hover' ? 'true' : 'false',
    };
  }

  getPopperProps() {
    const { theme, uid, disablePortal, ignorePortalsStacking, interaction } = this.asProps;
    return {
      id: `igc-${uid}-popper`,
      theme,
      disablePortal,
      ignorePortalsStacking,
      interaction,
    };
  }

  render() {
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
  const { Children, styles, theme, interaction } = props;
  const STooltip = Root;
  const SArrow = Box;

  // for one render children
  let children = null;

  return sstyled(styles)(
    <>
      <STooltip
        render={Popper.Popper}
        role='tooltip'
        use:theme={resolveColor(theme)}
        aria-live={theme === 'warning' ? 'assertive' : 'polite'}
      >
        {/* rome-ignore lint/suspicious/noAssignInExpressions: */}
        {(children = <Children />)}
        <SArrow data-popper-arrow use:theme={resolveColor(theme)} />
      </STooltip>
      {interaction === 'hover' && <ScreenReaderOnly>{children}</ScreenReaderOnly>}
    </>,
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
