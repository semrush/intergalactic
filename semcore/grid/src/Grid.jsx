import React from 'react';
import { Box, Flex } from '@semcore/flex-box';
import createComponent, { Component, sstyled, Root } from '@semcore/core';

import style from './style/grid.shadow.css';

class Row extends Component {
  static displayName = 'Row';
  static style = style;
  static defaultProps = {
    gutter: 0,
  };

  getColProps() {
    const { gutter } = this.asProps;
    return {
      gutter,
    };
  }

  render() {
    const { gutter } = this.asProps;

    return <Root render={Flex} flexWrap mx={gutter ? `${gutter * -2}px` : undefined} />;
  }
}

function Col(props) {
  const SCol = Root;
  let { styles, gutter, span, md, sm, xs, offset, mdOffset, smOffset, xsOffset } = props;

  if (Array.isArray(span)) {
    [span, md, sm, xs] = span;
  }

  if (Array.isArray(offset)) {
    [offset, mdOffset, smOffset, xsOffset] = offset;
  }

  span = span !== undefined ? span : md !== undefined ? md : sm !== undefined ? sm : xs;
  offset =
    offset !== undefined
      ? offset
      : mdOffset !== undefined
      ? mdOffset
      : smOffset !== undefined
      ? smOffset
      : xsOffset;

  return sstyled(styles)(
    <SCol
      render={Box}
      px={gutter ? `${gutter * 2}px` : undefined}
      use:span={span === true ? 'auto' : span}
      use:md={md === true ? 'auto' : md}
      use:sm={sm === true ? 'auto' : sm}
      use:xs={xs === true ? 'auto' : xs}
      use:offset={offset}
      use:mdOffset={mdOffset}
      use:smOffset={smOffset}
      use:xsOffset={xsOffset}
    />,
  );
}

export default createComponent(Row, { Col });
