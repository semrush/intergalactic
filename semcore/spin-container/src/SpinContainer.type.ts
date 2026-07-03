import type { NSAnimation, NSBox } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { NSSpin } from '@semcore/spin';

declare namespace NSSpinContainer {
  type Props = NSBox.Props &
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
    type Props = NSBox.Props & NSAnimation.FadeInOut.Props;

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Overlay {
    type Props = NSBox.Props & {
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

/** @deprecated It will be removed in v18. */
export type SpinContainerProps = NSSpinContainer.Props;
/** @deprecated It will be removed in v18. */
export type SpinContainerContext = NSSpinContainer.Ctx;
/** @deprecated It will be removed in v18. */
export type SpinOverlayProps = NSSpinContainer.Content.Props;
/** @deprecated It will be removed in v18. */
export type SpinContainerOverlayProps = NSSpinContainer.Overlay.Props;

export type { NSSpinContainer };
