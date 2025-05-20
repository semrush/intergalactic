import React from 'react';
import { createTextMaskInputElement } from 'text-mask-core';

import {
  createComponent,
  Component,
  sstyled,
  Root,
  PropGetterFn,
  UnknownProperties,
  Intergalactic,
} from '@semcore/core';
import Input, { InputProps, IInputProps, InputValueProps } from '@semcore/input';
import fire from '@semcore/core/lib/utils/fire';
import logger from '@semcore/core/lib/utils/logger';
import NeighborLocation from '@semcore/neighbor-location';
import getInputProps, { inputProps } from '@semcore/core/lib/utils/inputProps';
import { Box, Flex } from '@semcore/flex-box';
import { forkRef } from '@semcore/core/lib/utils/ref';
import { ScreenReaderOnly } from '@semcore/flex-box';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';

import style from './style/input-mask.shadow.css';

export type IInputMaskAsFn = (rawValue?: string) => string | RegExp[];

/** @deprecated */
export interface InputMaskAliases extends nputMaskAliases, UnknownProperties {}
export type nputMaskAliases = {
  [s: string]: RegExp;
};

/** @deprecated */
export interface IInputMaskValueProps extends InputMaskValueProps, UnknownProperties {}
export type InputMaskValueProps = InputValueProps & {
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
  /**
   * A field that explains the mask for blind users
   * */
  title?: string;

  includeInputProps?: string[];

  /**
   * Field for describe which symbols will use as mask
   * @default `{_: true}`
   */
  maskOnlySymbols?: Record<string, boolean>;

  /**
   * Overrids width of the input field
   */
  inputW?: string | number;

  /**
   * Aria role for input
   */
  inputRole?: string;
};

type InputMaskCtx = {
  getInputProps: PropGetterFn;
  getValueProps: PropGetterFn;
};

export function getAfterPositionValue(value: string, mask: any = ''): number {
  const { length } = value;
  const isValid = (valueChar: string, maskChar: string) =>
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

class Value extends Component<InputMaskValueProps, {}, {}, typeof Value.enhance> {
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

  static enhance = [uniqueIDEnhancement()] as const;

  inputRef = React.createRef<HTMLInputElement>();
  maskRef = React.createRef<HTMLDivElement>();
  textMaskCoreInstance: any = undefined;
  usedMask: any = undefined;
  prevConfirmedValue: any = undefined;
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

  componentDidUpdate(prevProps: any) {
    const maskConfigProps = ['mask', 'hideMask', 'pipe', 'keepCharPositions'] as const;
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
        const maskWidth = this.maskRef.current?.offsetWidth;
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
        (value: any) => {
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
        (value: any) => {
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
    let initiated = false;
    this.textMaskCoreInstance = createTextMaskInputElement({
      ...this.asProps,
      inputElement: this.inputRef.current,
      mask: this.maskStrToRegexArray(mask as any),
      guide: !hideMask,
      showMask: !hideMask,
      placeholderChar: '_',
      pipe: (conformedValue: any, pipeConfigs: any) => {
        const conformedValueBeforPiping = conformedValue;
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
          if (
            !(this.asProps.maskOnlySymbols as any)[conformedValue[i]] &&
            /\w/.test(conformedValue[i])
          )
            lastNonMaskCharPosition = i + 1;
        }

        if (conformedValue === false) {
          if (!initiated) {
            this.setState({ lastConformed: conformedValueBeforPiping });
            if (indexesOfPipedChars !== null) {
              return { value: conformedValueBeforPiping, indexesOfPipedChars };
            } else {
              return conformedValueBeforPiping;
            }
          }

          this.setState({ lastConformed: this.prevConfirmedValue });
          if (indexesOfPipedChars !== null) {
            return { value: conformedValue, indexesOfPipedChars };
          } else {
            return conformedValue;
          }
        }
        initiated = true;

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

    (this.textMaskCoreInstance as any).update(value);
    const {
      state: { previousConformedValue },
    } = this.textMaskCoreInstance as any;
    this.handlers.value(previousConformedValue);
  };

  onFocus = () => {
    setTimeout(() => {
      this.setSelectionRange();
    }, 0);
  };

  setSelectionRange = () => {
    if (!this.inputRef.current) return;
    const { value } = this.inputRef.current;
    const afterPotionValue = getAfterPositionValue(value);
    this.inputRef.current.setSelectionRange(afterPotionValue, afterPotionValue);
  };

  maskStrToRegexArray = (mask: string) => {
    if (typeof mask !== 'string') return mask;
    const { aliases } = this.asProps;
    return mask.split('').map((symbol) => aliases?.[symbol] || symbol);
  };

  handleMouseDownPlaceholder = (event: any) => {
    event.preventDefault();
    this.inputRef.current?.focus();
  };

  render() {
    const SInputMask = Flex;
    const SValue = Root;
    const SMask = Box;
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
      uid,
      inputW,
      inputRole,
      ...otherProps
    } = this.asProps;

    logger.warn(
      !title,
      'title is required for describing mask format',
      this.asProps['data-ui-name'] || InputMask.displayName,
    );

    const [controlProps, boxProps] = getInputProps(
      otherProps,
      includeInputProps as Array<keyof typeof otherProps>,
      true,
    );
    const ref = forkRef(this.inputRef, forwardRef!);

    return (
      <NeighborLocation.Detect neighborLocation={neighborLocation}>
        {(neighborLocation) =>
          sstyled(this.asProps.styles)(
            <>
              <SInputMask
                position='relative'
                flex={1}
                {...boxProps}
                __excludeProps={['onFocus', 'onChange', 'forwardRef', 'ref']}
              >
                <SMask
                  tag='span'
                  aria-hidden='true'
                  data-neighbor-location={neighborLocation}
                  ref={this.maskRef}
                >
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
                  value={value}
                  w={inputW}
                  wMin={this.state.maskWidth}
                  aria-describedby={`hint-${uid}`}
                  {...controlProps}
                  role={inputRole}
                  __excludeProps={['placeholder', 'title']}
                />
                <Children />
              </SInputMask>
              <ScreenReaderOnly id={`hint-${uid}`}>{title}</ScreenReaderOnly>
            </>,
          ) as React.ReactElement
        }
      </NeighborLocation.Detect>
    );
  }
}

export default createComponent(InputMask, {
  Value,
  Addon: Input.Addon,
}) as any as Intergalactic.Component<'div', InputProps, InputMaskCtx> & {
  Value: Intergalactic.Component<'input', InputMaskValueProps>;
  Addon: typeof Input.Addon;
};
