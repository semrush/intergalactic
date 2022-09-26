import React, { ComponentProps, InputHTMLAttributes } from 'react';
import { createTextMaskInputElement } from 'text-mask-core';

import createComponent, { Component, Merge, sstyled, Root } from '@semcore/core';
import Input, { IInputProps, IInputValueProps } from '@semcore/input';
import { NEIGHBOR_LOCATION_AUTO_DETECT } from '@semcore/neighbor-location';
import fire from '@semcore/utils/lib/fire';
import logger from '@semcore/utils/lib/logger';

import style from './style/input-mask.shadow.css';

export type IInputMaskAsFn = (rawValue?: string) => string | RegExp[];

export interface InputMaskAliases {
  [s: string]: RegExp;
}

export interface IInputMaskValueProps extends IInputValueProps {
  /**
   * Mask for entering text
   */
  mask?: string | boolean | IInputMaskAsFn;
  /**
   * The property for visibility of the mask
   * @default false
   */
  hideMask?: boolean;
  /**
   * This function allows you to change the input value before it is displayed on the screen.
   */
  pipe?: (conformedValue: string, config: {}) => string;
  /**
   * @ignore
   */
  keepCharPositions?: boolean;
  /**
   * The aliases object for the mask values. The key is the symbol used in the mask,
   * and the value is the regular expression that this symbol must match
   * @default {'9': /\d/, 'a': /[a-zA-Zа-яА-Я]/, '*': /[\da-zA-Zа-яА-Я]/}
   */
  aliases?: InputMaskAliases;
  /**
   * Event that is called when the input value fully matches the mask
   */
  onSuccess?: (value: string) => void;
}

export function getAfterPositionValue(
  value: string,
  mask: IInputMaskValueProps['mask'] = '',
): number {
  const { length } = value;
  const isValid = (valueChar, maskChar) =>
    maskChar !== undefined ? maskChar !== valueChar : /\w|\+|\(/.test(valueChar);
  let afterPotionValue = 0;
  for (let i = length - 1; i >= 0; i--) {
    if (value[i] !== '_' && isValid(value[i], mask[i])) {
      afterPotionValue = i + 1;
      break;
    }
  }
  return afterPotionValue;
}

class InputMask extends Component<IInputProps> {
  static displayName = 'InputMask';
  static style = style;

  render() {
    return <Root render={Input} />;
  }
}

class Value extends Component<IInputMaskValueProps> {
  static [NEIGHBOR_LOCATION_AUTO_DETECT] = true;
  static defaultProps = {
    defaultValue: '',
    hideMask: false,
    keepCharPositions: false,
    aliases: {
      '9': /\d/,
      a: /[a-zA-Zа-яА-Я]/,
      '*': /[\da-zA-Zа-яА-Я]/,
    },
  };

  _input: HTMLInputElement;
  textMask = undefined;
  lastConformed: { all: string; userInput: string; maskOnly: string } = undefined;

  componentDidMount() {
    this.initTextMask();
  }

  componentDidUpdate(prevProps) {
    const configProps = ['mask', 'hideMask', 'pipe', 'keepCharPositions'];
    if (configProps.some((prop) => this.asProps[prop] !== prevProps[prop])) {
      this.initTextMask();
    }
  }

  uncontrolledProps() {
    return {
      value: [
        (value) => {
          const {
            textMask,
            asProps: { placeholder },
          } = this;
          if (!textMask) {
            return value;
          }
          textMask.update(value);
          const { previousConformedValue, previousPlaceholder } = textMask.state;
          const afterPositionValue = getAfterPositionValue(
            previousConformedValue,
            previousPlaceholder,
          );
          return afterPositionValue === 0 && placeholder ? '' : previousConformedValue;
        },
        (value) => {
          const { textMask } = this;
          if (!textMask) return;
          const { previousPlaceholder } = textMask.state;
          if (value.length === previousPlaceholder.length && value.indexOf('_') === -1) {
            fire(this, 'onSuccess', value);
          }
        },
      ],
    };
  }

  initTextMask = () => {
    const { mask, value, hideMask, pipe: userPipe } = this.asProps;
    if (mask === undefined) return;

    this.lastConformed = undefined;
    this.textMask = createTextMaskInputElement({
      ...this.asProps,
      inputElement: this._input,
      mask: this.maskStrToRegexArray(mask),
      guide: !hideMask,
      showMask: !hideMask,
      placeholderChar: '_',
      pipe: (conformedValue: string, pipeConfigs) => {
        if (userPipe) conformedValue = userPipe(conformedValue, pipeConfigs);

        let lastNonMaskCharPosition = 0;
        for (let i = 0; i < conformedValue.length; i++) {
          if (conformedValue[i] !== '_' && /\w/.test(conformedValue[i]))
            lastNonMaskCharPosition = i + 1;
        }
        const userInput = conformedValue.substring(0, lastNonMaskCharPosition);
        const maskOnly = conformedValue.substring(lastNonMaskCharPosition);
        this.lastConformed = userInput ? { all: conformedValue, userInput, maskOnly } : undefined;

        return userInput;
      },
    });

    this.textMask.update(value);
    const {
      state: { previousConformedValue },
    } = this.textMask;
    this.handlers.value(previousConformedValue);
  };

  onFocus = () => {
    setTimeout(
      (input) => {
        const { value } = input;
        const afterPotionValue = getAfterPositionValue(value);
        input.setSelectionRange(afterPotionValue, afterPotionValue);
      },
      0,
      this._input,
    );
  };

  maskStrToRegexArray = (mask) => {
    if (typeof mask !== 'string') return mask;
    const { aliases } = this.asProps;
    return mask.split('').map((symbol) => aliases[symbol] || symbol);
  };

  setRef = (name) => (node) => {
    this[name] = node;
  };

  handleMouseDownPlaceholder = (e) => {
    e.preventDefault();
    this._input.focus();
  };

  render() {
    const SValue = Root;
    const SMask = 'span';
    const SPlaceholder = 'span';
    const SMaskHidden = 'span';
    const { title, placeholder, mask } = this.asProps;
    const isValid = this.lastConformed && !this.lastConformed.all.includes('_');

    logger.warn(
      !title,
      'title is required for describing mask format',
      this.asProps['data-ui-name'] || InputMask.displayName,
    );

    return sstyled(this.asProps.styles)(
      <>
        <SMask aria-hidden="true">
          {this.lastConformed && <SMaskHidden>{this.lastConformed.userInput}</SMaskHidden>}
          {this.lastConformed?.maskOnly ?? <SPlaceholder>{placeholder}</SPlaceholder>}
        </SMask>
        <SValue
          render={Input.Value}
          ref={this.setRef('_input')}
          onFocus={this.onFocus}
          aria-invalid={!isValid}
          pattern={mask}
          __excludeProps={['placeholder']}
        />
      </>,
    );
  }
}

export default createComponent<
  IInputProps,
  {
    // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
    Value: Merge<IInputMaskValueProps, InputHTMLAttributes<HTMLInputElement>>;
    Addon: ComponentProps<typeof Input.Addon>;
  }
>(InputMask, {
  Value,
  Addon: Input.Addon,
});
