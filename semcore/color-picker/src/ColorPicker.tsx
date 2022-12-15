import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { Box } from '@semcore/flex-box';
import ChevronDownM from '@semcore/icon/ChevronDown/m';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import PaletteManagerRoot from './PaletteManager';
import { Item, Colors, ColorsCustom, InputColor } from './components';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';

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
  getI18nText: (messageId: string, values?: { [key: string]: string }) => string;
};

type TriggerAsProps = {
  styles?: React.CSSProperties;
  value?: string;
  popperVisible: boolean;
  Children: React.FC;
  getI18nText: (messageId: string, values?: { [key: string]: string }) => string;
};

type PopperAsProps = {
  styles?: React.CSSProperties;
  Children: React.FC;
  getI18nText: (messageId: string, values?: { [key: string]: string }) => string;
};

type ItemAsProps = {
  value: string;
};

class ColorPickerRoot extends Component<RootAsProps> {
  static displayName = 'ColorPicker';

  static style = style;
  static enhance = [i18nEnhance()];

  static defaultProps = () => ({
    defaultVisible: false,
    defaultValue: null,
    colors: defaultColors,
    i18n: localizedMessages,
    locale: 'en',
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
    const { value, visible, getI18nText } = this.asProps;

    return {
      value,
      popperVisible: visible,
      getI18nText,
    };
  }

  getColorsProps() {
    const { colors, getI18nText } = this.asProps;

    return {
      colors,
      getI18nText,
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

  getPopperProps() {
    const { getI18nText } = this.asProps;

    return { getI18nText };
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
  const { Children, value, popperVisible, getI18nText } = props;
  const label = React.useMemo(() => {
    const currentColor = value
      ? getI18nText('currentColor', { color: value })
      : getI18nText('emptyColor');
    if (popperVisible) {
      return getI18nText('goToPaletteHint', { currentColor });
    }
    return currentColor;
  }, [value, popperVisible]);

  return (
    <Root render={Dropdown.Trigger} tag={DefaultTrigger} aria-label={label}>
      <Children />
    </Root>
  );
}

Trigger.enhance = [keyboardFocusEnhance()];

const DefaultTrigger = React.forwardRef(function (props: TriggerAsProps, ref) {
  const { styles, value } = props;
  const SDefaultTrigger = Root;
  const STriggerCircle = Box;
  const STriggerCircleLine = 'svg';

  return sstyled(styles)(
    <SDefaultTrigger render={Box} ref={ref}>
      <STriggerCircle value={value}>
        {!value && (
          <STriggerCircleLine
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="1"
              height="14"
              transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 10 1)"
              fill="#E0E1E9"
            />
          </STriggerCircleLine>
        )}
      </STriggerCircle>
      <ChevronDownM color="gray-800" />
    </SDefaultTrigger>,
  ) as React.ReactElement;
});

export function Popper(props: PopperAsProps) {
  const { styles, Children, getI18nText } = props;
  const SColorPickerPopper = Root;

  return sstyled(styles)(
    <SColorPickerPopper render={Dropdown.Popper} aria-label={getI18nText('palette')}>
      <Children />
    </SColorPickerPopper>,
  );
}

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
