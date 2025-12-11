import { Box, Flex } from '@semcore/base-components';
import { createComponent, AbstractComponent, sstyled, Root } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import uniqueIdEnhance from '@semcore/core/lib/utils/uniqueID';
import Dropdown from '@semcore/dropdown';
import ChevronDownM from '@semcore/icon/ChevronDown/m';
import React from 'react';

import type { ColorPickerProps, InputColorProps } from './ColorPicker.types';
import { Item, Colors } from './components';
import style from './style/color-picker.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

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

type TriggerAsProps = {
  styles?: React.CSSProperties;
  value?: string;
  popperVisible: boolean;
  Children: React.FC;
  getI18nText: (messageId: string, values?: { [key: string]: string | number }) => string;
};

type PopperAsProps = {
  styles?: React.CSSProperties;
  Children: React.FC;
  children?: React.ReactNode;
  getI18nText: (messageId: string, values?: { [key: string]: string | number }) => string;
};

class ColorPickerRoot extends AbstractComponent<ColorPickerProps, typeof ColorPickerRoot.enhance, { value: null; visible: boolean }> {
  static displayName = 'ColorPicker';

  static style = style;
  static enhance = [i18nEnhance(localizedMessages), uniqueIdEnhance()] as const;

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

  bindHandlerItemClick = (value: string | undefined) => (event: React.MouseEvent | React.KeyboardEvent) => {
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

  getInputColorProps() {
    const { getI18nText } = this.asProps;

    return {
      getI18nText,
    };
  }

  getItemProps(props: InputColorProps) {
    const { value, displayLabel, getI18nText, uid } = this.asProps;
    const isSelected = value === props.value;

    return {
      displayLabel,
      onClick: this.bindHandlerItemClick(props.value),
      onKeyDown: (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.bindHandlerItemClick(props.value)(event);
        }
      },
      selected: isSelected,
      getI18nText,
      uid,
    };
  }

  getPopperProps() {
    const { getI18nText } = this.asProps;

    return { getI18nText };
  }

  render() {
    const { styles, Children } = this.asProps;
    const SColorRoot = Root();

    return sstyled(styles)(
      <SColorRoot render={Dropdown} stretch={false}>
        <Children />
      </SColorRoot>,
    );
  }
}

export function Trigger(props: TriggerAsProps) {
  const { Children, getI18nText, value } = props;

  const label = React.useMemo(() => {
    if (!value) {
      return getI18nText('emptyColor');
    }

    return getI18nText('currentColor', { color: value });
  }, [value]);

  const SColorTriggerRoot = Root();

  return (
    <SColorTriggerRoot render={Dropdown.Trigger} tag={DefaultTrigger} aria-label={label} role='combobox'>
      <Children />
    </SColorTriggerRoot>
  );
}

const DefaultTrigger = React.forwardRef(function (props: TriggerAsProps, ref) {
  const { styles, value } = props;
  const SDefaultTrigger = Root();
  const STriggerCircle = Flex;

  return sstyled(styles)(
    <SDefaultTrigger render={Box} tag='button' tabIndex={0} ref={ref}>
      <STriggerCircle justifyContent='center' alignItems='center' data-value={value} />
      <ChevronDownM tabIndex={undefined} color='gray-800' />
    </SDefaultTrigger>,
  ) as React.ReactElement;
});

export function Popper(props: PopperAsProps) {
  const { styles, Children, getI18nText, children } = props;
  const SColorPickerPopper = Root();

  return sstyled(styles)(
    <SColorPickerPopper render={Dropdown.Popper} aria-label={getI18nText('palette')}>
      {children ? <Children /> : <ColorPicker.Colors getI18nText={props.getI18nText} />}
    </SColorPickerPopper>,
  );
}

export const ColorPicker = createComponent(ColorPickerRoot, {
  Trigger,
  Popper,
  Item,
  Colors,
});

export {
  defaultColors,
};
