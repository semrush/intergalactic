import React from 'react';
import { Component, sstyled, CORE_INSTANCE } from '@semcore/core';
import Divider from '@semcore/divider';

import style from './style/color-picker.shadow.css';

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

  bindHandlerItemRemove = (value: string) => (e: React.SyntheticEvent) => {
    e.stopPropagation();
    this.handlers.colors(
      this.colors.filter((color: string) => color !== value),
      e,
    );
  };

  getColorsProps() {
    const { colors } = this.asProps;

    return {
      colors,
      editable: true,
      onPlusButtonClick: () => {
        this.refInput.current?.focus();
      },
    };
  }

  getItemProps({ value }) {
    // const { displayLabel } = this.asProps;
    this._colors.push(value);

    return {
      // displayLabel,
      editable: true,
      onRemove: this.bindHandlerItemRemove(value),
    };
  }

  getInputColorProps() {
    return {
      ref: this.refInput,
      onAdd: (value, e) => {
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
        <Divider mt={3} mb={3} />
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

export default PaletteManagerRoot;

// unit tests
// examples
// a11y
// fix styles
// everywhere add types
