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
    defaultColors: [
      '#a474cd',
      '#8a8bff',
      'pink',
      'violet',
      '#82b7ff',
      '#6ad0de',
      'aqua',
      '#78debd',
      '#dbdcff',
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
      colors: [
        '#a474cd',
        '#8a8bff',
        'pink',
        'violet',
        '#82b7ff',
        '#6ad0de',
        'aqua',
        '#78debd',
        '#dbdcff',
      ],
    };
  }

  getTriggerProps() {
    const { value, styles } = this.asProps;

    return {
      value,
      styles,
    };
  }

  getPopperProps() {
    const { styles, colors, onChange, value } = this.asProps;

    return {
      colors,
      onValueChange: onChange,
      selectedValue: value,
      styles,
    };
  }

  getItemProps(props) {
    const { value } = this.asProps;

    return {
      onClick: (e) => {
        this.handlers.value(props.value, e);
      },
      selected: value === props.value,
    };
  }

  getColorsProps() {
    const { value, colors, onChange } = this.asProps;

    return {
      onValueChange: onChange,
      selectedValue: value,
      colors,
    };
  }

  getPaletteManagerProps() {
    const { value, onChange } = this.asProps;

    return {
      value,
      onChange,
    };
  }

  render() {
    const { styles, Children } = this.asProps;

    return sstyled(styles)(
      <Root render={Dropdown} stretch={false}>
        <Children />
      </Root>,
    );
  }
}

export function Trigger(props) {
  const { Children } = props;

  return (
    <Root render={Dropdown.Trigger} tag="div">
      <Children />
    </Root>
  );
}

Trigger.defaultProps = (props) => {
  return {
    children: <DefaultTrigger {...props} />,
  };
};

function DefaultTrigger(props) {
  const SDefaultTrigger = Root;
  const STriggerCircle = Root;

  return sstyled(props.styles)(
    <SDefaultTrigger render={Box}>
      <STriggerCircle value={props.value} needBorder={props.value ? false : true} />
      <ChevronDownM />
    </SDefaultTrigger>,
  ) as React.ReactElement;
}

export function Popper(props) {
  const SColorPickerPopper = Root;
  return sstyled(props.styles)(<SColorPickerPopper render={Dropdown.Popper} />);
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
