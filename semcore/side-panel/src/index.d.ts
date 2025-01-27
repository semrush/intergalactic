import React from 'react';
import type { PortalProps } from '@semcore/portal';
import type { FadeInOutProps, SlideProps } from '@semcore/animation';
import type { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import type { Box, BoxProps, Flex } from '@semcore/flex-box';
import type { Text } from '@semcore/typography';
import type Button from '@semcore/button';

export type OnCloseTriggerType = 'onOutsideClick' | 'onEscape' | 'onCloseClick';
export type OnCloseType = (
  trigger: OnCloseTriggerType,
  e?: React.MouseEvent | React.KeyboardEvent,
) => void;

export type SidePanelPlacement = 'top' | 'left' | 'right' | 'bottom';

/** @deprecated */
export interface ISidePanelProps extends SidePanelProps, UnknownProperties {}
export type SidePanelProps = PortalProps &
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

/** @deprecated */
export interface ISidePanelOverlayProps extends SidePanelOverlayProps, UnknownProperties {}
export type SidePanelOverlayProps = FadeInOutProps & BoxProps & {};

/** @deprecated */
export interface ISidePanelPanelProps extends SidePanelPanelProps, UnknownProperties {}
export type SidePanelPanelProps = SlideProps &
  BoxProps & {
    onOutsideClick?: (e?: React.SyntheticEvent) => void;
  };

/** @deprecated */
export interface ISidePanelContext extends SidePanelContext, UnknownProperties {}
export type SidePanelContext = {
  getOverlayProps?: PropGetterFn;
  getPanelProps?: PropGetterFn;
  getCloseProps?: PropGetterFn;
};

/** @deprecated */
export interface ISidePanelHeaderProps extends SidePanelHeaderProps, UnknownProperties {}
export type SidePanelHeaderProps = BoxProps & {
  title?: React.ReactNode;
};

declare const SidePanel: Intergalactic.Component<'div', SidePanelProps, SidePanelContext> & {
  Header: Intergalactic.Component<'div', SidePanelHeaderProps>;
  Back: typeof Box;
  Body: typeof Box;
  Footer: typeof Flex;
  Title: typeof Text;
  Overlay: Intergalactic.Component<'div', SidePanelOverlayProps>;
  Panel: Intergalactic.Component<'div', SidePanelPanelProps>;
  Close: typeof Button;
};

export default SidePanel;
