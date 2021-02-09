import React from 'react';
import { Box, Flex } from '@semcore/flex-box';
import createComponent, { Component, styled } from '@semcore/core';

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
    const SFlex = this.Root;
    const { gutter } = this.asProps;

    return <SFlex render={Flex} flexWrap mx={gutter ? `${gutter * -2}px` : undefined} />;
  }
}

function Col(props) {
  let {
    Root: SCol,
    styles,
    gutter,
    span,
    md,
    sm,
    xs,
    offset,
    mdOffset,
    smOffset,
    xsOffset,
  } = props;

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

  return styled(styles)(
    <SCol
      render={Box}
      px={gutter ? `${gutter * 2}px` : undefined}
      span={span === true ? 'auto' : span}
      md={md === true ? 'auto' : md}
      sm={sm === true ? 'auto' : sm}
      xs={xs === true ? 'auto' : xs}
      offset={offset}
      mdOffset={mdOffset}
      smOffset={smOffset}
      xsOffset={xsOffset}
    />,
  );
}

export default createComponent(Row, { Col });
