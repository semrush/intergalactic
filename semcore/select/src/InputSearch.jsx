import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import SearchM from '@semcore/icon/Search/m';
import CloseM from '@semcore/icon/Close/m';
import Input from '@semcore/input';
import { selectContext } from './context';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

import style from './style/input-search.shadow.css';

const sizeToIcon = {
  m: [SearchM, CloseM],
  l: [SearchM, CloseM],
};

class InputSearch extends Component {
  static displayName = 'InputSearch';

  static style = style;
  static enhance = [i18nEnhance(localizedMessages)];
  static defaultProps = {
    defaultValue: '',
    i18n: localizedMessages,
    locale: 'en',
  };
  inputRef = React.createRef();
  closeIconRef = React.createRef();

  static contextType = selectContext;

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  handleClear = (e) => {
    this.handlers.value('', e);
    setTimeout(() => {
      if (
        document.activeElement === document.body ||
        document.activeElement === this.closeIconRef.current
      ) {
        this.inputRef.current?.focus();
      }
    }, 0);
  };

  render() {
    const Value = Root;
    const SInputSearch = Input;
    const SClose = Input.Addon;
    const { size, value, styles, getI18nText } = this.asProps;
    const finalSize = size || this.context.size || 'm';
    const hideClose = !value;
    const IconClose = sizeToIcon[finalSize][1];
    const IconSearch = sizeToIcon[finalSize][0];

    return sstyled(styles)(
      <SInputSearch size={finalSize} styles={styles}>
        <Input.Addon>
          <IconSearch />
        </Input.Addon>
        <Value render={Input.Value} autoFocus ref={this.inputRef} />
        <SClose
          role='button'
          tag={IconClose}
          ref={this.closeIconRef}
          /* hide through css because the width of the input changes */
          hide={hideClose}
          aria-hidden={hideClose}
          interactive
          aria-label={getI18nText('clearSearch')}
          onClick={this.handleClear}
        />
      </SInputSearch>,
    );
  }
}

export default createComponent(InputSearch);
