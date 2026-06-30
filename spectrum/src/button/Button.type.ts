import type { ButtonProps } from '@semcore/button';

declare namespace NSButton {
  type Props = Omit<ButtonProps, 'use' | 'theme'> & {
    use: ButtonProps['use'] | 'accent';
    theme: ButtonProps['theme'] | 'outline';
  };
}

export {
  NSButton,
};
