import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';

import style from './style/color-picker.shadow.css';

class ColorPickerRoot extends Component {
  static displayName = 'ColorPicker';

  static style = style;

  render() {
    const SColorPicker = this.Root;
    const { styles } = this.asProps;

    return sstyled(styles)(<SColorPicker render="div">GENERATE TEMPLATE</SColorPicker>);
  }
}

export function Trigger() {
  return <Root render={Dropdown.Trigger} tag={ButtonTrigger} />;
}

export function Popper(props) {
  const SPopper = Root;
  return sstyled(props.styles)(
    <SPopper render={Dropdown.Popper} role="region" aria-label="calendar-container" />,
  );
}

const ColorPicker = createComponent(
  ColorPickerRoot,
  {
    Trigger,
    Popper,
  },
  {
    parent: Popper,
  },
);

export default ColorPicker;

// export default createComponent(ColorPicker)
