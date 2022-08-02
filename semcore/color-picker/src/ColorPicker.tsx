import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { Box } from '@semcore/flex-box';
import ChevronDownM from '@semcore/icon/ChevronDown/m';
import PaletteManager from './PaletteManager';
import { Item, Colors } from './components';

import style from './style/color-picker.shadow.css';

class ColorPickerRoot extends Component {
  static displayName = 'ColorPicker';

  static style = style;

  static defaultProps = () => ({
    defaultValue: null,
    colors: [
      '#2BB3FF',
      '#8649E1',
      '#C695FF',
      '#F67CF2',
      '#FFA9FA',
      '#FF8786',
      '#FF8C43',
      '#FDC23C',
      '#66C030',
      '#9BD85D',
      '#C7EE96',
    ],
    children: (
      <>
        <ColorPicker.Trigger />
        <ColorPicker.Popper />
      </>
    ),
  });

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  bindHandlerItemClick = (value: string) => (e: React.SyntheticEvent) =>
    this.handlers.value(value, e);

  getTriggerProps() {
    const { value, styles } = this.asProps;

    return {
      value,
      styles,
    };
  }

  getPopperProps() {
    const { styles, colors, onValueChange, value, displayLabel } = this.asProps;

    return {
      colors,
      onValueChange,
      selectedValue: value,
      styles,
      displayLabel,
    };
  }

  getItemProps(props) {
    const { value } = this.asProps;

    return {
      onClick: this.bindHandlerItemClick(props.value),
      selected: value === props.value,
    };
  }

  getColorsProps() {
    const { value, colors, onValueChange, displayLabel } = this.asProps;

    return {
      onValueChange,
      selectedValue: value,
      colors,
      displayLabel,
    };
  }

  getPaletteManagerProps() {
    const { value, onValueChange } = this.asProps;

    return {
      value,
      onValueChange,
    };
  }

  render() {
    const { styles, Children } = this.asProps;

    return sstyled(styles)(
      // maybe it is better to delete stretch from here, then users can themselve choose width and different
      // amount of colors will look good because of flex wrap. parent component will provide width
      <Root render={Dropdown} stretch={false}>
        <Children />
      </Root>,
    );
  }
}

export function Trigger(props) {
  const { Children } = props;

  return (
    <Root render={Dropdown.Trigger} tag={DefaultTrigger}>
      <Children />
    </Root>
  );
}

function DefaultTrigger(props) {
  const SDefaultTrigger = Root;
  const STriggerCircle = Box;

  return sstyled(props.styles)(
    <SDefaultTrigger render={Box}>
      <STriggerCircle value={props.value} />
      <ChevronDownM />
    </SDefaultTrigger>,
  ) as React.ReactElement;
}

export function Popper(props) {
  const { styles, Children } = props;
  const SColorPickerPopper = Root;

  return sstyled(styles)(
    <SColorPickerPopper render={Dropdown.Popper}>
      <Children />
    </SColorPickerPopper>,
  );
}

Popper.defaultProps = (props) => {
  return {
    children: <Colors {...props} />,
  };
};

const ColorPicker = createComponent(ColorPickerRoot, {
  Trigger,
  Popper,
  Item,
  Colors,
  PaletteManager,
});

export default ColorPicker;
