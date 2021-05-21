import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface IVennProps extends IContext {}

export interface ICircleProps extends IContext {
  /** Color circle
   @default #3AB011
   **/
  color?: string;
}

export interface IIntersectionProps extends IContext {}

declare const Venn: (<T>(props: CProps<IVennProps & T>) => ReturnEl) & {
  Circle: <T>(props: CProps<ICircleProps & T>) => ReturnEl;
  Intersection: <T>(props: CProps<IIntersectionProps & T>) => ReturnEl;
};

export default Venn;
