import { Box } from '@semcore/base-components';
import { ButtonLink } from '@semcore/button';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import Input from '@semcore/input';
import type { InputSize } from '@semcore/input';
import React from 'react';

import style from '../style/color-picker.shadow.css';

type InputColorAsProps = {
  styles?: React.CSSProperties;
  defaultValue?: string;
  defaultState?: string;
  value?: string;
  state?: 'normal' | 'valid' | 'invalid';
  colors?: string[];
  onAdd?: (value: string, event: React.MouseEvent | React.KeyboardEvent) => void;
  focus?: boolean;
  Children: any;
  getI18nText: (messageId: string, values?: { [key: string]: string | number }) => string;
  size?: InputSize;
};

function isValidHex(hex: string) {
  if (hex[0] !== '#' && hex.length === 7) return false;

  const reg = /^#([0-9a-f]{3,4}){1,2}$/i;
  return hex[0] === '#' ? reg.test(hex) : reg.test(`#${hex}`);
}

function debounce(this: any, func: (...args: any[]) => void, timeout: number) {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

class InputColorRoot extends Component<InputColorAsProps, [], { value: string; state: null }> {
  static displayName = 'InputColor';

  static style = style;

  static defaultProps = {
    defaultValue: '',
    defaultState: 'normal',
  };

  uncontrolledProps() {
    return {
      value: '',
      state: null,
    };
  }

  handlerAdd = (event: React.MouseEvent | React.KeyboardEvent) => {
    const { value, state } = this.asProps as any;

    if (value.length !== 0 && state === 'normal') {
      if (value[0] === '#') {
        this.asProps?.onAdd?.(value.toLowerCase(), event);
      } else {
        this.asProps?.onAdd?.(`#${value.toLowerCase()}`, event);
      }
      this.handlers.value('', event);
    }
  };

  handlerCancel = (event: React.MouseEvent) => {
    this.handlers.value('', event);
    this.handlers.state('normal');
  };

  handlerChange = debounce((value: string) => {
    if (value.length !== 0) {
      if (isValidHex(value)) {
        this.handlers.state('normal');
      } else {
        this.handlers.state('invalid');
      }
    } else {
      this.handlers.state('normal');
    }
  }, 300);

  handlekeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handlerAdd(event);
    }
  };

  render() {
    const { styles, state, value, onFocus, onBlur, focus, getI18nText, size } = this.asProps;

    const SPaletteManager = Box;
    const SInputValue = Root;
    const SInput = 'div';
    const SInputContainer = 'div';
    const SConfirmColor = Input.Addon;
    const SClearConfirm = Input.Addon;
    const SItemColor = Box;
    const valueColor = value?.[0] === '#' ? value : value ? `#${value}` : null;

    return sstyled(styles)(
      <SPaletteManager>
        <SItemColor data-value={valueColor} />
        <SInputContainer>
          <span aria-hidden='true'>#</span>
          <SInput>
            <Input ml={1} w={135} state={state} size={size} onKeyDown={this.handlekeyDown}>
              <SInputValue
                render={Input.Value}
                placeholder='FFFFFF'
                aria-label={getI18nText('colorField')}
                onChange={this.handlerChange}
                maxLength={7}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              <SConfirmColor
                aria-hidden='true'
                aria-label={getI18nText('colorFieldConfirm')}
                // @ts-expect-error our runtime can override props via `use:`, but its not available in types
                use:tabIndex={-1}
                tag={ButtonLink}
                onClick={this.handlerAdd}
                mt={1}
                p={0}
                hidden={!focus}
              >
                <ButtonLink.Addon p={0}>
                  <CheckM color='green-300' />
                </ButtonLink.Addon>
              </SConfirmColor>
              <SClearConfirm
                aria-hidden='true'
                aria-label={getI18nText('colorFieldClear')}
                // @ts-expect-error our runtime can override props via `use:`, but its not available in types
                use:tabIndex={-1}
                tag={ButtonLink}
                onClick={this.handlerCancel}
                mt={1}
                px={2}
                hidden={!focus}
              >
                <ButtonLink.Addon p={0}>
                  <CloseM color='gray-300' />
                </ButtonLink.Addon>
              </SClearConfirm>
            </Input>
          </SInput>
        </SInputContainer>
      </SPaletteManager>,
    ) as React.ReactElement;
  }
}

/**
 * InputColor
 *
 * {@link https://developer.semrush.com/intergalactic/components/color-picker/color-picker-api/|API} | {@link https://developer.semrush.com/intergalactic/components/color-picker/color-picker-code/|Examples}
 */
export const InputColor = createComponent(InputColorRoot);
