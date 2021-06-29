import { ComponentProps } from 'react';
import { ReturnEl, CProps, PropGetterFn } from '@semcore/core';
import { IModalProps, IModalContext } from '@semcore/modal';
import { Box, IBoxProps } from '@semcore/flex-box';
import { IIconProps } from '@semcore/icon';
import { ITextProps, Text } from '@semcore/typography';

export interface IFullscreenModalProps extends IModalProps {
  /** This property is responsible for the visibility of the modal window */
  hidden?: boolean;
  /** Function that is invoked when hiding a component */
  onClose?: (
    trigger: 'onBackClick' | 'onCloseClick' | 'onEscape' | 'onOutsideClick',
    e?: React.MouseEvent | React.KeyboardEvent,
  ) => void;
}

export interface IFullscreenModalHeaderProps extends IBoxProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export interface IFullscreenModalContext {
  getBackProps: PropGetterFn;
  getCloseProps: PropGetterFn;
}

declare const FullscreenModal: (<T>(
  props: CProps<IFullscreenModalProps & T, IFullscreenModalContext>,
) => ReturnEl) & {
  Header: <T>(props: IFullscreenModalHeaderProps & T) => ReturnEl;
  Footer: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
  Close: <T>(props: IIconProps & T) => ReturnEl;
  Back: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
  Body: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
  Section: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
  Title: <T>(props: ComponentProps<typeof Text> & T) => ReturnEl;
  Description: <T>(props: ComponentProps<typeof Text> & T) => ReturnEl;
};

export default FullscreenModal;
