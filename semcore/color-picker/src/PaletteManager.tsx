import React from 'react';
import { Component, sstyled, CORE_INSTANCE } from '@semcore/core';
import Divider from '@semcore/divider';

import style from './style/color-picker.shadow.css';

type RootAsProps = {
  defaultColors?: string[];
  colors?: string[];
  styles?: React.CSSProperties;
  Children: React.FC;
};

class PaletteManagerRoot extends Component<RootAsProps> {
  static displayName = 'PaletteManager';

  static style = style;

  static defaultProps = {
    defaultColors: [],
  };

  _colors: string[] = [];
  refInput = React.createRef<HTMLInputElement>();

  uncontrolledProps() {
    return {
      colors: [],
    };
  }

  get colors(): string[] {
    return this.props.colors !== undefined ? this.asProps.colors : this._colors;
  }

  bindHandlerItemRemove = (value: string) => (event: React.MouseEvent) => {
    event.stopPropagation();
    this.handlers.colors(
      this.colors.filter((color: string) => color !== value),
      event,
    );
  };

  bindHandlerItemAdd = () => (value: string, event: React.MouseEvent) => {
    if (!this.colors.includes(value)) {
      this.handlers.colors(this.colors.concat(value), event);
    }
  };

  bindHandlerButtonClick = () => () => this.refInput.current?.focus();

  getColorsProps() {
    const { colors } = this.asProps;

    return {
      colors,
      editable: true,
      onPlusButtonClick: this.bindHandlerButtonClick(),
    };
  }

  getItemProps({ value }) {
    this._colors.push(value);

    return {
      editable: true,
      onRemove: this.bindHandlerItemRemove(value),
      // TODO: need to add tabIndex and checking selected value
    };
  }

  getInputColorProps() {
    return {
      ref: this.refInput,
      onAdd: this.bindHandlerItemAdd(),
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
