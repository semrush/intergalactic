import React, { ComponentProps, HTMLAttributes } from 'react';
import createComponent, { Component, CREATE_COMPONENT, Merge, styled } from '@semcore/core';
import PopperOrigin, { IPopperContext, IPopperProps, IPopperTriggerProps } from '@semcore/popper';
import { Box } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';
import findComponent from '@semcore/utils/lib/findComponent';
import logger from '@semcore/utils/lib/logger';

import style from './style/tooltip.shadow.css';

const Popper = PopperOrigin[CREATE_COMPONENT]();

function isCustomTheme(theme) {
  return !['default', 'invert', 'warning'].includes(theme);
}

export interface ITooltipProps extends IPopperProps, IPopperTriggerProps {
  /**
   * Text in tooltip
   */
  title?: React.ReactNode;
  /**
   * Tooltip theme, there are several defaulted themes or you can use your own color
   * @default default
   */
  theme?: 'default' | 'warning' | 'invert' | string;
}

export interface ITooltipContext extends IPopperContext {}

class RootTooltip extends Component<ITooltipProps> {
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
    const { Root } = this;
    const {
      Children,
      title,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      offset,
      ...other
    } = this.asProps;

    const advanceMode = !!findComponent(Children, [
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
  const { Root: STooltip, Children, styles, theme } = props;
  const SArrow = Box;

  const color = resolveColor(theme);
  const useTheme = isCustomTheme(theme) ? 'custom' : theme;

  return styled(styles)`
    STooltip[theme='custom'] {
      background-color: ${color};
      border: 1px solid ${color};
    }
    SArrow[theme='custom'] {
      border-color: ${color};
      &:before {
        border-color: ${color};
      }
    }
  `(
    <STooltip render={Popper.Popper} theme={useTheme} role="tooltip">
      <Children />
      <SArrow data-popper-arrow theme={useTheme} />
    </STooltip>,
  );
}

const TooltipBase = createComponent<
  Merge<ITooltipProps, HTMLAttributes<HTMLSpanElement>>,
  {
    Trigger: ComponentProps<typeof Popper.Trigger>;
    Popper: ComponentProps<typeof Popper.Popper>;
  },
  Merge<ITooltipContext, ITooltipProps>
>(
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
// @ts-ignore
Tooltip.displayName = TooltipBase.displayName;
// @ts-ignore
Tooltip.Trigger = TooltipBase.Trigger;
// @ts-ignore
Tooltip.Popper = TooltipBase.Popper;

export { Tooltip };
