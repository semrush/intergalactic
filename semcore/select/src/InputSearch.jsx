import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import SearchM from '@semcore/icon/Search/m';
import CloseM from '@semcore/icon/Close/m';
import Input from '@semcore/input';
import { selectContext } from './context';

import style from './style/input-search.shadow.css';

const MAP_SIZE_TO_ICON = {
  m: [SearchM, CloseM],
  l: [SearchM, CloseM],
};

class InputSearch extends Component {
  static displayName = 'InputSearch';

  static style = style;

  static defaultProps = {
    defaultValue: '',
  };

  static contextType = selectContext;

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  handleClear = (e) => {
    this.handlers.value('', e);
  };

  render() {
    const Value = Root;
    const SInputSearch = Input;
    const SClose = Input.Addon;
    const { size, value, styles } = this.asProps;
    const finalSize = size || this.context.size;
    const hideClose = !value;
    const IconClose = MAP_SIZE_TO_ICON[finalSize][1];
    const IconSearch = MAP_SIZE_TO_ICON[finalSize][0];

    return sstyled(styles)(
      <SInputSearch size={finalSize} styles={styles}>
        <Input.Addon>
          <IconSearch />
        </Input.Addon>
        <Value render={Input.Value} autoFocus />
        <SClose
          role="button"
          /* hide through css because the width of the input changes */
          hide={hideClose}
          aria-hidden={hideClose}
          interactive
          aria-label="Clear search field"
          onClick={this.handleClear}
        >
          <IconClose />
        </SClose>
      </SInputSearch>,
    );
  }
}

export default createComponent(InputSearch);
