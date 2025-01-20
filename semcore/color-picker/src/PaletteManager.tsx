import React from 'react';
import { Component, sstyled, CORE_INSTANCE } from '@semcore/core';
import Divider from '@semcore/divider';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';

import style from './style/color-picker.shadow.css';
import uniqueIdEnhance from '@semcore/core/lib/utils/uniqueID';

type RootAsProps = {
  defaultColors?: string[];
  colors?: string[];
  onColorsChange?: (value: string, event: React.ChangeEvent) => void;
  styles?: React.CSSProperties;
  Children: React.FC;
  getI18nText: (messageId: string, values?: { [key: string]: string | number }) => string;
};

type State = { focus: boolean };

const enhance = [i18nEnhance(localizedMessages), uniqueIdEnhance()] as const;

class PaletteManagerRoot extends Component<RootAsProps, {}, State, typeof enhance> {
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

  render(this: any) {
    const { styles, Children } = this.asProps;

    const PaletteManager = this[CORE_INSTANCE];

    return sstyled(styles)(
      <>
        <Divider mt={3} mb={3} />
        {Children.origin ? (
          <Children />
        ) : (
          <>
            <PaletteManager.Colors />
            <PaletteManager.InputColor />
          </>
        )}
      </>,
    );
  }
}

export default PaletteManagerRoot;
