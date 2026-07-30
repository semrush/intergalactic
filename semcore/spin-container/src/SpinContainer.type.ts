import type { FadeInOutProps, BoxProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { NSSpin } from '@semcore/spin';

declare namespace NSSpinContainer {
  type Props = BoxProps &
    NSSpin.Props & {
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
  type DefaultProps = {
    size: 'xxl';
    theme: 'dark';
    duration: 200;
  };
  type Ctx = {
    getOverlayProps: PropGetterFn;
  };

  namespace Content {
    type Props = BoxProps & FadeInOutProps;

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Overlay {
    type Props = BoxProps & {
      /**
       * Css background; you can use your own color
       */
      background?: string;
    };
    type DefaultProps = {
      children: React.JSX.Element;
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    Content: Content.Component;
    Overlay: Overlay.Component;
  };
}

/** @deprecated It will be removed in v19. */
export type SpinContainerProps = NSSpinContainer.Props;
/** @deprecated It will be removed in v19. */
export type SpinContainerContext = NSSpinContainer.Ctx;
/** @deprecated It will be removed in v19. */
export type SpinOverlayProps = NSSpinContainer.Content.Props;
/** @deprecated It will be removed in v19. */
export type SpinContainerOverlayProps = NSSpinContainer.Overlay.Props;

export type { NSSpinContainer };
