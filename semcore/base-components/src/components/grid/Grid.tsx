import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import React from 'react';

import { Box, Flex } from '../flex-box';
import type { NSGrid } from './Grid.type';
import style from './style/grid.shadow.css';

class RowRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSGrid.Component>,
  [],
  {},
  {},
  {},
  NSGrid.DefaultProps
> {
  static displayName = 'Row';
  static style = style;
  static defaultProps = {
    gutter: 0,
  } as const;

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

const excludeProps = ['span'];

function Col(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSGrid.Col.Component, typeof RowRoot, 'Col'>,
) {
  const SCol = Root;
  const { styles, gutter } = props;
  let { span, md, sm, xs, offset, mdOffset, smOffset, xsOffset } = props;

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
      __excludeProps={excludeProps}
    />,
  );
}

const Row = createComponent<
  NSGrid.Component,
  typeof RowRoot
>(RowRoot, { Col });

export default Row;
