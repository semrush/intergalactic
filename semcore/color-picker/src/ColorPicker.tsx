import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { Box } from '@semcore/flex-box';
import ChevronDownM from '@semcore/icon/ChevronDown/m';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import PaletteManagerRoot from './PaletteManager';
import { Item, Colors, ColorsCustom, InputColor } from './components';

import style from './style/color-picker.shadow.css';

type RootAsProps = {
  defaultVisible?: boolean;
  visible?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string, event: React.ChangeEvent) => void;
  colors?: string[];
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

class ColorPickerRoot extends Component<RootAsProps> {
  static displayName = 'ColorPicker';

  static style = style;

  static defaultProps = () => ({
    defaultVisible: false,
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
      visible: null,
    };
  }

  bindHandlerItemClick = (value: string) => (e: React.MouseEvent) => {
    this.handlers.value(value, e);
    this.handlers.visible(false, e);
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

  getItemProps(props) {
    const { value, displayLabel } = this.asProps;
    const isSelected = value === props.value;

    return {
      displayLabel,
      onClick: this.bindHandlerItemClick(props.value),
      onKeyDown: (e) => {
        if (e.keyCode === 13) {
          this.bindHandlerItemClick(props.value)(e);
        }
      },
      selected: isSelected,
      // tabIndex: isSelected ? 0 : -1,
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

  return sstyled(styles)(
    <SDefaultTrigger render={Box} ref={ref}>
      <STriggerCircle value={value} />
      <ChevronDownM color="#191B23" />
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

export { PaletteManager };
export default ColorPicker;
