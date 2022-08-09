import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { Box } from '@semcore/flex-box';
import ChevronDownM from '@semcore/icon/ChevronDown/m';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import PaletteManagerRoot from './PaletteManager';
import { Item, Colors, ColorsCustom, InputColor } from './components';

import style from './style/color-picker.shadow.css';

const defaultColors = [
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
];

type RootAsProps = {
  defaultVisible?: boolean;
  visible?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string, event: React.ChangeEvent) => void;
  colors?: string[];
  onColorsChange?: (value: string, event: React.ChangeEvent) => void;
  displayLabel?: boolean;
  styles?: React.CSSProperties;
  Children: React.FC;
};

type TriggerAsProps = {
  styles?: React.CSSProperties;
  value?: string;
  Children: React.FC;
};

type PopperAsProps = {
  styles?: React.CSSProperties;
  Children: React.FC;
};

type ItemAsProps = {
  value: string;
};

class ColorPickerRoot extends Component<RootAsProps> {
  static displayName = 'ColorPicker';

  static style = style;

  static defaultProps = () => ({
    defaultVisible: false,
    defaultValue: null,
    colors: defaultColors,
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
      visible: false,
    };
  }

  bindHandlerItemClick = (value: string) => (event: React.MouseEvent | React.KeyboardEvent) => {
    this.handlers.value(value, event);
    this.handlers.visible(false, event);
    event.preventDefault();
  };

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

  getItemProps(props: ItemAsProps) {
    const { value, displayLabel } = this.asProps;
    const isSelected = value === props.value;

    return {
      displayLabel,
      onClick: this.bindHandlerItemClick(props.value),
      onKeyDown: (event: React.KeyboardEvent) => {
        if (event.code === 'Enter' || event.code === 'Space') {
          this.bindHandlerItemClick(props.value)(event);
        }
      },
      selected: isSelected,
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

export function Trigger(props: TriggerAsProps) {
  const { Children } = props;

  return (
    <Root render={Dropdown.Trigger} tag={DefaultTrigger}>
      <Children />
    </Root>
  );
}

Trigger.enhance = [keyboardFocusEnhance()];

const DefaultTrigger = React.forwardRef(function (props: TriggerAsProps, ref) {
  const { styles, value } = props;
  const SDefaultTrigger = Root;
  const STriggerCircle = Box;
  const STriggerCircleLine = Box;

  return sstyled(styles)(
    <SDefaultTrigger render={Box} ref={ref}>
      <STriggerCircle value={value}>{!value && <STriggerCircleLine />}</STriggerCircle>
      <ChevronDownM color="gray-800" />
    </SDefaultTrigger>,
  ) as React.ReactElement;
});

export function Popper(props: PopperAsProps) {
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
}) as any;

const PaletteManager = createComponent(PaletteManagerRoot, {
  Item: ColorPicker.Item,
  Colors: ColorsCustom,
  InputColor,
}) as any;

export { PaletteManager, defaultColors };
export default ColorPicker;
