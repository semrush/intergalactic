import React from 'react';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Input from '@semcore/input';
import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
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

class InputColorRoot extends Component<InputColorAsProps> {
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
    const { styles, state, value, onFocus, onBlur, focus, getI18nText } = this.asProps;

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
            <Input ml={1} w={135} state={state} onKeyDown={this.handlekeyDown}>
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
                role='button'
                interactive
                onClick={this.handlerAdd}
                pr='4px'
                hidden={!focus}
              >
                <CheckM color='green-300' />
              </SConfirmColor>
              <SClearConfirm
                aria-hidden='true'
                aria-label={getI18nText('colorFieldClear')}
                role='button'
                interactive
                onClick={this.handlerCancel}
                pl='4px'
                hidden={!focus}
              >
                <CloseM color='gray-300' />
              </SClearConfirm>
            </Input>
          </SInput>
        </SInputContainer>
      </SPaletteManager>,
    ) as React.ReactElement;
  }
}

export const InputColor = createComponent(InputColorRoot);
