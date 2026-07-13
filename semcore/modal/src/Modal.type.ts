import type { FadeInOutProps, SlideProps, Box, BoxProps, PortalProps } from '@semcore/base-components';
import type { NSButton } from '@semcore/button';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { NSText } from '@semcore/typography';
import type React from 'react';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSModal {
    type Props = PortalProps &
      BoxProps &
      FadeInOutProps & {
        /** Duration of animation, ms
         * @default 200
         */
        duration?: number;
        /** This property is responsible for the visibility of the modal window */
        visible?: boolean;
        /** Function called when the component is hidden */
        onClose?: (
          trigger: 'onOutsideClick' | 'onCloseClick' | 'onEscape',
          e?: React.MouseEvent | React.KeyboardEvent,
        ) => void;
        /** Displaying the close button(x) in the upper-right corner of the modal dialog
         * @default true
         * */
        closable?: boolean;
        /**
         * Setting `true` disables mechanism that hides document body scrollbar when Modal is visible
         * @default false
         */
        disablePreventScroll?: boolean;
        /** Specifies the locale for i18n support */
        locale?: string;
        /**
         * Props for render modal without background and paddings. Useful in carousel for example
         */
        ghost?: boolean;
        /** Force advanced mode */
        /** @deprecated */
        forcedAdvancedMode?: boolean;
      };
    type DefaultProps = {
      closable: true;
      i18n: LocalizedMessages;
      locale: 'en';
      disablePreventScroll: false;
    };
    type Ctx = {
      getOverlayProps: PropGetterFn;
      getWindowProps: PropGetterFn;
      getCloseProps: PropGetterFn;
    };
    type State = {
      hasTitle: boolean;
    };

    namespace Window {
        type Props = BoxProps & SlideProps;

        type Component = Intergalactic.Component<'div', Props>;
    }

    namespace Overlay {
        type Component = typeof Box;
    }

    namespace Close {
        type Component = NSButton.Component;
    }

    namespace Title {
        type Props = NSText.Props;

        type Component = Intergalactic.Component<'div', Props>;
    }

    type Component = Intergalactic.Component<'div', Props, Ctx> & {
      Window: Window.Component;
      Overlay: Overlay.Component;
      Close: Close.Component;
      Title: Title.Component;
    };
}

/** @deprecated It will be removed in v18. */
export type ModalProps = NSModal.Props;
/** @deprecated It will be removed in v18. */
export type WindowProps = NSModal.Window.Props;
/** @deprecated It will be removed in v18. */
export type ModalContext = NSModal.Ctx;

export type { NSModal };
