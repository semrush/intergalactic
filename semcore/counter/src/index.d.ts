import { CProps, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';

export interface ICounterProps extends IBoxProps {
  /** Counter theme or custom color */
  theme?: 'warning' | 'danger' | string;

  /** Counter size
   * @default m */
  size?: 'm' | 'l' | 'xl';
}

declare const Counter: <T>(props: CProps<ICounterProps & T>) => ReturnEl;

export interface IAnimatedNumberBaseProps {
  /** Animates number change, receives value between 0 and 1 and returns value in range from 0 to 1, e.g. for linear easing pass (t) => t */
  easing?: (t: number) => number;
  /** Stringify number, receives a fraction value */
  formatValue?: (value: number) => string;
  duration?: number;
  delay?: number;
  initValue?: number;
  value: number;
}

export const AnimatedNumber = <
  Tag extends keyof JSX.IntrinsicElements | React.ComponentClass | React.FC,
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  props: IAnimatedNumberBaseProps & {
    tag?: Tag;
  } & (Tag extends React.FC
      ? ReactFCProps<Tag>
      : Tag extends React.ComponentClass
      ? ReactComponentProps<Tag>
      : Tag extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[Tag]
      : {}),
) => React.ReactNode;

export default Counter;
