import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Divider from '@semcore/divider';
import { Colors, InputColor, Item } from './components';

import style from './style/color-picker.shadow.css';

class PaletteManagerRoot extends Component {
  static displayName = 'PaletteManager';

  static style = style;

  static defaultProps = () => ({
    defaultInputValue: '',
    defaultColors: ['violet'],
  });

  constructor(props) {
    super(props);
    this.refInput = React.createRef();
  }

  uncontrolledProps() {
    return {
      inputValue: '',
      colors: [],
    };
  }

  getColorsProps() {
    const { value, colors, onValueChange, onColorsChange, displayLabel } = this.asProps;

    return {
      onValueChange: onValueChange,
      selectedValue: value,
      colors,
      editable: true,
      onPlusButtonClick: () => {
        this.refInput.current.focus();
      },
      onColorsChange,
      displayLabel,
    };
  }

  getInputColorProps() {
    const { inputValue, styles, onInputValueChange, colors, onColorsChange } = this.asProps;

    return {
      inputValue,
      styles,
      onInputValueChange,
      colors,
      onColorsChange,
    };
  }

  render() {
    const SPaletteManager = Root;
    const { inputValue, children, Children } = this.asProps;

    if (children) {
      return sstyled(this.asProps.styles)(
        <Root render={Box}>
          <Children />
        </Root>,
      );
    }

    return sstyled(this.asProps.styles)(
      <>
        <PaletteManager.Divider mt={4} mb={4} />
        <PaletteManager.Colors />
        <SPaletteManager render={Box}>
          <PaletteManager.Item value={`#${inputValue}`} needBorder={true} withoutHover={true} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            #<PaletteManager.InputColor ref={this.refInput} />
          </div>
        </SPaletteManager>
      </>,
    );
  }
}

const PaletteManager = createComponent(PaletteManagerRoot, {
  Divider,
  Item,
  Colors,
  InputColor,
});

export default PaletteManager;

// fix styles
// everywhere add types
