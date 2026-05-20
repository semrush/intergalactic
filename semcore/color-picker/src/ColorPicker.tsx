import { Box, Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import Dropdown from '@semcore/dropdown';
import ChevronDownM from '@semcore/icon/ChevronDown/m';
import React from 'react';

import type { NSColorPicker } from './ColorPicker.type';
import Item from './components/Item';
import type { ItemProps } from './components/Item.type';
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

class ColorPickerRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSColorPicker.Component>,
  typeof ColorPickerRoot.enhance,
  NSColorPicker.Handlers,
  WithI18nEnhanceProps,
  {},
  NSColorPicker.DefaultProps
> {
  static displayName = 'ColorPicker';

  static style = style;
  static enhance = [i18nEnhance(localizedMessages)] as const;

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
  } as const);

  uncontrolledProps() {
    return {
      value: null,
      visible: false,
    };
  }

  bindHandlerItemClick = (value: ItemProps['value']) => (event: React.MouseEvent | React.KeyboardEvent) => {
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

  getItemProps(props: ItemProps) {
    const { value, displayLabel, getI18nText, uid } = this.asProps;
    const isSelected = value === props.value;

    return {
      uid,
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

function Trigger(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSColorPicker.Trigger.Component, typeof ColorPickerRoot, 'Trigger'>,
) {
  const { Children, getI18nText, value } = props;

  const label = React.useMemo(() => {
    if (!value) {
      return getI18nText('emptyColor');
    }

    return getI18nText('currentColor', { color: value });
  }, [value]);

  return (
    <Root render={Dropdown.Trigger} tag={DefaultTrigger} aria-label={label} role='combobox'>
      <Children />
    </Root>
  );
}

const DefaultTrigger = React.forwardRef(function (
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSColorPicker.Trigger.Component, typeof ColorPickerRoot, 'Trigger'>,
  ref,
) {
  const { styles, value } = props;
  const SDefaultTrigger = Root;
  const STriggerCircle = Flex;

  return sstyled(styles)(
    <SDefaultTrigger render={Box} tag='button' tabIndex={0} ref={ref}>
      <STriggerCircle justifyContent='center' alignItems='center' data-value={value} />
      <ChevronDownM tabIndex={undefined} color='gray-800' />
    </SDefaultTrigger>,
  );
});

function Popper(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSColorPicker.Popper.Component, typeof ColorPickerRoot, 'Popper'>,
) {
  const { styles, Children, getI18nText, children } = props;
  const SColorPickerPopper = Root;

  return sstyled(styles)(
    <SColorPickerPopper render={Dropdown.Popper} aria-label={getI18nText('palette')}>
      {children ? <Children /> : <ColorPicker.Colors />}
    </SColorPickerPopper>,
  );
}

function Colors(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSColorPicker.Colors.Component, typeof ColorPickerRoot, 'Colors'>,
) {
  const { Children, styles, colors, getI18nText } = props;
  const SColors = Root;

  return sstyled(styles)(
    <SColors
      render={Box}
      role='listbox'
      aria-orientation='horizontal'
      aria-label={getI18nText('presetColors')}
    >
      {Children.origin
        ? (
            <Children />
          )
        : (
            // TODO: Re-think the component structure.
            // @ts-ignore
            colors?.map((color) => <ColorPicker.Item value={color} key={color} />)
          )}
    </SColors>,
  );
}

const ColorPicker = createComponent<
  NSColorPicker.Component,
  typeof ColorPickerRoot
>(ColorPickerRoot, {
  Trigger,
  Popper,
  Colors,
  Item,
});

export { defaultColors };

export default ColorPicker;
