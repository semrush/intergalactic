import React from 'react';
import createComponent, { Component, CONTEXT_COMPONENT } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Input from '@semcore/input';
import Divider from '@semcore/divider';
import SearchXS from '@semcore/icon/lib/Search/xs';
import CloseXS from '@semcore/icon/lib/Close/xs';
import SearchS from '@semcore/icon/lib/Search/s';
import CloseS from '@semcore/icon/lib/Close/s';
import SearchM from '@semcore/icon/lib/Search/m';
import CloseM from '@semcore/icon/lib/Close/m';

import Select from './Select';

const MAP_SIZE_TO_PADDINGS = {
  m: '8px',
  l: '10px 8px',
  xl: '12px 12px',
};

const MAP_SIZE_TO_ICON = {
  m: [SearchXS, CloseXS],
  l: [SearchS, CloseS],
  xl: [SearchM, CloseM],
};

class InputSearch extends Component {
  static displayName = 'InputSearch';

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
    const { size, value, forwardRef, ...props } = this.asProps;
    const finalSize = size || this.context.size;

    return (
      <>
        <Box p={MAP_SIZE_TO_PADDINGS[finalSize]}>
          <Input size={finalSize}>
            <Input.Addon tag={MAP_SIZE_TO_ICON[finalSize][0]} />
            <Input.Value ref={forwardRef} autoFocus {...props} />
            <Input.Addon
              tag={MAP_SIZE_TO_ICON[finalSize][1]}
              role="button"
              interactive
              style={{ visibility: value ? 'visible' : 'hidden' }}
              onClick={this.handleClear}
            />
          </Input>
        </Box>
        <Divider />
      </>
    );
  }
}

export default createComponent(InputSearch);
