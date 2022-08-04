import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
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
  Children: any;
};

function isValidHex(hex: string) {
  const reg = /^#([0-9a-f]{3}){1,2}$/i;
  return reg.test('#' + hex);
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
    const { value, state } = this.asProps;

    if (value.length !== 0 && state === 'normal') {
      this.asProps?.onAdd(`#${value.toLowerCase()}`, event);
      this.handlers.value('', event);
    }
  };

  handlerCancel = (event: React.MouseEvent) => {
    this.handlers.value('', event);
  };

  handlerChange = (value: string) => {
    if (value.length !== 0) {
      if (isValidHex(value)) {
        this.handlers.state('normal');
      } else {
        this.handlers.state('invalid');
      }
    } else {
      this.handlers.state('normal');
    }
  };

  handlekeyDown = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      this.handlerAdd(event);
    }
  };

  render() {
    const { styles, state, value } = this.asProps;

    const SPaletteManager = Box;
    const SInputValue = Root;
    const SInput = 'div';
    const SInputContainer = 'div';
    const SItem = Box;

    return sstyled(styles)(
      <SPaletteManager>
        <SItem value={`#${value}`} />
        <SInputContainer>
          #
          <SInput>
            <Input ml={1} w={135} state={state} onKeyDown={this.handlekeyDown}>
              <SInputValue
                render={Input.Value}
                placeholder="FFFFFF"
                onChange={this.handlerChange}
                maxLength={6}
              />
              <Input.Addon role="button" interactive onClick={this.handlerAdd} p="0">
                <CheckM color="#00C192" />
              </Input.Addon>
              <Input.Addon role="button" interactive onClick={this.handlerCancel}>
                <CloseM />
              </Input.Addon>
            </Input>
          </SInput>
        </SInputContainer>
      </SPaletteManager>,
    ) as React.ReactElement;
  }
}

export const InputColor = createComponent(InputColorRoot);
