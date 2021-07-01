import { ReturnEl, CProps, PropGetterFn } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';
import { IRadioCtx, IRadioProps, IRadioValueProps } from '@semcore/radio/src';

export interface IProgressBarProps extends IBoxProps {
  /**
   * Progress bar theme
   * @default invert
   */
  theme?: 'dark' | 'invert' | string;
  /**
   * Progress bar size
   * @default m
   */
  size?: 's' | 'm' | 'l';
  /** Value as a percentage */
  value?: number;
  /** ДDuration of animation, ms
   * @default 1000
   */
  duration?: number;
  /** Sets an animated background
   * @deprecated v2.0.0 {@link IProgressBarProps.value}
   * */
  animation?: boolean;
}

export interface IValueProps extends IBoxProps {
  size?: 's' | 'm' | 'l';
  value?: number;
  duration?: number;
  theme?: string;
}

export interface IProgressBarCxt {
  getValueProps: PropGetterFn;
}

declare const ProgressBar: (<T>(
  props: CProps<IProgressBarProps & T, IProgressBarCxt>,
) => ReturnEl) & {
  Value: <T>(props: IValueProps & T) => ReturnEl;
};

export default ProgressBar;
