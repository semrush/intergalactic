import React from 'react';
import createComponent, { Component, CONTEXT_COMPONENT } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Input, { IInputValueProps } from '@semcore/input';
import Divider from '@semcore/divider';
import SearchXS from '@semcore/icon/lib/Search/xs';
import CloseXS from '@semcore/icon/lib/Close/xs';
import SearchS from '@semcore/icon/lib/Search/s';
import CloseS from '@semcore/icon/lib/Close/s';
import SearchM from '@semcore/icon/lib/Search/m';
import CloseM from '@semcore/icon/lib/Close/m';

import Select from '../Select';

export interface ISelectInputSearch extends IInputValueProps {}

const MAP_SIZE_TO_PADDINGS = {
  m: 2,
  l: '10px 8px',
  xl: '12px 12px',
};

const MAP_SIZE_TO_ICON = {
  m: [SearchXS, CloseXS],
  l: [SearchS, CloseS],
  xl: [SearchM, CloseM],
};

class InputSearch extends Component<ISelectInputSearch> {
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
    const Root = this.Root;
    const { size, value } = this.asProps;
    const finalSize = size || this.context.size;

    return (
      <>
        <Box p={MAP_SIZE_TO_PADDINGS[finalSize as any]}>
          <Input size={finalSize}>
            <Input.Addon tag={MAP_SIZE_TO_ICON[finalSize as any][0]} />
            <Root render={Input.Value} autoFocus />
            <Input.Addon
              tag={MAP_SIZE_TO_ICON[finalSize as any][1]}
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

export default createComponent<ISelectInputSearch>(InputSearch);
