import { Box, Flex } from '@semcore/base-components';
import { ButtonLink } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import { Component, sstyled, createComponent, Root } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import uniqueIdEnhance from '@semcore/core/lib/utils/uniqueID';
import Divider from '@semcore/divider';
import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import MathPlusM from '@semcore/icon/MathPlus/m';
import Input from '@semcore/input';
import React from 'react';

import ColorPicker from './ColorPicker';
import Item from './components/Item';
import type { ItemProps } from './components/Item.type';
import type { NSPaletteManager } from './PaletteManager.type';
import style from './style/color-picker.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import debounce from './utils/debounce';
import isValidHex from './utils/isValidHex';

type State = { focus: boolean };

class PaletteManagerRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSPaletteManager.Component>,
  typeof PaletteManagerRoot.enhance,
  NSPaletteManager.Handlers,
  WithI18nEnhanceProps,
  State,
  NSPaletteManager.DefaultProps
> {
  static displayName = 'PaletteManager';

  static style = style;
  static enhance = [i18nEnhance(localizedMessages), uniqueIdEnhance()] as const;

  static defaultProps = {
    defaultColors: [],
    i18n: localizedMessages,
    locale: 'en' as const,
  };

  refInput = React.createRef<HTMLInputElement>();

  state: State = {
    focus: false,
  };

  uncontrolledProps() {
    return {
      colors: [],
    };
  }

  bindHandlerItemRemove = (value: ItemProps['value']) => (event: React.MouseEvent | React.KeyboardEvent) => {
    event.stopPropagation();
    const { colors = [] } = this.asProps;
    this.handlers.colors(
      colors.filter((color: string) => color !== value),
      event,
    );
  };

  bindHandlerItemAdd = () => (value: string, event: React.MouseEvent) => {
    const { colors = [] } = this.asProps;
    if (!colors.includes(value)) {
      this.handlers.colors(colors.concat(value), event);
    }
  };

  bindHandlerButtonClick = () => () => {
    this.refInput.current?.focus();
    this.onFocus();
  };

  getColorsProps() {
    const { colors } = this.asProps;

    return {
      colors,
      editable: true,
      onPlusButtonClick: this.bindHandlerButtonClick(),
      getI18nText: this.asProps.getI18nText,
    };
  }

  getItemProps({ value }: ItemProps) {
    const { uid } = this.asProps;

    return {
      uid,
      editable: true,
      onRemove: this.bindHandlerItemRemove(value),
      getI18nText: this.asProps.getI18nText,
    };
  }

  onFocus = () => this.setState({ focus: true });

  onBlur = () => this.setState({ focus: false });

  getInputColorProps() {
    return {
      ref: this.refInput,
      onAdd: this.bindHandlerItemAdd(),
      focus: this.state.focus,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      getI18nText: this.asProps.getI18nText,
    };
  }

  render() {
    const { styles, Children } = this.asProps;

    return sstyled(styles)(
      <>
        <Divider />
        {Children.origin
          ? (
              <Children />
            )
          : (
              <>
                <PaletteManager.Colors />
                <PaletteManager.InputColor />
              </>
            )}
      </>,
    );
  }
}

export function Colors(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSPaletteManager.Colors.Component, typeof PaletteManagerRoot, 'Colors'>,
) {
  const { Children, styles, colors, onPlusButtonClick, getI18nText } = props;
  const SColors = Root;
  const SColorsContainer = Flex;
  const SPlusButton = 'div';

  return sstyled(styles)(
    <SColorsContainer>
      <SColors
        render={Box}
        role='listbox'
        aria-orientation='horizontal'
        aria-label={getI18nText('customColors')}
      >
        {Children.origin
          ? (
              <Children />
            )
          : (
              // TODO: Re-think the component structure.
              // @ts-ignore
              colors.map((color) => <PaletteManager.Item value={color} key={color} />)
            )}
      </SColors>
      <SPlusButton onClick={onPlusButtonClick} role='button' aria-label={getI18nText('addColor')}>
        <MathPlusM color='icon-primary-neutral' />
      </SPlusButton>
    </SColorsContainer>,
  );
}

class InputColor extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSPaletteManager.InputColor.Component, typeof PaletteManagerRoot, 'InputColor'>,
  [],
  NSPaletteManager.InputColor.Handlers,
  {},
  {},
  NSPaletteManager.InputColor.DefaultProps
> {
  static displayName = 'InputColor';

  static style = style;

  static defaultProps = {
    defaultValue: '',
    defaultState: 'normal',
  } as const;

  uncontrolledProps() {
    return {
      value: '',
      state: null,
    };
  }

  handlerAdd = (event: React.MouseEvent | React.KeyboardEvent) => {
    const { value, state } = this.asProps as any;

    if (value.length !== 0 && state === 'normal') {
      if (value[0] === '#') {
        this.asProps?.onAdd?.(value.toLowerCase(), event);
      } else {
        this.asProps?.onAdd?.(`#${value.toLowerCase()}`, event);
      }
      this.handlers.value('', event);
    }
  };

  handlerCancel = (event: React.MouseEvent) => {
    this.handlers.value('', event);
    this.handlers.state('normal');
  };

  handlerChange = debounce((value: string) => {
    if (value.length !== 0) {
      if (isValidHex(value)) {
        this.handlers.state('normal');
      } else {
        this.handlers.state('invalid');
      }
    } else {
      this.handlers.state('normal');
    }
  }, 300);

  handlekeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handlerAdd(event);
    }
  };

  render() {
    const { styles, state, value, onFocus, onBlur, focus, getI18nText, size } = this.asProps;

    const SPaletteManager = Box;
    const SInputValue = Root;
    const SInput = 'div';
    const SInputContainer = 'div';
    const SConfirmColor = Input.Addon;
    const SClearConfirm = Input.Addon;
    const SItemColor = Box;
    const valueColor = value?.[0] === '#' ? value : value ? `#${value}` : null;

    return sstyled(styles)(
      <SPaletteManager>
        <SItemColor data-value={valueColor} />
        <span aria-hidden='true'>#</span>
        <Input state={state} size={size} onKeyDown={this.handlekeyDown}>
          <SInputValue
            render={Input.Value}
            placeholder='FFFFFF'
            aria-label={getI18nText('colorField')}
            onChange={this.handlerChange}
            maxLength={7}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <SConfirmColor
            aria-hidden='true'
            aria-label={getI18nText('colorFieldConfirm')}
            // @ts-expect-error our runtime can override props via `use:`, but its not available in types
            use:tabIndex={-1}
            tag={ButtonLink}
            onClick={this.handlerAdd}
            mt={1}
            p={0}
            hidden={!focus}
          >
            <ButtonLink.Addon p={0}>
              <CheckM color='green-300' />
            </ButtonLink.Addon>
          </SConfirmColor>
          <SClearConfirm
            aria-hidden='true'
            aria-label={getI18nText('colorFieldClear')}
            // @ts-expect-error our runtime can override props via `use:`, but its not available in types
            use:tabIndex={-1}
            tag={ButtonLink}
            onClick={this.handlerCancel}
            mt={1}
            px={2}
            hidden={!focus}
          >
            <ButtonLink.Addon p={0}>
              <CloseM color='gray-300' />
            </ButtonLink.Addon>
          </SClearConfirm>
        </Input>
      </SPaletteManager>,
    );
  }
}

/**
 * PaletteManager
 *
 * {@link https://developer.semrush.com/intergalactic/components/color-picker/color-picker-api#palettemanager|API} | {@link https://developer.semrush.com/intergalactic/components/color-picker/color-picker-code/|Examples}
 */
export const PaletteManager = createComponent<
  NSPaletteManager.Component,
  typeof PaletteManagerRoot
>(PaletteManagerRoot, {
  Colors,
  InputColor,
  // @ts-ignore
  Item: ColorPicker.Item,
});
