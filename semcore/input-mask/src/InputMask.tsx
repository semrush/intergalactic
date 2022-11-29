import React, { ComponentProps, InputHTMLAttributes } from 'react';
import { createTextMaskInputElement } from 'text-mask-core';

import createComponent, { Component, Merge, sstyled, Root } from '@semcore/core';
import Input, { IInputProps, IInputValueProps } from '@semcore/input';
import fire from '@semcore/utils/lib/fire';
import logger from '@semcore/utils/lib/logger';
import NeighborLocation from '@semcore/neighbor-location';
import getInputProps, { inputProps } from '@semcore/utils/lib/inputProps';
import { Flex } from '@semcore/flex-box';
import { forkRef } from '@semcore/utils/lib/ref';

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
  pipe?: (
    conformedValue: string,
    config: {},
  ) => string | false | { value: string; indexesOfPipedChars: number[] };
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
    return <Root render={Input} ref={Input} />;
  }
}

class Value extends Component<IInputMaskValueProps> {
  static defaultProps = {
    includeInputProps: inputProps,
    defaultValue: '',
    hideMask: false,
    keepCharPositions: false,
    aliases: {
      '9': /\d/,
      a: /[a-zA-Zа-яА-Я]/,
      '*': /[\da-zA-Zа-яА-Я]/,
    },
    maskOnlySymbols: {
      _: true,
    },
  };

  inputRef = React.createRef<HTMLInputElement>();
  maskRef = React.createRef<HTMLDivElement>();
  textMaskCoreInstance = undefined;
  usedMask = undefined;
  prevConfirmedValue = undefined;
  state: {
    lastConformed:
      | {
          all: string;
          userInput: string;
          maskOnly: string;
        }
      | undefined;
    maskWidth: number | undefined;
  } = {
    lastConformed: undefined,
    maskWidth: undefined,
  };

  componentDidMount() {
    this.initTextMaskCore();
    this.setState({
      maskWidth: this.maskRef.current ? this.maskRef.current.offsetWidth : undefined,
    });
  }

  componentDidUpdate(prevProps) {
    const maskConfigProps = ['mask', 'hideMask', 'pipe', 'keepCharPositions'];
    const maskConfigChanged = maskConfigProps.some(
      (prop) => this.asProps[prop] !== prevProps[prop],
    );
    if (maskConfigChanged) {
      this.initTextMaskCore();
    }
    if (prevProps.value !== this.props.value) {
      this.textMaskCoreInstance.update(this.props.value);
    }
    if (maskConfigChanged || prevProps.value !== this.props.value) {
      this.setState((prevState) => {
        const maskWidth = this.maskRef.current && this.maskRef.current.offsetWidth;
        if (maskWidth !== (prevState as any).maskWidth) {
          return { maskWidth };
        }
        return prevState;
      });
    }
  }

  uncontrolledProps() {
    return {
      value: [
        (value) => {
          const {
            textMaskCoreInstance,
            asProps: { placeholder },
          } = this;
          if (!textMaskCoreInstance) {
            return value;
          }
          textMaskCoreInstance.update(value);
          const { previousConformedValue, previousPlaceholder } = textMaskCoreInstance.state;
          const afterPositionValue = getAfterPositionValue(
            previousConformedValue,
            previousPlaceholder,
          );
          return afterPositionValue === 0 && placeholder ? '' : previousConformedValue;
        },
        (value) => {
          const { textMaskCoreInstance } = this;
          if (!textMaskCoreInstance) return;
          const { previousPlaceholder } = textMaskCoreInstance.state;
          if (value.length === previousPlaceholder.length && value.indexOf('_') === -1) {
            fire(this, 'onSuccess', value);
          }
        },
      ],
    };
  }

  initTextMaskCore = () => {
    const { mask, value, hideMask, pipe: userPipe } = this.asProps;
    if (mask === undefined) return;
    this.usedMask = mask;

    this.setState({ lastConformed: undefined });
    this.textMaskCoreInstance = createTextMaskInputElement({
      ...this.asProps,
      inputElement: this.inputRef.current,
      mask: this.maskStrToRegexArray(mask),
      guide: !hideMask,
      showMask: !hideMask,
      placeholderChar: '_',
      pipe: (conformedValue, pipeConfigs) => {
        let indexesOfPipedChars = null;
        if (userPipe) {
          const piped = userPipe(conformedValue, pipeConfigs);
          if (typeof piped === 'object' && piped) {
            conformedValue = piped.value;
            indexesOfPipedChars = piped.indexesOfPipedChars;
          } else {
            conformedValue = piped;
          }
        }

        let lastNonMaskCharPosition = 0;
        for (let i = 0; i < conformedValue?.length; i++) {
          if (!this.asProps.maskOnlySymbols[conformedValue[i]] && /\w/.test(conformedValue[i]))
            lastNonMaskCharPosition = i + 1;
        }

        if (conformedValue === false) {
          this.setState({ lastConformed: this.prevConfirmedValue });
          if (indexesOfPipedChars !== null) {
            return { value: conformedValue, indexesOfPipedChars };
          } else {
            return conformedValue;
          }
        }

        const userInput = conformedValue.substring(0, lastNonMaskCharPosition);
        const maskOnly = conformedValue.substring(lastNonMaskCharPosition);
        const lastConformed = userInput ? { all: conformedValue, userInput, maskOnly } : undefined;
        this.prevConfirmedValue = lastConformed;
        this.setState({ lastConformed });

        if (indexesOfPipedChars !== null) {
          return { value: userInput, indexesOfPipedChars };
        } else {
          return userInput;
        }
      },
    });

    this.textMaskCoreInstance.update(value);
    const {
      state: { previousConformedValue },
    } = this.textMaskCoreInstance;
    this.handlers.value(previousConformedValue);
  };

  onFocus = () => {
    setTimeout(() => {
      if (!this.inputRef.current) return;
      const { value } = this.inputRef.current;
      const afterPotionValue = getAfterPositionValue(value);
      this.inputRef.current.setSelectionRange(afterPotionValue, afterPotionValue);
    }, 0);
  };

  maskStrToRegexArray = (mask) => {
    if (typeof mask !== 'string') return mask;
    const { aliases } = this.asProps;
    return mask.split('').map((symbol) => aliases[symbol] || symbol);
  };

  handleMouseDownPlaceholder = (e) => {
    e.preventDefault();
    this.inputRef.current.focus();
  };

  render() {
    const SInputMask = Flex;
    const SValue = Root;
    const SMask = 'span' as any;
    const SPlaceholder = 'span';
    const SMaskHidden = 'span';
    const SMaskVisible = 'span';
    const {
      title,
      placeholder,
      mask,
      neighborLocation,
      value,
      includeInputProps,
      Children,
      forwardRef,
      ...otherProps
    } = this.asProps;
    const isValid = this.state.lastConformed && !this.state.lastConformed.all.includes('_');

    logger.warn(
      !title,
      'title is required for describing mask format',
      this.asProps['data-ui-name'] || InputMask.displayName,
    );

    const [controlProps, boxProps] = getInputProps(otherProps, includeInputProps as string[]);
    const ref = forkRef(this.inputRef, forwardRef);

    return (
      <NeighborLocation.Detect neighborLocation={neighborLocation}>
        {(neighborLocation) =>
          sstyled(this.asProps.styles)(
            <SInputMask
              position="relative"
              flex={1}
              {...boxProps}
              __excludeProps={['onFocus', 'onChange', 'forwardRef', 'ref']}
            >
              <SMask aria-hidden="true" neighborLocation={neighborLocation} ref={this.maskRef}>
                {this.state.lastConformed && (
                  <SMaskHidden data-content={this.state.lastConformed.userInput} />
                )}
                {this.state.lastConformed ? (
                  <SMaskVisible data-content={this.state.lastConformed.maskOnly} />
                ) : (
                  <SPlaceholder data-content={placeholder} />
                )}
              </SMask>
              <SValue
                render={Input.Value}
                neighborLocation={neighborLocation}
                ref={ref}
                onFocus={this.onFocus}
                aria-invalid={!isValid}
                pattern={mask}
                value={value}
                wMin={this.state.maskWidth}
                {...controlProps}
                __excludeProps={['placeholder']}
              />
              <Children />
            </SInputMask>,
          ) as React.ReactElement
        }
      </NeighborLocation.Detect>
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
