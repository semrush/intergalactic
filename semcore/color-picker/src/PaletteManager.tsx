import React from 'react';
import createComponent, { Component, sstyled, Root, CORE_INSTANCE } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Divider from '@semcore/divider';

import style from './style/color-picker.shadow.css';
import { IInputColorProps } from './index';
import Input from '@semcore/input';
import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import { Item } from './components';

function isValidHex(hex: string) {
  const reg = /^#([0-9a-f]{3}){1,2}$/i;
  return reg.test('#' + hex);
}

class PaletteManagerRoot extends Component {
  static displayName = 'PaletteManager';

  static style = style;

  static defaultProps = {
    defaultColors: [],
  };

  _colors = [];
  refInput = React.createRef();

  uncontrolledProps() {
    return {
      colors: [],
    };
  }

  get colors() {
    return this.props.colors !== undefined ? this.asProps.colors : this._colors;
  }

  getColorsProps() {
    const { value, colors, onValueChange, onColorsChange, displayLabel } = this.asProps;

    return {
      // onValueChange: onValueChange,
      // selectedValue: value,
      colors,
      editable: true,
      onPlusButtonClick: () => {
        this.refInput.current?.focus();
      },
      // onColorsChange,
      // displayLabel,
    };
  }

  getItemProps({ value }) {
    this._colors.push(value);

    return {
      editable: true,
      onRemove: (e) => {
        e.stopPropagation();
        this.handlers.colors(
          this.colors.filter((color) => color !== value),
          e,
        );
      },
    };
  }

  getInputColorProps() {
    return {
      ref: this.refInput,
      onAdd: (value, e) => {
        // TODO
        this.handlers.colors(this.colors.concat(value), e);
      },
    };
  }

  render() {
    const { styles, Children } = this.asProps;

    this._colors = [];

    const PaletteManager = this[CORE_INSTANCE];

    return sstyled(styles)(
      <>
        <Divider mt={4} mb={4} />
        {Children.origin ? (
          <Children />
        ) : (
          <>
            <PaletteManager.Colors />
            <PaletteManager.InputColor />
          </>
        )}
      </>,
    );
  }
}

class InputColorRoot extends Component<IInputColorProps> {
  static defaultProps = {
    defaultValue: '',
    defaultState: 'normal',
  };

  uncontrolledProps() {
    return {
      state: null,
      value: null,
    };
  }

  handlerAdd = (e) => {
    const { value, state } = this.asProps;
    if (value.length != 0 && state === 'normal') {
      this.asProps?.onAdd(value.toLowerCase(), e);
      this.handlers.value('', e);
    }
  };

  handlerCancel = (e) => {
    this.handlers.value('', e);
  };

  handlerChange = (value) => {
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

  render() {
    const { styles, state, value } = this.asProps;

    const SPaletteManager = Box;
    const SInputValue = Root;
    const SInput = 'div';

    return sstyled(styles)(
      <SPaletteManager>
        <Item value={`#${value}`} withoutHover={true} />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          #
          <SInput>
            <Input ml={1} w={135} state={state}>
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
        </div>
      </SPaletteManager>,
    ) as React.ReactElement;
  }
}

const InputColor = createComponent(InputColorRoot);

export { InputColor };
export default PaletteManagerRoot;

// displayLabel for Colors in PaletteManager
// unit tests
// examples
// a11y
// fix styles
// everywhere add types
