import React from 'react';
import createComponent, { Component, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Input from '@semcore/input';
import SearchM from '@semcore/icon/Search/m';
import CloseM from '@semcore/icon/Close/m';
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
    const SInputSearch = Box;
    const { size, value, forwardRef, styles } = this.asProps;
    const finalSize = size || this.context.size;

    return sstyled(styles)(
      <SInputSearch size={finalSize} use:filled={value}>
        <Input size={finalSize}>
          <Input.Addon tag={MAP_SIZE_TO_ICON[finalSize][0]} />
          <Input.Value ref={forwardRef} autoFocus {...this.asProps} />
          <Input.Addon
            tag={MAP_SIZE_TO_ICON[finalSize][1]}
            role="button"
            interactive
            onClick={this.handleClear}
          />
        </Input>
      </SInputSearch>,
    );
  }
}

export default createComponent(InputSearch);
