import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { ModalProps } from '@semcore/modal';
import { Flex, Box, BoxProps } from '@semcore/flex-box';
import { IconProps } from '@semcore/icon';
import { Text } from '@semcore/typography';

/** @deprecated */
export interface IFullscreenModalProps extends FullscreenModalProps, UnknownProperties {}
export type FullscreenModalProps = ModalProps & {
  /** Function that is invoked when hiding a component */
  onClose?: (
    trigger: 'onBackClick' | 'onCloseClick' | 'onEscape' | 'onOutsideClick',
    e?: React.MouseEvent | React.KeyboardEvent,
  ) => void;
};

/** @deprecated */
export interface IFullscreenModalHeaderProps
  extends FullscreenModalHeaderProps,
    UnknownProperties {}
export type FullscreenModalHeaderProps = BoxProps & {
  title?: React.ReactNode;
  description?: React.ReactNode;
};

/** @deprecated */
export interface IFullscreenModalContext extends FullscreenModalContext, UnknownProperties {}
export type FullscreenModalContext = {
  getBackProps: PropGetterFn;
  getCloseProps: PropGetterFn;
};

declare const FullscreenModal: Intergalactic.Component<
  'div',
  FullscreenModalProps,
  FullscreenModalContext
> & {
  Header: Intergalactic.Component<'div', FullscreenModalHeaderProps>;
  Footer: typeof Flex;
  Close: Intergalactic.Component<'div', IconProps>;
  Back: typeof Box;
  Body: typeof Box;
  Section: typeof Box;
  Title: typeof Text;
  Description: typeof Text;
};

export default FullscreenModal;
