import React, { ComponentProps, InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import createComponent, {
  Component,
  CONTEXT_COMPONENT,
  Merge,
  PropGetter,
  styled,
} from '@semcore/core';
import { Box, IBoxProps, IFlexProps } from '@semcore/flex-box';
import { Text as TypographyText } from '@semcore/typography';
import assignProps from '@semcore/utils/lib/assignProps';
import keyboardFocusEnhance, {
  IKeyboardFocusProps,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import resolveColor from '@semcore/utils/lib/color';
import getInputProps, { inputProps } from '@semcore/utils/lib/inputProps';

import style from './style/radio.shadow.css';

export type RadioSize = 'm' | 'l' | 'xl';
export type RadioState = 'normal' | 'invalid';
export type RadioValue = string | number | boolean;

export interface IRadioProps extends IFlexProps {
  /**
   * The value displaying the state of the component
   * @default normal
   */
  state?: RadioState;
  /**
   * Radio button size
   * @default m
   **/
  size?: RadioSize;
  /** The theme of the radio button that you can send your color to */
  theme?: string;
  /** Hoist props
   * @ignore */
  disabled?: boolean;
}

export interface IRadioGroupProps {
  /** Radio group name */
  name?: string;
  /** Active default value */
  defaultValue?: RadioValue;
  /** Active value */
  value?: RadioValue;
  /** Called when the selected element is changed */
  onChange?: (value: RadioValue, e?: React.SyntheticEvent<HTMLInputElement>) => void;
  /** Radio button size */
  size?: RadioSize;
  /** The theme of the radio button that you can send your color to */
  theme?: string;
  /** Blocks access and changes to the form field */
  disabled?: boolean;
}

export interface IRadioValueProps extends IBoxProps, IKeyboardFocusProps {
  /** List of elements that can be put on a hidden input */
  includeInputProps?: string[];
  /**
   * The value displaying the state of the component
   * @default normal
   */
  state?: RadioState;
  /** The theme of the radio button that you can send your color to */
  theme?: string;
  /** Radio button size */
  size?: RadioSize;
  /** The element value is required for RadioGroup */
  value?: RadioValue;
  /** Called when the value changes */
  onChange?: (value: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
}

export interface IRadioCtx extends IRadioProps {
  getValueProps: PropGetter<Radio['getValueProps']>;
  getTextProps: PropGetter<Radio['getTextProps']>;
}

const SIZE_TEXT_MAP = {
  xl: 300,
  l: 200,
  m: 100,
};

class RadioGroupRoot extends Component<IRadioGroupProps> {
  static displayName = 'RadioGroup';

  static defaultProps = {
    state: 'normal',
    size: 'm',
    defaultValue: null,
  };

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  setContext() {
    const { theme, size, name, value, onChange } = this.asProps;
    return {
      onChange,
      value,
      theme,
      size,
      name,
    };
  }

  render() {
    const { Children } = this.asProps;
    return <Children />;
  }
}

const RadioGroup = createComponent<IRadioGroupProps, {}, IRadioGroupProps>(RadioGroupRoot);

class Radio extends Component<IRadioProps> {
  static displayName = 'Radio';
  static style = style;
  static contextType = RadioGroup[CONTEXT_COMPONENT];

  bindHandlerChange = (value) => (checked, e) => {
    this.context.onChange(value, e);
  };

  getValueProps(props) {
    // The default values are here, since you cannot rewrite out of context
    const { state = 'normal', size = 'm', theme, name } = assignProps(this.props, this.context);
    const { value } = this.context;
    const other = {};
    // if used with the context
    if (value !== undefined) {
      other['checked'] = value === props.value;
      other['onChange'] = this.bindHandlerChange(props.value);
    }
    return {
      ...other,
      state,
      size,
      theme,
      name,
    };
  }

  getTextProps() {
    // The default values are here, since you cannot rewrite out of context
    const { size = 'm' } = assignProps(this.props, this.context);
    return {
      size: SIZE_TEXT_MAP[size],
    };
  }

  render() {
    const { Root: SRadio } = this;
    const { styles, disabled } = this.asProps;

    return styled(styles)(<SRadio render={Box} tag="label" disabled={disabled} />);
  }
}

class Value extends Component<IRadioValueProps> {
  static defaultProps = {
    includeInputProps: inputProps,
    defaultChecked: false,
  };
  static enhance = [keyboardFocusEnhance()];
  static hoistProps = ['disabled'];

  uncontrolledProps() {
    return {
      checked: (e) => e.target.checked,
    };
  }

  render() {
    const SValue = Box;
    const SControl = Box;
    const {
      forwardRef,
      styles,
      includeInputProps,
      keyboardFocused,
      size,
      state,
      theme,
    } = this.asProps;

    const [controlProps, boxProps] = getInputProps(this.asProps, includeInputProps);
    let color = '';

    if (theme && state !== 'invalid') {
      color = resolveColor(theme);
    }

    return styled(styles)`
      SControl:checked ~ SValue[theme]::before {
        border-color: ${color};
        background-color: ${color};
      }
      SValue[state='normal'][theme]::before {
        border-color: ${color};
      }
    `(
      <>
        <SControl tag="input" type="radio" {...controlProps} />
        <SValue
          ref={forwardRef}
          keyboardFocused={keyboardFocused}
          theme={theme}
          size={size}
          state={state}
          {...boxProps}
        />
      </>,
    );
  }
}

function Text(props) {
  const { Root: SText, size, styles } = props;
  return styled(styles)(<SText render={TypographyText} size={size} />);
}

export { inputProps, RadioGroup };
export default createComponent<
  Merge<IRadioProps, LabelHTMLAttributes<HTMLLabelElement>>,
  {
    Value: Merge<IRadioValueProps, InputHTMLAttributes<HTMLInputElement>>;
    Text: ComponentProps<typeof TypographyText>;
  },
  IRadioCtx
>(Radio, {
  Value,
  Text,
});
