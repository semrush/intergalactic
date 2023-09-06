import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import SearchM from '@semcore/icon/Search/m';
import CloseM from '@semcore/icon/Close/m';
import Input from '@semcore/input';
import { selectContext } from './context';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

import style from './style/input-search.shadow.css';

class InputSearchRoot extends Component {
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

  getValueProps() {
    const { value } = this.asProps;
    return {
      value,
      onChange: this.handlers.value,
      autoFocus: true,
      ref: this.inputRef,
    };
  }
  getClearProps() {
    const { value, getI18nText } = this.asProps;
    return {
      role: 'button',
      ref: this.closeIconRef,
      /* hide through css because the width of the input changes */
      hide: !value,
      'aria-hidden': !value,
      interactive: true,
      'aria-label': getI18nText('clearSearch'),
      onClick: this.handleClear,
    };
  }

  render() {
    const Value = Root;
    const SInputSearch = Input;
    const { size, styles, children: hasChildren, Children } = this.asProps;

    return sstyled(styles)(
      <SInputSearch size={size || this.context.size || 'm'} styles={styles}>
        {hasChildren ? (
          <Children />
        ) : (
          <>
            <InputSearch.SearchIcon />
            <Value render={InputSearch.Value} />
            <InputSearch.Clear />
          </>
        )}
      </SInputSearch>,
    );
  }
}

const SearchIcon = (props) => {
  const SSearchIcon = Root;
  const { styles } = props;
  return sstyled(styles)(
    <SSearchIcon render={Input.Addon}>
      <SearchM />
    </SSearchIcon>,
  );
};
const SearchValue = (props) => {
  const SSearchValue = Root;
  const { styles } = props;
  return sstyled(styles)(<SSearchValue render={Input.Value} />);
};
const SearchClear = (props) => {
  const SSearchClear = Root;
  const { styles, Children } = props;
  return sstyled(styles)(
    <SSearchClear render={Input.Addon} tag={CloseM}>
      <Children />
    </SSearchClear>,
  );
};

const InputSearch = createComponent(InputSearchRoot, {
  SearchIcon: SearchIcon,
  Value: SearchValue,
  Clear: SearchClear,
});

export default InputSearch;
