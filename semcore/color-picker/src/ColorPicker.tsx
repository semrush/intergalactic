import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { Box } from '@semcore/flex-box';
import ChevronDownM from '@semcore/icon/ChevronDown/m';
import PaletteManagerRoot, { InputColor } from './PaletteManager';
import { Item, Colors, ColorsCustom } from './components';

import style from './style/color-picker.shadow.css';

class ColorPickerRoot extends Component {
  static displayName = 'ColorPicker';

  static style = style;

  static defaultProps = () => ({
    defaultValue: null,
    colors: [
      null,
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
    const { value } = this.asProps;

    return {
      value,
    };
  }

  getColorsProps() {
    const { colors } = this.asProps;

    return {
      colors,
    };
  }

  getItemProps(props) {
    const { value, displayLabel } = this.asProps;

    return {
      displayLabel,
      onClick: this.bindHandlerItemClick(props.value),
      selected: value === props.value,
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

const DefaultTrigger = React.forwardRef(function (props, ref) {
  const SDefaultTrigger = Root;
  const STriggerCircle = Box;

  return sstyled(props.styles)(
    <SDefaultTrigger render={Box} ref={ref}>
      <STriggerCircle value={props.value} />
      <ChevronDownM />
    </SDefaultTrigger>,
  ) as React.ReactElement;
});

export function Popper(props) {
  const { styles, Children } = props;
  const SColorPickerPopper = Root;

  return sstyled(styles)(
    <SColorPickerPopper render={Dropdown.Popper}>
      <Children />
    </SColorPickerPopper>,
  );
}

Popper.defaultProps = () => {
  return {
    children: <ColorPicker.Colors />,
  };
};

const ColorPicker = createComponent(ColorPickerRoot, {
  Trigger,
  Popper,
  Item,
  Colors,
});

const PaletteManager = createComponent(PaletteManagerRoot, {
  // Divider,
  Item: ColorPicker.Item,
  Colors: ColorsCustom,
  InputColor,
});

export { PaletteManager };
export default ColorPicker;
