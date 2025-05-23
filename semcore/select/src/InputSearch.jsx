import React from 'react';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import SearchM from '@semcore/icon/Search/m';
import CloseM from '@semcore/icon/Close/m';
import Input from '@semcore/input';
import { ButtonLink } from '@semcore/button';
import { selectContext } from './context';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
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
    const { value, onChange, getI18nText, children: hasChildren } = this.asProps;
    return {
      value,
      onChange: hasChildren ? onChange : undefined,
      autoFocus: true,
      ref: this.inputRef,
      placeholder: getI18nText('Select.InputSearch.Value:placeholder'),
      'aria-label': getI18nText('Select.InputSearch.Value:aria-label'),
    };
  }
  getClearProps() {
    const { value, getI18nText } = this.asProps;
    return {
      ref: this.closeIconRef,
      /* hide through css because the width of the input changes */
      hide: !value,
      'aria-hidden': !value,
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
  const { styles } = props;
  return sstyled(styles)(<SSearchClear render={ButtonLink} addonLeft={CloseM} use={'secondary'} />);
};

const InputSearch = createComponent(InputSearchRoot, {
  SearchIcon: SearchIcon,
  Value: SearchValue,
  Clear: SearchClear,
});

export default InputSearch;
