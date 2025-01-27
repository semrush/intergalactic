import type { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import type { SpinProps } from '@semcore/spin';
import type { BoxProps } from '@semcore/flex-box';
import type { FadeInOutProps } from '@semcore/animation';

/** @deprecated */
export interface ISpinContainerProps extends SpinContainerProps, UnknownProperties {}
export type SpinContainerProps = BoxProps &
  SpinProps & {
    /**
     * Color of container spinner; you can use your own color
     */
    background?: string;
    /** Duration of animation displaying in ms
     * @default 200
     */
    duration?: number;
    /**
     * Property responsible for displaying the spinner
     * */
    loading?: boolean;
  };

/** @deprecated */
export interface ISpinOverlayProps extends SpinOverlayProps, UnknownProperties {}
export type SpinOverlayProps = BoxProps & FadeInOutProps & {};

/** @deprecated */
export interface ISpinContainerContext extends SpinContainerContext, UnknownProperties {}
export type SpinContainerContext = {
  getOverlayProps: PropGetterFn;
};

/** @deprecated */
export interface ISpinContainerOverlayProps extends SpinContainerOverlayProps, UnknownProperties {}
export type SpinContainerOverlayProps = BoxProps & {
  /**
   * Css background; you can use your own color
   */
  background?: string;
};

declare const SpinContainer: Intergalactic.Component<
  'div',
  SpinContainerProps,
  SpinContainerContext
> & {
  Content: Intergalactic.Component<'div', SpinOverlayProps>;
  Overlay: Intergalactic.Component<'div', SpinContainerOverlayProps>;
};

export default SpinContainer;
