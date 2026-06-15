import type { FadeInOutProps, SlideProps, Box, BoxProps, Flex, PortalProps } from '@semcore/base-components';
import type Button from '@semcore/button';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { Text } from '@semcore/typography';
import type React from 'react';

declare namespace NSSidePanel {
  type Props = PortalProps &
    BoxProps & {
      /** Animation display duration in ms
       * @default 350
       */
      duration?: number;
      /**
       * The property responsible for the visibility of the component
       */
      visible?: boolean;
      /**
       * Callback for the component closure
       */
      onClose?: (trigger: 'onOutsideClick' | 'onEscape' | 'onCloseClick', e?: React.MouseEvent | React.KeyboardEvent) => void;
      /**
       * Property for displaying the close button
       * @default true
       */
      closable?: boolean;
      /**
       * Position of a dropdown window
       * @default right
       */
      placement?: NSSidePanel.Placement;
      /**
       * Setting `true` disables mechanism that hides document body scrollbar when SidePanel is visible
       * @default false
       */
      disablePreventScroll?: boolean;
    };
  type DefaultProps = {
    placement: 'right';
    closable: true;
    disablePreventScroll: false;
  };
  type Ctx = {
    getOverlayProps?: PropGetterFn;
    getPanelProps?: PropGetterFn;
    getCloseProps?: PropGetterFn;
  };
  type Placement = 'top' | 'left' | 'right' | 'bottom';

  namespace Header {
    type Props = BoxProps & {
      title?: React.ReactNode;
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Back {
    type Component = typeof Box;
  }

  namespace Body {
    type Component = typeof Box;
  }

  namespace Footer {
    type Component = typeof Flex;
  }

  namespace Title {
    type Component = typeof Text;
  }

  namespace Overlay {
    type Props = FadeInOutProps & BoxProps;

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Panel {
    type Props = SlideProps &
      BoxProps & {
        /** Callback that is triggered when click outside is occured */
        onOutsideClick?: (e?: React.SyntheticEvent) => void;
      };

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Close {
    type Component = typeof Button;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    Header: Header.Component;
    Back: Back.Component;
    Body: Body.Component;
    Footer: Footer.Component;
    Title: Title.Component;
    Overlay: Overlay.Component;
    Panel: Panel.Component;
    Close: Close.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type SidePanelProps = NSSidePanel.Props;
/** @deprecated It will be removed in v18. */
export type SidePanelContext = NSSidePanel.Ctx;
/** @deprecated It will be removed in v18. */
export type SidePanelHeaderProps = NSSidePanel.Header.Props;
/** @deprecated It will be removed in v18. */
export type SidePanelOverlayProps = NSSidePanel.Overlay.Props;
/** @deprecated It will be removed in v18. */
export type SidePanelPanelProps = NSSidePanel.Panel.Props;
/** @deprecated It will be removed in v18. */
export type SidePanelPlacement = NSSidePanel.Placement;
/** @deprecated It will be removed in v18. */
export type OnCloseTriggerType = 'onOutsideClick' | 'onEscape' | 'onCloseClick';
/** @deprecated It will be removed in v18. */
export type OnCloseType = (
  trigger: OnCloseTriggerType,
  e?: React.MouseEvent | React.KeyboardEvent,
) => void;

export type { NSSidePanel };
