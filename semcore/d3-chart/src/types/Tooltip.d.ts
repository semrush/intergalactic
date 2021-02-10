import { IPopperProps, IPopperTriggerProps } from '@semcore/popper';
import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import Popper from '@semcore/popper/lib/types/Popper';
import { IBoxProps } from '@semcore/flex-box';
import IContext from './context';

export interface ITooltipProps extends IPopperProps, IPopperTriggerProps {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
}

export interface ITooltipContext extends IContext {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
  /** Index active value for Axis x */
  xIndex: number | null;
  /** Index active value for Axis y */
  yIndex: number | null;
}

declare const Tooltip: (<T>(props: CProps<ITooltipProps & T, ITooltipContext>) => ReturnEl) & {
  Trigger: <T>(props: CProps<ComponentProps<typeof Popper.Trigger> & T, IContext>) => ReturnEl;
  Popper: <T>(props: CProps<ComponentProps<typeof Popper.Popper> & T, IContext>) => ReturnEl;
  Title: <T>(props: CProps<IBoxProps & T, IContext>) => ReturnEl;
  Dot: <T>(props: CProps<IBoxProps & { color?: string } & T, IContext>) => ReturnEl;
  Footer: <T>(props: CProps<T, IContext>) => null;
};

export default Tooltip;
