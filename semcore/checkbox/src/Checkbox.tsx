import React, { HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import createComponent, {
  Component,
  IFunctionProps,
  Merge,
  PropGetter,
  styled,
} from '@semcore/core';
import { Box, Flex, IBoxProps, IFlexProps } from '@semcore/flex-box';
import { ITextProps, Text as TypographyText } from '@semcore/typography';
import resolveColor from '@semcore/utils/lib/color';
import { forkRef } from '@semcore/utils/lib/ref';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import autoFocusEnhance, {
  IKeyboardFocusProps,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import getInputProps, { inputProps } from '@semcore/utils/lib/inputProps';

import style from './style/checkbox.shadow.css';

const SIZE_TEXT_MAP = {
  xl: 300,
  l: 200,
  m: 100,
};

export type CheckboxSize = 'm' | 'l' | 'xl';
export type CheckboxState = 'normal' | 'invalid';

export interface ICheckboxProps extends IBoxProps {
  /**
   * Checkbox state
   * @default normal
   */
  state?: CheckboxState;
  /**
   * Checkbox size
   * @default m
   */
  size?: CheckboxSize;
  /** A checkbox theme you can add your own color to
   */
  theme?: string;
  /** Hoist property
   * @ignore */
  disabled?: boolean;
}

export interface ICheckboxValueProps extends IKeyboardFocusProps, IFlexProps {
  /** Handler to change */
  onChange?: (checked: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
  /** Control status */
  checked?: boolean;
  /** The initial status for uncontrolled mode
   * @default false */
  defaultChecked?: boolean;
  /** The value responsible for the indeterminate attribute */
  indeterminate?: boolean;
  /** List of components that can be added to a hidden input */
  includeInputProps?: string[];
  /**
   * The value responsible for the state of the component
   * @default normal
   */
  state?: CheckboxState;
  /**
   * Checkbox size
   * @default m
   */
  size?: CheckboxSize;
  /** A checkbox theme you can add your own color to */
  theme?: string;
}

export interface ICheckboxContext extends ICheckboxProps {
  getTextProps: PropGetter<Checkbox['getTextProps']>;
  getValueProps: PropGetter<Checkbox['getValueProps']>;
}

class Checkbox extends Component<ICheckboxProps> {
  static displayName = 'Checkbox';
  static style = style;

  static defaultProps = {
    size: 'm',
    state: 'normal',
  };

  getTextProps() {
    const { size, disabled } = this.asProps;
    return {
      size: size ? SIZE_TEXT_MAP[size] : size,
      disabled,
    };
  }

  getValueProps() {
    const { size, state, theme } = this.asProps;
    return {
      size,
      state,
      theme,
    };
  }

  render() {
    const { Root: SLabel } = this;
    const { styles } = this.asProps;
    return styled(styles)(<SLabel render={Box} tag="label" />);
  }
}

class Value extends Component<ICheckboxValueProps> {
  static defaultProps = {
    includeInputProps: inputProps,
    defaultChecked: false,
  };
  static enhance = [autoFocusEnhance()];
  static hoistProps = ['disabled'];

  uncontrolledProps() {
    return {
      checked: (e) => e.target.checked,
    };
  }

  inputRef = (node) => {
    if (!node) return;
    node.indeterminate = Boolean(this.asProps.indeterminate);
  };

  handleClick(e) {
    e.stopPropagation();
  }

  render() {
    const {
      forwardRef,
      styles,
      size,
      state,
      theme,
      keyboardFocused,
      includeInputProps,
      ...other
    } = this.asProps;

    const SControl = Box;
    const SCheckbox = Flex;
    const color = resolveColor(theme);
    const [controlProps, boxProps] = getInputProps(other, includeInputProps);

    return styled(styles)`
      SCheckbox[theme] {
        &[state='normal']:before {
          border-color: ${color};
        }
        &[state='normal'][keyboardFocused]:before {
          border-color: ${color};
        }
      }

      SControl:checked {
        & ~ SCheckbox[theme][state='normal']:before,
        & ~ SCheckbox[theme][state='invalid']:before {
          background-color: ${color};
          border-color: ${color};
        }
      }

      SControl:indeterminate {
        & ~ SCheckbox[theme][state='normal']:before {
          background-color: ${color};
          border-color: ${color};
        }
      }
    `(
      <>
        <SControl
          tag="input"
          type="checkbox"
          ref={forkRef<HTMLInputElement>(forwardRef, this.inputRef)}
          {...controlProps}
          // @ts-ignore
          onClick={callAllEventHandlers(controlProps.onClick, this.handleClick)}
        />
        <SCheckbox
          tag="span"
          theme={theme}
          size={size}
          state={state}
          keyboardFocused={keyboardFocused}
          {...boxProps}
        />
      </>,
    );
  }
}

export interface ICheckboxTextProps extends ITextProps {
  disabled?: boolean;
}

function Text(props: IFunctionProps<ICheckboxTextProps>) {
  const { Root: SText, styles, disabled } = props;
  return styled(styles)(<SText render={TypographyText} tag="span" disabled={disabled} />);
}

export { inputProps };

export default createComponent<
  Merge<ICheckboxProps, LabelHTMLAttributes<HTMLLabelElement>>,
  {
    Text: Merge<ICheckboxTextProps, HTMLAttributes<HTMLSpanElement>>;
    Value: Merge<ICheckboxValueProps, InputHTMLAttributes<HTMLInputElement>>;
  },
  ICheckboxContext
>(Checkbox, {
  Text,
  Value,
});
