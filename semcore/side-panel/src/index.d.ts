import type { NSAnimation, NSBox, NSFlex, NSPortal } from '@semcore/base-components';
import type Button from '@semcore/button';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { Text } from '@semcore/typography';
import type React from 'react';

export type OnCloseTriggerType = 'onOutsideClick' | 'onEscape' | 'onCloseClick';
export type OnCloseType = (
  trigger: OnCloseTriggerType,
  e?: React.MouseEvent | React.KeyboardEvent,
) => void;

export type SidePanelPlacement = 'top' | 'left' | 'right' | 'bottom';

export type SidePanelProps = NSPortal.Props &
  NSBox.Props & {
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
    onClose?: OnCloseType;
    /**
     * Property for displaying the close button
     * @default true
     */
    closable?: boolean;
    /**
     * Position of a dropdown window
     * @default right
     */
    placement?: SidePanelPlacement;
    /**
     * Setting `true` disables mechanism that hides document body scrollbar when SidePanel is visible
     * @default false
     */
    disablePreventScroll?: boolean;
  };

export type SidePanelOverlayProps = NSAnimation.FadeInOut.Props & NSBox.Props & {};

export type SidePanelPanelProps = NSAnimation.Slide.Props &
  NSBox.Props & {
    /** Callback that is triggered when click outside is occured */
    onOutsideClick?: (e?: React.SyntheticEvent) => void;
  };

export type SidePanelContext = {
  getOverlayProps?: PropGetterFn;
  getPanelProps?: PropGetterFn;
  getCloseProps?: PropGetterFn;
};

export type SidePanelHeaderProps = NSBox.Props & {
  title?: React.ReactNode;
};

declare const SidePanel: Intergalactic.Component<'div', SidePanelProps, SidePanelContext> & {
  Header: Intergalactic.Component<'div', SidePanelHeaderProps>;
  Back: NSBox.Component;
  Body: NSBox.Component;
  Footer: NSFlex.Component;
  Title: typeof Text;
  Overlay: Intergalactic.Component<'div', SidePanelOverlayProps>;
  Panel: Intergalactic.Component<'div', SidePanelPanelProps>;
  Close: typeof Button;
};

export default SidePanel;
