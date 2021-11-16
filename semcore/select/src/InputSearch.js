import React from 'react';
import createComponent, { Component, CONTEXT_COMPONENT, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Input from '@semcore/input';
import Divider from '@semcore/divider';
import SearchXS from '@semcore/icon/lib/Search/xs';
import CloseXS from '@semcore/icon/lib/Close/xs';
import SearchS from '@semcore/icon/lib/Search/s';
import CloseS from '@semcore/icon/lib/Close/s';
import SearchM from '@semcore/icon/lib/Search/m';
import CloseM from '@semcore/icon/lib/Close/m';
import style from './style/select.shadow.css';

import Select from './Select';

const MAP_SIZE_TO_ICON = {
  m: [SearchXS, CloseXS],
  l: [SearchS, CloseS],
  xl: [SearchM, CloseM],
};

class InputSearch extends Component {
  static displayName = 'InputSearch';

  static style = style;

  static defaultProps = {
    defaultValue: '',
  };

  static contextType = Select[CONTEXT_COMPONENT];

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  handleClear = (e) => {
    this.handlers.value('', e);
  };

  render() {
    const SBox = Box;
    const SInput = Input;
    const { size, value, forwardRef, styles } = this.asProps;
    const finalSize = size || this.context.size;

    return sstyled(styles)(
      <>
        <SBox size={finalSize}>
          <SInput size={finalSize}>
            <Input.Addon tag={MAP_SIZE_TO_ICON[finalSize][0]} />
            <Input.Value ref={forwardRef} autoFocus {...this.asProps} />
            <Input.Addon
              tag={MAP_SIZE_TO_ICON[finalSize][1]}
              role="button"
              interactive
              style={{ visibility: value ? 'visible' : 'hidden' }}
              onClick={this.handleClear}
            />
          </SInput>
        </SBox>
        <Divider />
      </>,
    );
  }
}

export default createComponent(InputSearch);
