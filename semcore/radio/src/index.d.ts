import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';
import { IKeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import { Text } from '@semcore/typography';

export type RadioSize = 'm' | 'l';
export type RadioState = 'normal' | 'invalid';
export type RadioValue = string | number | boolean;

export interface IRadioProps extends IBoxProps {
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
  /** Default value if `value` property is not provided */
  defaultValue?: RadioValue;
  /** Called when the value changes */
  onChange?: (value: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
  /** Blocks access and changes to the form field */
  disabled?: boolean;
}

export interface IRadioCtx {
  getValueProps: PropGetterFn;
  getTextProps: PropGetterFn;
}

declare const RadioGroup: <T>(props: CProps<IRadioGroupProps & T>) => ReturnEl;

export { RadioGroup };

declare const Radio: (<T>(props: CProps<IRadioProps & T, IRadioCtx>) => ReturnEl) & {
  Value: <T>(props: IRadioValueProps & T) => ReturnEl;
  Text: typeof Text;
};

export default Radio;
