import { Box } from '@semcore/base-components';
import { AbstractComponent, sstyled, createComponent, Root } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import uniqueIdEnhance from '@semcore/core/lib/utils/uniqueID';
import Divider from '@semcore/divider';
import React from 'react';

import type { PaletteManagerProps } from './ColorPicker.types';
import { InputColorRoot, Item, ColorsCustom } from './components';
import style from './style/color-picker.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

type State = { focus: boolean };

const enhance = [i18nEnhance(localizedMessages), uniqueIdEnhance()] as const;

class PaletteManagerRoot extends AbstractComponent<PaletteManagerProps, typeof enhance, { colors: string[] }, {}, State> {
  static displayName = 'PaletteManager';

  static style = style;
  static enhance = enhance;

  static defaultProps = {
    defaultColors: [],
    i18n: localizedMessages,
    locale: 'en',
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

  bindHandlerItemRemove = (value: string) => (event: React.MouseEvent) => {
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

  getItemProps({ value }: any) {
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
    const SPaletteRoot = Root();

    return sstyled(styles)(
      <SPaletteRoot render={Box} display='contents'>
        <Divider mt={3} mb={3} />
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
      </SPaletteRoot>,
    );
  }
}

export const PaletteManager = createComponent(PaletteManagerRoot, {
  Item,
  Colors: ColorsCustom,
  InputColor: InputColorRoot,
});
