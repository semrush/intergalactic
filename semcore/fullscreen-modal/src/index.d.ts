import type { NSBox, NSFlex } from '@semcore/base-components';
import type Button from '@semcore/button';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { NSModal } from '@semcore/modal';
import type { Text } from '@semcore/typography';

export type FullscreenModalProps = NSModal.Props & {
  /** Function that is invoked when hiding a component */
  onClose?: (
    trigger: 'onBackClick' | 'onCloseClick' | 'onEscape' | 'onOutsideClick',
    e?: React.MouseEvent | React.KeyboardEvent,
  ) => void;
};

export type FullscreenModalHeaderProps = NSBox.Props & {
  /** Title content displayed in the modal header */
  title?: React.ReactNode;
  /** Description text that appears alongside the title */
  description?: React.ReactNode;
};

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
  Footer: NSFlex.Component;
  Close: typeof Button;
  Back: NSBox.Component;
  Body: NSBox.Component;
  Section: NSBox.Component;
  Title: typeof Text;
  Description: typeof Text;
};

export default FullscreenModal;
