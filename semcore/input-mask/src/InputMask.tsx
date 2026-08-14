import { NeighborLocation, Box, Flex, ScreenReaderOnly } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import fire from '@semcore/core/lib/utils/fire';
import getInputProps, { inputProps } from '@semcore/core/lib/utils/inputProps';
import logger from '@semcore/core/lib/utils/logger';
import { forkRef } from '@semcore/core/lib/utils/ref';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import Input, { type NSInput } from '@semcore/input';
import React from 'react';
import * as mask from 'text-mask-core';

import type { NSInputMask } from './InputMask.type';
import style from './style/input-mask.shadow.css';

const { createTextMaskInputElement } = mask;

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

class InputMask extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSInputMask.Component>
> {
  static displayName = 'InputMask';
  static style = style;

  render() {
    return <Root render={Input} ref={Input} />;
  }
}

class Value extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSInputMask.Value.Component>,
  typeof Value.enhance,
  NSInputMask.Value.Handlers
> {
  static defaultProps: NSInputMask.Value.DefaultProps = {
    includeInputProps: inputProps,
    defaultValue: '',
    hideMask: false,
    keepCharPositions: false,
    aliases: {
      '9': /\d/,
      'a': /[a-zA-Zа-яА-Я]/,
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
  state: NSInputMask.Value.State = {
    lastConformed: undefined,
    maskWidth: undefined,
  };

  componentDidMount() {
    this.initTextMaskCore();
    this.setState({
      maskWidth: this.maskRef.current ? this.maskRef.current.offsetWidth : undefined,
    });
  }

  componentDidUpdate(prevProps: typeof this.asProps) {
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
      mask: _mask,
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
                  {this.state.lastConformed
                    ? (
                        <SMaskVisible data-content={this.state.lastConformed.maskOnly} />
                      )
                    : (
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
          ) as React.ReactElement}
      </NeighborLocation.Detect>
    );
  }
}

/**
 * InputMask
 *
 * {@link https://developer.semrush.com/intergalactic/components/input-mask/input-mask-api/|API} | {@link https://developer.semrush.com/intergalactic/components/input-mask/input-mask-code/|Examples}
 */
export default createComponent<NSInputMask.Component, typeof InputMask>(InputMask, {
  Value,
  Addon: Input.Addon,
});
