import type { FadeInOutProps, BoxProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { SpinProps } from '@semcore/spin';

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

export type SpinOverlayProps = BoxProps & FadeInOutProps & {};

export type SpinContainerContext = {
  getOverlayProps: PropGetterFn;
};

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
